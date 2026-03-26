export type NavItem = {
  title: string;
  href: string;
  label?: string; // "soon" badge
  items?: NavItem[];
};

export const navConfig: { items: NavItem[] } = {
  items: [
    {
      title: "Getting Started",
      href: "/docs/getting-started",
    },
    {
      title: "How It Works",
      href: "/docs/how-it-works",
    },
    {
      title: "Skills System",
      href: "/docs/skills",
    },
    {
      title: "Configuration",
      href: "/docs/configuration",
    },
    {
      title: "Integrations",
      href: "/docs/integrations",
      items: [
        { title: "Overview", href: "/docs/integrations" },
        { title: "GitHub", href: "/docs/integrations/github" },
        { title: "Slack", href: "/docs/integrations/slack", label: "soon" },
        { title: "Google Meet", href: "/docs/integrations/google-meet", label: "soon" },
        { title: "Discord", href: "/docs/integrations/discord", label: "soon" },
        { title: "CI/CD", href: "/docs/integrations/cicd", label: "soon" },
      ],
    },
    {
      title: "Self-Hosting",
      href: "/docs/self-hosting",
    },
  ],
};
