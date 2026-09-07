import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetImage } from "@/components/ui/AssetImage";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

const doctorIds = ["doctor-1", "doctor-2", "doctor-3"] as const;
type Props = { params: Promise<{ locale: string; doctorId: string }> };

export function generateStaticParams() {
  return doctorIds.map((doctorId) => ({ doctorId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, doctorId } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  const doctor = dictionary.doctors.find((item) => item.id === doctorId);
  if (!doctor) return {};
  return { title: `${doctor.name} | ${dictionary.site.name}`, description: doctor.philosophy };
}

export default async function DoctorPage({ params }: Props) {
  const { locale, doctorId } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const doctor = dictionary.doctors.find((item) => item.id === doctorId);
  if (!doctor) notFound();

  return (
    <Section tone="blush" className="pt-32 md:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(320px,0.75fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <AssetImage
              src={doctor.image}
              alt={doctor.imageAlt}
              ratio="3/4"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-7">
            <p className="kicker">{dictionary.home.team.kicker}</p>
            <div className="flex flex-col gap-2">
              <h1 className="font-serif text-4xl font-medium sm:text-5xl">{doctor.name}</h1>
              <p className="text-sm text-ink-muted">{doctor.role}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {doctor.specialties.map((specialty) => (
                <li key={specialty} className="border border-champagne/60 bg-bg px-4 py-2 text-sm text-ink-muted">
                  {specialty}
                </li>
              ))}
            </ul>
            <blockquote className="max-w-[42ch] border-l-2 border-champagne pl-6 font-serif text-xl leading-[1.7]">
              {doctor.philosophy}
            </blockquote>
            <InquiryButton variant="primary" className="self-start">
              {dictionary.home.inquire.primaryCta.label}
            </InquiryButton>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
