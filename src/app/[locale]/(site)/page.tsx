import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { CategoryMarquee } from "@/components/sections/CategoryMarquee";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { BodySection } from "@/components/sections/BodySection";
import { Differences } from "@/components/sections/Differences";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { TrustSection } from "@/components/sections/TrustSection";
import { InquireCta } from "@/components/sections/InquireCta";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactUs } from "@/components/sections/ContactUs";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <>
      <Hero content={dictionary.home.hero} locale={locale} />
      <Philosophy content={dictionary.home.philosophy} locale={locale} />
      <ServiceExplorer
        content={dictionary.home.services}
        categories={dictionary.categories}
        locale={locale}
        ui={dictionary.ui.services}
      />
      <CategoryMarquee
        content={dictionary.home.marquee}
        categories={dictionary.categories}
        locale={locale}
        ui={dictionary.ui.marquee}
      />
      <BeforeAfterSection
        content={dictionary.home.beforeAfter}
        locale={locale}
        ui={dictionary.ui.beforeAfter}
      />
      <BodySection content={dictionary.home.body} locale={locale} />
      <Differences content={dictionary.home.differences} />
      <Process content={dictionary.home.process} />
      <Team content={dictionary.home.team} doctors={dictionary.doctors} locale={locale} />
      <TrustSection
        content={dictionary.home.trust}
        facts={dictionary.trustFacts}
        reviews={dictionary.reviews}
      />
      <InquireCta content={dictionary.home.inquire} site={dictionary.site} locale={locale} />
      <BlogPreview
        content={dictionary.home.blog}
        posts={dictionary.posts}
        locale={locale}
      />
      <ContactUs content={dictionary.contact} site={dictionary.site} ui={dictionary.ui.location} />
    </>
  );
}
