import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { resolveAssets } from "@/lib/assets";
import { CategoryMarqueeTrack } from "./CategoryMarqueeTrack";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

/** 시술 카테고리 자동 슬라이드 — MAIN_PAGE_PLAN.md §6.4 */
export function CategoryMarquee({
  content,
  categories,
  locale,
  ui,
}: {
  content: Dictionary["home"]["marquee"];
  categories: Dictionary["categories"];
  locale: Locale;
  ui: Dictionary["ui"]["marquee"];
}) {
  const readyMap = resolveAssets(categories.map((category) => category.image));

  return (
    <section className="overflow-hidden bg-bg py-20 md:py-28 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <p className="kicker">{content.kicker}</p>
          <h2 className="font-serif text-2xl sm:text-3xl">{content.heading}</h2>
        </Reveal>
      </Container>

      <Reveal className="mt-10 md:mt-14">
        <CategoryMarqueeTrack readyMap={readyMap} categories={categories} locale={locale} ui={ui} />
      </Reveal>
    </section>
  );
}
