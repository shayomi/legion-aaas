"""
skills.py - LEGION skill catalog output and markdown helpers.
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from aaas.skill_library import SkillEntry, list_skill_library


SKILLS_DIR = "skills"
LEGION_SKILLS_DIR = ".legion/skills"


def _skills_paths(root: str | Path = ".") -> list[Path]:
    root_path = Path(root)
    return [root_path / SKILLS_DIR, root_path / LEGION_SKILLS_DIR]


def list_skills(root: str | Path = ".") -> list[str]:
    names: set[str] = set()
    for skills_path in _skills_paths(root):
        if not skills_path.exists():
            continue
        for file_path in skills_path.glob("*.md"):
            names.add(file_path.stem)
    return sorted(names)


def read_skill(name: str, root: str | Path = ".") -> str | None:
    for skills_path in _skills_paths(root):
        path = skills_path / f"{name}.md"
        if path.exists():
            return path.read_text(encoding="utf-8")
    return None


def write_skill(name: str, content: str, root: str | Path = ".") -> list[Path]:
    written: list[Path] = []
    for skills_path in _skills_paths(root):
        skills_path.mkdir(parents=True, exist_ok=True)
        path = skills_path / f"{name}.md"
        path.write_text(content, encoding="utf-8")
        written.append(path)
    return written


def _skill_content(entry: SkillEntry) -> str:
    today = datetime.now().strftime("%Y-%m-%d")
    aliases = ", ".join(entry.aliases) if entry.aliases else "none"
    return f"""# Skill: {entry.name}
_Last updated: {today}_

## Category
- {entry.category}

## Aliases
- {aliases}

## Use when
- You want LEGION to help with `{entry.name}`.
- The project stack, workflow, or product plan needs coverage in this area.

## What it covers
- {entry.summary}
- Scaffolding, implementation hints, configuration expectations, and validation reminders.

## Expected outputs
- Repo-aware guidance
- Repeatable implementation patterns
- Follow-up tasks and verification checkpoints

## Notes
- This skill is part of the generated LEGION local skill library.
- The hosted control plane can later enable, disable, or prioritize this skill per project.
"""


def install_skill_library(root: str | Path = ".") -> list[Path]:
    root_path = Path(root)
    created: list[Path] = []
    entries = list_skill_library()

    for entry in entries:
        created.extend(write_skill(entry.name, _skill_content(entry), root_path))

    for skills_path in _skills_paths(root_path):
        index = {
            "updated_at": datetime.now().isoformat(timespec="seconds"),
            "count": len(entries),
            "skills": [
                {
                    "name": entry.name,
                    "aliases": list(entry.aliases),
                    "category": entry.category,
                    "summary": entry.summary,
                }
                for entry in entries
            ],
        }
        index_path = skills_path / "index.json"
        index_path.write_text(json.dumps(index, indent=2), encoding="utf-8")
        created.append(index_path)

    return created


def build_task_skill_prompt(task_description: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    today = datetime.now().strftime("%Y-%m-%d")
    return f"""You are a senior engineer. Based on the project context below, write a skill file for this task.

Task: {task_description}

# Skill: {task_description}
_Last updated: {today}_

## Goal
## Steps to implement
## Files to change
## Tests needed
## Definition of done
## Related skills

---

Project context:
{context}

Write the skill file now."""
