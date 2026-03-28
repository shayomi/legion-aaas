import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TerminalDemo } from "./terminal-demo";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-primary/40 text-primary gap-1.5">
              <Sparkles className="h-3 w-3" />
              Open source · Free forever · Runs locally
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Your hybrid AI build agent.{" "}
              <span className="text-primary">Local runtime, hosted control plane</span>.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              AAAS plugs into any codebase, learns it, writes `legion.md`
              and `primer.md`, installs stack-specific packs, and lets teams
              manage providers, projects, and GitHub workflows from a hosted control plane.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/docs/getting-started"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/control-plane"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Explore Control Plane
              </Link>
              <Link
                href="https://github.com/shayomi/legion-aaas"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </Link>
            </div>

            <div className="flex gap-8 pt-4 border-t border-border">
              {[
                { label: "Artifacts", value: "2" },
                { label: "Pack catalog", value: "40+" },
                { label: "Providers", value: "4" },
                { label: "Setup time", value: "5 min" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-4">
            <TerminalDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
