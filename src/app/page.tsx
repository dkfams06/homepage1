import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { CategoryMarquee } from "@/components/sections/CategoryMarquee";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { BodySection } from "@/components/sections/BodySection";
import { Differences } from "@/components/sections/Differences";
import { Team } from "@/components/sections/Team";
import { TrustSection } from "@/components/sections/TrustSection";
import { InquireCta } from "@/components/sections/InquireCta";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Location } from "@/components/sections/Location";

/**
 * 메인페이지 — MAIN_PAGE_PLAN.md §7 최종 섹션 순서
 * 헤더와 푸터는 layout.tsx에서 렌더링한다.
 * H1은 히어로에 한 개만 두고 나머지 섹션 제목은 H2로 계층화한다. (§12)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ServiceExplorer />
      <CategoryMarquee />
      <BeforeAfterSection />
      <BodySection />
      <Differences />
      <Team />
      <TrustSection />
      <InquireCta />
      <BlogPreview />
      <Location />
    </>
  );
}
