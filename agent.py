"""
agent.py - AAAS main entry point.
Run with:  uv run agent.py [path/to/your/project]

What it does:
  1. Reads your project files
  2. Stores them in local vector memory
  3. Detects recommended AAAS packs
  4. Asks the LLM to generate legion.md
  5. Updates primer.md and starter workflow docs
  6. Optionally pushes backlog items to GitHub issues
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
from aaas.artifacts import build_legion_prompt, update_primer, write_legion
from aaas.packs import detect_recommended_packs, install_packs, resolve_pack_names
from aaas.project_config import write_project_config, write_sync_model
from aaas.providers import provider_ready
from aaas.workflows import ensure_workflow_docs

console = Console()


def selected_packs_from_env(
    recommended_packs: list[str],
) -> tuple[list[str], list[str]]:
    raw = os.getenv("AAAS_PACKS", "").strip()
    if not raw:
        return recommended_packs, []

    requested = [item.strip() for item in raw.split(",") if item.strip()]
    selected, unknown = resolve_pack_names(requested)
    return (selected or recommended_packs), unknown


def header():
    console.print(
        Panel.fit(
            "[bold cyan]AAAS — Agent as a Service[/bold cyan]\n"
            "[dim]Reads your project. Writes skills. Keeps it going.[/dim]",
            border_style="cyan",
        )
    )


def check_ollama():
    ready, message = provider_ready()

    if not ready:
        console.print(
            Panel(
                f"[bold red]Provider is not ready![/bold red]\n\n{message}",
                title="Setup needed",
                border_style="red",
            )
        )
        sys.exit(1)
    console.print(f"[green]✓ {message}[/green]")


def run(project_folder: str, push_to_github: bool = False):
    header()
    check_ollama()

    project_root = Path(project_folder).resolve()
    console.print(f"\n[bold]Project:[/bold] {project_root}\n")

    # --- Step 1: Read project files ---
    console.print("[cyan]1/5  Reading project files...[/cyan]")
    project_data = reader.read_project(project_folder)
    console.print(f"     [dim]{project_data['summary']}[/dim]")

    if not project_data["files"]:
        console.print("[red]No readable files found. Check the folder path.[/red]")
        sys.exit(1)

    # --- Step 2: Store in memory ---
    console.print("[cyan]2/5  Storing in vector memory...[/cyan]")
    n_chunks = memory.store_project(project_data["files"])
    console.print(f"     [dim]{n_chunks} chunks stored[/dim]")

    # --- Step 3: Detect recommended packs ---
    console.print("[cyan]3/5  Detecting recommended packs...[/cyan]")
    recommended_packs = detect_recommended_packs(project_data["files"])
    if recommended_packs:
        console.print(f"     [dim]{', '.join(recommended_packs)}[/dim]")
    else:
        console.print("     [dim]No strong pack matches yet[/dim]")

    selected_packs, unknown_requested = selected_packs_from_env(recommended_packs)
    if selected_packs:
        console.print(f"     [dim]Selected packs: {', '.join(selected_packs)}[/dim]")
    if unknown_requested:
        console.print(
            f"     [yellow]Unknown pack aliases ignored:[/yellow] {', '.join(unknown_requested)}"
        )

    # --- Step 4: Ask LLM to analyse ---
    console.print(
        "[cyan]4/5  Asking LLM to generate legion.md (this takes ~30s)...[/cyan]"
    )
    project_text = reader.format_for_llm(project_data)
    prompt = build_legion_prompt(
        project_text=project_text,
        project_summary=project_data["summary"],
        recommended_packs=recommended_packs,
    )

    legion_content = ""
    with console.status("[bold green]Thinking...[/bold green]"):
        legion_content = llm.ask(prompt)

    # --- Step 5: Write artifacts ---
    console.print("[cyan]5/5  Writing AAAS artifacts...[/cyan]")
    installed_pack_paths, unknown_installed = install_packs(
        project_root, selected_packs
    )
    config_path = write_project_config(project_root, selected_packs)
    sync_path = write_sync_model(project_root)
    legion_path = write_legion(project_root, legion_content)
    workflow_paths = ensure_workflow_docs(project_root)
    primer_path = update_primer(
        project_root,
        project_summary=project_data["summary"],
        recommended_packs=selected_packs,
        generated_paths=[
            str(config_path.relative_to(project_root)),
            str(sync_path.relative_to(project_root)),
            legion_path.name,
            *(
                path.relative_to(project_root).as_posix()
                for path in installed_pack_paths
            ),
            *(path.name for path in workflow_paths),
        ],
    )
    console.print(
        f"     [green]✓ Wrote {config_path.relative_to(project_root)}[/green]"
    )
    console.print(f"     [green]✓ Wrote {sync_path.relative_to(project_root)}[/green]")
    console.print(f"     [green]✓ Written {legion_path.name}[/green]")
    console.print(f"     [green]✓ Updated {primer_path.name}[/green]")
    if installed_pack_paths:
        console.print(
            "     [green]✓ Installed pack registry:[/green] "
            f"{', '.join(path.relative_to(project_root).as_posix() for path in installed_pack_paths)}"
        )
    if workflow_paths:
        console.print(
            "     [green]✓ Created workflow docs:[/green] "
            f"{', '.join(path.name for path in workflow_paths)}"
        )
    if unknown_installed:
        console.print(
            f"     [yellow]Unknown packs skipped during install:[/yellow] {', '.join(unknown_installed)}"
        )

    # --- Show result ---
    console.print("\n")
    console.print(
        Panel(
            Markdown(
                legion_content[:3000]
                + ("\n\n...[truncated]" if len(legion_content) > 3000 else "")
            ),
            title="[bold]Legion preview[/bold]",
            border_style="green",
        )
    )

    # --- Optional: push backlog to GitHub ---
    if push_to_github:
        push_backlog_to_github(legion_content)

    console.print(
        f"\n[bold green]Done! Open [cyan]{legion_path}[/cyan] and [cyan]{primer_path}[/cyan].[/bold green]"
    )
    console.print(
        "[dim]Next: run 'uv run chat.py' to ask questions about your project.[/dim]\n"
    )


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
            console.print(
                f"  [green]✓ Issue #{issue['number']}:[/green] {issue['title']}"
            )
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
