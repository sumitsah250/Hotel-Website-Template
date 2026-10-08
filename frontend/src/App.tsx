import { lazy, Suspense, type ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SiteShell } from "@/components/layout/SiteShell";
import { EASE } from "@/lib/motion";

const Home = lazy(() => import("@/pages/Home"));
const Rooms = lazy(() => import("@/pages/Rooms"));
const RoomDetail = lazy(() => import("@/pages/RoomDetail"));
const Dining = lazy(() => import("@/pages/Dining"));
const Spa = lazy(() => import("@/pages/Spa"));
const Experiences = lazy(() => import("@/pages/Experiences"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const About = lazy(() => import("@/pages/About"));
const Offers = lazy(() => import("@/pages/Offers"));
const Journal = lazy(() => import("@/pages/Journal"));
const JournalArticle = lazy(() => import("@/pages/JournalArticle"));
const Contact = lazy(() => import("@/pages/Contact"));
const Booking = lazy(() => import("@/pages/Booking"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Smooth fade + slight rise between routes.
function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <Suspense fallback={<div className="min-h-screen" role="status">Loading page...</div>}>
        {children}
      </Suspense>
    </motion.main>
  );
}

const routes: { path: string; element: ReactNode }[] = [
  { path: "/", element: <Home /> },
  { path: "/rooms", element: <Rooms /> },
  { path: "/rooms/:slug", element: <RoomDetail /> },
  { path: "/dining", element: <Dining /> },
  { path: "/spa", element: <Spa /> },
  { path: "/experiences", element: <Experiences /> },
  { path: "/gallery", element: <Gallery /> },
  { path: "/about", element: <About /> },
  { path: "/offers", element: <Offers /> },
  { path: "/journal", element: <Journal /> },
  { path: "/journal/:slug", element: <JournalArticle /> },
  { path: "/contact", element: <Contact /> },
  { path: "/booking", element: <Booking /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
];

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={<PageTransition>{r.element}</PageTransition>}
          />
        ))}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SiteShell>
      <AnimatedRoutes />
    </SiteShell>
  );
}
