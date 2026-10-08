import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

// Masked line-by-line headline reveal: each line slides up from an
// overflow-hidden mask — the signature editorial entrance.
interface RevealTextProps {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animate?: boolean; // set false to hold at hidden until flipped true
}

export function RevealText({
  lines,
  className = "",
  delay = 0,
  as = "h2",
  animate = true,
}: RevealTextProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} aria-label={lines.map(String).join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", rotate: 2 }}
            animate={animate ? { y: "0%", rotate: 0 } : undefined}
            whileInView={animate ? undefined : { y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
