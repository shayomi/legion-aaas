import { FolderOpen, Sparkles, MessageSquare, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FolderOpen,
    title: "Point it at your project",
    desc: "Run one command. The agent walks your codebase, reading every file it can find.",
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/5",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "It reads & learns",
    desc: "Files are chunked into semantic memory. The LLM analyses your stack, finds gaps, writes a skill file.",
    color: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Ask it anything",
    desc: "Chat with your project. Ask about architecture, bugs, how to add features — grounded in real code.",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
  },
  {
    number: "04",
    icon: Zap,
    title: "It automates tasks",
    desc: "Creates GitHub issues, plans sprints, connects integrations, and writes new skills to keep going.",
    color: "text-orange-400",
    border: "border-orange-400/30",
    bg: "bg-orange-400/5",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From zero to a fully operational AI agent in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-cyan-400/30 via-violet-400/30 via-emerald-400/30 to-orange-400/30" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col gap-4 rounded-xl border ${step.border} ${step.bg} p-6`}
            >
              <div className="flex items-center justify-between">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${step.border} bg-background`}>
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <span className={`text-4xl font-black opacity-10 ${step.color}`}>
                  {step.number}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
