import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site.js";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Counter } from "@/components/motion/Counter";

// About teaser: asymmetric parallax imagery + animated counters.
export function Intro() {
  const { intro } = site;
  return (
    <section data-testid="intro" className="section-pad bg-ivory" aria-labelledby="intro-title">
      <div className="container-royal grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" />
              {intro.eyebrow}
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="h-section mt-6"
            lines={[
              intro.titleLines[0],
              <em key="i2" className="italic text-gold-deep">
                {intro.titleLines[1]}
              </em>,
            ]}
          />
          <FadeUp delay={0.25} className="mt-8 max-w-md space-y-5 text-sm leading-relaxed text-ink/70 md:text-base">
            {intro.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </FadeUp>
          <FadeUp delay={0.4} className="mt-9">
            <a
              href="/about"
              data-testid="intro-story-link"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink"
            >
              <span className="link-draw">Our story</span>
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </FadeUp>
        </div>

        {/* Overlapping parallax images */}
        <div className="relative lg:col-span-7">
          <ParallaxImage
            src={intro.images[0].src}
            alt={intro.images[0].alt}
            speed={6}
            className="aspect-[4/5] w-[78%]"
          />
          <ParallaxImage
            src={intro.images[1].src}
            alt={intro.images[1].alt}
            speed={12}
            delay={0.15}
            className="absolute -bottom-14 right-0 aspect-[4/3] w-[52%] border-[10px] border-ivory shadow-2xl"
          />
        </div>
      </div>

      {/* Counters */}
      <div className="container-royal mt-28 lg:mt-32">
        <div className="grid grid-cols-2 gap-y-10 border-t border-line pt-12 md:grid-cols-4">
          {intro.stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} className="text-center md:text-left">
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-heading text-5xl text-ink md:text-6xl"
              />
              <p className="eyebrow mt-3 text-sand">{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
