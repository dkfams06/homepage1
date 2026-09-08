import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactUs } from "@/components/sections/ContactUs";
import { DoctorDetails } from "@/components/DoctorDetails";
import { DoctorProfileDialog } from "@/components/DoctorProfileDialog";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { chiefDoctorId } from "@/content/medical-team";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.aboutMedical.heading} | ${dictionary.site.name}`,
    description: dictionary.aboutMedical.description,
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const content = dictionary.aboutMedical;
  const chief = dictionary.doctors.find(doctor => doctor.id === chiefDoctorId);
  if (!chief) notFound();
  const team = dictionary.doctors.filter(doctor => doctor.id !== chiefDoctorId);

  return (
    <>
      <Section id="chief-doctor" className="pt-32 md:pt-40 lg:pt-44">
        <Container>
          <Reveal className="mb-12 md:mb-16">
            <p className="kicker">{content.kicker}</p>
            <h1 className="mt-5 font-serif text-4xl leading-snug sm:text-5xl lg:text-6xl">{content.heading}</h1>
            <p className="mt-5 max-w-[55ch] text-sm leading-7 text-ink-muted">{content.description}</p>
          </Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <AssetImage src={chief.image} alt={chief.imageAlt} ratio="3/4" sizes="(min-width: 1024px) 40vw, 100vw" priority />
              <p className="mt-4 border-l-2 border-champagne pl-4 text-xs leading-6 text-ink-muted">{content.notice}</p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mb-6 text-sm tracking-widest text-rose">{content.chief}</p>
              <DoctorDetails doctor={chief} content={content} />
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section id="affiliated-doctors" tone="blush">
        <Container>
          <SectionHeading heading={content.team} description={content.teamDescription} />
          <p className="mt-6 max-w-[75ch] text-xs leading-6 text-ink-muted">{content.notice}</p>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-14">
            {team.map((doctor, index) => (
              <Reveal as="li" key={doctor.id} delay={index * 100}>
                <DoctorProfileDialog name={doctor.name} detailsLabel={content.details} closeLabel={content.close}
                  card={<>
                    <AssetImage src={doctor.image} alt={doctor.imageAlt} ratio="4/5" sizes="(min-width: 640px) 45vw, 100vw" />
                    <span className="mt-6 block font-serif text-2xl group-hover:text-rose">{doctor.name}</span>
                    <span className="mt-2 block text-sm text-ink-muted">{doctor.role}</span>
                  </>}>
                  <div className="grid items-start gap-8 md:grid-cols-[0.7fr_1fr]">
                    <div>
                      <AssetImage src={doctor.image} alt={doctor.imageAlt} ratio="3/4" sizes="(min-width: 768px) 35vw, 90vw" />
                      <p className="mt-4 text-xs leading-6 text-ink-muted">{content.notice}</p>
                    </div>
                    <DoctorDetails doctor={doctor} content={content} />
                  </div>
                </DoctorProfileDialog>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <ContactUs content={dictionary.contact} site={dictionary.site} ui={dictionary.ui.location} />
    </>
  );
}
