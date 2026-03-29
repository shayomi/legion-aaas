import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Skills System — LEGION Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

export default function SkillsPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Skills</Badge>
        <h1 className="text-4xl font-bold mb-3">The Skills System</h1>
        <p className="text-lg text-muted-foreground">
          LEGION now uses three layers of knowledge: repo-owned artifacts, installable packs,
          and a generated 150+ skill library. Together they form the local agent memory model.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold border-b border-border pb-3">Why the skills system matters</h2>
        <p className="text-sm text-muted-foreground leading-7">
          The point of the skill library is coverage. When someone installs LEGION into a project,
          the agent should not begin from zero every time. It should arrive with a broad local body of
          operational knowledge covering frontend frameworks, CI/CD, workflows, browser testing,
          data platforms, auth systems, no-code automation, visualization stacks, and deployment patterns.
        </p>
        <p className="text-sm text-muted-foreground leading-7">
          That is why LEGION mirrors the generated skill library into both `skills/` and `.legion/skills/`.
          One path is human-friendly and easy to commit; the other is a product-owned runtime surface for future
          SaaS sync, pack selection, and agent orchestration.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-3">What is a skill?</h2>
        <p className="text-sm text-muted-foreground">
          A skill is a <code className="bg-muted px-1 py-0.5 rounded text-xs">.md</code> file in the <code className="bg-muted px-1 py-0.5 rounded text-xs">skills/</code>
          folder. It captures what the agent knows about a topic — a system overview, a bug investigation, a feature plan.
          Because skills are markdown, they&apos;re version-controlled, human-readable, and editable by anyone on your team.
        </p>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">What ships automatically now</h2>
        <Code>{`legion.md                  # canonical repo intelligence
primer.md                  # rolling operational memory
.legion/config.json        # provider + pack selection
.legion/sync.json          # hybrid SaaS sync contract
.legion/skills/index.json  # generated skill catalog index
.legion/skills/*.md        # generated skill markdown library
.legion/packs/index.json   # installed pack registry
.legion/packs/*.md         # one manifest per selected pack
skills/index.json          # mirrored local skill index
skills/*.md                # mirrored local skill markdown library
brainstorm.md              # workflow starter
prd.md                     # workflow starter
design_spec.md             # workflow starter
technical_spec.md          # workflow starter
build_e2e.md               # workflow starter
github_issue.md            # workflow starter`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">Skill file format</h2>
        <Code>{`# Skill: System Overview
_Last updated: 2025-03-26_

## What this project does
A SaaS invoicing app. Users create invoices, send via email, track payments.

## Tech stack
- Frontend: Next.js 14, Tailwind, shadcn/ui
- Backend: FastAPI, PostgreSQL
- Auth: Clerk

## Key files
| File | What it does |
|------|-------------|
| app/api/invoices.py | Invoice CRUD endpoints |
| app/models/user.py  | User model + relationships |

## Gaps & problems identified
- No rate limiting on auth endpoints (security risk)
- Missing tests on payment flow
- README is 6 months out of date

## Backlog (suggested next tasks)
1. Add rate limiting middleware
2. Write tests for /api/payments
3. Update README

## Automation opportunities
- Auto-close issues when related PRs merge
- Notify Slack when new invoice is created`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">Where knowledge lives</h2>
        <Code>{`skills/
├── index.json
├── ci-cd.md
├── n8n.md
├── zapier.md
├── framer-motion.md
├── remotion.md
├── echarts.md
├── playwright.md
└── ... 150+ generated skills

.legion/
├── config.json
├── sync.json
├── skills/
│   ├── index.json
│   ├── github-actions.md
│   ├── workflow-automation.md
│   └── ... mirrored skill library
└── packs/
    ├── index.json
    ├── nextjs.md
    └── supabase.md`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">What is a pack?</h2>
        <p className="text-sm text-muted-foreground">
          Packs are installable capability bundles. LEGION detects or resolves aliases like
          <code className="bg-muted px-1 py-0.5 rounded text-xs">next</code>,
          <code className="bg-muted px-1 py-0.5 rounded text-xs">pg</code>, or
          <code className="bg-muted px-1 py-0.5 rounded text-xs">ps</code> and writes pack manifests under
          <code className="bg-muted px-1 py-0.5 rounded text-xs">.legion/packs/</code>.
        </p>
        <Code>{`AAAS_PACKS=nextjs,react,tailwind,shadcn,supabase,neon`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">What the skill library covers</h2>
        <p className="text-sm text-muted-foreground">
          The generated LEGION skill library covers frontend, CI/CD, workflows, n8n, Zapier,
          Framer Motion, Remotion, ECharts, D3, Playwright, testing, auth, payments,
          databases, analytics, observability, storage, deployment, and planning.
        </p>
        <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
          <div className="rounded-xl border border-border bg-card p-4">
            <strong className="block mb-2 text-foreground">Engineering coverage</strong>
            React, Next.js, Tailwind, shadcn, TypeScript, Prisma, Drizzle, Supabase, Neon,
            Postgres, MySQL, MongoDB, Redis, Docker, Kubernetes, GitHub Actions, and cloud deploy targets.
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <strong className="block mb-2 text-foreground">Automation and growth coverage</strong>
            n8n, Zapier, Make, analytics, observability, testing, Playwright, workflow docs,
            planning artifacts, issue generation, and future Swarm execution paths.
          </div>
        </div>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">Current behavior</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>- On a normal run, LEGION writes the full local skill library to both skill locations.</li>
          <li>- Pack selection remains narrower and project-specific.</li>
          <li>- The skill library gives the agent broad baseline knowledge; packs express what is actively relevant to this repo.</li>
          <li>- Future control-plane work will let teams enable, disable, prioritize, or sync subsets of the library.</li>
        </ul>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">Writing your own skills</h2>
        <p className="text-sm text-muted-foreground">
          You can write skills by hand. This is useful for bootstrapping the agent with
          knowledge that isn&apos;t in the codebase — business logic, team conventions, deployment procedures.
        </p>
        <p className="text-sm text-muted-foreground">
          The agent will read your hand-written skills on every run and use them as context.
        </p>
      </div>
    </article>
  );
}
