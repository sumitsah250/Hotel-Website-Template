import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/config/site.js";
import { FadeUp } from "@/components/motion/FadeUp";

// Full-width parallax image break with the founder's quote.
export function QuoteBreak() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      data-testid="quote-break"
      className="relative flex min-h-[75vh] items-center overflow-hidden"
      aria-label="Founder's quote"
    >
      <motion.img
        src={site.quote.image}
        alt={site.quote.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="absolute inset-0 h-[124%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="container-royal relative z-10 py-24 text-center text-cream">
        <FadeUp>
          <span aria-hidden="true" className="font-heading text-7xl italic leading-none text-gold">
            “
          </span>
          <blockquote className="mx-auto mt-2 max-w-4xl font-heading text-2xl italic leading-snug md:text-4xl">
            {site.quote.text}
          </blockquote>
          <p className="eyebrow mt-8 text-gold-light">{site.quote.attribution}</p>
        </FadeUp>
      </div>
    </section>
  );
}
