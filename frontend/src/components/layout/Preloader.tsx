import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { site } from "@/config/site.js";
import { EASE } from "@/lib/motion";

// Preloader: serif monogram + thin gold progress line, then a curtain
// clip-path reveal. Skippable by click/tap; shown once per session.
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: EASE,
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => window.setTimeout(onDone, 300),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      data-testid="preloader"
      role="button"
      aria-label="Skip intro"
      onClick={onDone}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-charcoal text-cream"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.span
        className="font-heading text-7xl md:text-8xl text-gold"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {site.monogram}
      </motion.span>
      <motion.span
        className="eyebrow mt-4 text-cream/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {site.name}
      </motion.span>

      <div className="mt-10 h-px w-52 bg-cream/15">
        <div
          className="h-full bg-gold transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-3 text-[0.65rem] tracking-[0.3em] text-cream/40 tabular-nums">
        {progress}%
      </span>
      <span className="absolute bottom-8 text-[0.6rem] uppercase tracking-[0.3em] text-cream/30">
        Tap to skip
      </span>
    </motion.div>
  );
}
