import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Configuration — LEGION Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

const envVars = [
  { key: "AI_PROVIDER", default: "ollama", desc: "Active provider adapter. Supported today: ollama, claude, opencode, openai-compatible." },
  { key: "OLLAMA_MODEL", default: "mistral", desc: "The Ollama model to use. Try llama3 for smarter analysis (slower)." },
  { key: "OLLAMA_BASE_URL", default: "http://localhost:11434", desc: "Ollama API URL. Change if running Ollama on a remote server." },
  { key: "CLAUDE_API_KEY", default: "—", desc: "Anthropic API key for Claude-backed runs." },
  { key: "OPENAI_API_KEY", default: "—", desc: "API key for OpenAI-compatible chat completions." },
  { key: "OPENAI_BASE_URL", default: "—", desc: "Base URL for any OpenAI-compatible provider." },
  { key: "AAAS_PACKS", default: "auto", desc: "Comma-separated pack aliases to install instead of automatic recommendations." },
  { key: "AAAS_SYNC_MODE", default: "hybrid", desc: "Controls whether the repo expects hybrid SaaS sync metadata." },
  { key: "AAAS_CLOUD_URL", default: "—", desc: "Hosted LEGION control plane URL." },
  { key: "AAAS_PROJECT_ID", default: "—", desc: "Cloud project identifier used for sync." },
  { key: "AAAS_WORKSPACE_ID", default: "—", desc: "Cloud workspace identifier used for sync." },
  { key: "GITHUB_TOKEN", default: "—", desc: "Personal access token. Scopes: repo, workflow. Required for GitHub features." },
  { key: "GITHUB_REPO", default: "—", desc: "Your repo in owner/repo format. E.g. acme/my-app" },
];

export default function ConfigurationPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Configuration</Badge>
        <h1 className="text-4xl font-bold mb-3">Configuration</h1>
        <p className="text-lg text-muted-foreground">
          All configuration lives in a <code className="bg-muted px-1.5 py-0.5 rounded text-sm">.env</code> file.
          Copy the template and fill in your values.
        </p>
      </div>

      <Code>{`cp .env.example .env`}</Code>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-4 py-3 font-semibold">Variable</th>
              <th className="text-left px-4 py-3 font-semibold">Default</th>
              <th className="text-left px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {envVars.map((v, i) => (
              <tr key={v.key} className={i < envVars.length - 1 ? "border-b border-border" : ""}>
                <td className="px-4 py-3 font-mono text-cyan-400 text-xs">{v.key}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{v.default}</td>
                <td className="px-4 py-3 text-muted-foreground">{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 border-b border-border pb-3">Full .env.example</h2>
        <Code>{`# LEGION runtime settings

# Provider selection
AI_PROVIDER=ollama

# Ollama (runs locally, no API key needed)
OLLAMA_MODEL=mistral
OLLAMA_BASE_URL=http://localhost:11434

# Hosted providers
CLAUDE_API_KEY=
OPENAI_API_KEY=
OPENAI_BASE_URL=

# Optional: force pack installation instead of auto-detect
AAAS_PACKS=nextjs,react,tailwind,shadcn

# Hybrid sync
AAAS_SYNC_MODE=hybrid
AAAS_CLOUD_URL=https://your-aaas-app.vercel.app
AAAS_PROJECT_ID=
AAAS_WORKSPACE_ID=

# GitHub (optional — needed for GitHub integration)
# Get token at: github.com/settings/tokens
# Scopes: repo, workflow, project
GITHUB_TOKEN=
GITHUB_REPO=owner/repo-name`}</Code>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 border-b border-border pb-3">Generated local state</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Every run now writes repo-owned artifacts and local sync contracts.
        </p>
        <Code>{`legion.md
primer.md
.legion/config.json
.legion/sync.json
.legion/packs/index.json
.legion/packs/*.md`}</Code>
      </div>
    </article>
  );
}
