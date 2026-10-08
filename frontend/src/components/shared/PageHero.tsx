import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";

interface PageHeroProps {
  eyebrow: string;
  titleLines: ReactNode[];
  subcopy?: string;
  image: string;
  imageAlt: string;
}

// Shared inner-page hero: Ken-Burns image, scrim, eyebrow + masked headline.
export function PageHero({ eyebrow, titleLines, subcopy, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[64svh] items-end overflow-hidden bg-charcoal text-cream">
      <img
        src={image}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="animate-kenburns absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0.22) 45%, rgba(18,18,18,0.82) 100%)",
        }}
      />
      <div className="container-royal relative z-10 pb-16 pt-40 md:pb-20">
        <FadeUp>
          <p className="eyebrow flex items-center gap-4 text-gold-light">
            <span className="h-px w-10 bg-gold" /> {eyebrow}
          </p>
        </FadeUp>
        <RevealText as="h1" className="h-display mt-5 max-w-4xl" lines={titleLines} delay={0.15} />
        {subcopy && (
          <FadeUp delay={0.45}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/75 md:text-base">
              {subcopy}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
