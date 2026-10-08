import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

// Fade-up + blur-to-sharp reveal for paragraphs, cards and blocks.
interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function FadeUp({ children, className, delay = 0, y = 36 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
