# Agent Instructions

## Scope
- This file applies to `/Users/sayoadegoroye/Desktop/legion-AAAS`.
- No repository-root `AGENTS.md` existed before this file.
- No Cursor rules were found in `.cursor/rules/` or `.cursorrules`.
- No Copilot rules were found in `.github/copilot-instructions.md`.

## Project Layout
- `aaas/` - Python package for memory, reader, LLM, GitHub, and skill helpers.
- `agent.py` - main CLI entry point that reads a repo and writes skills.
- `chat.py` - interactive CLI chat over stored project context.
- `main.py` - trivial hello-world entry point; not the main product surface.
- `skills/` - generated markdown skills; treat as output unless the task is skill editing.
- `.aaas_memory/` - local Chroma persistence; generated state, do not hand-edit.
- `web/` - Next.js 14 marketing/docs app.

## Package Managers
- Python uses `uv` at repo root because `pyproject.toml` and `uv.lock` are present.
- Frontend uses `npm` in `web/` because `web/package-lock.json` and `web/vercel.json` are present.
- Do not mix package managers inside the same subproject.

## Setup Commands
```bash
# Python dependencies
uv sync

# Frontend dependencies
npm --prefix web install
```

## Run Commands
```bash
# Run the AAAS CLI against the current repo
uv run agent.py .

# Run the AAAS CLI against another folder
uv run agent.py /path/to/project

# Run the interactive chat UI
uv run chat.py

# Run the simple root entry point
uv run python main.py

# Start the Next.js app
npm --prefix web run dev
```

## Build Commands
```bash
# Build the Next.js app
npm --prefix web run build

# Production server for the Next.js app
npm --prefix web run start
```

## Lint And Validation Commands
```bash
# Web typecheck (project-wide)
npx --prefix web tsc -p web/tsconfig.json --noEmit

# Python syntax validation for touched files
uv run python -m py_compile agent.py chat.py main.py aaas/*.py

# Python bytecode validation for the package
uv run python -m compileall aaas
```

## Lint Status
- `web/package.json` includes `npm --prefix web run lint`, but no ESLint config is committed yet.
- Running the web lint script currently opens the interactive Next.js ESLint bootstrap prompt.
- Do not rely on `next lint` in unattended automation until an ESLint config is added to the repo.

## Test Commands
- There is no committed automated test suite yet for either Python or the Next.js app.
- There is no configured Jest, Vitest, Playwright, or pytest test command in the current codebase.
- If you add tests in a change, add the runner in the same change and document the exact command here.

## Single-Test Guidance
- Python: no `pytest` config exists yet; if you introduce pytest, use `uv run pytest tests/test_file.py::test_name`.
- Frontend: no JS test runner exists yet; there is currently no supported single-test command.
- Prefer Python syntax checks and web typechecks when a real test runner is unavailable.

## File-Scoped Command Summary
| Task | Command |
| --- | --- |
| Python syntax check | `uv run python -m py_compile aaas/reader.py` |
| Python package compile | `uv run python -m compileall aaas` |
| Web typecheck | `npx --prefix web tsc -p web/tsconfig.json --noEmit` |
| Web lint | `npm --prefix web run lint` (interactive setup today) |
| Future single Python test | `uv run pytest tests/test_file.py::test_name` |

## Python Style
- Keep module docstrings; existing Python files use short top-level docstrings to explain purpose.
- Use 4-space indentation and snake_case for functions, variables, and module names.
- Use UPPER_SNAKE_CASE for module-level constants like `MODEL`, `BASE_URL`, and `MEMORY_DIR`.
- Keep public function signatures typed; existing Python code uses built-in generics like `list[str]` and unions like `str | None`.
- Prefer `Path` operations over manual path string handling when working with files.
- Use guard clauses and return early for invalid state.
- Keep CLI output user-facing and actionable; current scripts print clear setup steps instead of raw tracebacks.

## Python Imports
- Group imports in this order: standard library, third-party, local package imports.
- Prefer one import per line unless the names are tightly related.
- Avoid late imports unless they prevent expensive optional imports or circular dependencies.
- Match the surrounding file when editing older modules that already have a slightly different import layout.

## Python Error Handling
- Catch broad exceptions only at I/O or external-service boundaries.
- If you catch `Exception`, either recover locally or return a clear fallback message.
- Fail fast for missing environment variables; `_get_repo()` is the model to follow.
- Do not silently swallow errors unless the operation is explicitly best-effort.
- Prefer explicit user-readable failure messages for Ollama, GitHub, filesystem, and vector-store setup problems.

## TypeScript And React Style
- `web/tsconfig.json` has `strict: true`; keep new code fully typed.
- Use PascalCase for React components and component files.
- Use camelCase for helpers, hooks, local variables, and props objects.
- Use `import type` for type-only imports when practical.
- Prefer the `@/` alias for local imports from `web/src/`.
- Reuse existing utilities like `cn()` from `web/src/lib/utils.ts` instead of duplicating class merging logic.
- Reuse CVA variant patterns for shared UI components when extending `web/src/components/ui/`.
- Add `"use client"` only when a file actually needs client-only React features.

## TypeScript Imports And Formatting
- Put framework and package imports before local `@/` imports.
- Keep imports flat; avoid deep relative paths when the alias works.
- Formatting is currently mixed across `web/src/` (some files use semicolons, some do not).
- When editing an existing file, match its local semicolon and formatting style instead of reformatting unrelated lines.
- For new files, prefer the more recent style already visible in `web/src/app/layout.tsx`: typed imports, semicolons, and double quotes.

## Naming Conventions
- Python modules: lowercase, underscores only.
- Python functions and variables: snake_case.
- React components: PascalCase.
- React props interfaces/types: `ComponentNameProps`.
- Constants: UPPER_SNAKE_CASE in Python, `const` camelCase in TypeScript unless exported as a true constant set.
- Route files in Next.js must keep framework names like `page.tsx`, `layout.tsx`, and `route.ts`.

## State, Data, And Boundaries
- Keep environment lookups at boundaries, not scattered through business logic.
- Treat `.aaas_memory/` and `skills/` as generated data stores.
- Do not hardcode secrets; use `.env` and `load_dotenv()` patterns already present in the CLI entry points.
- Keep network-bound code isolated; `aaas/github_tools.py` and `aaas/llm.py` are the current boundary modules.

## Editing Rules For Agents
- Prefer minimal edits that match existing structure.
- Do not mass-reformat Python or TypeScript files unless the task is explicitly formatting.
- Preserve user-facing CLI copy unless the task is to change wording.
- Keep generated artifacts, caches, and local memory stores out of commits unless the user explicitly asks.
- If you add a new tool, test runner, or linter, update this file with the exact command.

## Test Placement If Added
- Python tests should go under a new top-level `tests/` directory and use `test_*.py` names.
- Frontend tests should be colocated as `*.test.tsx` or in `__tests__/` under `web/src/`.
- Add only one testing pattern per subproject; do not mix multiple runners without a strong reason.

## Commit Attribution
AI commits should include a co-author trailer when the workflow or user requests a commit:
```text
Co-Authored-By: OpenCode gpt-5.4 <noreply@example.com>
```
