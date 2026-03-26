"""
reader.py - Reads a project folder and extracts all meaningful content.
Supports code, docs, configs, and more.
"""

from pathlib import Path

# File types we read
READABLE_EXTENSIONS = {
    # Code
    ".py", ".js", ".ts", ".jsx", ".tsx", ".rb", ".go", ".rs", ".java",
    ".c", ".cpp", ".h", ".cs", ".php", ".swift", ".kt",
    # Web
    ".html", ".css", ".scss", ".vue", ".svelte",
    # Data / Config
    ".json", ".yaml", ".yml", ".toml", ".ini", ".env.example",
    # Docs
    ".md", ".mdx", ".txt", ".rst",
    # Shell
    ".sh", ".bash", ".zsh",
    # DB
    ".sql",
}

# Folders to always skip
SKIP_FOLDERS = {
    ".git", "node_modules", "__pycache__", ".venv", "venv", "env",
    "dist", "build", ".next", ".nuxt", "coverage", ".aaas_memory",
    "skills",  # don't re-read our own output
}


def read_project(folder: str, max_chars: int = 80_000) -> dict:
    """
    Walk a project folder and return structured content.

    Returns:
        {
            "files": [{"path": str, "content": str}, ...],
            "summary": str,  # quick stats
            "total_chars": int,
        }
    """
    root = Path(folder).resolve()
    files = []
    total = 0

    for path in sorted(root.rglob("*")):
        # Skip unwanted folders
        if any(skip in path.parts for skip in SKIP_FOLDERS):
            continue
        if not path.is_file():
            continue
        if path.suffix.lower() not in READABLE_EXTENSIONS:
            continue

        try:
            content = path.read_text(encoding="utf-8", errors="ignore").strip()
            if not content:
                continue

            rel_path = str(path.relative_to(root))
            files.append({"path": rel_path, "content": content})
            total += len(content)

            # Stop if we've hit the char limit
            if total >= max_chars:
                files.append({"path": "...", "content": f"[truncated — {max_chars} char limit reached]"})
                break

        except Exception:
            continue

    summary = (
        f"{len(files)} files read | "
        f"{total:,} characters | "
        f"Root: {root}"
    )

    return {"files": files, "summary": summary, "total_chars": total}


def format_for_llm(project_data: dict, max_chars: int = 12_000) -> str:
    """
    Turn project data into a single string the LLM can read.
    Trims to max_chars to stay inside context windows.
    """
    lines = []
    chars = 0

    for f in project_data["files"]:
        block = f"### {f['path']}\n```\n{f['content']}\n```\n"
        if chars + len(block) > max_chars:
            lines.append(f"### ... (more files omitted, hit {max_chars} char limit)")
            break
        lines.append(block)
        chars += len(block)

    return "\n".join(lines)
