import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Integrations — AAAS Docs" };

const integrations = [
  {
    href: "/docs/integrations/github",
    emoji: "🐙",
    title: "GitHub",
    desc: "Issues, PRs, Kanban boards, GitHub Actions. The full workflow.",
    status: "live",
  },
  {
    href: "/docs/integrations/slack",
    emoji: "💬",
    title: "Slack",
    desc: "Post agent summaries to channels. Receive task notifications.",
    status: "soon",
  },
  {
    href: "/docs/integrations/google-meet",
    emoji: "📹",
    title: "Google Meet",
    desc: "Meeting summaries, action items as issues, calendar scheduling.",
    status: "soon",
  },
  {
    href: "/docs/integrations/cicd",
    emoji: "⚡",
    title: "CI/CD",
    desc: "Trigger GitHub Actions, monitor builds, auto-fix failing tests.",
    status: "soon",
  },
];

export default function IntegrationsPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Integrations</Badge>
        <h1 className="text-4xl font-bold mb-3">Connect your organisation</h1>
        <p className="text-lg text-muted-foreground">
          AAAS connects to every tool your team uses. GitHub is live now.
          Slack, Google Meet, and CI/CD are shipping next.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {integrations.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all"
          >
            {i.status === "soon" && (
              <span className="absolute top-4 right-4 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                soon
              </span>
            )}
            <div className="text-3xl mb-3">{i.emoji}</div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{i.title}</h3>
            <p className="text-sm text-muted-foreground">{i.desc}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
