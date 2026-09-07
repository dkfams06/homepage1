import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Location } from "@/components/sections/Location";
import { AssetImage } from "@/components/ui/AssetImage";
import { InquiryButton } from "@/components/ui/InquiryButton";
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
    title: `${dictionary.nav[3].subLabel} | ${dictionary.site.name}`,
    description: dictionary.home.inquire.description,
  };
}

export default async function InquirePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const content = dictionary.home.inquire;

  return (
    <>
      <Section tone="blush" className="pt-32 md:pt-40">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-24">
            <Reveal className="flex flex-col gap-7">
              <p className="kicker">{content.kicker}</p>
              <h1 className="font-serif text-4xl leading-[1.3] font-medium text-balance sm:text-5xl">
                {content.heading.map((line) => (
                  <span key={line} className="block">{line}{" "}</span>
                ))}
              </h1>
              <p className="max-w-[48ch] text-[15px] leading-[1.95] text-ink-muted">{content.description}</p>
              <InquiryButton variant="primary" className="self-start">{content.primaryCta.label}</InquiryButton>
              <p className="text-sm leading-relaxed text-ink-muted">
                {content.phoneLabel}{" "}
                <a href={dictionary.site.phoneHref} className="text-rose underline underline-offset-4">{dictionary.site.phone}</a>
                <br />
                {content.hoursNotice}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <AssetImage src={content.image.src} alt={content.image.alt} ratio="4/5" sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </Section>
      <Location content={dictionary.home.location} site={dictionary.site} ui={dictionary.ui.location} />
    </>
  );
}
