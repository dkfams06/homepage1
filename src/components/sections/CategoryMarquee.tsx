import { marquee } from "@/content/home";
import { categories } from "@/content/categories";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { resolveAssets } from "@/lib/assets";
import { CategoryMarqueeTrack } from "./CategoryMarqueeTrack";

/** 시술 카테고리 자동 슬라이드 — MAIN_PAGE_PLAN.md §6.4 */
export function CategoryMarquee() {
  const readyMap = resolveAssets(categories.map((category) => category.image));

  return (
    <section className="overflow-hidden bg-bg py-20 md:py-28 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <p className="kicker">{marquee.kicker}</p>
          <h2 className="font-serif text-2xl sm:text-3xl">{marquee.heading}</h2>
        </Reveal>
      </Container>

      <Reveal className="mt-10 md:mt-14">
        <CategoryMarqueeTrack readyMap={readyMap} />
      </Reveal>
    </section>
  );
}
