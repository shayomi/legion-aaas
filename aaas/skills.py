"""
skills.py - Reads and writes skill files (markdown).
Skills are how the agent stores what it knows about your system.
"""

from pathlib import Path
from datetime import datetime

SKILLS_DIR = "skills"


def list_skills() -> list[str]:
    """Return names of all existing skill files."""
    skills_path = Path(SKILLS_DIR)
    if not skills_path.exists():
        return []
    return [f.stem for f in sorted(skills_path.glob("*.md"))]


def read_skill(name: str) -> str | None:
    """Read a skill file by name (without .md extension)."""
    path = Path(SKILLS_DIR) / f"{name}.md"
    if path.exists():
        return path.read_text(encoding="utf-8")
    return None


def write_skill(name: str, content: str) -> Path:
    """Write a skill file. Creates the skills/ dir if needed."""
    skills_path = Path(SKILLS_DIR)
    skills_path.mkdir(exist_ok=True)
    path = skills_path / f"{name}.md"
    path.write_text(content, encoding="utf-8")
    return path


def build_system_overview_prompt(project_text: str) -> str:
    today = datetime.now().strftime("%Y-%m-%d")
    return f"""You are an expert software analyst. Read the project files below and write a skill file in markdown.

The skill file must have these exact sections:

# Skill: System Overview
_Last updated: {today}_

## What this project does
(plain English, 2-3 sentences)

## Tech stack
(bullet list)

## Key files
(table: File | What it does)

## Gaps & problems identified
(bullet list — be honest, include missing tests, missing docs, security issues, etc.)

## Backlog (suggested next tasks)
(numbered list, ordered by priority)

## Automation opportunities
(bullet list — what could be automated or improved with an agent)

---

Project files:
{project_text}

Write the skill file now. Be specific and honest. Do not invent things not in the files."""


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
