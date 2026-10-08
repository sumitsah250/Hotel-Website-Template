import { ArrowRight } from "lucide-react";
import { offers } from "@/data/offers";
import { useCurrency, convertPriceText } from "@/lib/currency";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp } from "@/components/motion/FadeUp";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { PillButton } from "@/components/motion/MagneticButton";

// Offers & packages: alternating editorial rows.
export default function Offers() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        titleLines={["Seasonal", <em key="o" className="italic text-gold-light">privileges</em>]}
        subcopy="A small number of considered packages each season — never discounts, always additions."
        image="https://images.unsplash.com/photo-1689672235501-6dc1e56d454c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="A composed plate beside a glass of white wine"
      />

      <section className="section-pad bg-ivory" data-testid="offers-page">
        <div className="container-royal space-y-28">
          {offers.map((offer, i) => (
            <div
              key={offer.slug}
              id={offer.slug}
              className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-12"
              data-testid={`offer-${offer.slug}`}
            >
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ParallaxImage src={offer.image} alt={offer.imageAlt} speed={7} className="aspect-[16/10] w-full" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <FadeUp>
                  <p className="eyebrow text-gold-deep">{offer.eyebrow}</p>
                  <h2 className="h-section mt-4">{offer.title}</h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
                    {offer.description}
                  </p>
                  <p className="mt-6 border-t border-line pt-5 font-heading text-xl italic text-gold-deep">
                    {convertPriceText(offer.priceNote, useCurrency())}
                  </p>
                  <div className="mt-8">
                    <PillButton to={`/booking?offer=${offer.slug}`} variant="dark" testId={`offer-book-${offer.slug}`}>
                      Enquire &amp; book <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </PillButton>
                  </div>
                </FadeUp>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
