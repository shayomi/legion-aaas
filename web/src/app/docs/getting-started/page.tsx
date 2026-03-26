import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Getting Started — AAAS Docs",
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 pb-8 border-b border-border last:border-0 last:pb-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mt-0.5">
        {n}
      </div>
      <div className="flex-1 space-y-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        {children}
      </div>
    </div>
  );
}

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
  return (
    <div className={`rounded-lg border p-4 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <article className="prose-invert max-w-none space-y-2">
      <div className="mb-8">
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Getting Started</Badge>
        <h1 className="text-4xl font-bold mb-3">Install AAAS in 5 minutes</h1>
        <p className="text-lg text-muted-foreground">
          From zero to a running AI agent that understands your codebase,
          finds gaps, and creates GitHub issues automatically.
        </p>
      </div>

      <Callout type="info">
        <strong>Prerequisites:</strong> macOS, Linux, or Windows (WSL2). That&apos;s it. Everything else is installed below.
      </Callout>

      <div className="space-y-6 pt-4">
        <Step n={1} title="Install Ollama">
          <p className="text-muted-foreground text-sm">
            Ollama runs the AI model locally on your machine. No API keys, no cloud costs.
          </p>
          <p className="text-sm text-muted-foreground">
            Download from <a href="https://ollama.com" target="_blank" className="text-primary hover:underline">ollama.com</a> — it installs like any normal app.
          </p>
          <p className="text-sm text-muted-foreground">Then open a terminal and pull the model:</p>
          <Code>{`ollama pull mistral`}</Code>
          <Callout type="tip">
            This downloads Mistral 7B (~4GB). It runs entirely on your machine — no data ever leaves your network.
          </Callout>
        </Step>

        <Step n={2} title="Install uv (Python manager)">
          <p className="text-sm text-muted-foreground">
            uv replaces pip + virtualenv. One command, everything handled.
          </p>
          <Code>{`# macOS / Linux
curl -Lsf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"`}</Code>
          <p className="text-sm text-muted-foreground">Restart your terminal after installing.</p>
        </Step>

        <Step n={3} title="Clone & install AAAS">
          <Code>{`git clone https://github.com/yourusername/aaas
cd aaas
uv sync`}</Code>
          <p className="text-sm text-muted-foreground">
            That&apos;s it — <code className="bg-muted px-1 py-0.5 rounded text-xs">uv sync</code> installs all Python dependencies automatically.
          </p>
        </Step>

        <Step n={4} title="Point it at a project">
          <Code>{`uv run agent.py /path/to/your/project

# Or analyse this folder itself:
uv run agent.py .`}</Code>
          <p className="text-sm text-muted-foreground">
            In ~30 seconds you&apos;ll see a <code className="bg-muted px-1 py-0.5 rounded text-xs">skills/system-overview.md</code> appear.
            That&apos;s the agent&apos;s first brain dump — tech stack, gaps, and a prioritised backlog.
          </p>
        </Step>

        <Step n={5} title="Chat with your project">
          <Code>{`uv run chat.py`}</Code>
          <p className="text-sm text-muted-foreground">
            Ask anything: <em>&ldquo;What&apos;s broken?&rdquo;</em>, <em>&ldquo;How do I add auth?&rdquo;</em>,
            <em>&ldquo;What does the payments module do?&rdquo;</em>
          </p>
        </Step>
      </div>

      <div className="pt-8 border-t border-border">
        <h2 className="text-xl font-bold mb-4">Optional: GitHub integration</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your GitHub repo to automatically create issues from the backlog analysis.
        </p>
        <Code>{`# 1. Copy the config template
cp .env.example .env

# 2. Edit .env and add:
#    GITHUB_TOKEN=your_token_here
#    GITHUB_REPO=owner/repo-name

# 3. Get a token at: github.com/settings/tokens
#    Scopes needed: repo, workflow

# 4. Run with --github flag
uv run agent.py /path/to/project --github`}</Code>
        <Callout type="tip">
          The agent will create labelled issues for every backlog item it finds, tagged <code className="bg-muted px-1 py-0.5 rounded text-xs">aaas-generated</code>.
        </Callout>
      </div>

      <div className="pt-4 flex gap-4">
        <a href="/docs/how-it-works" className="text-primary text-sm hover:underline">
          How it works →
        </a>
        <a href="/docs/skills" className="text-primary text-sm hover:underline">
          Skills system →
        </a>
      </div>
    </article>
  );
}
