import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizeHref, type Locale } from "@/i18n/config";

/** Essential clinic information stays on About; no extra navigation or placeholder pages. */
export function ClinicEssentials({ content, faqLabel, locale }: {
  content: Dictionary["clinicEssentials"];
  faqLabel: string;
  locale: Locale;
}) {
  return (
    <Section id="clinic-information">
      <Container>
        <SectionHeading heading={content.heading} description={content.description} />
        <p className="mt-6 max-w-[70ch] text-sm leading-7 text-ink-muted">{content.notice}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {content.groups.map(group => (
            <div key={group.id} className="border-t border-champagne pt-6">
              <h3 className="font-serif text-xl">{group.title}</h3>
              <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-ink-muted">
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-6 text-xs leading-6 text-rose">{group.status}</p>
            </div>
          ))}
        </div>
        <Link href={localizeHref(locale, "/about/faq")} className="mt-10 inline-block border-b border-rose pb-2 text-sm text-rose">{faqLabel}</Link>
      </Container>
    </Section>
  );
}
