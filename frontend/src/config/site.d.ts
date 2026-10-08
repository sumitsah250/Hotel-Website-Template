// Type declarations for site.js so TypeScript consumers stay strict-safe.
export interface HeroSlide {
  src: string;
  alt: string;
}
export interface NavItem {
  label: string;
  to: string;
}
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
export interface SiteConfig {
  name: string;
  legalName: string;
  monogram: string;
  tagline: string;
  description: string;
  established: number;
  starRating: number;
  colors: Record<string, string>;
  fonts: { heading: string; body: string };
  contact: {
    phone: string;
    phoneHref: string;
    whatsapp: string;
    email: string;
    address: {
      street: string;
      city: string;
      region: string;
      zip: string;
      country: string;
    };
    coordinates: { lat: number; lng: number };
    mapEmbed: string;
  };
  hours: Record<string, string>;
  social: Record<string, string>;
  nav: NavItem[];
  footerNav: NavItem[];
  languages: string[];
  currencies: string[];
  hero: {
    eyebrow: string;
    titleLines: string[];
    subcopy: string;
    slides: HeroSlide[];
  };
  intro: {
    eyebrow: string;
    titleLines: string[];
    paragraphs: string[];
    images: HeroSlide[];
    stats: Stat[];
  };
  quote: { text: string; attribution: string; image: string; imageAlt: string };
  marquee: string[];
  location: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    image: string;
    imageAlt: string;
    transfers: { label: string; value: string }[];
  };
  newsletter: { title: string; body: string };
  seo: { title: string; ogImage: string };
}
export declare const site: SiteConfig;
declare const _default: SiteConfig;
export default _default;
