"""
swarm.py - Generate LEGION Swarm artifacts for a target web app project.
Run with: uv run swarm.py [path/to/project]
"""

import sys
from pathlib import Path

from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel

from aaas import reader
from aaas.swarm import write_swarm_artifacts

load_dotenv()

console = Console()


def main() -> None:
    project_folder = sys.argv[1] if len(sys.argv) > 1 else "."
    project_root = Path(project_folder).resolve()

    console.print(
        Panel.fit(
            "[bold cyan]LEGION Swarm[/bold cyan]\n"
            "[dim]Analyze web flows. Generate regression artifacts. Prepare agent swarms.[/dim]",
            border_style="cyan",
        )
    )
    console.print(f"\n[bold]Project:[/bold] {project_root}\n")

    project_data = reader.read_project(str(project_root))
    if not project_data["files"]:
        console.print("[red]No readable files found.[/red]")
        raise SystemExit(1)

    created = write_swarm_artifacts(project_root, project_data["files"])
    console.print(f"[green]Generated {len(created)} swarm artifacts.[/green]")
    for path in created:
        console.print(f"  [green]•[/green] {path.relative_to(project_root)}")


if __name__ == "__main__":
    main()
