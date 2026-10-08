import { treatments, wellness } from "@/data/spa";
import { useCurrency, convertPriceText } from "@/lib/currency";
import { site } from "@/config/site.js";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PillButton } from "@/components/motion/MagneticButton";

// Spa & Wellness: philosophy, treatment list, thermal facilities.
export default function Spa() {
  return (
    <>
      <PageHero
        eyebrow="Spa & Wellness"
        titleLines={["The art of", <em key="s" className="italic text-gold-light">standing still</em>]}
        subcopy="A candlelit spa cut into the cliff, rituals built on citrus and sea salt, and pools that keep their own silence."
        image="https://images.unsplash.com/photo-1776763018829-ad685e621871?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="Lounge chairs beside the indoor thermal pool"
      />

      {/* Philosophy */}
      <section className="section-pad bg-ivory" data-testid="spa-philosophy">
        <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Philosophy"
              lines={["Rest is", <em key="p" className="italic text-gold-deep">a skill</em>]}
            />
            <FadeUp delay={0.2} className="mt-7 max-w-md space-y-5 text-sm leading-relaxed text-ink/70 md:text-base">
              <p>
                Our spa director insists her work is subtraction: removing urgency
                until what remains is a person lying still, listening to water.
              </p>
              <p>
                Six treatment rooms, a thermal circuit, and one rule carried over
                from the house itself — nothing here is ever hurried.
              </p>
            </FadeUp>
            <FadeUp delay={0.3} className="mt-8">
              <p className="eyebrow text-sand">Open {site.hours.spa}</p>
            </FadeUp>
          </div>
          <div className="relative lg:col-span-7">
            <ParallaxImage src={wellness.ritualImage} alt={wellness.ritualAlt} speed={7} className="aspect-[4/3] w-[85%]" />
            <ParallaxImage
              src="https://images.unsplash.com/photo-1720118509152-2df877673bee?crop=entropy&cs=srgb&fm=jpg&q=85&w=700"
              alt="A candlelit bath drawn for the dusk ritual"
              speed={12}
              delay={0.15}
              className="absolute -bottom-12 right-0 aspect-square w-[42%] border-[10px] border-ivory shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="section-pad border-t border-line bg-ivory" data-testid="spa-treatments">
        <div className="container-royal">
          <SectionHeader
            eyebrow="The Rituals"
            lines={["Treatments &", <em key="t" className="italic text-gold-deep">ceremonies</em>]}
            className="max-w-2xl"
          />
          <div className="mt-14 divide-y divide-line border-y border-line">
            {treatments.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.06}>
                <div className="group grid gap-2 py-7 transition-colors duration-500 hover:bg-white md:grid-cols-12 md:items-baseline md:gap-6 md:px-4" data-testid={`treatment-${i}`}>
                  <h3 className="h-card md:col-span-4">{t.name}</h3>
                  <p className="text-sm leading-relaxed text-ink/60 md:col-span-5">{t.description}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-sand md:col-span-2 md:text-right">
                    {t.duration}
                  </p>
                  <p className="font-heading text-xl text-gold-deep md:col-span-1 md:text-right">{convertPriceText(t.price, useCurrency())}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-10">
            <PillButton to="/contact" variant="dark" testId="spa-enquire-cta">
              Reserve a ritual
            </PillButton>
          </FadeUp>
        </div>
      </section>

      {/* Pools */}
      <section className="section-pad bg-charcoal text-cream" data-testid="spa-pools">
        <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ParallaxImage src={wellness.poolsImage} alt={wellness.poolsAlt} speed={8} className="aspect-[16/10] w-full" />
          </div>
          <div className="lg:col-span-5">
            <SectionHeader
              dark
              eyebrow="Water"
              lines={["Three pools,", <em key="w" className="italic text-gold-light">one silence</em>]}
            />
            <FadeUp delay={0.2} className="mt-7 max-w-md space-y-5 text-sm leading-relaxed text-cream/65">
              <p>
                The cliff-edge infinity pool holds 28 degrees from April to
                November. Below it, cut into the rock: the thermal pool, the
                steam room and the cold plunge.
              </p>
              <p>
                Sunrise yoga happens on the deck above the water, and the sauna
                keeps a window facing the sea — heat is better with a horizon.
              </p>
            </FadeUp>
            <FadeUp delay={0.3} className="mt-8 space-y-3 border-t border-line-light pt-6 text-xs uppercase tracking-[0.18em] text-cream/50">
              <p className="flex justify-between gap-6"><span>Infinity pool</span><span className="text-cream">{site.hours.pool}</span></p>
              <p className="flex justify-between gap-6"><span>Thermal circuit</span><span className="text-cream">{site.hours.spa}</span></p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
