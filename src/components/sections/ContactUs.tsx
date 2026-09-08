import { FaMapMarkerAlt } from "react-icons/fa";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ContactChannels } from "@/components/ContactChannels";
import { contactDetails } from "@/content/contact";
import type { Dictionary } from "@/i18n/dictionaries";

export function ContactUs({ content, site }: { content: Dictionary["contact"]; site: Dictionary["site"] }) {
  const details = [
    [content.representative, contactDetails.representative || content.pending],
    [content.address, site.address],
    [content.phone, site.phone],
    [content.email, contactDetails.email || content.pending],
  ];
  return (
    <Section id="contact" tone="surface">
      <Container>
        <SectionHeading kicker={content.kicker} heading={content.heading} description={content.description} className="mb-12" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-14">
          <div className="relative min-h-80 overflow-hidden border border-line bg-bg-blush lg:min-h-[460px]">
            {contactDetails.mapEmbedUrl ? (
              <iframe src={contactDetails.mapEmbedUrl} title={content.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0" allowFullScreen />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="flex size-16 items-center justify-center rounded-full border border-champagne text-rose"><FaMapMarkerAlt size={23} aria-hidden="true" /></span>
                <p className="font-serif text-xl">{content.mapPending}</p>
                <p className="max-w-72 text-sm leading-relaxed text-ink-muted">{content.mapNotice}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-6 font-display text-2xl tracking-wide">{site.nameEn}</p>
            <dl className="divide-y divide-line border-y border-line">
              {details.map(([label, value]) => (
                <div key={label} className="grid gap-2 py-5">
                  <dt className="text-xs text-ink-muted">{label}</dt>
                  <dd className="text-sm leading-relaxed break-words">{label === content.email && contactDetails.email ? <a href={`mailto:${contactDetails.email}`} className="hover:text-rose">{value}</a> : value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 mb-4 text-xs text-ink-muted">{content.channelsLabel}</p>
            <ContactChannels content={content} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
