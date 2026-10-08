import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SiInstagram, SiPinterest, SiVimeo } from "@icons-pack/react-simple-icons";
import { site } from "@/config/site.js";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { icon: SiInstagram, href: site.social.instagram, label: "Instagram" },
    { icon: SiPinterest, href: site.social.pinterest, label: "Pinterest" },
    { icon: SiVimeo, href: site.social.vimeo, label: "Vimeo" },
  ];

  return (
    <footer data-testid="footer" className="relative overflow-hidden bg-charcoal text-cream">
      <div className="container-royal section-pad grid gap-14 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/60 font-heading text-gold">
              {site.monogram}
            </span>
            <span className="font-heading text-2xl">{site.name}</span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
            {site.description}
          </p>
          <div className="mt-8 flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-testid={`social-${label.toLowerCase()}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line-light transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav className="lg:col-span-2" aria-label="Footer explore">
          <h3 className="eyebrow text-gold">Explore</h3>
          <ul className="mt-6 space-y-3">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-draw inline-block text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* More */}
        <nav className="lg:col-span-2" aria-label="Footer more">
          <h3 className="eyebrow text-gold">More</h3>
          <ul className="mt-6 space-y-3">
            {site.footerNav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="link-draw inline-block text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="eyebrow text-gold">Contact</h3>
          <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed text-cream/70">
            <p>
              {site.contact.address.street}
              <br />
              {site.contact.address.zip} {site.contact.address.city}
              <br />
              {site.contact.address.region}, {site.contact.address.country}
            </p>
            <p>
              <a href={`tel:${site.contact.phoneHref}`} className="transition-colors hover:text-gold" data-testid="footer-phone">
                {site.contact.phone}
              </a>
              <br />
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-gold" data-testid="footer-email">
                {site.contact.email}
              </a>
            </p>
          </address>
          <Link
            to="/booking"
            data-testid="footer-book-link"
            className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-gold-light"
          >
            Reserve your stay <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line-light">
        <div className="container-royal flex flex-wrap items-center justify-between gap-3 py-6 text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">
          <span>© {year} {site.legalName}</span>
          <span className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-cream" data-testid="footer-privacy-link">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-cream" data-testid="footer-terms-link">Terms</Link>
          </span>
          <span>Crafted on the Riviera</span>
        </div>
      </div>

      {/* Giant watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-heading italic leading-[0.75] text-cream/[0.04]"
        style={{ fontSize: "clamp(6rem, 17vw, 17rem)" }}
      >
        {site.name}
      </div>
    </footer>
  );
}
