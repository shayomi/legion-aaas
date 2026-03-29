import { Badge } from "@/components/ui/badge";

export const metadata = { title: "LEGION Swarm — LEGION Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-[#0d0d0d] p-4 text-sm font-mono text-slate-300">
      <code>{children}</code>
    </pre>
  );
}

export default function SwarmDocsPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
          Swarm Testing
        </Badge>
        <h1 className="mb-3 text-4xl font-bold">LEGION Swarm</h1>
        <p className="text-lg text-muted-foreground">
          LEGION Swarm analyzes a web app, writes regression intelligence, generates starter
          Playwright specs, and prepares multi-agent browser testing across critical journeys.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">What LEGION Swarm is for</h2>
        <p className="text-sm text-muted-foreground leading-7">
          Swarm is the layer that turns LEGION from a repo analysis tool into an active QA system.
          Instead of waiting for a human to hand-write every browser test, LEGION inspects the app,
          detects routes and product capabilities, writes a test map, drafts a regression plan,
          scaffolds executable specs, and prepares the project for parallel agent-driven execution.
        </p>
        <p className="text-sm text-muted-foreground leading-7">
          The long-term goal is simple: point LEGION at a local or staging web app and get a living,
          repo-owned testing layer that explains what should be tested, how it should be tested,
          which flows are critical, and which failures should become GitHub issues.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">What it generates</h2>
        <Code>{`.legion/swarm/app_analysis.md
.legion/swarm/test_map.md
.legion/swarm/regression_plan.md
.legion/swarm/test_data_plan.md
.legion/swarm/swarm_matrix.json
.legion/swarm/specs/smoke.spec.ts
.legion/swarm/specs/auth.spec.ts  # when auth is detected
.legion/swarm/runs/README.md`}</Code>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- `app_analysis.md` explains what LEGION detected in the app structure.</li>
          <li>- `test_map.md` lists user journeys, states, and coverage targets.</li>
          <li>- `regression_plan.md` defines what belongs in smoke, release, and high-risk suites.</li>
          <li>- `test_data_plan.md` explains identity, roles, seeded data, and cleanup assumptions.</li>
          <li>- `swarm_matrix.json` is the machine-readable execution contract for browsers, workers, and presets.</li>
          <li>- `specs/*.spec.ts` are starter Playwright tests that future swarm workers can run and expand.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">How to use it</h2>
        <Code>{`# Generate repo-aware swarm artifacts during a normal run
uv run agent.py /path/to/project

# Or generate swarm artifacts directly
uv run swarm.py /path/to/project`}</Code>
        <p className="text-sm text-muted-foreground leading-7">
          In the current build, Swarm focuses on analysis and artifact generation. It does not yet launch
          a full parallel Playwright worker fleet. The generated markdown and JSON files are designed so the next
          runtime slice can turn them into real multi-agent execution presets without changing the project contract.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Recommended strategy</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- Use hybrid analysis: source-code inspection plus live browser exploration when the app is running.</li>
          <li>- Generate artifacts into `.legion/swarm/` first so the testing system stays repo-owned and reviewable.</li>
          <li>- Run Swarm against local or staging by default, not production.</li>
          <li>- Start with smoke and auth/onboarding coverage, then expand to full-web regression and role matrices.</li>
          <li>- Convert grouped failures into issue drafts instead of creating one issue per raw failing step.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Planned execution model</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- Analyze source code and route structure</li>
          <li>- Generate regression and test-plan markdown files</li>
          <li>- Generate Playwright starter specs</li>
          <li>- Run multi-agent browser swarms against local or staging environments</li>
          <li>- Aggregate failures into reports and GitHub issue drafts</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Typical presets</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- auth</li>
          <li>- onboarding</li>
          <li>- checkout</li>
          <li>- CRUD</li>
          <li>- full-web regression</li>
        </ul>
        <p className="text-sm text-muted-foreground leading-7">
          The vision is not to limit Swarm to authentication. Auth is just one preset. The real product is
          “analyze → describe → regress → execute → report” across the whole app surface.
        </p>
      </div>
    </article>
  );
}
