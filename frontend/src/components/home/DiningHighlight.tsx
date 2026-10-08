import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site.js";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PillButton } from "@/components/motion/MagneticButton";

// Dining highlight: asymmetric split with overlapping imagery.
export function DiningHighlight() {
  return (
    <section
      data-testid="dining-highlight"
      className="section-pad bg-ivory"
      aria-labelledby="dining-title"
    >
      <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100"
            alt="The chef pouring sauce over a plated dish at Lume"
            speed={7}
            className="aspect-[4/5] w-[82%]"
          />
          <ParallaxImage
            src="https://images.unsplash.com/photo-1509710398975-6454dcdf049f?crop=entropy&cs=srgb&fm=jpg&q=85&w=640"
            alt="A stemmed glass catching candlelight"
            speed={13}
            delay={0.15}
            className="absolute -bottom-12 right-0 aspect-square w-[44%] border-[10px] border-ivory shadow-2xl"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" /> Dining
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="h-section mt-5"
            lines={["Lume — fire,", <em key="d" className="italic text-gold-deep">tide &amp; citrus</em>]}
          />
          <FadeUp delay={0.25} className="mt-7 max-w-md space-y-5 text-sm leading-relaxed text-ink/70 md:text-base">
            <p>
              Our kitchen answers to the morning market and the evening tide.
              Seven courses, one long candlelit room, and a cellar that leans
              toward small Riviera producers.
            </p>
            <p>
              The Gilt Bar pours until the last guest goes upstairs — which is
              to say, never too early.
            </p>
          </FadeUp>
          <FadeUp delay={0.35} className="mt-8 space-y-3 border-t border-line pt-6 text-xs uppercase tracking-[0.18em] text-sand">
            <p className="flex justify-between gap-6">
              <span>Dinner</span>
              <span className="text-ink">{site.hours.restaurant}</span>
            </p>
            <p className="flex justify-between gap-6">
              <span>Chef's counter</span>
              <span className="text-ink">Six seats, by reservation</span>
            </p>
          </FadeUp>
          <FadeUp delay={0.45} className="mt-9 flex flex-wrap gap-4">
            <PillButton to="/dining" variant="dark" testId="dining-explore-cta">
              Explore dining
            </PillButton>
            <a
              href="/dining#reserve"
              data-testid="dining-reserve-cta"
              className="group inline-flex items-center gap-2 px-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            >
              <span className="link-draw">Reserve a table</span>
              <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
