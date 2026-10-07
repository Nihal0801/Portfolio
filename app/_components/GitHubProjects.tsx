import SectionTitle from '@/components/SectionTitle';
import type { GitHubProject } from '@/lib/github-projects';
import { ArrowUpRight, Github, Star } from 'lucide-react';

interface Props {
    projects: GitHubProject[];
    state: 'live' | 'saved' | 'unavailable';
}

const formatDate = (value: string | null) => {
    if (!value) return null;

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return {
        value: date.toISOString(),
        label: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        }),
    };
};

const GitHubProjects = ({ projects, state }: Props) => (
    <section className="pb-24 md:pb-36" id="github-projects">
        <div className="container">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <SectionTitle title="MORE ON GITHUB" className="mb-4" />
                    <p className="max-w-xl text-muted-foreground">
                        More builds and experiments, updated from my public
                        GitHub projects.
                    </p>
                </div>
                <a
                    href="https://github.com/Nihal0801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 self-start text-sm transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                    <Github size={17} aria-hidden="true" />
                    View GitHub
                    <ArrowUpRight size={17} aria-hidden="true" />
                </a>
            </div>

            {state !== 'live' && (
                <p className="mb-6 text-sm text-muted-foreground" role="status">
                    {state === 'saved'
                        ? 'Showing the latest saved projects. Visit GitHub for the newest updates.'
                        : 'Visit GitHub to explore my latest projects.'}
                </p>
            )}

            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                        const updated = formatDate(project.pushedAt);
                        const topics = project.topics
                            .filter(
                                (topic) =>
                                    topic.toLowerCase() !==
                                    project.language?.toLowerCase(),
                            )
                            .slice(0, 3);

                        return (
                            <article
                                key={project.id}
                                className="flex min-w-0 flex-col border border-border bg-background-light/30 p-6 transition-colors hover:border-primary/50"
                            >
                                <div className="mb-5 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                                    <span className="inline-flex min-w-0 items-center gap-2">
                                        <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                                        <span className="truncate">
                                            {project.language || 'GitHub project'}
                                        </span>
                                    </span>
                                    {project.stars > 0 && (
                                        <span
                                            className="inline-flex shrink-0 items-center gap-1.5"
                                            aria-label={`${project.stars} GitHub ${project.stars === 1 ? 'star' : 'stars'}`}
                                        >
                                            <Star size={13} aria-hidden="true" />
                                            {project.stars}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mb-3 break-words font-anton text-2xl leading-tight">
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                    >
                                        {project.title}
                                    </a>
                                </h3>
                                <p className="mb-5 break-words text-sm leading-relaxed text-muted-foreground">
                                    {project.description ||
                                        'Explore the code and project details on GitHub.'}
                                </p>

                                {topics.length > 0 && (
                                    <ul
                                        className="mb-6 flex flex-wrap gap-2"
                                        aria-label="Project topics"
                                    >
                                        {topics.map((topic) => (
                                            <li
                                                key={topic}
                                                className="max-w-full break-words border border-border px-2 py-1 text-[11px] text-muted-foreground"
                                            >
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-auto border-t border-border pt-4">
                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                                        <a
                                            href={project.sourceCode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View ${project.title} on GitHub`}
                                            className="inline-flex items-center gap-1.5 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                        >
                                            <Github size={15} aria-hidden="true" />
                                            Code
                                            <ArrowUpRight size={14} aria-hidden="true" />
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Visit the ${project.title} website`}
                                                className="inline-flex items-center gap-1.5 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                                            >
                                                Website
                                                <ArrowUpRight size={14} aria-hidden="true" />
                                            </a>
                                        )}
                                    </div>
                                    {updated && (
                                        <p className="mt-3 text-xs text-muted-foreground">
                                            Updated{' '}
                                            <time dateTime={updated.value}>
                                                {updated.label}
                                            </time>
                                        </p>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : state === 'live' ? (
                <p className="border border-border p-6 text-muted-foreground">
                    New public projects will appear here as I publish them.
                </p>
            ) : null}
        </div>
    </section>
);

export default GitHubProjects;
