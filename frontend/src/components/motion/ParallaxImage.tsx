import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "@/lib/motion";

// Image reveal (clip-path wipe + settle from scale 1.15) with scroll parallax.
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string; // classes for the outer frame (aspect, rounding)
  speed?: number; // parallax amplitude in %, default 8
  delay?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 8,
  delay = 0,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(14% 8% 14% 8%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y }}
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE, delay }}
        className="h-full w-full object-cover will-change-transform"
      />
    </motion.div>
  );
}
