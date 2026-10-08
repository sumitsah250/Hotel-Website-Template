import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Maximize2, Users } from "lucide-react";
import { rooms, type Room } from "@/data/rooms";
import { useCurrency, formatMoney } from "@/lib/currency";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      to={`/rooms/${room.slug}`}
      data-testid={`room-card-${room.slug}`}
      data-cursor-label="View"
      className="group block w-[78vw] shrink-0 snap-center sm:w-[24rem] lg:w-[30rem]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/5">
        <img
          src={room.image}
          alt={room.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        {room.tag && (
          <span className="absolute left-4 top-4 bg-charcoal/85 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.25em] text-gold-light backdrop-blur">
            {room.tag}
          </span>
        )}
        <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="h-card">{room.name}</h3>
          <p className="mt-2 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.18em] text-sand">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> {room.size} m²
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3 w-3" strokeWidth={1.5} /> {room.capacity} guests
            </span>
          </p>
        </div>
        <p className="text-right">
          <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-sand">From</span>
          <span className="font-heading text-xl text-gold-deep">{formatMoney(room.price, useCurrency())}</span>
        </p>
      </div>
    </Link>
  );
}

// Featured rooms: pinned horizontal scroll on desktop (GSAP ScrollTrigger),
// touch-friendly snap carousel on mobile.
export function FeaturedRooms() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const distance = () => track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="featured-rooms"
      className="overflow-hidden bg-ivory py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
      aria-labelledby="rooms-title"
    >
      <div className="container-royal flex items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" /> Stay
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="h-section mt-5"
            lines={["Rooms, suites", "& quiet corners"]}
          />
        </div>
        <FadeUp delay={0.2} className="hidden shrink-0 lg:block">
          <Link
            to="/rooms"
            data-testid="rooms-view-all"
            className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
          >
            <span className="link-draw">View all rooms</span>
            <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </FadeUp>
      </div>

      <div
        ref={trackRef}
        data-cursor-label="Drag"
        className="container-royal mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {rooms.map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
        {/* end card */}
        <Link
          to="/rooms"
          className="group grid w-[60vw] shrink-0 snap-center place-items-center border border-line sm:w-[20rem]"
          data-testid="rooms-end-card"
        >
          <span className="flex flex-col items-center gap-4 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-gold text-gold-deep transition-colors duration-500 group-hover:bg-gold group-hover:text-charcoal">
              <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
            </span>
            <span className="font-heading text-xl italic text-ink/70">All 42 rooms &amp; suites</span>
          </span>
        </Link>
      </div>

      <div className="container-royal mt-8 lg:hidden">
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-sand">Swipe to explore</p>
      </div>
    </section>
  );
}
