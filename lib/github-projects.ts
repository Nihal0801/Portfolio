export const GITHUB_USERNAME = 'Nihal0801';
export const GITHUB_REFRESH_MS = 5 * 60 * 1000;
export const GITHUB_CACHE_KEY = `portfolio-github-v1:${GITHUB_USERNAME}`;

// Add a repository name here, or give it the GitHub topic `portfolio-hide`,
// to leave it out of the automatic list.
const EXCLUDED_REPOSITORIES = ['Portfolio', GITHUB_USERNAME];

export interface GitHubRepository {
    id: number;
    name: string;
    owner: { login: string };
    private: boolean;
    fork: boolean;
    archived: boolean;
    disabled: boolean;
    description: string | null;
    homepage: string | null;
    language: string | null;
    topics: string[];
    stargazers_count: number;
    pushed_at: string | null;
}

export interface GitHubSnapshot {
    fetchedAt: number;
    repositories: GitHubRepository[];
}

export interface GitHubProject {
    id: number;
    name: string;
    title: string;
    description: string;
    sourceCode: string;
    liveUrl?: string;
    language: string | null;
    topics: string[];
    stars: number;
    pushedAt: string | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isRepository(value: unknown): value is GitHubRepository {
    if (!isRecord(value)) return false;
    return (
        Number.isSafeInteger(value.id) &&
        typeof value.name === 'string' &&
        /^[\w.-]+$/.test(value.name) &&
        isRecord(value.owner) &&
        typeof value.owner.login === 'string' &&
        ['private', 'fork', 'archived', 'disabled'].every(
            (key) => typeof value[key] === 'boolean',
        ) &&
        ['description', 'homepage', 'language'].every(
            (key) => value[key] === null || typeof value[key] === 'string',
        ) &&
        Array.isArray(value.topics) &&
        value.topics.every((topic) => typeof topic === 'string') &&
        typeof value.stargazers_count === 'number' &&
        Number.isFinite(value.stargazers_count) &&
        (value.pushed_at === null ||
            (typeof value.pushed_at === 'string' &&
                Number.isFinite(Date.parse(value.pushed_at))))
    );
}

export function isGitHubSnapshot(value: unknown): value is GitHubSnapshot {
    return (
        isRecord(value) &&
        typeof value.fetchedAt === 'number' &&
        Number.isFinite(value.fetchedAt) &&
        value.fetchedAt > 0 &&
        Array.isArray(value.repositories) &&
        value.repositories.every(isRepository)
    );
}

export function isSnapshotFresh(snapshot: GitHubSnapshot, now = Date.now()) {
    const age = now - snapshot.fetchedAt;
    return age >= 0 && age < GITHUB_REFRESH_MS;
}

export function getRepositoryKey(sourceCode?: string): string | null {
    if (!sourceCode) return null;
    try {
        const url = new URL(sourceCode);
        if (url.hostname.toLowerCase() !== 'github.com') return null;
        const parts = url.pathname.replace(/\/+$/, '').replace(/\.git$/i, '').split('/').filter(Boolean);
        return parts.length === 2 ? parts.join('/').toLowerCase() : null;
    } catch {
        return null;
    }
}

export function safeHomepage(homepage: string | null): string | undefined {
    if (!homepage?.trim()) return undefined;
    try {
        const url = new URL(homepage.trim());
        return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
            ? url.href
            : undefined;
    } catch {
        return undefined;
    }
}

export function getGitHubProjects(
    repositories: GitHubRepository[],
    featuredSourceCodes: (string | undefined)[] = [],
): GitHubProject[] {
    const featured = new Set(featuredSourceCodes.map(getRepositoryKey));
    const excluded = new Set(EXCLUDED_REPOSITORIES.map((name) => name.toLowerCase()));
    const seen = new Set<number>();

    return repositories
        .filter((repo) => {
            const name = repo.name.toLowerCase();
            const owner = repo.owner.login.toLowerCase();
            if (
                owner !== GITHUB_USERNAME.toLowerCase() ||
                repo.private || repo.fork || repo.archived || repo.disabled ||
                excluded.has(name) || featured.has(`${owner}/${name}`) ||
                repo.topics.includes('portfolio-hide') || seen.has(repo.id)
            ) return false;
            seen.add(repo.id);
            return true;
        })
        .sort((a, b) =>
            (Date.parse(b.pushed_at ?? '') || 0) - (Date.parse(a.pushed_at ?? '') || 0) ||
            a.name.localeCompare(b.name),
        )
        .map((repo) => ({
            id: repo.id,
            name: repo.name,
            title: repo.name.replace(/[-_]+/g, ' ').trim(),
            description: repo.description?.trim() || 'Explore the code and project details on GitHub.',
            sourceCode: `https://github.com/${GITHUB_USERNAME}/${encodeURIComponent(repo.name)}`,
            liveUrl: safeHomepage(repo.homepage),
            language: repo.language,
            topics: repo.topics.filter((topic) => !topic.startsWith('portfolio-')),
            stars: repo.stargazers_count,
            pushedAt: repo.pushed_at,
        }));
}

// Fetch every page before returning anything. An outage on a later page must
// never replace the saved list with an incomplete list.
export async function fetchGitHubSnapshot({
    fetcher = fetch,
    signal,
    token,
}: {
    fetcher?: typeof fetch;
    signal?: AbortSignal;
    token?: string;
} = {}): Promise<GitHubSnapshot> {
    const repositories: GitHubRepository[] = [];
    for (let page = 1; page <= 100; page++) {
        const response = await fetcher(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=${page}`,
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                signal,
                cache: 'no-store',
            },
        );
        if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}.`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isRepository)) {
            throw new Error('GitHub returned an unexpected repository response.');
        }
        // Store only public metadata needed by the portfolio.
        repositories.push(...data
            .filter((repo) => !repo.private && repo.owner.login.toLowerCase() === GITHUB_USERNAME.toLowerCase())
            .map((repo) => ({
                id: repo.id, name: repo.name, owner: { login: repo.owner.login },
                private: repo.private, fork: repo.fork, archived: repo.archived,
                disabled: repo.disabled, description: repo.description,
                homepage: repo.homepage, language: repo.language,
                topics: repo.topics, stargazers_count: repo.stargazers_count,
                pushed_at: repo.pushed_at,
            })));
        if (data.length < 100) return { fetchedAt: Date.now(), repositories };
    }
    throw new Error('GitHub repository pagination exceeded its safety limit.');
}
