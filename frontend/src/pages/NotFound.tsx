import { motion } from "motion/react";
import { site } from "@/config/site.js";
import { PillButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";

// Custom 404 — a quiet corridor that leads nowhere.
export default function NotFound() {
  return (
    <section
      data-testid="not-found"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-charcoal text-center text-cream"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none select-none font-heading italic leading-none text-cream/[0.05]"
        style={{ fontSize: "clamp(12rem, 34vw, 30rem)" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        404
      </motion.span>
      <div className="relative z-10 px-6">
        <motion.p
          className="eyebrow text-gold-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          Lost corridor
        </motion.p>
        <motion.h1
          className="h-section mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        >
          This door leads <em className="italic text-gold-light">nowhere</em>
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-cream/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          The page you were looking for has checked out. Let us walk you back to
          the lobby of {site.name}.
        </motion.p>
        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
        >
          <PillButton to="/" variant="gold" testId="not-found-home-cta">
            Back to the lobby
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}
