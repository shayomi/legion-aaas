import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Skills System — AAAS Docs" };

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
          AAAS now uses three layers of knowledge: repo-owned artifacts, installable packs,
          and optional hand-written skills. Together they form the agent memory model.
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
.legion/packs/index.json   # installed pack registry
.legion/packs/*.md         # one manifest per selected pack
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
├── feature-payments.md   ← hand-written or future generated topic skill
├── bug-rate-limiting.md  ← investigation skill
└── team-conventions.md   ← human-authored bootstrap knowledge

.legion/
├── config.json
├── sync.json
└── packs/
    ├── index.json
    ├── nextjs.md
    └── supabase.md`}</Code>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-2">What is a pack?</h2>
        <p className="text-sm text-muted-foreground">
          Packs are installable capability bundles. AAAS detects or resolves aliases like
          <code className="bg-muted px-1 py-0.5 rounded text-xs">next</code>,
          <code className="bg-muted px-1 py-0.5 rounded text-xs">pg</code>, or
          <code className="bg-muted px-1 py-0.5 rounded text-xs">ps</code> and writes pack manifests under
          <code className="bg-muted px-1 py-0.5 rounded text-xs">.legion/packs/</code>.
        </p>
        <Code>{`AAAS_PACKS=nextjs,react,tailwind,shadcn,supabase,neon`}</Code>

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
