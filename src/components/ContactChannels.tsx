import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { SiKakaotalk, SiNaver } from "react-icons/si";
import { contactDetails } from "@/content/contact";
import type { Dictionary } from "@/i18n/dictionaries";

const icons = { whatsapp: FaWhatsapp, kakao: SiKakaotalk, instagram: FaInstagram, naver: SiNaver, phone: FaPhoneAlt };

export function ContactChannels({ content, vertical = false }: { content: Dictionary["contact"]; vertical?: boolean }) {
  return (
    <div aria-label={content.channelsLabel} role="group" className={`flex gap-2 ${vertical ? "flex-col" : "flex-wrap"}`}>
      {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => {
        const Icon = icons[key];
        const href = contactDetails.channels[key];
        const label = content.channels[key];
        const className = "flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-ink-muted transition-colors hover:border-rose hover:text-rose";
        return href ? (
          <a key={key} href={href} aria-label={label} title={label} className={className}
            target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}>
            <Icon size={18} aria-hidden="true" />
          </a>
        ) : (
          <span key={key} role="link" aria-disabled="true" aria-label={`${label}: ${content.pending}`} title={`${label}: ${content.pending}`} className={`${className} cursor-not-allowed`}>
            <Icon size={18} aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
}
