"""
providers.py - Multi-provider chat adapters for LEGION.
"""

from __future__ import annotations

import json
import os
import shutil
import subprocess
from dataclasses import dataclass

import requests


@dataclass(frozen=True)
class ProviderConfig:
    name: str
    model: str


def current_provider() -> ProviderConfig:
    name = os.getenv("AI_PROVIDER", "ollama")
    defaults = {
        "ollama": os.getenv("OLLAMA_MODEL", "mistral"),
        "claude": os.getenv("CLAUDE_MODEL", "claude-3-5-sonnet-latest"),
        "opencode": os.getenv("OPENCODE_MODEL", ""),
        "openai-compatible": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
    }
    return ProviderConfig(name=name, model=defaults.get(name, ""))


def list_supported_providers() -> list[str]:
    return ["ollama", "claude", "opencode", "openai-compatible"]


def provider_help_text() -> str:
    provider = current_provider()
    return (
        f"Configured provider: {provider.name}. Supported providers: "
        f"{', '.join(list_supported_providers())}."
    )


def provider_ready() -> tuple[bool, str]:
    provider = current_provider()

    if provider.name == "ollama":
        base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        try:
            response = requests.get(f"{base_url}/api/tags", timeout=3)
        except Exception:
            return (
                False,
                "Ollama is not running. Install it and run `ollama pull mistral`.",
            )
        if response.status_code != 200:
            return False, f"Ollama is reachable but returned {response.status_code}."
        return True, "Ollama is running"

    if provider.name == "claude":
        if not os.getenv("CLAUDE_API_KEY"):
            return False, "CLAUDE_API_KEY is missing."
        return True, "Claude API key detected"

    if provider.name == "opencode":
        if not shutil.which("opencode"):
            return False, "OpenCode CLI is not installed or not on PATH."
        return True, "OpenCode CLI detected"

    if provider.name == "openai-compatible":
        if not os.getenv("OPENAI_API_KEY"):
            return False, "OPENAI_API_KEY is missing."
        if not os.getenv("OPENAI_BASE_URL"):
            return False, "OPENAI_BASE_URL is missing."
        return True, "OpenAI-compatible API configuration detected"

    return False, f"Unsupported provider '{provider.name}'."


def ask(prompt: str) -> str:
    provider = current_provider()

    if provider.name == "ollama":
        import ollama as _ollama

        response = _ollama.chat(
            model=provider.model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response["message"]["content"]

    if provider.name == "claude":
        return _ask_claude(prompt, provider.model)

    if provider.name == "opencode":
        return _ask_opencode(prompt, provider.model)

    if provider.name == "openai-compatible":
        return _ask_openai_compatible(prompt, provider.model)

    return f"[ERROR] Unsupported provider '{provider.name}'. {provider_help_text()}"


def ask_stream(prompt: str):
    response = ask(prompt)
    yield response


def _ask_claude(prompt: str, model: str) -> str:
    api_key = os.getenv("CLAUDE_API_KEY", "")
    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        timeout=120,
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json={
            "model": model,
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    response.raise_for_status()
    payload = response.json()
    content = payload.get("content", [])
    text_blocks = [
        block.get("text", "") for block in content if block.get("type") == "text"
    ]
    return "\n".join(text_blocks).strip()


def _ask_openai_compatible(prompt: str, model: str) -> str:
    base_url = os.getenv("OPENAI_BASE_URL", "").rstrip("/")
    api_key = os.getenv("OPENAI_API_KEY", "")
    response = requests.post(
        f"{base_url}/chat/completions",
        timeout=120,
        headers={
            "authorization": f"Bearer {api_key}",
            "content-type": "application/json",
        },
        json={
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    response.raise_for_status()
    payload = response.json()
    return payload["choices"][0]["message"]["content"].strip()


def _ask_opencode(prompt: str, model: str) -> str:
    command = ["opencode", "run", prompt, "--format", "json"]
    if model:
        command.extend(["--model", model])

    completed = subprocess.run(
        command,
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode != 0:
        stderr = completed.stderr.strip() or completed.stdout.strip()
        return f"[ERROR] OpenCode failed: {stderr}"

    lines = [line.strip() for line in completed.stdout.splitlines() if line.strip()]
    for line in reversed(lines):
        try:
            payload = json.loads(line)
        except json.JSONDecodeError:
            continue
        if isinstance(payload, dict):
            if isinstance(payload.get("message"), dict):
                content = payload["message"].get("content")
                if isinstance(content, str) and content.strip():
                    return content.strip()
            if isinstance(payload.get("content"), str) and payload["content"].strip():
                return payload["content"].strip()

    return completed.stdout.strip() or "[ERROR] OpenCode returned no usable output."
