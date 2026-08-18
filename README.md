<div align="center">

<br />

<img src="https://i.postimg.cc/C1X2FVFN/origin.png" alt="origin preview" width="100%" />

<br />
<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/origin-cristhobal.cl-FAFAFA?style=for-the-badge&logoColor=080808&labelColor=FAFAFA">
  <img alt="origin" src="https://img.shields.io/badge/origin-cristhobal.cl-080808?style=for-the-badge&logoColor=FAFAFA&labelColor=080808">
</picture>

<br />
<br />

**Personal portfolio of Cristhobal Canales — Fullstack Developer from Chile.**  
Built with Astro 6, React 19, and TypeScript. Deployed on Vercel.

<br />

[![Visit site](https://img.shields.io/badge/visit%20site-cristhobal.cl-080808?style=flat-square&labelColor=080808)](https://www.cristhobal.cl)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-080808?style=flat-square&labelColor=080808&logo=vercel&logoColor=FAFAFA)](https://vercel.com)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-080808?style=flat-square&labelColor=080808&logo=astro&logoColor=FAFAFA)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-080808?style=flat-square&labelColor=080808&logo=typescript&logoColor=FAFAFA)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-080808?style=flat-square&labelColor=080808)](./LICENSE)

<br />

</div>

---

## Features

- **Auto-synced GitHub projects** — new and updated repositories are fetched at build time and published on `/projects`
- **Scheduled auto-redeploy** — GitHub Actions triggers Vercel every hour to keep the home page fresh
- **Static-first** — most pages are prerendered at build time for instant load speeds
- **Dark mode** — full dark/light support via CSS variables
- **SEO ready** — sitemap, dynamically generated Open Graph image, `robots.txt`, and JSON-LD schema
- **Unit testing** — Vitest test suite with v8 code coverage
- **Path aliases** — clean imports using `@/` pointing to `src/`

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Astro 6](https://astro.build) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) |
| Animations | [Motion](https://motion.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Language | TypeScript (strict mode) |
| Testing | [Vitest](https://vitest.dev) + v8 coverage |
| Deployment | [Vercel](https://vercel.com) — `@astrojs/vercel` adapter |
| Data | GitHub REST API v3 |
| OG Image | [`@vercel/og`](https://vercel.com/docs/functions/og-image-generation) |

---

## Architecture

The project follows a **feature-oriented architecture** (Screaming Architecture), where the folder structure reflects the business domain rather than technical layers. Each feature is self-contained and groups its own components, data, services, and types.

```
/
├── public/
│   ├── logos/                          # Repo logos (repo-name.{png,svg,webp})
│   ├── favicon.ico / .png / .svg
│   └── robots.txt
│
├── src/
│   ├── assets/                         # Internal static assets (background SVGs, etc.)
│   │
│   ├── features/                       # Domain modules (feature-based)
│   │   ├── experience/
│   │   │   ├── components/
│   │   │   │   └── ExperienceItem.astro
│   │   │   ├── data.ts                 # Static work experience data
│   │   │   └── types.ts                # Experience interface
│   │   │
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   │   ├── LanguagesBar.astro
│   │   │   │   └── ProjectCard.astro
│   │   │   ├── services/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── github.service.test.ts
│   │   │   │   └── github.service.ts   # GitHub API integration
│   │   │   ├── data.ts                 # Manually pinned projects
│   │   │   └── types.ts                # Project, Tag interfaces
│   │   │
│   │   └── technologies/
│   │       ├── data.ts                 # Technology registry with inline SVGs
│   │       └── types.ts                # Technology interface
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro            # Base layout (head, fonts, SEO)
│   │   └── HomeLayout.astro            # Home layout with sections and animations
│   │
│   ├── pages/
│   │   ├── index.astro                 # Home page (SSG)
│   │   ├── projects.astro              # Projects — SSG, GitHub data fetched at build time
│   │   ├── experience.astro            # Work experience (SSG)
│   │   └── og.png.ts                   # Dynamic Open Graph image generation
│   │
│   └── shared/                         # Reusable code across features
│       ├── components/
│       │   ├── Header.astro
│       │   └── Footer.astro
│       ├── config/
│       │   └── site.ts                 # Global constants (SITE_URL, GITHUB_USERNAME)
│       ├── icons/
│       │   ├── index.ts                # Public re-exports
│       │   ├── tag-icons.registry.ts   # name → SVG map for project tags
│       │   └── tag-names.normalizer.ts # Normalizes GitHub topic/language names
│       ├── ui/                         # Reusable React components
│       │   ├── blur-fade.tsx
│       │   ├── button.tsx
│       │   ├── marquee.tsx
│       │   └── meteors.tsx
│       └── utils/
│           ├── __tests__/
│           │   └── dates.test.ts
│           ├── cn.ts                   # clsx + tailwind-merge utility
│           └── dates.ts                # Date formatting helpers
│
├── .github/
│   └── workflows/
│       └── redeploy-vercel.yml         # Scheduled auto-redeploy every hour
│
├── astro.config.mjs
├── tsconfig.json                       # Strict mode + @/ → src/ alias
├── vitest.config.ts
└── package.json
```

---

## Rendering strategy

The site uses a hybrid rendering model configured in `astro.config.mjs`:

- **SSG** — home, experience and projects pages. Prerendered at build time for maximum performance. The GitHub API is queried at build time; the hourly redeploy workflow keeps repositories fresh.
- **SSR** — only `/og.png`, the dynamic Open Graph image endpoint.

---

## Getting started

### Prerequisites

- Node.js >= 22.12.0
- npm (included with Node.js)

### Install and run

```bash
npm install
npm run dev        # starts the dev server at localhost:4321
```

### Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run unit tests once (Vitest, CI mode) |
| `npm run test:watch` | Run tests in interactive watch mode |
| `npm run test:coverage` | Generate v8 code coverage report |

---

## Environment variables

Create a `.env` file at the project root:

```env
# Optional — includes private repos on the site.
# Requires "Repository → Metadata: Read-only" permission (fine-grained token)
# or the "repo" scope (classic token).
# Without a token the site works fine, but only shows public repos.
GITHUB_TOKEN=github_pat_xxxxxxxxxxxxxxxx
```

The token is only used at build time and in Vercel serverless function runtime — it never reaches the browser.

For the scheduled auto-redeploy, add the following secret in your repository under **Settings → Secrets → Actions**:

```
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

---

## Adding a logo to a repository

Drop an image into `public/logos/` named after the repository:

```
public/logos/my-repo.png
public/logos/my-repo.svg
public/logos/my-repo.webp
```

Supported formats in priority order: `svg`, `png`, `webp`, `jpg`, `jpeg`. The logo is picked up automatically by the project card — no code changes needed.

To use an external URL instead of a local file, edit the `REPO_LOGOS` map in `src/features/projects/services/github.service.ts`:

```ts
const REPO_LOGOS: Record<string, string> = {
  "my-repo": "https://cdn.example.com/logo.png",
};
```

---

## Scheduled auto-redeploy

The `.github/workflows/redeploy-vercel.yml` workflow triggers a Vercel deploy webhook automatically:

- **Every hour** (cron `0 * * * *`) — picks up new or updated repositories
- **Manually** — from the GitHub Actions tab via `workflow_dispatch`

Adjust the frequency by changing the `cron` field in the workflow file.

---

## Testing

Tests live next to the code they cover, inside `__tests__/` folders:

```
src/features/projects/services/__tests__/github.service.test.ts
src/shared/utils/__tests__/dates.test.ts
```

Coverage is reported over `src/features/**/*.ts` and `src/shared/**/*.ts`, excluding test files themselves.

```bash
npm run test:coverage
```

---

## License

MIT © [Cristhobal Canales](https://www.cristhobal.cl)
