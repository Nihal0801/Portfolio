# Nihal Patel - Portfolio

Personal portfolio for Nihal Patel, a Computer Science student focused on AI systems, cloud engineering, scalable software, and immersive computing research.

Live site: [nihal0801.github.io/Portfolio](https://nihal0801.github.io/Portfolio/)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Technology

- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- Lenis

## Deployment

Every push to `main` is built as a static site and deployed to GitHub Pages.

## Automatic GitHub projects

The homepage's **More on GitHub** section automatically lists original public
repositories owned by `Nihal0801`, newest pushes first. Forks, archived/disabled
repositories, the profile and portfolio repositories, and projects already linked
from the featured case studies are excluded. Existing case studies remain curated.

- Create a public repository and push your work: it appears automatically when
  the site next refreshes its GitHub data. Each repository becomes one project;
  individual commits and uploaded files do not become separate project cards.
- In a repository's **About** settings, add a description, website URL, and topics
  to improve its card. The primary language and last-push date come from GitHub.
- Add the topic `portfolio-hide` to hide a repository from the automatic section.
- The browser fetches public metadata on visits when its five-minute cache is
  stale, refreshes every five minutes while visible, and checks on return to the
  tab. New repositories link directly to GitHub and need no portfolio rebuild.
- Each build also refreshes `lib/github-projects.snapshot.json`, which supplies
  the initial HTML and a fallback when GitHub or browser storage is unavailable.
  A failed or partial fetch preserves the previous complete list. During an
  outage or rate limit the saved list may be older than the live GitHub profile.
- No scheduled workflow, personal access token, or browser secret is required.
  GitHub Actions supplies its built-in read token only to the build process.

```bash
pnpm sync:github # Refresh the saved snapshot for local previews
pnpm test        # Check filtering, pagination, cache rules, and failures
pnpm build       # Refresh the snapshot and export the site
```

Use Node.js 22.18 or newer. Configuration and filtering live in
`lib/github-projects.ts`. The browser uses GitHub's
[public repository API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user),
subject to its [rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

## License and source

This project adapts Tajmirul Islam's open-source portfolio under the included MIT License. The website content, project descriptions, and personal branding have been revised for Nihal Patel.
