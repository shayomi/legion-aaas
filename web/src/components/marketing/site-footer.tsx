import Link from "next/link";
import { Zap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="text-primary">AAAS</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Open-source AI agent for SMEs. Learns your system, automates
              your workflow, connects your organisation.
            </p>
            <p className="text-xs text-muted-foreground">MIT License</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Documentation</p>
            {[
              { href: "/docs/getting-started", label: "Getting Started" },
              { href: "/docs/how-it-works", label: "How It Works" },
              { href: "/docs/skills", label: "Skills System" },
              { href: "/docs/integrations", label: "Integrations" },
              { href: "/docs/self-hosting", label: "Self-Hosting" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Community */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Community</p>
            {[
              { href: "https://github.com/yourusername/aaas", label: "GitHub" },
              { href: "https://github.com/yourusername/aaas/issues", label: "Report a Bug" },
              { href: "https://github.com/yourusername/aaas/discussions", label: "Discussions" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AAAS. Open source under MIT license.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for SMEs who move fast and ship things that matter.
          </p>
        </div>
      </div>
    </footer>
  );
}
