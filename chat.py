"""
chat.py - Interactive chat with your project.
Run with: uv run chat.py

Ask anything about your project. The agent searches its memory
and answers using the LLM.

Type 'skills' to see what the agent knows.
Type 'quit' to exit.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel

load_dotenv()

from aaas import memory, llm, skills
from aaas.artifacts import LEGION_FILE, PRIMER_FILE
from aaas.packs import list_packs
from aaas.project_config import read_project_config
from aaas.providers import provider_ready

console = Console()


def chat_prompt(question: str, context_chunks: list[str]) -> str:
    context = (
        "\n\n---\n\n".join(context_chunks)
        if context_chunks
        else "No project loaded yet."
    )
    return f"""You are LEGION, an expert repo agent that knows this project inside out.
Answer the user's question using only the project context below.
Be specific, cite file names, and be honest if something is unclear.

Project context:
{context}

User question: {question}

Answer:"""


def main():
    console.print(
        Panel.fit(
            "[bold cyan]LEGION Chat[/bold cyan]\n"
            "[dim]Ask anything about your project.[/dim]\n"
            "[dim]Commands: 'skills' | 'packs' | 'quit'[/dim]",
            border_style="cyan",
        )
    )

    ready, message = provider_ready()
    if not ready:
        console.print(f"[red]{message}[/red]")
        sys.exit(1)

    skill_list = skills.list_skills()
    if skill_list:
        console.print(f"\n[green]Loaded skills:[/green] {', '.join(skill_list)}")
    else:
        console.print("[yellow]No skills yet. Run 'uv run agent.py .' first.[/yellow]")

    console.print()

    while True:
        try:
            question = console.input("[bold cyan]You:[/bold cyan] ").strip()
        except (KeyboardInterrupt, EOFError):
            console.print("\n[dim]Bye![/dim]")
            break

        if not question:
            continue

        if question.lower() == "quit":
            console.print("[dim]Bye![/dim]")
            break

        if question.lower() == "skills":
            skill_names = skills.list_skills()
            if not skill_names:
                console.print("[yellow]No skills yet.[/yellow]")
            else:
                for name in skill_names:
                    console.print(f"  [green]•[/green] {name}")
            continue

        if question.lower() == "packs":
            for pack in list_packs():
                console.print(
                    f"  [green]•[/green] {pack.name} ({pack.category}) - {pack.summary}"
                )
            continue

        # Search memory for relevant context
        chunks = memory.query(question, n=5)

        # Also include any existing skill files as context
        skill_context = []
        project_config = read_project_config()
        if project_config:
            skill_context.append(f"[Project Config]\n{project_config}")
        for artifact_name in (LEGION_FILE, PRIMER_FILE):
            artifact_path = Path(artifact_name)
            if artifact_path.exists():
                artifact_text = artifact_path.read_text(encoding="utf-8")
                skill_context.append(
                    f"[Artifact: {artifact_name}]\n{artifact_text[:2000]}"
                )
        for name in skills.list_skills():
            content = skills.read_skill(name)
            if content:
                skill_context.append(f"[Skill: {name}]\n{content[:1500]}")

        all_context = skill_context + chunks

        prompt = chat_prompt(question, all_context)

        console.print("\n[bold green]Agent:[/bold green] ", end="")
        response = ""
        for token in llm.ask_stream(prompt):
            console.print(token, end="", highlight=False)
            response += token
        console.print("\n")


if __name__ == "__main__":
    main()
