import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useSpring } from "motion/react";
import { Link } from "react-router-dom";

// Magnetic hover wrapper — the child drifts toward the cursor with a soft spring.
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 16, mass: 0.4 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

type Variant = "dark" | "light" | "gold" | "outline-dark" | "outline-light";

const base =
  "btn-fill inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500";
const variants: Record<Variant, string> = {
  dark: "bg-ink text-cream hover:text-charcoal",
  light: "bg-cream text-ink hover:text-charcoal",
  gold: "bg-gold text-charcoal",
  "outline-dark": "border border-ink/30 text-ink hover:text-charcoal hover:border-gold",
  "outline-light": "border border-cream/40 text-cream hover:text-charcoal hover:border-gold",
};

interface PillButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  testId?: string;
  magnetic?: boolean;
}

export function PillButton({
  children,
  to,
  href,
  onClick,
  variant = "dark",
  className = "",
  type = "button",
  testId,
  magnetic = true,
}: PillButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = to ? (
    <Link to={to} className={cls} data-testid={testId}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={cls} data-testid={testId} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls} data-testid={testId}>
      {children}
    </button>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
