import assert from 'node:assert/strict';
import test from 'node:test';
import {
    fetchGitHubSnapshot,
    getGitHubProjects,
    isGitHubSnapshot,
    isSnapshotFresh,
    safeHomepage,
    type GitHubRepository,
} from '../lib/github-projects.ts';

const repository = (overrides: Partial<GitHubRepository> = {}): GitHubRepository => ({
    id: 1, name: 'new-project', owner: { login: 'Nihal0801' },
    private: false, fork: false, archived: false, disabled: false,
    description: null, homepage: null, language: 'TypeScript', topics: [],
    stargazers_count: 0, pushed_at: '2026-10-07T12:00:00Z',
    ...overrides,
});

test('only original, public, owned projects appear, without featured duplicates', () => {
    const repos = [
        repository(),
        repository({ id: 2, name: 'forked-work', fork: true }),
        repository({ id: 3, name: 'private-work', private: true }),
        repository({ id: 4, name: 'archived-work', archived: true }),
        repository({ id: 5, name: 'disabled-work', disabled: true }),
        repository({ id: 6, name: 'portfolio' }),
        repository({ id: 7, name: 'NIHAL0801' }),
        repository({ id: 8, name: 'OrbiT' }),
        repository({ id: 9, name: 'hidden-work', topics: ['portfolio-hide'] }),
        repository({ id: 10, name: 'someone-elses-work', owner: { login: 'someone-else' } }),
        repository(),
    ];
    assert.deepEqual(
        getGitHubProjects(repos, ['https://github.com/nihal0801/orbit.git/']).map((p) => p.name),
        ['new-project'],
    );
});

test('new pushes move projects up; missing metadata has honest fallbacks', () => {
    const result = getGitHubProjects([
        repository({ id: 1, name: 'no-commits', pushed_at: null, language: null }),
        repository({ id: 2, name: 'older', pushed_at: '2025-01-01T00:00:00Z' }),
        repository({ id: 3, name: 'newer', description: '<img src=x onerror=alert(1)>' }),
    ]);
    assert.deepEqual(result.map((p) => p.name), ['newer', 'older', 'no-commits']);
    assert.equal(result[0].description, '<img src=x onerror=alert(1)>'); // Rendered as React text.
    assert.equal(result[2].description, 'Explore the code and project details on GitHub.');
    assert.equal(result[2].language, null);
    assert.equal(result[2].pushedAt, null);
});

test('demo links cannot inject scripts or embed credentials', () => {
    for (const url of ['javascript:alert(1)', 'data:text/html,hello', '//example.com', 'https://user:pass@example.com', 'not a url', null]) {
        assert.equal(safeHomepage(url), undefined);
    }
    assert.equal(safeHomepage(' https://example.com/demo '), 'https://example.com/demo');
});

test('fetches beyond the first 100 repositories without exposing unnecessary metadata', async () => {
    const urls: string[] = [];
    const snapshot = await fetchGitHubSnapshot({
        fetcher: async (input) => {
            urls.push(String(input));
            const data = urls.length === 1
                ? Array.from({ length: 100 }, (_, id) => ({ ...repository({ id, name: `project-${id}` }), irrelevant: 'discard me' }))
                : [repository({ id: 101, name: 'last-project' })];
            return Response.json(data);
        },
    });
    assert.equal(snapshot.repositories.length, 101);
    assert.match(urls[1], /page=2$/);
    assert.equal('irrelevant' in snapshot.repositories[0], false);
    assert.equal(isGitHubSnapshot(snapshot), true);
});

test('rate limit on a later page rejects the whole refresh', async () => {
    let calls = 0;
    await assert.rejects(fetchGitHubSnapshot({
        fetcher: async () => ++calls === 1
            ? Response.json(Array.from({ length: 100 }, (_, id) => repository({ id })))
            : new Response('Rate limited', { status: 403 }),
    }), /HTTP 403/);
});

test('unexpected API data cannot replace a valid snapshot', async () => {
    for (const data of [{ message: 'API error' }, [{ id: 1 }]]) {
        await assert.rejects(fetchGitHubSnapshot({ fetcher: async () => Response.json(data) }), /unexpected/);
    }
    assert.equal(isGitHubSnapshot({ fetchedAt: 1, repositories: [{ id: 1 }] }), false);
    assert.equal(isGitHubSnapshot({ fetchedAt: 1, repositories: [repository()] }), true);
});

test('successful empty response removes old projects; private records never enter snapshot', async () => {
    const empty = await fetchGitHubSnapshot({ fetcher: async () => Response.json([]) });
    assert.deepEqual(empty.repositories, []);
    const filtered = await fetchGitHubSnapshot({ fetcher: async () => Response.json([
        repository({ private: true }), repository({ owner: { login: 'another-owner' } }),
    ]) });
    assert.deepEqual(filtered.repositories, []);
});

test('expired or future-dated cache does not suppress refresh', () => {
    const snapshot = { fetchedAt: 1_000_000, repositories: [] };
    assert.equal(isSnapshotFresh(snapshot, 1_001_000), true);
    assert.equal(isSnapshotFresh(snapshot, 1_300_000), false);
    assert.equal(isSnapshotFresh(snapshot, 999_999), false);
});
