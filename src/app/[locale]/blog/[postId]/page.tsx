import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssetImage } from "@/components/ui/AssetImage";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeTags } from "@/i18n/config";

const postIds = ["post-1", "post-2", "post-3"] as const;
type Props = { params: Promise<{ locale: string; postId: string }> };

export function generateStaticParams() {
  return postIds.map((postId) => ({ postId }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, postId } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  const post = dictionary.posts.find((item) => item.id === postId);
  if (!post) return {};
  return { title: `${post.title} | ${dictionary.site.name}`, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { locale, postId } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const post = dictionary.posts.find((item) => item.id === postId);
  if (!post) notFound();

  const date = new Intl.DateTimeFormat(localeTags[locale], {
    year: "numeric",
    month: locale === "en" ? "long" : "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(new Date(`${post.date}T00:00:00+09:00`));

  return (
    <article>
      <section className="bg-bg-blush pt-32 pb-16 md:pt-40 md:pb-24">
        <Container className="max-w-4xl">
          <Reveal className="flex flex-col gap-6 text-center">
            <p className="kicker">{post.category}</p>
            <h1 className="font-serif text-4xl leading-[1.3] font-medium text-balance sm:text-5xl">{post.title}</h1>
            <time dateTime={post.date} className="text-sm text-ink-muted">{date}</time>
          </Reveal>
        </Container>
      </section>
      <Section tone="base">
        <Container className="max-w-4xl">
          <Reveal>
            <AssetImage src={post.image} alt={post.imageAlt} ratio="4/3" sizes="(min-width: 1024px) 896px, 100vw" />
          </Reveal>
          <Reveal delay={100} className="mx-auto mt-12 flex max-w-[68ch] flex-col gap-8 md:mt-16">
            <p className="font-serif text-xl leading-[1.9] text-ink">{post.excerpt}</p>
            <p className="border-l-2 border-champagne pl-5 text-sm leading-[1.9] text-ink-muted">
              {dictionary.ui.footer.disclaimer}
            </p>
          </Reveal>
        </Container>
      </Section>
    </article>
  );
}
