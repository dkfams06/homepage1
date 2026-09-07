import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { AssetImage } from "@/components/ui/AssetImage";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

const categoryIds = ["eyes", "nose", "contour", "lifting", "skin", "body", "cases"] as const;
type Props = { params: Promise<{ locale: string; categoryId: string }> };

export function generateStaticParams() {
  return categoryIds.map((categoryId) => ({ categoryId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, categoryId } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  if (categoryId === "cases") {
    return {
      title: `${dictionary.home.beforeAfter.kicker} | ${dictionary.site.name}`,
      description: dictionary.home.beforeAfter.description,
    };
  }
  const category = dictionary.categories.find((item) => item.id === categoryId);
  if (!category) return {};
  return { title: `${category.name} | ${dictionary.site.name}`, description: category.description };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, categoryId } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  if (categoryId === "cases") {
    return (
      <>
        <section className="bg-bg-blush pt-32 pb-8 md:pt-40 md:pb-12">
          <Container>
            <p className="kicker">{dictionary.home.beforeAfter.kicker}</p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.3] font-medium text-balance sm:text-5xl">
              {dictionary.home.beforeAfter.heading}
            </h1>
          </Container>
        </section>
        <BeforeAfterSection
          content={dictionary.home.beforeAfter}
          locale={locale}
          ui={dictionary.ui.beforeAfter}
        />
      </>
    );
  }

  const category = dictionary.categories.find((item) => item.id === categoryId);
  if (!category) notFound();

  return (
    <Section tone="blush" className="pt-32 md:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <AssetImage
              src={category.image}
              alt={`${category.name} ${dictionary.ui.services.imageSuffix}`}
              ratio="3/4"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-7">
            <p className="kicker">{category.nameEn}</p>
            <div className="flex flex-col gap-4">
              <h1 className="font-serif text-4xl font-medium sm:text-5xl">{category.name}</h1>
              <h2 className="font-serif text-2xl text-rose">{category.lead}</h2>
              <p className="max-w-[50ch] text-[15px] leading-[1.95] text-ink-muted">{category.description}</p>
            </div>
            <div className="border-t border-line pt-7">
              <h3 className="text-sm font-medium">{dictionary.ui.services.concerns}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.concerns.map((concern) => (
                  <li key={concern} className="border border-champagne/60 bg-bg px-4 py-2 text-sm text-ink-muted">
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
            <InquiryButton variant="primary" className="self-start">
              {dictionary.home.inquire.primaryCta.label}
            </InquiryButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
