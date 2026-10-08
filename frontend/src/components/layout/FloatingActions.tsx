import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/config/site.js";
import { EASE } from "@/lib/motion";

// Floating cluster: WhatsApp, Book Now and back-to-top, revealed after scroll.
export function FloatingActions() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 480));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="floating-actions"
          className="fixed bottom-5 right-5 z-[140] flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button
            type="button"
            data-testid="back-to-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-ivory/90 text-ink shadow-lg backdrop-blur transition-colors hover:bg-gold hover:text-charcoal"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            data-testid="whatsapp-button"
            aria-label="Chat on WhatsApp"
            className="grid h-12 w-12 place-items-center rounded-full bg-charcoal text-gold shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <Link
            to="/booking"
            data-testid="floating-book-button"
            className="btn-fill rounded-full bg-gold px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-charcoal shadow-xl transition-colors duration-500 hover:bg-charcoal hover:text-gold"
          >
            Book now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
