# Repo logos

Drop an image here named exactly like your GitHub repo (case-sensitive) and it
will appear automatically as the project's logo on the site.

## Naming convention

```
public/logos/<repo-name>.<ext>
```

Supported extensions (looked up in this order, first match wins):

1. `svg`  ← preferred, vector and tiny
2. `png`
3. `webp`
4. `jpg` / `jpeg`

## Example

If you have a repo `github.com/cristhobal/mi-app`, save the icon as:

```
public/logos/mi-app.svg
```

It will be served at `/logos/mi-app.svg` and used as `logo` for that project.

## Where to get logos

- The repo's own brand if it has one
- [simpleicons.org](https://simpleicons.org) for tech-stack icons
- Custom SVG / Figma export
- The Open Graph "social preview" image from GitHub (Settings → General → Social preview)

## How it works

`src/lib/github.ts` runs at build time in Node and uses `fs.existsSync()` to
look up each repo's logo file. No runtime cost: by the time the page is
served, every URL is already baked into the static HTML.

## Manual override

If you need a remote URL (e.g. a CDN-hosted image), add an entry to
`REPO_LOGOS` in `src/lib/github.ts`:

```ts
const REPO_LOGOS: Record<string, string> = {
  "mi-app": "https://example.com/cdn/mi-app-logo.png",
};
```

The override takes precedence over the filesystem lookup.
