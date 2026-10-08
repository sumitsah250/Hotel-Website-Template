import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/lib/useLenis";
import { IntroContext } from "@/lib/SiteContext";
import { Preloader } from "@/components/layout/Preloader";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { CookieBanner } from "@/components/layout/CookieBanner";

// Site chrome: Lenis smooth scroll, preloader (once per session), cursor,
// navbar, footer and floating utilities around every page.
export function SiteShell({ children }: { children: ReactNode }) {
  const lenisRef = useLenis();
  const location = useLocation();
  const [intro, setIntro] = useState(() => {
    try {
      return !sessionStorage.getItem("rs_intro");
    } catch {
      return false;
    }
  });

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem("rs_intro", "1");
    } catch {
      /* private mode */
    }
    setIntro(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(t);
  }, [location.pathname, lenisRef]);

  return (
    <IntroContext.Provider value={{ introDone: !intro }}>
      <AnimatePresence>{intro && <Preloader onDone={finishIntro} />}</AnimatePresence>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <FloatingActions />
      <CookieBanner />
    </IntroContext.Provider>
  );
}
