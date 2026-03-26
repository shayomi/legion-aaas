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
from dotenv import load_dotenv
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown

load_dotenv()

from aaas import memory, llm, skills

console = Console()


def chat_prompt(question: str, context_chunks: list[str]) -> str:
    context = "\n\n---\n\n".join(context_chunks) if context_chunks else "No project loaded yet."
    return f"""You are AAAS, an expert agent that knows this project inside out.
Answer the user's question using only the project context below.
Be specific, cite file names, and be honest if something is unclear.

Project context:
{context}

User question: {question}

Answer:"""


def main():
    console.print(Panel.fit(
        "[bold cyan]AAAS Chat[/bold cyan]\n"
        "[dim]Ask anything about your project.[/dim]\n"
        "[dim]Commands: 'skills' | 'quit'[/dim]",
        border_style="cyan",
    ))

    if not llm.is_ollama_running():
        console.print("[red]Ollama is not running. Run 'ollama pull mistral' first.[/red]")
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

        # Search memory for relevant context
        chunks = memory.query(question, n=5)

        # Also include any existing skill files as context
        skill_context = []
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
