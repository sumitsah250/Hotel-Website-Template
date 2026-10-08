import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Custom cursor: a small gold dot + trailing ring. Grows over interactive
// elements; shows a label (e.g. "View", "Drag") from data-cursor-label.
// Disabled entirely on touch devices.
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor-label]");
      const interactive = t.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor]'
      );
      setLabel(labelled?.dataset.cursorLabel ?? "");
      setHover(Boolean(interactive || labelled));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ x: mx, y: my, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[299] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 transition-[width,height,background-color] duration-300 ${
          label
            ? "h-20 w-20 bg-charcoal/80 backdrop-blur-sm"
            : hover
              ? "h-14 w-14 bg-gold/10"
              : "h-9 w-9"
        }`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        {label && (
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-gold-light">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
