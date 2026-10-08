import { motion, useScroll, useSpring } from "motion/react";

// Thin champagne-gold scroll progress bar fixed to the top edge.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      data-testid="scroll-progress"
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[160] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  );
}
