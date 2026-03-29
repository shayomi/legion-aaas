"""
swarm.py - LEGION Swarm artifact generation for web app testing.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class SwarmRoute:
    path: str
    source: str


def detect_routes(files: list[dict]) -> list[SwarmRoute]:
    routes: list[SwarmRoute] = []
    for file_data in files:
        path = file_data["path"]
        if not path.endswith("page.tsx"):
            continue
        if "/app/" not in path and not path.startswith("web/src/app/"):
            continue

        route = path
        route = route.replace("web/src/app", "")
        route = route.replace("/page.tsx", "")
        parts = [part for part in route.split("/") if part and not part.startswith("(")]
        normalized = "/" + "/".join(parts)
        if normalized == "/":
            normalized = "/"
        routes.append(SwarmRoute(path=normalized, source=path))

    deduped: dict[str, SwarmRoute] = {}
    for route in routes:
        deduped[route.path] = route
    return [deduped[key] for key in sorted(deduped.keys())]


def _has_any(text: str, needles: list[str]) -> bool:
    lowered = text.lower()
    return any(needle in lowered for needle in needles)


def infer_capabilities(files: list[dict]) -> dict[str, bool]:
    corpus = "\n".join(f["content"][:2500] for f in files).lower()
    return {
        "auth": _has_any(
            corpus,
            ["login", "signup", "signin", "auth", "clerk", "nextauth", "supabase auth"],
        ),
        "payments": _has_any(
            corpus,
            ["stripe", "checkout", "subscription", "billing", "lemonsqueezy", "paypal"],
        ),
        "forms": _has_any(corpus, ["form", "react-hook-form", "zod", "submit"]),
        "crud": _has_any(
            corpus, ["create", "update", "delete", "edit", "list", "table"]
        ),
        "search": _has_any(
            corpus, ["search", "filter", "query", "meilisearch", "typesense"]
        ),
        "admin": _has_any(corpus, ["admin", "dashboard", "settings", "manage"]),
    }


def write_swarm_artifacts(root: str | Path, files: list[dict]) -> list[Path]:
    root_path = Path(root)
    swarm_dir = root_path / ".legion" / "swarm"
    specs_dir = swarm_dir / "specs"
    runs_dir = swarm_dir / "runs"
    specs_dir.mkdir(parents=True, exist_ok=True)
    runs_dir.mkdir(parents=True, exist_ok=True)

    routes = detect_routes(files)
    capabilities = infer_capabilities(files)
    created: list[Path] = []

    app_analysis = swarm_dir / "app_analysis.md"
    app_analysis.write_text(_build_app_analysis(routes, capabilities), encoding="utf-8")
    created.append(app_analysis)

    test_map = swarm_dir / "test_map.md"
    test_map.write_text(_build_test_map(routes, capabilities), encoding="utf-8")
    created.append(test_map)

    regression_plan = swarm_dir / "regression_plan.md"
    regression_plan.write_text(
        _build_regression_plan(routes, capabilities), encoding="utf-8"
    )
    created.append(regression_plan)

    test_data_plan = swarm_dir / "test_data_plan.md"
    test_data_plan.write_text(_build_test_data_plan(capabilities), encoding="utf-8")
    created.append(test_data_plan)

    swarm_matrix = swarm_dir / "swarm_matrix.json"
    swarm_matrix.write_text(
        json.dumps(_build_swarm_matrix(routes, capabilities), indent=2),
        encoding="utf-8",
    )
    created.append(swarm_matrix)

    smoke_spec = specs_dir / "smoke.spec.ts"
    smoke_spec.write_text(_build_smoke_spec(routes), encoding="utf-8")
    created.append(smoke_spec)

    if capabilities["auth"]:
        auth_spec = specs_dir / "auth.spec.ts"
        auth_spec.write_text(_build_auth_spec(), encoding="utf-8")
        created.append(auth_spec)

    report_stub = runs_dir / "README.md"
    report_stub.write_text(
        "# LEGION Swarm Runs\n\nRun reports, traces, screenshots, and grouped failures land here.\n",
        encoding="utf-8",
    )
    created.append(report_stub)

    return created


def _build_app_analysis(routes: list[SwarmRoute], capabilities: dict[str, bool]) -> str:
    route_lines = (
        "\n".join(f"- `{route.path}` from `{route.source}`" for route in routes)
        or "- No route pages detected"
    )
    capability_lines = "\n".join(
        f"- {name}: {'yes' if enabled else 'no'}"
        for name, enabled in capabilities.items()
    )
    return f"""# LEGION Swarm App Analysis

## Strategy
- Hybrid analysis: source code inspection plus future live-browser exploration.

## Detected routes
{route_lines}

