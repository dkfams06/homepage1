import { AvailableLink } from "@/components/ui/AvailableLink";
import { ContactChannels } from "@/components/ContactChannels";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 온라인 접수가 열리기 전까지의 대체 상담 경로 — FEATURE_ROADMAP.md §4.2 (F-02)
 * 확정되지 않은 채널은 ContactChannels가 "준비 중"으로 표시하므로 여기서 분기하지 않는다.
 */
export function InquiryAlternatives({
  availability,
  contact,
  site,
  className = "",
}: {
  availability: Dictionary["inquiryAvailability"];
  contact: Dictionary["contact"];
  site: Dictionary["site"];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 border border-line bg-bg p-6 ${className}`}>
      <div className="flex flex-col gap-2">
        <p className="font-serif text-lg leading-snug">{availability.alternativeTitle}</p>
        <p className="text-[13px] leading-relaxed text-ink-muted">{availability.alternativeBody}</p>
      </div>
      <AvailableLink
        href={site.phoneHref}
        className="font-display text-2xl tracking-wide text-rose underline-offset-4 transition-colors hover:text-rose-deep hover:underline"
      >
        {site.phone}
      </AvailableLink>
      <ContactChannels content={contact} />
    </div>
  );
}
