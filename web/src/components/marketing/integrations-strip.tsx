const integrations = [
  { name: "GitHub", emoji: "🐙" },
  { name: "Slack", emoji: "💬" },
  { name: "Google Meet", emoji: "📹" },
  { name: "Discord", emoji: "🎮" },
  { name: "GitHub Actions", emoji: "⚡" },
  { name: "Google Calendar", emoji: "📅" },
  { name: "n8n", emoji: "🔗" },
  { name: "Jira", emoji: "🗂️" },
  { name: "Linear", emoji: "📐" },
  { name: "Notion", emoji: "📝" },
  { name: "Vercel", emoji: "▲" },
  { name: "Railway", emoji: "🚂" },
  { name: "Docker", emoji: "🐳" },
  { name: "ChromaDB", emoji: "🧠" },
  { name: "Ollama", emoji: "🦙" },
  { name: "Gmail", emoji: "📧" },
];

const doubled = [...integrations, ...integrations];

export function IntegrationsStrip() {
  return (
    <section className="py-20 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Connects to your whole organisation
        </h2>
        <p className="text-muted-foreground">
          Integrations for every part of your workflow — more being added weekly.
        </p>
      </div>

      {/* Row 1 */}
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-marquee">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium whitespace-nowrap"
            >
              <span className="text-lg">{item.emoji}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (reversed, offset) */}
      <div className="relative flex overflow-hidden mt-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-marquee-slow">
          {[...doubled].reverse().map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium whitespace-nowrap opacity-60"
            >
              <span className="text-lg">{item.emoji}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
