/**
 * Cache policy for the pages that show GitHub data (home and /projects).
 *
 * They are rendered on the server (prerender = false) instead of at build time, so a change on GitHub
 * (a new repo, a new description or website URL…) shows up without redeploying. Vercel's CDN keeps each
 * render for 60 s, so GitHub is queried at most about once a minute per page, not on every visit; after
 * that, `stale-while-revalidate` serves the cached page instantly while a fresh one is rendered in the
 * background. Browsers always revalidate (Vercel sends them `max-age=0` when `s-maxage` is used).
 */
export const GITHUB_PAGES_CACHE_CONTROL = "public, s-maxage=60, stale-while-revalidate=600";
