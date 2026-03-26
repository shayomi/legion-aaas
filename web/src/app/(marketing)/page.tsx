import { Hero } from "@/components/marketing/hero";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { IntegrationsStrip } from "@/components/marketing/integrations-strip";
import { CodeShowcase } from "@/components/marketing/code-showcase";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <IntegrationsStrip />
      <CodeShowcase />
      <CtaBanner />
    </>
  );
}
