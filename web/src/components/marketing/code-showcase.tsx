"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

const tabs = [
  {
    id: "install",
    label: "Install",
    lang: "bash",
    code: `# 1. Install Ollama (download from ollama.com)
ollama pull mistral

# 2. Clone AAAS
git clone https://github.com/yourusername/aaas
cd aaas

# 3. Install Python deps (uv handles everything)
curl -Lsf https://astral.sh/uv/install.sh | sh
uv sync`,
  },
  {
    id: "learn",
    label: "Learn a project",
    lang: "bash",
    code: `# Point the agent at any project folder
uv run agent.py /path/to/your/project

# It will:
#  ✓ Read all files (code, docs, configs)
#  ✓ Store in local vector memory
#  ✓ Write skills/system-overview.md

# With GitHub integration (add token to .env first)
uv run agent.py /path/to/project --github
#  ✓ Creates issues from backlog analysis
#  ✓ Adds to Kanban board`,
  },
  {
    id: "chat",
    label: "Chat",
    lang: "bash",
    code: `uv run chat.py

# AAAS Chat
# Commands: 'skills' | 'quit'
# Loaded skills: system-overview

You: what's broken in this project?

Agent: Based on the analysis, I found 4 gaps:

1. Missing rate limiting on /api/auth — brute force risk
2. No error boundaries in React components
3. Database migrations not tracked (no Alembic setup)
4. CORS allows all origins in production

GitHub issues #12-#15 have been created for these.`,
  },
  {
    id: "skill",
    label: "Skill file",
    lang: "markdown",
    code: `# Skill: System Overview
_Last updated: 2025-03-26_

## What this project does
A SaaS invoicing app built with Next.js and FastAPI.
Users create invoices, send via email, and track payments.

## Tech stack
- Frontend: Next.js 14, Tailwind, shadcn/ui
- Backend: FastAPI, PostgreSQL, Redis
- Auth: Clerk

## Gaps & problems identified
- No rate limiting on auth endpoints
- Missing test coverage on payment flow
- README is 6 months out of date

## Backlog (suggested next tasks)
1. Add rate limiting middleware
2. Write tests for /api/payments
3. Update README with new env vars`,
  },
];

export function CodeShowcase() {
  const [active, setActive] = useState("install");
  const [copied, setCopied] = useState(false);

  const current = tabs.find((t) => t.id === active)!;

  const copy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple to use. Powerful to own.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One command to start. No config files, no dashboards, no lock-in.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-[#0d0d0d] overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center gap-0 border-b border-border bg-muted/30 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                  active === tab.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
            <div className="ml-auto pr-3">
              <button
                onClick={copy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Code */}
          <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-slate-300 border-0 rounded-none">
            <code>{current.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