## Capability signals
{capability_lines}

## Notes
- Use this file as the source-of-truth summary before generating or running swarm tests.
"""


def _build_test_map(routes: list[SwarmRoute], capabilities: dict[str, bool]) -> str:
    lines = [
        "# LEGION Swarm Test Map",
        "",
        "## Core journeys",
        "- Homepage renders without critical UI failures",
        "- Docs and navigation links remain functional",
    ]
    if capabilities["auth"]:
        lines.extend(
            [
                "- Authentication flow: signup, login, logout, protected routes",
                "- Session recovery and invalid-credential handling",
            ]
        )
    if capabilities["payments"]:
        lines.append("- Checkout and billing flow with failure-state coverage")
    if capabilities["crud"]:
        lines.append(
            "- CRUD flow for key entities with create/edit/delete/list assertions"
        )
    if capabilities["forms"]:
        lines.append("- Form validation, error states, and submission feedback")
    if capabilities["search"]:
        lines.append("- Search/filter interactions and result-state assertions")
    lines.extend(
        [
            "",
            "## Route smoke coverage",
            *(
                f"- Visit `{route.path}` and confirm a usable shell renders"
                for route in routes
            ),
        ]
    )
    return "\n".join(lines) + "\n"


def _build_regression_plan(
    routes: list[SwarmRoute], capabilities: dict[str, bool]
) -> str:
    return f"""# LEGION Swarm Regression Plan

## Smoke suite
- Route rendering for {len(routes)} detected routes
- Navigation between primary surfaces
- Client-side hydration sanity

## Release suite
- Auth: {"required" if capabilities["auth"] else "not detected"}
- Payments: {"required" if capabilities["payments"] else "not detected"}
- CRUD: {"required" if capabilities["crud"] else "not detected"}
- Forms: {"required" if capabilities["forms"] else "not detected"}

## Swarm execution defaults
- Environment: local or staging only
- Browsers: chromium first, extend later to firefox and webkit
- Devices: desktop plus one mobile profile
- Accounts: generated test identities only

## Exit criteria
- No critical failures in smoke suite
- No blocker failures in release suite
- High-severity issues converted into GitHub issue drafts
"""


def _build_test_data_plan(capabilities: dict[str, bool]) -> str:
    auth_line = (
        "- Use 20-100 seeded auth identities for signup/login/logout coverage"
        if capabilities["auth"]
        else "- Auth-specific data not required unless custom auth is added later"
    )
    return f"""# LEGION Swarm Test Data Plan

## Identity strategy
{auth_line}
- Use deterministic emails like `legion+run001@example.test`
- Use isolated browser contexts per worker

## Cleanup
- Prefer a dedicated staging or local environment
- Delete or archive generated entities after swarm runs when possible

## Mail and OTP
- Start with fake identities only
- Add Mailosaur or MailSlurp later if inbox verification is required
"""


def _build_swarm_matrix(
    routes: list[SwarmRoute], capabilities: dict[str, bool]
) -> dict:
    return {
        "strategy": "hybrid",
        "targets": {
            "routes": [route.path for route in routes],
            "capabilities": capabilities,
        },
        "presets": {
            "smoke": {
                "workers": 4,
                "browsers": ["chromium"],
                "devices": ["desktop"],
            },
            "full-web": {
                "workers": 12,
                "browsers": ["chromium", "firefox"],
                "devices": ["desktop", "mobile"],
            },
            "auth": {
                "enabled": capabilities["auth"],
                "workers": 20,
                "accounts": 20,
            },
        },
        "safety": {
            "default_environment": "local-or-staging",
            "block_production_by_default": True,
        },
    }


def _build_smoke_spec(routes: list[SwarmRoute]) -> str:
    checks: list[str] = []
    for route in routes[:10]:
        escaped = route.path.replace("/", r"\/")
        checks.append(
            f"  await page.goto('{route.path}');\n"
            f"  await expect(page).toHaveURL(/.*{escaped}$/);"
        )

    route_checks = (
        "\n".join(checks)
        or "  await page.goto('/');\n  await expect(page).toHaveURL(/\/$/);"
    )
    return f"""import {{ test, expect }} from '@playwright/test';

test.describe('LEGION Swarm smoke', () => {{
  test('visits critical routes', async ({{ page }}) => {{
{route_checks}
  }});
}});
"""


def _build_auth_spec() -> str:
    return """import { test, expect } from '@playwright/test';

test.describe('LEGION Swarm auth preset', () => {
  test('captures auth flow scaffold', async ({ page }) => {
    await page.goto('/');
    // Replace selectors and routes with app-specific auth steps.
    await expect(page).toBeTruthy();
  });
});
"""
