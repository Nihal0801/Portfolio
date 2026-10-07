'use client';

import { useEffect, useState } from 'react';
import { PROJECTS } from '@/lib/data';
import savedSnapshot from '@/lib/github-projects.snapshot.json';
import {
    fetchGitHubSnapshot,
    getGitHubProjects,
    GITHUB_CACHE_KEY,
    GITHUB_REFRESH_MS,
    isGitHubSnapshot,
    isSnapshotFresh,
    type GitHubSnapshot,
} from '@/lib/github-projects';
import GitHubProjects from './GitHubProjects';

const initialSnapshot: GitHubSnapshot = savedSnapshot;
const featuredSourceCodes = PROJECTS.map((project) => project.sourceCode);

export default function GitHubProjectFeed() {
    const [snapshot, setSnapshot] = useState(initialSnapshot);
    const [state, setState] = useState<'live' | 'saved' | 'unavailable'>('saved');

    useEffect(() => {
        let active = true;
        let current = initialSnapshot;
        let inFlight = false;
        let lastAttempt = 0;
        let controller: AbortController | undefined;

        try {
            const stored: unknown = JSON.parse(localStorage.getItem(GITHUB_CACHE_KEY) ?? 'null');
            if (isGitHubSnapshot(stored) && stored.fetchedAt > current.fetchedAt && stored.fetchedAt <= Date.now()) {
                current = stored;
                setSnapshot(current);
            }
        } catch {
            // Storage can be unavailable; the deployed snapshot still works.
        }

        const refresh = async () => {
            if (document.visibilityState === 'hidden' || inFlight) return;
            if (isSnapshotFresh(current)) {
                setState('live');
                return;
            }
            if (Date.now() - lastAttempt < GITHUB_REFRESH_MS) return;
            inFlight = true;
            lastAttempt = Date.now();
            controller = new AbortController();
            const timeout = window.setTimeout(() => controller?.abort(), 20_000);
            try {
                const next = await fetchGitHubSnapshot({ signal: controller.signal });
                if (!active) return;
                current = next;
                setSnapshot(next);
                setState('live');
                try {
                    localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify(next));
                } catch {
                    // A full or disabled cache should not interrupt live updates.
                }
            } catch {
                if (active) setState(current.repositories.length ? 'saved' : 'unavailable');
            } finally {
                window.clearTimeout(timeout);
                inFlight = false;
            }
        };

        void refresh();
        const interval = window.setInterval(() => void refresh(), GITHUB_REFRESH_MS);
        const onVisible = () => void refresh();
        document.addEventListener('visibilitychange', onVisible);
        window.addEventListener('focus', onVisible);
        return () => {
            active = false;
            controller?.abort();
            window.clearInterval(interval);
            document.removeEventListener('visibilitychange', onVisible);
            window.removeEventListener('focus', onVisible);
        };
    }, []);

    return <GitHubProjects projects={getGitHubProjects(snapshot.repositories, featuredSourceCodes)} state={state} />;
}
