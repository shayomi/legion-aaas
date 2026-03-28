"""
llm.py - Provider-aware LLM wrapper.
"""

from aaas.providers import (
    ask,
    ask_stream,
    list_supported_providers,
    provider_help_text,
    provider_ready,
)


def is_ollama_running() -> bool:
    ready, _ = provider_ready()
    return ready
