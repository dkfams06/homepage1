import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaLink } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { Dictionary } from "@/i18n/dictionaries";

/** 오시는 길 — MAIN_PAGE_PLAN.md §6.12 */
export function Location({
  content,
  site,
  ui,
}: {
  content: Dictionary["home"]["location"];
  site: Dictionary["site"];
  ui: Dictionary["ui"]["location"];
}) {
  const mapSearch = `https://map.naver.com/p/search/${encodeURIComponent(site.address)}`;

  return (
    <Section id="location" tone="blush">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-4">
              <p className="kicker">{content.kicker}</p>
              <h2 className="font-serif text-3xl sm:text-4xl">{content.heading}</h2>
            </Reveal>

            <Reveal delay={100}>
              <dl className="flex flex-col divide-y divide-line border-y border-line">
                <Row term={ui.address}>
                  {site.address}
                  <span className="mt-1 block text-[13px] text-ink-muted">{site.addressDetail}</span>
                </Row>
                <Row term={ui.phone}>
                  <a href={site.phoneHref} className="text-rose underline underline-offset-4">
                    {site.phone}
                  </a>
                </Row>
                <Row term={ui.hours}>
                  <ul className="flex flex-col gap-1.5">
                    {site.hours.map((entry) => (
                      <li key={entry.day} className="flex gap-4">
                        <span className="w-24 shrink-0 text-ink-muted">{entry.day}</span>
                        <span>{entry.time}</span>
                      </li>
                    ))}
                  </ul>
                </Row>
                <Row term={ui.parking}>{site.parking}</Row>
                <Row term={ui.transit}>
                  <ul className="flex flex-col gap-1.5">
                    {site.transit.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </Row>
              </dl>
            </Reveal>

            <Reveal delay={160} className="flex flex-wrap items-center gap-3">
              <CtaLink href={mapSearch} variant="secondary">
                {ui.directions}
              </CtaLink>
              <InquiryButton variant="primary">{ui.consult}</InquiryButton>
            </Reveal>
          </div>

          <Reveal delay={120} className="flex flex-col gap-4">
            {/* TODO(연동): 네이버 또는 카카오 지도 SDK를 연결한다. 좌표 확정 후 적용. */}
            <div
              className="placeholder-weave flex flex-col items-center justify-center gap-2 border border-line text-center"
              style={{ aspectRatio: "4/3" }}
              role="img"
              aria-label={ui.mapLabel.replace("{name}", site.name).replace("{address}", site.address)}
            >
              <span className="kicker text-ink/45">{ui.mapPending}</span>
              <span className="text-[12px] text-ink/45">
                {ui.mapNotice}
              </span>
            </div>
            <p className="border-l-2 border-champagne pl-4 text-[13px] leading-[1.85] text-ink-muted">
              {site.landmark}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
      <dt className="text-[13px] tracking-wide text-ink-muted">{term}</dt>
      <dd className="text-[14px] leading-[1.85]">{children}</dd>
    </div>
  );
}
