import { useCallback, useEffect } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EASE } from "@/lib/motion";

export interface LightboxItem {
  src: string;
  alt: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  layoutPrefix: string;
}

// Fullscreen lightbox with shared-element entry (layoutId), keyboard
// navigation and horizontal swipe/drag to move between images.
export function Lightbox({ items, index, onClose, onIndex, layoutPrefix }: LightboxProps) {
  const open = index !== null;
  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) step(1);
    else if (info.offset.x > 70) step(-1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[250] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          <button
            type="button"
            data-testid="lightbox-close"
            aria-label="Close viewer"
            onClick={onClose}
            className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>

          <motion.img
            key={index}
            layoutId={`${layoutPrefix}-${index}`}
            src={items[index].src}
            alt={items[index].alt}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[88vw] cursor-grab object-contain active:cursor-grabbing"
            transition={{ duration: 0.5, ease: EASE }}
          />

          <div
            className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-5 text-cream md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-md text-xs text-cream/60">{items[index].alt}</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                data-testid="lightbox-prev"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <span className="text-[0.65rem] tabular-nums tracking-[0.3em] text-cream/60">
                {String(index + 1).padStart(2, "0")} — {String(items.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                data-testid="lightbox-next"
                aria-label="Next image"
                onClick={() => step(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
