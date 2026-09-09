import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { InquireCta } from "@/components/sections/InquireCta";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.faq.heading} | ${dictionary.site.name}`,
    description: dictionary.faq.description,
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const content = dictionary.faq;

  // §12 SEO — 검색 결과에 질문과 답변을 그대로 노출하기 위한 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: content.heading,
    inLanguage: locale,
    mainEntity: content.groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero kicker={content.kicker} heading={content.heading} description={content.description} />

      <Section tone="base">
        <Container>
          <div className="max-w-4xl">
            <FaqAccordion groups={content.groups} />
            <Reveal delay={120}>
              <p className="mt-14 border-t border-line pt-8 text-[13px] leading-relaxed text-ink-muted/80">
                {content.notice}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <InquireCta content={dictionary.home.inquire} site={dictionary.site} locale={locale} />
    </>
  );
}
