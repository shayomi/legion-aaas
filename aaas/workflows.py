"""
workflows.py - Starter workflow document generators for AAAS.
"""

from pathlib import Path


WORKFLOW_TEMPLATES = {
    "brainstorm.md": "# Brainstorm\n\n## Problem\n- Describe the user problem.\n\n## Constraints\n- Technical\n- Product\n- Delivery\n\n## Ideas\n- Option 1\n- Option 2\n- Option 3\n\n## Recommended Direction\n- Choose one option and explain why.\n",
    "prd.md": "# Product Requirements Document\n\n## Goal\n- What should this feature accomplish?\n\n## Users\n- Who is this for?\n\n## Requirements\n- Functional\n- Non-functional\n\n## Acceptance Criteria\n- Criterion 1\n- Criterion 2\n",
    "design_spec.md": "# Design Spec\n\n## User Experience\n- Primary flow\n- Edge cases\n\n## Components\n- New components\n- Updated components\n\n## States\n- Loading\n- Empty\n- Error\n- Success\n",
    "technical_spec.md": "# Technical Spec\n\n## Scope\n- Systems touched\n\n## Architecture\n- Services\n- Data flow\n\n## Implementation Plan\n- Step 1\n- Step 2\n- Step 3\n\n## Verification\n- Tests\n- Manual checks\n",
    "build_e2e.md": "# Build E2E\n\n## Objective\n- End-to-end outcome to ship\n\n## Workstreams\n- Backend\n- Frontend\n- Infra\n- QA\n\n## Completion Checklist\n- [ ] Feature works\n- [ ] Validation passes\n- [ ] Docs updated\n",
    "github_issue.md": "# GitHub Issue Draft\n\n## Summary\n- What is broken or needed?\n\n## Context\n- Why this matters\n\n## Acceptance Criteria\n- [ ] Criterion 1\n- [ ] Criterion 2\n\n## Notes\n- Links, screenshots, repo details\n",
}


def ensure_workflow_docs(root: str | Path) -> list[Path]:
    root_path = Path(root)
    created: list[Path] = []
    for filename, content in WORKFLOW_TEMPLATES.items():
        path = root_path / filename
        if path.exists():
            continue
        path.write_text(content, encoding="utf-8")
        created.append(path)
    return created
