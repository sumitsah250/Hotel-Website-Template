import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { journalPosts } from "@/data/journal";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp } from "@/components/motion/FadeUp";

// Journal listing: featured first story + editorial grid.
export default function Journal() {
  const [featured, ...rest] = journalPosts;
  return (
    <>
      <PageHero
        eyebrow="Journal"
        titleLines={["Letters from", <em key="j" className="italic text-gold-light">the cliff</em>]}
        subcopy="Harvest notes, kitchen diaries and the occasional defence of doing nothing."
        image="https://images.unsplash.com/photo-1739520081275-f893dc11fbd6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
        imageAlt="The estate courtyard at dusk"
      />

      <section className="section-pad bg-ivory" data-testid="journal-list">
        <div className="container-royal">
          {/* Featured */}
          <FadeUp>
            <Link to={`/journal/${featured.slug}`} data-testid={`journal-featured`} data-cursor-label="Read" className="group grid items-center gap-10 lg:grid-cols-12">
              <div className="overflow-hidden lg:col-span-7">
                <img
                  src={featured.image}
                  alt={featured.imageAlt}
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="lg:col-span-5">
                <p className="eyebrow text-gold-deep">
                  {featured.category} · {format(parseISO(featured.date), "d MMMM yyyy")}
                </p>
                <h2 className="h-section mt-4 transition-colors duration-300 group-hover:text-gold-deep">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65">{featured.excerpt}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em]">
                  <span className="link-draw">Read the letter</span>
                  <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </p>
              </div>
            </Link>
          </FadeUp>

          {/* Grid */}
          <div className="mt-24 grid gap-x-8 gap-y-16 border-t border-line pt-16 md:grid-cols-2">
            {rest.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.1}>
                <Link to={`/journal/${post.slug}`} data-testid={`journal-card-${post.slug}`} data-cursor-label="Read" className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="eyebrow mt-6 text-gold-deep">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="h-card mt-3 transition-colors duration-300 group-hover:text-gold-deep">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{post.excerpt}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
