import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { FadeUp } from "@/components/motion/FadeUp";
import { EASE } from "@/lib/motion";

// Testimonials slider: auto-advancing, with arrows and a gold index line.
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => window.clearInterval(id);
  }, [paused, total]);

  const t = testimonials[index];

  return (
    <section
      data-testid="testimonials"
      className="section-pad bg-charcoal text-cream"
      aria-label="Guest testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-royal">
        <FadeUp>
          <p className="eyebrow flex items-center justify-center gap-4 text-gold-light">
            <span className="h-px w-10 bg-gold" /> Guest book <span className="h-px w-10 bg-gold" />
          </p>
        </FadeUp>

        <div className="relative mx-auto mt-12 min-h-[16rem] max-w-4xl text-center md:min-h-[14rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <blockquote className="font-heading text-xl italic leading-relaxed md:text-3xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="text-sm font-semibold tracking-wide">{t.name}</p>
                <p className="eyebrow mt-2 text-cream/50">
                  {t.origin} · {t.context}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            data-testid="testimonial-prev"
            aria-label="Previous testimonial"
            onClick={() => setIndex((index - 1 + total) % total)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-light transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="text-[0.65rem] tabular-nums tracking-[0.3em] text-cream/50">
            {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            data-testid="testimonial-next"
            aria-label="Next testimonial"
            onClick={() => setIndex((index + 1) % total)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-light transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
