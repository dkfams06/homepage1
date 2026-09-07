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
    title: `${dictionary.home.team.kicker} | ${dictionary.site.name}`,
    description: dictionary.home.team.description,
  };
}

export default async function DoctorsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero
        kicker={dictionary.home.team.kicker}
        heading={dictionary.home.team.heading}
        description={dictionary.home.team.description}
      />
      <Section tone="base">
        <Container>
          <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {dictionary.doctors.map((doctor, index) => (
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
                    <h2 className="font-serif text-2xl transition-colors group-hover:text-rose">{doctor.name}</h2>
                    <p className="text-sm text-ink-muted">{doctor.role}</p>
                    <ul className="flex flex-wrap gap-2">
                      {doctor.specialties.map((specialty) => (
                        <li key={specialty} className="border border-champagne/50 px-3 py-1.5 text-xs text-ink-muted">
                          {specialty}
                        </li>
                      ))}
                    </ul>
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
