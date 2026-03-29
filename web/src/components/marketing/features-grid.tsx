import {
  BookOpen,
  Brain,
  FileCode2,
  GitBranch,
  Cpu,
  Workflow,
  MessageSquare,
  Calendar,
  Kanban,
  ShieldCheck,
  Repeat2,
  Puzzle,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const features = [
  {
    icon: BookOpen,
    title: "Reads your entire codebase",
    desc: "Point it at any project folder. It reads every file — code, configs, docs — and builds a complete picture of your system.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Brain,
    title: "Semantic vector memory",
    desc: "Stores your project in ChromaDB so it can answer 'what does this do?' without re-reading everything, every time.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: FileCode2,
    title: "Repo-owned artifacts",
    desc: "LEGION writes legion.md for architecture intelligence and primer.md for rolling operational memory directly into the repo.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: GitBranch,
    title: "Deep GitHub integration",
    desc: "Creates issue drafts, stores repo config in .legion/config.json, and prepares future workflow automation and SaaS sync.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Cpu,
    title: "Provider-flexible runtime",
    desc: "Start with Ollama locally today, then switch per project to Claude, OpenCode, or OpenAI-compatible providers as LEGION grows.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Workflow,
    title: "150+ skills + workflow docs",
    desc: "LEGION emits a broad local skill library covering CI/CD, workflows, n8n, Zapier, Framer, Remotion, charts, auth, testing, databases, and more.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: MessageSquare,
    title: "Chat with your project",
    desc: "Ask 'what's broken?', 'how do I add auth?', 'summarise last week's changes' — and get answers grounded in your code.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Calendar,
    title: "Google Meet & Calendar",
    desc: "Schedule standups, create meeting summaries, assign action items as GitHub issues — automatically after each meeting.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    soon: true,
  },
  {
    icon: Kanban,
    title: "Sprint & project planning",
    desc: "Analyses your backlog, suggests sprint scope, creates milestones, and tracks velocity — no PM required.",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    soon: true,
  },
  {
    icon: ShieldCheck,
    title: "Security gap detection",
    desc: "Identifies missing auth, exposed secrets, lack of rate limiting, and open issues — before they become incidents.",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: Repeat2,
    title: "Hybrid memory sync",
    desc: "The repo keeps local artifacts while the hosted control plane will manage projects, providers, packs, run history, and shared team context.",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
  },
  {
    icon: Puzzle,
    title: "Pluggable into anything",
    desc: "Simple API endpoint: POST /learn with your project. Get back a fully configured agent that knows your system.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    soon: true,
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16" y="sm">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything your team needs.{" "}
            <span className="text-primary">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for teams that want a local-first agent with a real hosted control plane,
            not just a one-shot CLI script.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, index) => (
            <Reveal
              key={f.title}
              delayMs={index * 45}
              className="relative group rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover-lift sheen-surface"
            >
              {f.soon && (
                <span className="absolute top-4 right-4 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                  soon
                </span>
              )}
              <div className={`inline-flex p-2 rounded-lg ${f.bg} mb-4`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
