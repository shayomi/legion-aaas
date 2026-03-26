import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Self-Hosting — AAAS Docs" };

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

export default function SelfHostingPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Self-Hosting</Badge>
        <h1 className="text-4xl font-bold mb-3">Self-Hosting AAAS</h1>
        <p className="text-lg text-muted-foreground">
          Run AAAS on a cheap VPS so your whole team can access it.
          Hetzner CX11 costs €4/month and runs everything fine.
        </p>
      </div>

      <Callout type="tip">
        AAAS runs great locally first. Only move to a VPS when multiple team members need access.
      </Callout>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Option 1: Run locally (recommended to start)</h2>
        <p className="text-sm text-muted-foreground">
          Everything already works on your machine. Just run the commands from Getting Started.
          No server needed.
        </p>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">Option 2: Hetzner VPS + Coolify</h2>
        <p className="text-sm text-muted-foreground">
          Coolify is a free, open-source Heroku alternative. It handles SSL, deployments,
          env vars, and monitoring — all from a web UI.
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold">1. Get a Hetzner server (€4/mo)</h3>
          <p className="text-sm text-muted-foreground">Go to hetzner.com → Cloud → Create server → CX11 (2vCPU, 2GB RAM) → Ubuntu 22.04</p>

          <h3 className="font-semibold">2. Install Coolify</h3>
          <Code>{`# SSH into your server
ssh root@your-server-ip

# Install Coolify (one command)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`}</Code>

          <h3 className="font-semibold">3. Deploy AAAS</h3>
          <p className="text-sm text-muted-foreground">
            In the Coolify dashboard: New Application → GitHub → select your AAAS fork → deploy.
            Add your <code className="bg-muted px-1 py-0.5 rounded text-xs">.env</code> variables in the Environment section.
          </p>
        </div>

        <Callout type="warn">
          Running Mistral 7B needs at least 8GB RAM. Upgrade to CX21 (€6/mo) if the model is slow.
          Or use Groq&apos;s free API tier instead of local Ollama for cloud deployments.
        </Callout>
      </div>
    </article>
  );
}
