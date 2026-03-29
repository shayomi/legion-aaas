import { Badge } from "@/components/ui/badge";
export const metadata = { title: "Google Meet Integration — LEGION Docs" };
export default function GoogleMeetPage() {
  return (
    <article className="space-y-6">
      <div>
        <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-400">Coming Soon</Badge>
        <h1 className="text-4xl font-bold mb-3">📹 Google Meet Integration</h1>
        <p className="text-lg text-muted-foreground">
          Automatic meeting summaries, action items as GitHub issues, sprint planning from standup notes,
          and Calendar scheduling for the agent to join recurring meetings.
        </p>
      </div>
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 text-amber-300 text-sm">
        <strong>Want this faster?</strong> Star the repo and open an issue — demand drives priority.
      </div>
    </article>
  );
}
