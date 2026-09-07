import { AssetImage } from "./AssetImage";
import { Container } from "./Section";
import { Reveal } from "./Reveal";

export function PageHero({
  kicker,
  heading,
  description,
  image,
}: {
  kicker: string;
  heading: string | string[];
  description?: string;
  image?: { src: string; alt: string; ratio?: string };
}) {
  const lines = Array.isArray(heading) ? heading : [heading];

  return (
    <section className="bg-bg-blush pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <div
          className={
            image
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:gap-20"
              : "max-w-3xl"
          }
        >
          <Reveal className="flex flex-col gap-6">
            <p className="kicker">{kicker}</p>
            <h1 className="font-serif text-4xl leading-[1.25] font-medium text-balance sm:text-5xl lg:text-6xl">
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}{" "}
                </span>
              ))}
            </h1>
            {description ? (
              <p className="max-w-[52ch] text-[15px] leading-[1.95] text-ink-muted md:text-base">
                {description}
              </p>
            ) : null}
          </Reveal>

          {image ? (
            <Reveal delay={100}>
              <AssetImage
                src={image.src}
                alt={image.alt}
                ratio={image.ratio ?? "4/5"}
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
