"""
agent.py - AAAS main entry point.
Run with:  uv run agent.py [path/to/your/project]

What it does:
  1. Reads your project files
  2. Stores them in local vector memory (ChromaDB)
  3. Asks the LLM to analyse the project
  4. Writes a skill file summarising everything it learned
  5. Optionally pushes the backlog to GitHub issues
"""

import sys
import os
from pathlib import Path
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown
from rich.progress import track

load_dotenv()

from aaas import reader, memory, skills, llm

console = Console()


def header():
    console.print(Panel.fit(
        "[bold cyan]AAAS — Agent as a Service[/bold cyan]\n"
        "[dim]Reads your project. Writes skills. Keeps it going.[/dim]",
        border_style="cyan",
    ))


def check_ollama():
    from aaas.llm import is_ollama_running
    if not is_ollama_running():
        console.print(Panel(
            "[bold red]Ollama is not running![/bold red]\n\n"
            "1. Download from [link=https://ollama.com]https://ollama.com[/link]\n"
            "2. Install it (it's just an app)\n"
            "3. Open a terminal and run: [bold]ollama pull mistral[/bold]\n"
            "4. Then run this agent again.",
            title="Setup needed",
            border_style="red",
        ))
        sys.exit(1)
    console.print("[green]✓ Ollama is running[/green]")


def run(project_folder: str, push_to_github: bool = False):
    header()
    check_ollama()

    console.print(f"\n[bold]Project:[/bold] {Path(project_folder).resolve()}\n")

    # --- Step 1: Read project files ---
    console.print("[cyan]1/4  Reading project files...[/cyan]")
    project_data = reader.read_project(project_folder)
    console.print(f"     [dim]{project_data['summary']}[/dim]")

    if not project_data["files"]:
        console.print("[red]No readable files found. Check the folder path.[/red]")
        sys.exit(1)

    # --- Step 2: Store in memory ---
    console.print("[cyan]2/4  Storing in vector memory (ChromaDB)...[/cyan]")
    n_chunks = memory.store_project(project_data["files"])
    console.print(f"     [dim]{n_chunks} chunks stored[/dim]")

    # --- Step 3: Ask LLM to analyse ---
    console.print("[cyan]3/4  Asking LLM to analyse project (this takes ~30s)...[/cyan]")
    project_text = reader.format_for_llm(project_data)
    prompt = skills.build_system_overview_prompt(project_text)

    skill_content = ""
    with console.status("[bold green]Thinking...[/bold green]"):
        skill_content = llm.ask(prompt)

    # --- Step 4: Write skill file ---
    console.print("[cyan]4/4  Writing skill file...[/cyan]")
    path = skills.write_skill("system-overview", skill_content)
    console.print(f"     [green]✓ Written to {path}[/green]")

    # --- Show result ---
    console.print("\n")
    console.print(Panel(
        Markdown(skill_content[:3000] + ("\n\n...[truncated]" if len(skill_content) > 3000 else "")),
        title="[bold]What the agent learned[/bold]",
        border_style="green",
    ))

    # --- Optional: push backlog to GitHub ---
    if push_to_github:
        push_backlog_to_github(skill_content)

    console.print(f"\n[bold green]Done! Open [cyan]{path}[/cyan] to see the full skill.[/bold green]")
    console.print("[dim]Next: run 'uv run chat.py' to ask questions about your project.[/dim]\n")


def push_backlog_to_github(skill_content: str):
    """Extract backlog items from the skill and create GitHub issues."""
    from aaas import github_tools

    console.print("\n[cyan]Pushing backlog to GitHub...[/cyan]")
    try:
        # Extract backlog section
        lines = skill_content.split("\n")
        in_backlog = False
        items = []
        for line in lines:
            if "## Backlog" in line or "## backlog" in line.lower():
                in_backlog = True
                continue
            if in_backlog:
                if line.startswith("## "):  # next section
                    break
                cleaned = line.strip().lstrip("0123456789.-) ").strip()
                if cleaned:
                    items.append(cleaned)

        if not items:
            console.print("[yellow]No backlog items found in skill file.[/yellow]")
            return

        console.print(f"  Found {len(items)} backlog items. Creating issues...")
        created = github_tools.create_issues_from_backlog(items)
        for issue in created:
            console.print(f"  [green]✓ Issue #{issue['number']}:[/green] {issue['title']}")
            console.print(f"    {issue['url']}")

    except ValueError as e:
        console.print(f"[yellow]GitHub not configured: {e}[/yellow]")
    except Exception as e:
        console.print(f"[red]GitHub error: {e}[/red]")


if __name__ == "__main__":
    folder = "."
    push_gh = False

    args = sys.argv[1:]
    for arg in args:
        if arg == "--github":
            push_gh = True
        else:
            folder = arg

    run(folder, push_to_github=push_gh)
