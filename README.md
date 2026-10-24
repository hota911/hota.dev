# hota.dev

Personal website of Hiroyuki Ota, built with [Astro](https://astro.build/) as a fully static site.
The build output is plain HTML, CSS, and a little client-side JavaScript; there is no server-side logic.

## Development

Requires Node.js 24.x and pnpm.

```bash
pnpm install
pnpm dev      # dev server at http://localhost:4321
pnpm build    # static output in dist/
pnpm preview  # serve dist/ locally
pnpm run deploy  # build, then deploy dist/ to Cloudflare
```

## Deployment

The site is deployed to [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
as a static-assets-only Worker named `hota-dev` (no server code, no Astro adapter).
Pushes to `main` are deployed automatically by Cloudflare Workers Builds.
`pnpm run deploy` remains for manual deploys: it runs `astro build` and then `wrangler deploy`; the configuration is in `wrangler.jsonc`.

## CI and dependency updates

- The GitHub Actions `build` job runs `pnpm run build` and must pass before a PR can be merged.
- Dependabot updates npm and GitHub Actions weekly. Patch and minor PRs are auto-merged once CI passes; major updates are reviewed and merged manually.

## Layout

- `src/pages/` — one file per route (`index.astro` → `/`, `open-codex/index.astro` → `/open-codex/`)
- `src/layouts/Base.astro` — shared header, nav, and `<head>`
- `src/styles/global.css` — hand-written site styles
- `src/lib/` — client-side link parsing for `/open-codex/` and `/open-claude/`

## Designs

- [Open Codex link page](docs/open-codex-link-design.md)
- [Open Claude Code link page](docs/open-claude-link-design.md)
