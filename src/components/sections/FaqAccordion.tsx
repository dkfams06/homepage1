import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 자주 묻는 질문 — FEATURE_ROADMAP.md §4.4 (F-04)
 * details/summary 기반이므로 자바스크립트 없이 키보드와 스크린 리더에서 동작한다.
 */
export function FaqAccordion({ groups }: { groups: Dictionary["faq"]["groups"] }) {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {groups.map((group, groupIndex) => (
        <section key={group.id} aria-labelledby={`faq-${group.id}`}>
          <Reveal>
            <h2
              id={`faq-${group.id}`}
              className="font-serif text-2xl leading-snug md:text-[1.75rem]"
            >
              {group.label}
            </h2>
          </Reveal>

          <ul className="mt-7 border-t border-line">
            {group.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.id}
                delay={groupIndex === 0 ? index * 70 : 0}
                className="border-b border-line"
              >
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[15px] leading-[1.7] font-medium">{item.question}</h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-xl leading-none text-champagne transition-transform duration-300 ease-[var(--ease-soft)] group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-7 text-[14px] leading-[1.95] text-ink-muted">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
