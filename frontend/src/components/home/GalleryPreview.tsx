import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/data/gallery";
import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";

const ratioClass: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

// Masonry gallery preview (CSS columns), each tile links to the gallery.
export function GalleryPreview() {
  const items = gallery.slice(0, 6);
  return (
    <section
      data-testid="gallery-preview"
      className="section-pad bg-ivory"
      aria-labelledby="gallery-title"
    >
      <div className="container-royal">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeUp>
              <p className="eyebrow flex items-center gap-4 text-gold-deep">
                <span className="h-px w-10 bg-gold" /> Gallery
              </p>
            </FadeUp>
            <RevealText
              as="h2"
              className="h-section mt-5"
              lines={["Postcards from", <em key="g" className="italic text-gold-deep">the cliff</em>]}
            />
          </div>
          <FadeUp delay={0.2}>
            <Link
              to="/gallery"
              data-testid="gallery-view-all"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em]"
            >
              <span className="link-draw">Open the gallery</span>
              <ArrowRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </FadeUp>
        </div>

        <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {items.map((item, i) => (
            <FadeUp key={item.src} delay={(i % 3) * 0.1}>
              <Link
                to="/gallery"
                data-cursor-label="View"
                data-testid={`gallery-tile-${i}`}
                className="group relative block overflow-hidden"
                aria-label={`Open gallery — ${item.alt}`}
              >
                <div className={`${ratioClass[item.ratio]} w-full overflow-hidden`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25" />
                <span className="absolute bottom-3 left-3 translate-y-2 bg-ivory/90 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.2em] text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.category}
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
