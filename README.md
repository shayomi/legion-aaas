# legion-aaas
# AAAS / Legion

AAAS is a hybrid repo-aware AI build agent.

- Local runtime scans a codebase, writes `legion.md`, maintains `primer.md`, and installs pack manifests in `.legion/packs/`.
- Hosted control plane manages projects, providers, packs, GitHub settings, and future team sync.

## Local quickstart

```bash
uv sync
cp .env.example .env
uv run agent.py /path/to/your/project
uv run chat.py
```

## Generated local artifacts

- `legion.md`
- `primer.md`
- `.legion/config.json`
- `.legion/sync.json`
- `.legion/packs/index.json`
- workflow docs like `brainstorm.md`, `prd.md`, `design_spec.md`, `technical_spec.md`, `build_e2e.md`, `github_issue.md`

## Web app

```bash
npm --prefix web install
npm --prefix web run dev
```

The hosted app lives in `web/` and is intended to become the AAAS control plane.
