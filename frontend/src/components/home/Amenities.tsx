import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";

interface Amenity {
  title: string;
  blurb: string;
  to: string;
  image: string;
  alt: string;
}

const amenities: Amenity[] = [
  {
    title: "The Infinity Edge",
    blurb: "Saltwater, 28 degrees, and a horizon that never repeats itself.",
    to: "/spa",
    image:
      "https://images.unsplash.com/photo-1557750505-e7b4d1c40410?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "A swimmer in the infinity pool at sunrise",
  },
  {
    title: "Spa & Thermal Suite",
    blurb: "Candlelit rituals built on citrus oil, warm stone and silence.",
    to: "/spa",
    image:
      "https://images.unsplash.com/photo-1776763018829-ad685e621871?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Lounge chairs beside the indoor thermal pool",
  },
  {
    title: "The Gilt Bar",
    blurb: "Vermouths, amari and a martini trolley that comes to you.",
    to: "/dining",
    image:
      "https://images.unsplash.com/photo-1623408859815-22534357b3db?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "A bartender pouring a cocktail in low golden light",
  },
  {
    title: "Private Jetty",
    blurb: "Arrive by sea. Departures are politely discouraged.",
    to: "/experiences",
    image:
      "https://images.unsplash.com/photo-1588504633950-9dc518941e93?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    alt: "Wooden deck resting over still water",
  },
];

// Amenities: dark section, image-led cards with hover reveals.
export function Amenities() {
  return (
    <section
      data-testid="amenities"
      className="section-pad bg-charcoal text-cream"
      aria-labelledby="amenities-title"
    >
      <div className="container-royal">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeUp>
              <p className="eyebrow flex items-center gap-4 text-gold-light">
                <span className="h-px w-10 bg-gold" /> The Estate
              </p>
            </FadeUp>
            <RevealText
              as="h2"
              className="h-section mt-5"
              lines={["Every hour,", <em key="a" className="italic text-gold-light">considered</em>]}
            />
          </div>
          <FadeUp delay={0.2} className="max-w-sm text-sm leading-relaxed text-cream/60">
            Fourteen acres of terraced gardens, three pools and one rule: nothing
            here should ever feel hurried.
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => (
            <FadeUp key={a.title} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-12" : ""}>
              <Link
                to={a.to}
                data-testid={`amenity-${a.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                data-cursor-label="View"
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-xl">{a.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-cream/70 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
                      {a.blurb}
                    </p>
                  </div>
                  <span className="absolute right-4 top-4 grid h-9 w-9 -translate-y-2 place-items-center rounded-full bg-cream/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
