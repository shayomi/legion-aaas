import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-12 glow-cyan">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to automate your workflow?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Set up in 5 minutes. Runs on your machine. Free forever.
            Start with one project and watch it learn your entire organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started — It&apos;s Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/yourusername/aaas"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Star on GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
