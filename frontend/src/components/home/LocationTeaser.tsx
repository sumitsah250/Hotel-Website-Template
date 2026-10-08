import { site } from "@/config/site.js";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PillButton } from "@/components/motion/MagneticButton";

// Location teaser: split editorial layout with transfer times.
export function LocationTeaser() {
  const { location } = site;
  return (
    <section
      data-testid="location-teaser"
      className="section-pad border-t border-line bg-ivory"
      aria-labelledby="location-title"
    >
      <div className="container-royal grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" /> {location.eyebrow}
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="h-section mt-5"
            lines={[location.titleLines[0], <em key="l" className="italic text-gold-deep">{location.titleLines[1]}</em>]}
          />
          <FadeUp delay={0.25} className="mt-7 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
            <p>{location.body}</p>
          </FadeUp>
          <FadeUp delay={0.35} className="mt-8 divide-y divide-line border-y border-line">
            {location.transfers.map((t) => (
              <p key={t.label} className="flex items-center justify-between py-4 text-xs uppercase tracking-[0.18em]">
                <span className="text-sand">{t.label}</span>
                <span className="text-ink">{t.value}</span>
              </p>
            ))}
          </FadeUp>
          <FadeUp delay={0.45} className="mt-9">
            <PillButton to="/contact" variant="dark" testId="location-contact-cta">
              Plan your journey
            </PillButton>
          </FadeUp>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <ParallaxImage
            src={location.image}
            alt={location.imageAlt}
            speed={8}
            className="aspect-[16/10] w-full"
          />
        </div>
      </div>
    </section>
  );
}
