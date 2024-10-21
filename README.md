# Opus Classical

SvelteKit, Drizzle, Neon, Cloudflare Pages.

[![CI](https://github.com/Droidion/opus-classical-svelte/actions/workflows/ci.yml/badge.svg)](https://github.com/Droidion/opus-classical-svelte/actions/workflows/ci.yml)

## Run dev

- Have [pnpm](https://pnpm.io) installed.
- Create `.env` file with variables:
  - `DATABASE_URL` - PostgreSQL connection string.
  - `PUBLIC_IMAGES_URL` - URL to images.
- `$ pnpm i`.
- `$ pnpm run dev`.

## Run prod

- Provide same variables as for dev.
- `$ pnpm i`.
- `$ pnpm run build`.
- Publish to git, which will trigger Cloudflare Pages deployment.

## Tests

- `$ pnpm run test`.
