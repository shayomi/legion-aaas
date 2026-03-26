import { Badge } from "@/components/ui/badge";

export const metadata = { title: "GitHub Integration — AAAS Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function Callout({ type = "info", children }: { type?: "info" | "warn" | "tip"; children: React.ReactNode }) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-300",
    warn: "border-amber-500/30 bg-amber-500/5 text-amber-300",
    tip: "border-emerald-500/30 bg-emerald-500/5 text-emerald-300",
  };
  return <div className={`rounded-lg border p-4 text-sm ${styles[type]}`}>{children}</div>;
}

export default function GithubIntegrationPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">Live</Badge>
        <h1 className="text-4xl font-bold mb-3">🐙 GitHub Integration</h1>
        <p className="text-lg text-muted-foreground">
          AAAS connects deeply to GitHub — creating issues, managing project boards,
          triggering Actions, and tracking your entire sprint lifecycle.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Setup</h2>

        <p className="text-sm text-muted-foreground">Get a personal access token:</p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Go to <a href="https://github.com/settings/tokens" target="_blank" className="text-primary hover:underline">github.com/settings/tokens</a></li>
          <li>Click &ldquo;Generate new token (classic)&rdquo;</li>
          <li>Select scopes: <code className="bg-muted px-1 py-0.5 rounded text-xs">repo</code>, <code className="bg-muted px-1 py-0.5 rounded text-xs">workflow</code>, <code className="bg-muted px-1 py-0.5 rounded text-xs">project</code></li>
          <li>Copy the token</li>
        </ol>

        <Code>{`# Copy config template
cp .env.example .env

# Edit .env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=owner/repo-name`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">What it does automatically</h2>

        <div className="grid gap-4">
          {[
            {
              title: "Creates issues from backlog",
              desc: "After analysing your project, every gap and suggested task becomes a GitHub issue with the aaas-generated label.",
              code: "uv run agent.py /your/project --github",
            },
            {
              title: "Lists open issues",
              desc: "Query your repo's issues from the chat interface.",
              code: `# In chat.py
You: what are our open issues?
Agent: Found 12 open issues...`,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
              <Code>{item.code}</Code>
            </div>
          ))}
        </div>

        <Callout type="tip">
          Issues created by AAAS are labelled <code className="bg-muted/50 px-1 py-0.5 rounded">aaas-generated</code> and <code className="bg-muted/50 px-1 py-0.5 rounded">backlog</code> so your team can filter them easily.
        </Callout>
      </div>
    </article>
  );
}
