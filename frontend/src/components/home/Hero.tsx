import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/config/site.js";
import { useIntro } from "@/lib/SiteContext";
import { RevealText } from "@/components/motion/RevealText";
import { PillButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";

// Cinematic fullscreen hero: Ken-Burns slideshow, masked headline reveal
// (waits for the preloader), parallax fade on scroll, slide indicators.
export function Hero() {
  const { introDone } = useIntro();
  const [active, setActive] = useState(0);
  const slides = site.hero.slides;

  useEffect(() => {
    if (!introDone || slides.length < 2) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6000
    );
    return () => window.clearInterval(id);
  }, [introDone, slides.length]);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, 140]);
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section
      data-testid="hero"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-charcoal text-cream"
    >
      {/* Slideshow */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            decoding="async"
            className={`h-full w-full object-cover ${i === active ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}
      {/* scrim for WCAG contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.28) 48%, rgba(18,18,18,0.78) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-royal relative z-10 pb-40 md:pb-44"
      >
        <motion.p
          className="eyebrow flex items-center gap-4 text-gold-light"
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <span className="h-px w-10 bg-gold" />
          {site.hero.eyebrow}
        </motion.p>

        <RevealText
          as="h1"
          animate={introDone}
          delay={0.3}
          className="h-display mt-6 max-w-5xl"
          lines={[
            site.hero.titleLines[0],
            <em key="l2" className="italic text-gold-light">
              {site.hero.titleLines[1]}
            </em>,
          ]}
        />

        <motion.p
          className="mt-7 max-w-md text-sm leading-relaxed text-cream/75 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
        >
          {site.hero.subcopy}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          <PillButton to="/rooms" variant="light" testId="hero-explore-cta">
            Explore the estate
          </PillButton>
          <PillButton to="/booking" variant="outline-light" testId="hero-reserve-cta">
            Reserve your stay
          </PillButton>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-40 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[0.58rem] uppercase tracking-[0.35em] text-cream/50">Scroll</span>
        <span className="h-10 w-px overflow-hidden">
          <span className="animate-scroll-hint block h-full w-full bg-gold" />
        </span>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-40 right-6 z-10 hidden flex-col items-end gap-3 md:flex lg:right-14">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            data-testid={`hero-slide-${i}`}
            aria-label={`Show slide ${i + 1}: ${s.alt}`}
            onClick={() => setActive(i)}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-[0.6rem] tabular-nums tracking-[0.25em] transition-colors ${
                i === active ? "text-gold" : "text-cream/40 group-hover:text-cream/70"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                i === active ? "w-10 bg-gold" : "w-5 bg-cream/30 group-hover:bg-cream/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* mobile scroll cue */}
      <div className="absolute bottom-36 left-1/2 z-10 -translate-x-1/2 md:hidden">
        <ArrowDown className="animate-float-soft h-4 w-4 text-cream/60" strokeWidth={1.5} />
      </div>
    </section>
  );
}
