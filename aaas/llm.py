"""
llm.py - LLM wrapper.
Uses Ollama locally. Falls back gracefully if Ollama isn't running.
"""

import os
import requests


MODEL = os.getenv("OLLAMA_MODEL", "mistral")
BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")


def is_ollama_running() -> bool:
    try:
        r = requests.get(f"{BASE_URL}/api/tags", timeout=3)
        return r.status_code == 200
    except Exception:
        return False


def ask(prompt: str, model: str = MODEL) -> str:
    """
    Send a prompt to Ollama and return the response text.
    Streams tokens and collects the full response.
    """
    if not is_ollama_running():
        return (
            "[ERROR] Ollama is not running.\n"
            "Please install it from https://ollama.com and run:\n"
            "  ollama pull mistral"
        )

    import ollama as _ollama

    response = _ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return response["message"]["content"]


def ask_stream(prompt: str, model: str = MODEL):
    """
    Generator that streams tokens from Ollama.
    Yields string chunks.
    """
    if not is_ollama_running():
        yield "[ERROR] Ollama is not running. Install from https://ollama.com"
        return

    import ollama as _ollama

    stream = _ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    for chunk in stream:
        yield chunk["message"]["content"]
