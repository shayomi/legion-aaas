import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Configuration — AAAS Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

const envVars = [
  { key: "OLLAMA_MODEL", default: "mistral", desc: "The Ollama model to use. Try llama3 for smarter analysis (slower)." },
  { key: "OLLAMA_BASE_URL", default: "http://localhost:11434", desc: "Ollama API URL. Change if running Ollama on a remote server." },
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
        <Code>{`# AAAS - Agent as a Service

# Ollama (runs locally, no API key needed)
OLLAMA_MODEL=mistral
OLLAMA_BASE_URL=http://localhost:11434

# GitHub (optional — needed for GitHub integration)
# Get token at: github.com/settings/tokens
# Scopes: repo, workflow, project
GITHUB_TOKEN=
GITHUB_REPO=owner/repo-name`}</Code>
      </div>
    </article>
  );
}
