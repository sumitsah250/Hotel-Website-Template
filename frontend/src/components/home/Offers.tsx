import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { offers } from "@/data/offers";
import { useCurrency, convertPriceText } from "@/lib/currency";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";

// Special offers: three editorial cards with image hover zoom.
export function Offers() {
  return (
    <section
      data-testid="offers"
      className="section-pad bg-ivory"
      aria-labelledby="offers-title"
    >
      <div className="container-royal">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-deep">
              <span className="h-px w-10 bg-gold" /> Offers
            </p>
          </FadeUp>
          <RevealText
            as="h2"
            className="h-section mt-5"
            lines={["Seasonal", <em key="o" className="italic text-gold-deep">privileges</em>]}
          />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {offers.map((offer, i) => (
            <FadeUp key={offer.slug} delay={i * 0.12} className={i === 1 ? "md:mt-12" : ""}>
              <Link
                to={`/offers#${offer.slug}`}
                data-testid={`offer-card-${offer.slug}`}
                data-cursor-label="View"
                className="group block"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <p className="eyebrow mt-6 text-gold-deep">{offer.eyebrow}</p>
                <h3 className="h-card mt-3">{offer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{offer.description}</p>
                <p className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                    {convertPriceText(offer.priceNote, useCurrency())}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
