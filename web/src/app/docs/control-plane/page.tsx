import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Control Plane — LEGION Docs",
};

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[#0d0d0d] p-4 text-sm font-mono text-slate-300">
      <code>{children}</code>
    </pre>
  );
}

export default function ControlPlaneDocsPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
          Control Plane
        </Badge>
        <h1 className="mb-3 text-4xl font-bold">Hybrid control plane</h1>
        <p className="text-lg text-muted-foreground">
          LEGION is evolving into a hybrid product: the runtime stays local in the user repo,
          while the hosted app manages auth, projects, providers, packs, and sync metadata.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">What the control plane becomes</h2>
        <p className="text-sm text-muted-foreground leading-7">
          The hosted control plane is not just a dashboard. It is the place where teams will decide which
          providers a project can use, which pack bundles are active, which GitHub repos are connected,
          what LEGION Swarm presets should run, and which generated artifacts should be treated as canonical.
        </p>
        <p className="text-sm text-muted-foreground leading-7">
          The local runtime remains the source of execution. The control plane becomes the source of coordination,
          policy, visibility, and shared configuration.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Local runtime owns</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- `legion.md` repo intelligence</li>
          <li>- `primer.md` rolling operational memory</li>
          <li>- `.legion/config.json` project config snapshot</li>
          <li>- `.legion/packs/*` installed pack manifests</li>
          <li>- `.legion/sync.json` hosted sync contract</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Hosted app owns</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- sign in, workspaces, and project inventory</li>
          <li>- provider selection per project</li>
          <li>- pack selection and future pack presets</li>
          <li>- GitHub connection metadata and issue defaults</li>
          <li>- future Swarm presets, run history, and grouped QA reports</li>
          <li>- future run history, memory snapshots, and collaboration</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Current config shape</h2>
        <Code>{`AI_PROVIDER=ollama
AAAS_PACKS=nextjs,react,tailwind,shadcn
AAAS_SYNC_MODE=hybrid
AAAS_CLOUD_URL=https://your-aaas-app.vercel.app
AAAS_PROJECT_ID=proj_123
AAAS_WORKSPACE_ID=ws_123
GITHUB_REPO=owner/repo`}</Code>
        <p className="text-sm text-muted-foreground leading-7">
          The variable names still use the `AAAS_` prefix for backwards compatibility in this build,
          but the visible product name across the site and docs is now LEGION.
        </p>
      </div>
    </article>
  );
}
