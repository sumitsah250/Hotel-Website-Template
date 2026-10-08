import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE } from "@/lib/motion";

// Smooth height-animated accordion. items: { q, a } pairs.
interface AccordionProps {
  items: { q: string; a: string }[];
  testIdPrefix?: string;
}

export function Accordion({ items, testIdPrefix = "faq" }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line border-y border-line" data-testid={`${testIdPrefix}-accordion`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              data-testid={`${testIdPrefix}-question-${i}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-heading text-lg md:text-xl">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-gold-deep"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ink/65">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
