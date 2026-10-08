import { RevealText } from "@/components/motion/RevealText";
import { FadeUp } from "@/components/motion/FadeUp";
import { PillButton } from "@/components/motion/MagneticButton";

interface PlaceholderProps {
  eyebrow: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
}

// Elegant holding page for sections under construction — replaced one by one
// as the full pages are built. Keeps navigation complete with no dead links.
export default function Placeholder({
  eyebrow,
  title,
  blurb,
  image,
  imageAlt,
}: PlaceholderProps) {
  return (
    <>
      <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-charcoal text-cream">
        <img
          src={image}
          alt={imageAlt}
          loading="eager"
          decoding="async"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,0.25) 45%, rgba(18,18,18,0.8) 100%)",
          }}
        />
        <div className="container-royal relative z-10 pb-20 pt-40">
          <FadeUp>
            <p className="eyebrow flex items-center gap-4 text-gold-light">
              <span className="h-px w-10 bg-gold" /> {eyebrow}
            </p>
          </FadeUp>
          <RevealText as="h1" className="h-display mt-5" lines={[title]} />
        </div>
      </section>

      <section className="section-pad bg-ivory">
        <div className="container-royal max-w-2xl">
          <FadeUp>
            <p className="eyebrow text-gold-deep">Opening soon</p>
            <h2 className="h-card mt-4">This page is being curated</h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/70 md:text-base">{blurb}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <PillButton to="/" variant="dark" testId="placeholder-home-cta">
                Return home
              </PillButton>
              <PillButton to="/rooms" variant="outline-dark" testId="placeholder-rooms-cta">
                Browse suites
              </PillButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
