import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetImage } from "@/components/ui/AssetImage";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizeHref } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.nav[1].subLabel} | ${dictionary.site.name}`,
    description: dictionary.home.services.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero
        kicker={dictionary.home.services.kicker}
        heading={dictionary.home.services.heading}
        description={dictionary.home.services.description}
      />
      <Section tone="base">
        <Container>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.categories.map((category, index) => (
              <Reveal as="li" key={category.id} delay={(index % 3) * 80}>
                <Link href={localizeHref(locale, category.href)} className="group flex flex-col gap-5">
                  <AssetImage
                    src={category.image}
                    alt={`${category.name} ${dictionary.ui.services.imageSuffix}`}
                    ratio="3/4"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-display text-xs tracking-[0.2em] text-champagne uppercase">{category.nameEn}</p>
                    <h2 className="font-serif text-2xl transition-colors group-hover:text-rose">{category.name}</h2>
                    <p className="text-sm leading-[1.85] text-ink-muted">{category.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
