import { services } from "@/content/home";
import { categories } from "@/content/categories";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { resolveAssets } from "@/lib/assets";
import { ServiceExplorerTabs } from "./ServiceExplorerTabs";

/** 핵심 시술 분야 — MAIN_PAGE_PLAN.md §6.3 */
export function ServiceExplorer() {
  const readyMap = resolveAssets(categories.map((category) => category.image));

  return (
    <Section id="services" tone="blush">
      <Container>
        <SectionHeading
          kicker={services.kicker}
          heading={services.heading}
          description={services.description}
        />
        <Reveal className="mt-14 md:mt-20">
          <ServiceExplorerTabs readyMap={readyMap} />
        </Reveal>
      </Container>
    </Section>
  );
}
