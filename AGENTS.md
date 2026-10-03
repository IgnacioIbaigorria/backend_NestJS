# AGENTS.md

## Project

NestJS 12 backend (ESM, TypeScript strict). Single-package repo — no monorepo.

## Commands

```bash
npm install --legacy-peer-deps   # required: npm 10.9.2 arborist bug breaks plain `npm install`
npm run start:dev                 # watch mode
npm run build                     # outputs to dist/ (deleteOutDir: true)
npm run lint                      # oxlint (not ESLint)
npm run format                    # prettier --write
npm run test                      # vitest run (unit: *.spec.ts)
npm run test:e2e                  # vitest with vitest.config.e2e.ts (*.e2e-spec.ts)
npm run test:cov                  # coverage
```

Run `lint -> build -> test` before considering work done.

## Architecture

- Entry point: `src/main.ts` — bootstraps `AppModule`, listens on `PORT` env (default 3000)
- `src/app.module.ts` is the composition root; register modules/providers here
- `nest-cli.json` sets `sourceRoot: "src"` and `deleteOutDir: true` (clean dist on every build)

## Tool Use & Execution Constraints

- **Fail-Fast & Pivot (Anti-Loop)**: Never invoke the same tool with identical or slightly tweaked arguments if it fails or returns no results. Pivot immediately to an alternative strategy instead of retrying.
- **Search Tool Fallbacks**:
  - If a search tool (`grep_search`, symbol lookup, regex) fails or returns zero matches, do NOT loop through query variations.
  - Immediately fall back to:
    1. Structural exploration (`list_dir`, navigating folders).
    2. Direct inspection (`view_file` on known entry points, index files, modules).
    3. Terminal utilities via `run_command` (PowerShell `Select-String`, `Get-ChildItem -Recurse`).
- **General Tool Failure Fallbacks**:
  - If a specialized tool or MCP tool fails, immediately fall back to standard shell commands (`npm`, `git`, PowerShell).
  - If a file modification tool fails (e.g., matching error), read the exact lines with `view_file` before attempting a single correction.
- **Two-Strategy Limit & Early Exit**:
  - If two distinct strategies fail to accomplish the current step, stop immediately.
  - Explain to the user what was attempted, what failed, and ask for guidance rather than continuing in an autonomous loop.
- **No Speculative Tool Searching**: Never cycle through tool discovery or speculative searches. Use known CLI commands directly.


## Conventions

- **ESM imports use `.js` extension**: `import { Foo } from './foo.js'` — required by `nodenext` module resolution
- **Vitest, not Jest** — test files are `*.spec.ts` (unit) and `*.e2e-spec.ts` (e2e, in `test/`)
- **oxlint, not ESLint** — config in `oxlint.json`; `no-explicit-any` is off, `no-floating-promises` is warn
- **Prettier**: single quotes, trailing commas (see `.prettierrc`)
- **TypeScript**: `strict: true` but `strictPropertyInitialization: false` (NestJS DI pattern)
- **tsconfig.build.json** excludes `test/`, `dist/`, and `**/*spec.ts` from production builds

## Gotchas

- `npm install` fails on this machine without `--legacy-peer-deps` (npm 10.9.2 arborist bug with vitest peer deps)
- `nest build` deletes `dist/` on every run (`deleteOutDir: true`)
