import { Badge } from "@/components/ui/badge";

export const metadata = { title: "How It Works — AAAS Docs" };

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

export default function HowItWorksPage() {
  return (
    <article className="space-y-8">
      <div>
        <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Architecture</Badge>
        <h1 className="text-4xl font-bold mb-3">How It Works</h1>
        <p className="text-lg text-muted-foreground">
          A walkthrough of the read → store → analyse → automate loop that powers AAAS.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-3">The core loop</h2>

        <div className="rounded-xl border border-border bg-card p-6 font-mono text-sm">
          <div className="text-cyan-400">reader.py</div>
          <div className="text-muted-foreground pl-4">└── walks every file in your project folder</div>
          <div className="text-cyan-400 mt-2">memory.py (ChromaDB)</div>
          <div className="text-muted-foreground pl-4">└── chunks files into 800-char pieces</div>
          <div className="text-muted-foreground pl-4">└── generates embeddings via Ollama</div>
          <div className="text-muted-foreground pl-4">└── stores in local vector database</div>
          <div className="text-cyan-400 mt-2">llm.py (Ollama / Mistral)</div>
          <div className="text-muted-foreground pl-4">└── receives project summary + prompt</div>
          <div className="text-muted-foreground pl-4">└── analyses stack, finds gaps, writes backlog</div>
          <div className="text-cyan-400 mt-2">skills.py</div>
          <div className="text-muted-foreground pl-4">└── writes analysis to skills/system-overview.md</div>
          <div className="text-cyan-400 mt-2">github_tools.py</div>
          <div className="text-muted-foreground pl-4">└── creates GitHub issues from backlog</div>
          <div className="text-muted-foreground pl-4">└── labels + assigns to project board</div>
        </div>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-4">Why local LLM?</h2>
        <p className="text-muted-foreground">
          Running Mistral 7B via Ollama means your code never leaves your machine.
          No OpenAI API key, no per-token billing, no data privacy concerns.
          For SMEs handling client code or sensitive business logic, this is non-negotiable.
        </p>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-4">Why ChromaDB?</h2>
        <p className="text-muted-foreground">
          ChromaDB stores vector embeddings of your project so the agent can
          semantically search &ldquo;what does the auth module do?&rdquo; without
          re-reading every file on every question. The memory persists in{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.aaas_memory/</code> between runs.
        </p>

        <h2 className="text-2xl font-bold border-b border-border pb-3 pt-4">The skills system</h2>
        <p className="text-muted-foreground">
          Every insight the agent produces is a markdown file in <code className="bg-muted px-1.5 py-0.5 rounded text-xs">skills/</code>.
          Skills are version-controlled alongside your code, readable by humans,
          and loaded back into context on every subsequent run — so knowledge compounds.
        </p>
        <Code>{`skills/
├── system-overview.md    ← generated on first run
├── feature-payments.md   ← task-specific skill
├── bug-rate-limiting.md  ← bug investigation
└── how-to-use.md         ← bootstrap (written by humans)`}</Code>
      </div>
    </article>
  );
}
