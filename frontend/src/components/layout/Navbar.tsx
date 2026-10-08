import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site.js";
import { PillButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";
import { useCurrency, cycleCurrency } from "@/lib/currency";

const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [langIdx, setLangIdx] = useState(0);
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
    setHidden(y > last.current && y > 160);
    last.current = y;
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const theme = solid && !open ? "text-ink" : "text-cream";

  return (
    <>
      <motion.header
        data-testid="navbar"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[150] transition-[background-color,border-color,backdrop-filter,color] duration-500 ${theme} ${
          solid && !open
            ? "border-b border-line bg-ivory/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-royal flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link" aria-label={`${site.name} — home`}>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/70 font-heading text-sm text-gold">
              {site.monogram}
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg tracking-wide">{site.name}</span>
              <span className="mt-1 text-[0.55rem] uppercase tracking-[0.32em] opacity-60">
                Hotel &amp; Sanctuary
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={`nav-link-${toSlug(item.label)}`}
                className="link-draw text-[0.68rem] font-medium uppercase tracking-[0.2em] opacity-90 transition-opacity hover:opacity-100"
              >
                {({ isActive }) => (
                  <span data-active={isActive} className="link-draw">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-testid="language-switcher"
              onClick={() => setLangIdx((i) => (i + 1) % site.languages.length)}
              className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 md:block"
              aria-label="Switch language (demo)"
            >
              {site.languages[langIdx]}
            </button>
            <span className="hidden h-3 w-px bg-current opacity-30 md:block" />
            <button
              type="button"
              data-testid="currency-switcher"
              onClick={() => cycleCurrency(site.currencies)}
              className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 md:block"
              aria-label="Switch currency"
            >
              {useCurrency()}
            </button>
            <span className="hidden lg:inline-block">
              <PillButton to="/booking" variant="gold" testId="book-now-button" className="!px-6 !py-2.5">
                Book now
              </PillButton>
            </span>
            <button
              type="button"
              data-testid="mobile-menu-button"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[200] flex flex-col bg-charcoal text-cream"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="container-royal flex h-20 items-center justify-between">
              <span className="font-heading text-lg">{site.name}</span>
              <button
                type="button"
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" strokeWidth={1.25} />
              </button>
            </div>
            <nav className="container-royal flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
              {[...site.nav, { label: "Offers", to: "/offers" }, { label: "Journal", to: "/journal" }].map(
                (item, i) => (
                  <motion.div
                    key={item.to + item.label}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-${toSlug(item.label)}`}
                      className="group flex items-baseline gap-4 border-b border-line-light py-3"
                    >
                      <span className="text-[0.6rem] tracking-[0.3em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-3xl transition-colors group-hover:text-gold-light sm:text-4xl">
                        {item.label}
                      </span>
                    </NavLink>
                  </motion.div>
                )
              )}
            </nav>
            <motion.div
              className="container-royal flex flex-wrap items-center justify-between gap-4 pb-8 text-xs text-cream/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span>{site.contact.phone}</span>
              <span>{site.contact.email}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
