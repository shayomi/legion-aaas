import { FolderOpen, Sparkles, MessageSquare, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

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
    desc: "Files are chunked into memory. LEGION analyses the stack, writes legion.md, updates primer.md, and emits the local skill library.",
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
    title: "It installs packs & workflows",
    desc: "LEGION recommends packs like Next.js, Tailwind, Supabase, Neon, and GitHub workflows, then syncs local state with the hosted control plane.",
    color: "text-orange-400",
    border: "border-orange-400/30",
    bg: "bg-orange-400/5",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16" y="sm">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From zero to a repo-aware local agent plus hosted control plane in under 5 minutes.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-cyan-400/30 via-violet-400/30 via-emerald-400/30 to-orange-400/30" />

          {steps.map((step, i) => (
            <Reveal
              key={i}
              delayMs={i * 90}
              className={`relative flex flex-col gap-4 rounded-xl border ${step.border} ${step.bg} p-6 hover-lift sheen-surface`}
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
