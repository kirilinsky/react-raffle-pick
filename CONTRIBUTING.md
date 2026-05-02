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

Releases are published to npm from the root package. Keep `package.json`,
`package-lock.json`, README examples, and Storybook stories in sync before
publishing.
