import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { journalPosts } from "@/data/journal";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeader } from "@/components/shared/SectionHeader";
import NotFound from "@/pages/NotFound";

// Journal article layout.
export default function JournalArticle() {
  const { slug } = useParams();
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Article hero */}
      <section className="relative flex min-h-[64svh] items-end overflow-hidden bg-charcoal text-cream">
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0.25) 45%, rgba(18,18,18,0.85) 100%)",
          }}
        />
        <div className="container-royal relative z-10 max-w-4xl pb-16 pt-40">
          <FadeUp>
            <Link
              to="/journal"
              data-testid="article-back-link"
              className="mb-8 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-cream/70 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> The Journal
            </Link>
            <p className="eyebrow text-gold-light">
              {post.category} · {format(parseISO(post.date), "d MMMM yyyy")} · {post.readTime}
            </p>
            <h1 className="h-display mt-5">{post.title}</h1>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <article className="section-pad bg-ivory" data-testid="journal-article">
        <div className="container-royal max-w-2xl">
          <FadeUp>
            <p className="font-heading text-xl italic leading-relaxed text-ink/85 md:text-2xl">
              {post.excerpt}
            </p>
          </FadeUp>
          <div className="mt-8 space-y-6 border-t border-line pt-10">
            {post.body.map((para, i) => (
              <FadeUp key={i} delay={0.05 * i}>
                <p className="text-base leading-loose text-ink/70">{para}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-12 border-t border-line pt-8">
            <p className="eyebrow text-sand">Written from the cliff, with love</p>
          </FadeUp>
        </div>

        {/* More letters */}
        <div className="container-royal mt-24 max-w-5xl">
          <SectionHeader eyebrow="Keep reading" lines={["More", <em key="m" className="italic text-gold-deep">letters</em>]} />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {more.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.1}>
                <Link to={`/journal/${p.slug}`} data-testid={`article-more-${p.slug}`} data-cursor-label="Read" className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="h-card mt-4 flex items-start justify-between gap-4 transition-colors duration-300 group-hover:text-gold-deep">
                    {p.title}
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                  </h3>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
