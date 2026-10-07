import { readFile, rename, writeFile } from 'node:fs/promises';
import { fetchGitHubSnapshot, isGitHubSnapshot } from '../lib/github-projects.ts';

const snapshotUrl = new URL('../lib/github-projects.snapshot.json', import.meta.url);
const temporaryUrl = new URL('../lib/github-projects.snapshot.json.tmp', import.meta.url);

try {
    const snapshot = await fetchGitHubSnapshot({
        token: process.env.GITHUB_TOKEN,
        signal: AbortSignal.timeout(30_000),
    });
    await writeFile(temporaryUrl, `${JSON.stringify(snapshot, null, 2)}\n`);
    await rename(temporaryUrl, snapshotUrl);
    console.log(`Saved ${snapshot.repositories.length} public GitHub repositories for the portfolio.`);
} catch (error) {
    const fallback: unknown = JSON.parse(await readFile(snapshotUrl, 'utf8'));
    if (!isGitHubSnapshot(fallback)) throw new Error('No valid saved GitHub project list is available.');
    console.warn(`GitHub sync unavailable; keeping the saved project list. ${error instanceof Error ? error.message : 'Unknown error.'}`);
}
