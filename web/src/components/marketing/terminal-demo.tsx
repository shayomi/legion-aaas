"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINES = [
  { text: "$ uv run agent.py ./my-startup", type: "cmd" },
  { text: "", type: "blank" },
  { text: "╭─ AAAS — Agent as a Service ──────────╮", type: "border" },
  { text: "│  Reads your project. Writes skills.  │", type: "border" },
  { text: "╰──────────────────────────────────────╯", type: "border" },
  { text: "", type: "blank" },
  { text: "Project: /home/user/my-startup", type: "info" },
  { text: "", type: "blank" },
  { text: "✓ Ollama is running", type: "success" },
  { text: "1/4  Reading project files...", type: "step" },
  { text: "     42 files read | 128,440 chars", type: "dim" },
  { text: "2/4  Storing in vector memory...", type: "step" },
  { text: "     847 chunks stored", type: "dim" },
  { text: "3/4  Asking LLM to analyse project...", type: "step" },
  { text: "     Thinking...", type: "dim" },
  { text: "4/4  Writing skill file...", type: "step" },
  { text: "     ✓ Written to skills/system-overview.md", type: "success" },
  { text: "", type: "blank" },
  { text: "  Gaps found:  4 issues  →  creating GitHub issues...", type: "warn" },
  { text: "  ✓ Issue #12: Missing auth middleware", type: "success" },
  { text: "  ✓ Issue #13: No test coverage on /api/payments", type: "success" },
  { text: "  ✓ Issue #14: README is outdated", type: "success" },
  { text: "  ✓ Issue #15: Rate limiting not implemented", type: "success" },
  { text: "", type: "blank" },
  { text: "Done! Open skills/system-overview.md", type: "done" },
];

const lineClass: Record<string, string> = {
  cmd: "text-cyan-400 font-bold",
  border: "text-cyan-500/60",
  info: "text-slate-300",
  success: "text-emerald-400",
  step: "text-cyan-300",
  dim: "text-slate-500",
  warn: "text-amber-400",
  done: "text-emerald-300 font-semibold",
  blank: "h-2",
};

export function TerminalDemo() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) return;
    const delay = LINES[visible].type === "blank" ? 80 : LINES[visible].type === "dim" ? 200 : 350;
    const timer = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className="relative rounded-xl border border-border bg-[#0d0d0d] glow-cyan overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">terminal</span>
      </div>

      {/* Terminal output */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[400px]">
        {LINES.slice(0, visible).map((line, i) => (
          <div key={i} className={cn(lineClass[line.type] || "text-foreground")}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visible < LINES.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 cursor-blink ml-0.5" />
        )}
      </div>
    </div>
  );
}
