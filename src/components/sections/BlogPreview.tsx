import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AssetImage } from "@/components/ui/AssetImage";
import { CtaLink } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeTags, localizeHref, type Locale } from "@/i18n/config";

/**
 * 블로그 미리보기 — MAIN_PAGE_PLAN.md §6.11
 * 향후 콘텐츠 SEO의 진입점이므로 상세 페이지로 내부 링크를 연결한다. (§12)
 */
export function BlogPreview({
  content,
  posts,
  locale,
}: {
  content: Dictionary["home"]["blog"];
  posts: Dictionary["posts"];
  locale: Locale;
}) {
  return (
    <Section tone="base">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="flex flex-col gap-4">
            <p className="kicker">{content.kicker}</p>
            <h2 className="font-serif text-3xl sm:text-4xl">{content.heading}</h2>
          </Reveal>
          <Reveal className="shrink-0">
            <CtaLink href={content.cta.href} locale={locale} variant="quiet">
              {content.cta.label}
            </CtaLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {posts.map((post, index) => (
            <Reveal as="li" key={post.id} delay={index * 100}>
              <article>
                <Link href={localizeHref(locale, post.href)} className="group flex flex-col gap-5">
                  <AssetImage
                    src={post.image}
                    alt={post.imageAlt}
                    ratio="4/3"
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02]"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-[12px] text-ink-muted">
                      <span className="text-rose">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.date}>
                        {new Intl.DateTimeFormat(localeTags[locale], {
                          year: "numeric",
                          month: locale === "en" ? "short" : "2-digit",
                          day: "2-digit",
                          timeZone: "Asia/Seoul",
                        }).format(new Date(`${post.date}T00:00:00+09:00`))}
                      </time>
                    </div>
                    <h3 className="font-serif text-lg leading-snug text-balance transition-colors group-hover:text-rose">
                      {post.title}
                    </h3>
                    <p className="text-[14px] leading-[1.85] text-ink-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
