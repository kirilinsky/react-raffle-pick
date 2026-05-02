# Contributing

Thanks for taking a look at `react-raffle-picker`.

## Setup

```bash
npm install
npm run build
npm test -- --run
```

## Useful Commands

```bash
npm run typecheck
npm run lint
npm run publint
npm run storybook
```

The demo app lives in `demo/`:

```bash
cd demo
npm install
npm run dev
```

## Pull Requests

- Keep changes focused and small.
- Add or update tests when behavior changes.
- Run build, tests, typecheck, lint, and publint before opening a PR.
- Do not commit generated local folders such as `node_modules`, `.next`, or `storybook-static`.

## Releases

Releases are automated via [Changesets](https://github.com/changesets/changesets) and published to npm using [Trusted Publishers (OIDC)](https://docs.npmjs.com/trusted-publishers).

For every PR with user-facing changes, add a changeset:

```bash
npx changeset
```

Pick the bump type (`patch` / `minor` / `major`) and write a one-line summary. The file lands in `.changeset/` — commit it with the PR.

On merge to `main`, the `Release` workflow:

1. Opens / updates a `chore: release packages` PR aggregating pending changesets and bumping `package.json` + `CHANGELOG.md`.
2. On merge of that PR, publishes to npm with provenance via the configured trusted publisher (no `NPM_TOKEN` required).

The [changeset-bot](https://github.com/apps/changeset-bot) GitHub App comments on PRs missing a changeset.
