import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Control Plane — LEGION",
};

const sections = [
  {
    title: "Projects",
    body: "Connect repos, inspect generated artifacts, and track which provider and packs each project uses.",
  },
  {
    title: "Providers",
    body: "Choose Claude, OpenCode, Ollama, or any OpenAI-compatible backend per project.",
  },
  {
    title: "Packs",
    body: "Enable curated packs for React, Next.js, Tailwind, shadcn, Supabase, Neon, auth, payments, and more.",
  },
  {
    title: "GitHub",
    body: "Store GitHub repo metadata, issue workflow defaults, and future repo automation settings.",
  },
  {
    title: "Swarm",
    body: "Generate app analysis, regression plans, and multi-agent browser test presets for full-web QA.",
  },
];

export default function ControlPlanePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4">
        <Badge variant="outline" className="border-primary/30 text-primary">
          Hybrid Control Plane
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">LEGION control plane starter</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          This hosted surface is where users will authenticate, connect repos, manage providers,
          enable packs, and sync configuration down to the local LEGION runtime.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title} className="border-border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{section.body}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <h2 className="mb-2 text-xl font-semibold">What ships from here</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- Auth and workspace management</li>
          <li>- Project records with provider and pack selections</li>
          <li>- GitHub connection state and issue generation defaults</li>
          <li>- Cloud sync metadata that writes into `.legion/sync.json` locally</li>
        </ul>
        <div className="mt-4 flex gap-4 text-sm">
          <Link href="/docs/getting-started" className="text-primary hover:underline">
            Read setup docs
          </Link>
          <Link href="/docs/control-plane" className="text-primary hover:underline">
            Control plane docs
          </Link>
        </div>
      </div>
    </main>
  );
}
