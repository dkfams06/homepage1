import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";

/**
 * 의료진 소개 — MAIN_PAGE_PLAN.md §6.8
 * 메인에는 요약만 배치하고 상세는 의료진 페이지에서 제공한다.
 */
export function Team({
  content,
  doctors,
  locale,
}: {
  content: Dictionary["home"]["team"];
  doctors: Dictionary["doctors"];
  locale: Locale;
}) {
  return (
    <Section tone="blush">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
          <SectionHeading
            kicker={content.kicker}
            heading={content.heading}
            description={content.description}
            className="md:max-w-[52ch]"
          />
          <Reveal className="shrink-0">
            <CtaLink href={content.cta.href} locale={locale} variant="quiet">
              {content.cta.label}
            </CtaLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-12">
          {doctors.map((doctor, index) => (
            <Reveal as="li" key={doctor.id} delay={index * 100}>
              <Link href={localizeHref(locale, doctor.href)} className="group flex flex-col gap-5">
                <AssetImage
                  src={doctor.image}
                  alt={doctor.imageAlt}
                  ratio="3/4"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-xl transition-colors group-hover:text-rose">
                      {doctor.name}
                    </h3>
                    <p className="text-[13px] text-ink-muted">{doctor.role}</p>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {doctor.specialties.map((specialty) => (
                      <li
                        key={specialty}
                        className="border border-champagne/50 px-2.5 py-1 text-[12px] text-ink-muted"
                      >
                        {specialty}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[14px] leading-[1.85] text-ink-muted">
                    &ldquo;{doctor.philosophy}&rdquo;
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
