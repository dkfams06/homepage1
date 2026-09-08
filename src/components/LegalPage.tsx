import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function LegalPage({ locale, content, kind }: { locale: Locale; content: Dictionary["legal"]; kind: "privacy" | "terms" }) {
  const policy = content[kind];
  return (
    <Section className="min-h-[75svh] pt-32 md:pt-40">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-5 text-sm text-rose">{content.notice}</p>
          <h1 className="font-serif text-3xl leading-relaxed md:text-5xl">{policy.title}</h1>
          <p className="mt-8 border-l-2 border-rose bg-bg-blush p-6 text-base leading-loose">{policy.body}</p>
          <h2 className="mt-10 font-serif text-xl">{content.reviewTitle}</h2>
          <p className="mt-4 text-sm leading-loose text-ink-muted">{policy.review}</p>
          <Link href={`/${locale}`} className="mt-10 inline-block border-b border-rose pb-1 text-sm text-rose">{content.home}</Link>
        </div>
      </Container>
    </Section>
  );
}
