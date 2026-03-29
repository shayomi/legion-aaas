import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Discord Integration — LEGION Docs" };

export default function DiscordPage() {
  return (
    <article className="space-y-6">
      <div>
        <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-400">
          Coming Soon
        </Badge>
        <h1 className="mb-3 text-4xl font-bold">Discord Integration</h1>
        <p className="text-lg text-muted-foreground">
          LEGION will support Discord notifications, slash-command triggers, team task routing,
          and shared project updates for engineering communities.
        </p>
      </div>
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-amber-300">
        This route exists now so the docs nav works correctly. The actual Discord automation
        implementation is still planned.
      </div>
    </article>
  );
}
