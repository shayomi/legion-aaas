"""
project_config.py - Project-local AAAS configuration.
"""

from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path

from aaas.providers import current_provider, list_supported_providers


LEGION_DIR = ".legion"
CONFIG_FILE = "config.json"
SYNC_FILE = "sync.json"


def write_project_config(root: str | Path, recommended_packs: list[str]) -> Path:
    root_path = Path(root)
    legion_dir = root_path / LEGION_DIR
    legion_dir.mkdir(exist_ok=True)

    provider = current_provider()
    path = legion_dir / CONFIG_FILE
    payload = {
        "updated_at": datetime.now().isoformat(timespec="seconds"),
        "provider": {
            "name": provider.name,
            "model": provider.model,
        },
        "github": {
            "enabled": bool(os.getenv("GITHUB_REPO")),
            "repository": os.getenv("GITHUB_REPO", ""),
            "issue_workflow_file": "github_issue.md",
        },
        "artifacts": {
            "legion": "legion.md",
            "primer": "primer.md",
            "workflow_docs": [
                "brainstorm.md",
                "prd.md",
                "design_spec.md",
                "technical_spec.md",
                "build_e2e.md",
                "github_issue.md",
            ],
        },
        "recommended_packs": recommended_packs,
        "selected_packs": recommended_packs,
        "supported_providers": list_supported_providers(),
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return path


def write_sync_model(root: str | Path) -> Path:
    root_path = Path(root)
    legion_dir = root_path / LEGION_DIR
    legion_dir.mkdir(exist_ok=True)

    path = legion_dir / SYNC_FILE
    payload = {
        "updated_at": datetime.now().isoformat(timespec="seconds"),
        "mode": os.getenv("AAAS_SYNC_MODE", "hybrid"),
        "cloud": {
            "base_url": os.getenv("AAAS_CLOUD_URL", ""),
            "project_id": os.getenv("AAAS_PROJECT_ID", ""),
            "workspace_id": os.getenv("AAAS_WORKSPACE_ID", ""),
        },
        "sync_targets": ["project-config", "packs", "run-history", "github"],
        "notes": [
            "Local runtime owns repo artifacts.",
            "Hosted SaaS owns project config, providers, and pack selection.",
        ],
    }
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return path


def read_project_config(root: str | Path = ".") -> dict | None:
    path = Path(root) / LEGION_DIR / CONFIG_FILE
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))
