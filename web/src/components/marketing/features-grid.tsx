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
    title: "Skills system",
    desc: "Every insight is a markdown skill file. The agent reads, writes, and chains skills — so knowledge compounds over time.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: GitBranch,
    title: "Deep GitHub integration",
    desc: "Creates issues from backlog analysis, manages Kanban boards, triggers Actions, reviews PRs — all automatically.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
  {
    icon: Cpu,
    title: "Runs 100% locally",
    desc: "Powered by Ollama + Mistral on your own machine. No OpenAI API key. No cloud fees. No data leaving your network.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Workflow,
    title: "n8n automation workflows",
    desc: "Visual drag-and-drop automations connect the agent to any service — Slack, email, webhooks, databases, and more.",
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
    title: "Self-improving loops",
    desc: "Every task it runs teaches it something new. Skills build on each other — the longer it runs, the smarter it gets.",
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
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything your team needs.{" "}
            <span className="text-primary">Nothing you don&apos;t.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for SMEs that want the power of a full DevOps team
            without the headcount. All open source, all local, all free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative group rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-200"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
