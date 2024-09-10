# Opus Classical

With TypeScript, Svelte, and Bun.

[![CI](https://github.com/Droidion/opus-classical-svelte/actions/workflows/ci.yml/badge.svg)](https://github.com/Droidion/opus-classical-svelte/actions/workflows/ci.yml)

## Run dev

- Have [Bun](https://bun.sh/) installed.
- Have [Taskfile](https://taskfile.dev/) installed.
- Create `.env` file with variables:
  - `DATABASE_URL` - PostgreSQL connection string.
  - `PUBLIC_IMAGES_URL` - URL to images.
  - `PUBLIC_SENTRY_DSN` - Sentry DSN.
- `$ bun i`.
- `$ task dev`.

## Run prod

- Provide same variables as for dev.
- `$ bun i`.
- `$ bun run build`.
- `$ bun ./build/index.js`.

## Tests

- `$ bun test`.
