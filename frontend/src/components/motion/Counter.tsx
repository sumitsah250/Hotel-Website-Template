import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { EASE } from "@/lib/motion";

// Number counter that animates once when scrolled into view.
interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function Counter({ value, suffix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className} data-testid="counter-value">
      {display}
      {suffix}
    </span>
  );
}
