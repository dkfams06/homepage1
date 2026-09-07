import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AssetImage } from "@/components/ui/AssetImage";
import { PageHero } from "@/components/ui/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeTags, localizeHref } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.home.blog.heading} | ${dictionary.site.name}`,
    description: dictionary.posts[0].excerpt,
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHero kicker={dictionary.home.blog.kicker} heading={dictionary.home.blog.heading} />
      <Section tone="base">
        <Container>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
            {dictionary.posts.map((post, index) => (
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
                      <div className="flex items-center gap-3 text-xs text-ink-muted">
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
                      <h2 className="font-serif text-xl leading-snug text-balance transition-colors group-hover:text-rose">{post.title}</h2>
                      <p className="text-sm leading-[1.85] text-ink-muted">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
