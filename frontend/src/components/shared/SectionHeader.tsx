import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";

interface SectionHeaderProps {
  eyebrow: string;
  lines: ReactNode[];
  dark?: boolean;
  className?: string;
}

// Eyebrow + masked section heading, light or dark themed.
export function SectionHeader({ eyebrow, lines, dark = false, className = "" }: SectionHeaderProps) {
  return (
    <div className={className}>
      <FadeUp>
        <p className={`eyebrow flex items-center gap-4 ${dark ? "text-gold-light" : "text-gold-deep"}`}>
          <span className="h-px w-10 bg-gold" /> {eyebrow}
        </p>
      </FadeUp>
      <RevealText as="h2" className="h-section mt-5" lines={lines} />
    </div>
  );
}
