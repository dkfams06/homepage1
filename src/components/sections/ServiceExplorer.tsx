import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { resolveAssets } from "@/lib/assets";
import { ServiceExplorerTabs } from "./ServiceExplorerTabs";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** 핵심 시술 분야 — MAIN_PAGE_PLAN.md §6.3 */
export function ServiceExplorer({
  content,
  categories,
  locale,
  ui,
}: {
  content: Dictionary["home"]["services"];
  categories: Dictionary["categories"];
  locale: Locale;
  ui: Dictionary["ui"]["services"];
}) {
  const readyMap = resolveAssets(categories.map((category) => category.image));

  return (
    <Section id="services" tone="blush">
      <Container>
        <SectionHeading
          kicker={content.kicker}
          heading={content.heading}
          description={content.description}
        />
        <Reveal className="mt-14 md:mt-20">
          <ServiceExplorerTabs readyMap={readyMap} categories={categories} locale={locale} ui={ui} />
        </Reveal>
      </Container>
    </Section>
  );
}
