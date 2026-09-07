import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Differences } from "@/components/sections/Differences";
import { Team } from "@/components/sections/Team";
import { PageHero } from "@/components/ui/PageHero";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.nav[0].subLabel} | ${dictionary.site.name}`,
    description: dictionary.home.philosophy.paragraphs[0],
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero
        kicker={dictionary.home.philosophy.kicker}
        heading={dictionary.home.philosophy.heading}
        description={dictionary.home.philosophy.paragraphs[0]}
        image={{ ...dictionary.home.philosophy.image, ratio: "4/5" }}
      />
      <Differences content={dictionary.home.differences} />
      <Team content={dictionary.home.team} doctors={dictionary.doctors} locale={locale} />
    </>
  );
}
