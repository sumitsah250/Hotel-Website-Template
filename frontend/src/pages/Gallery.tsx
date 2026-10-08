import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { gallery } from "@/data/gallery";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp } from "@/components/motion/FadeUp";
import { Lightbox } from "@/components/shared/Lightbox";
import { EASE } from "@/lib/motion";

const ratioClass: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

// Gallery: category filter tabs + masonry grid + fullscreen lightbox.
export default function Gallery() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(gallery.map((g) => g.category)))],
    []
  );
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (cat === "All" ? gallery : gallery.filter((g) => g.category === cat)),
    [cat]
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        titleLines={["Postcards from", <em key="g" className="italic text-gold-light">the cliff</em>]}
        subcopy="The estate, the suites, the table and the water — as our guests' cameras found them."
        image="https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="The illuminated facade of the hotel at night"
      />

      <section className="section-pad bg-ivory" data-testid="gallery-page">
        <div className="container-royal">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                data-testid={`gallery-filter-${c.toLowerCase()}`}
                onClick={() => {
                  setCat(c);
                  setLightbox(null);
                }}
                className={`relative rounded-full px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  cat === c ? "text-charcoal" : "text-ink/50 hover:text-ink"
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>

          {/* Masonry */}
          <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
            {items.map((item, i) => (
              <FadeUp key={item.src} delay={(i % 3) * 0.08}>
                <motion.button
                  type="button"
                  layoutId={`gallery-${i}`}
                  data-testid={`gallery-item-${i}`}
                  data-cursor-label="View"
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden"
                  aria-label={`Open image: ${item.alt}`}
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
                </motion.button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        items={items}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
        layoutPrefix="gallery"
      />
    </>
  );
}
