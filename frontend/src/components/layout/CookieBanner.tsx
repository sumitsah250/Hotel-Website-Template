import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";

const KEY = "rs_cookie_consent";

// Quiet cookie notice — accepts/declines persist to localStorage.
export function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(KEY);
    } catch {
      return false;
    }
  });

  const answer = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* private mode */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="cookie-banner"
          role="dialog"
          aria-label="Cookie notice"
          className="fixed bottom-5 left-5 z-[140] max-w-xs border border-line bg-ivory/95 p-5 shadow-xl backdrop-blur"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
        >
          <p className="text-xs leading-relaxed text-ink/70">
            We use a few quiet cookies to remember your preferences. Nothing
            follows you home.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              data-testid="cookie-accept"
              onClick={() => answer("accepted")}
              className="flex-1 bg-ink px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:text-charcoal"
            >
              Accept
            </button>
            <button
              type="button"
              data-testid="cookie-decline"
              onClick={() => answer("declined")}
              className="flex-1 border border-ink/20 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
