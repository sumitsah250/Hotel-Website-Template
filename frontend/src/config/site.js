/**
 * ─────────────────────────────────────────────────────────────
 *  ROYAL SUMIX — CENTRAL SITE CONFIG
 *  Rebrand the entire template from this ONE file:
 *  name, logo, colors, fonts, contact details, nav, copy.
 *  Components never hard-code the hotel name — they read from here.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  // ── Brand ────────────────────────────────────────────────
  name: "Royal Sumix",
  legalName: "Royal Sumix Hotel & Sanctuary S.p.A.",
  monogram: "RS", // used in logo mark + preloader
  tagline: "A sanctuary above the sea",
  description:
    "Royal Sumix is a 42-suite boutique sanctuary suspended between lemon groves and the open Riviera — quiet luxury, cinematic views and service that anticipates.",
  established: 1987,
  starRating: 5,

  // ── Visual identity (mirrored in src/index.css as CSS variables) ──
  colors: {
    ivory: "#FAF7F2", // page background
    charcoal: "#121212", // dark sections
    ink: "#1A1A1A", // primary text
    cream: "#F5F1EA", // light text on dark
    gold: "#C9A96E", // champagne accent
    sand: "#8A8478", // muted
  },
  fonts: {
    heading: "Playfair Display Variable",
    body: "Manrope Variable",
  },

  // ── Contact & location ───────────────────────────────────
  contact: {
    phone: "+39 0187 555 134",
    phoneHref: "+390187555134",
    whatsapp: "390187555134", // wa.me number, digits only
    email: "reservations@royalsumix.com",
    address: {
      street: "Via della Costa Serena 12",
      city: "Marina di Lumière",
      region: "Italian Riviera",
      zip: "19032",
      country: "Italy",
    },
    coordinates: { lat: 44.1078, lng: 9.7275 },
    mapEmbed:
      "https://www.google.com/maps?q=44.1078,9.7275&z=13&output=embed",
  },

  hours: {
    reception: "24 hours, every day",
    restaurant: "19:00 — 23:00 · Tue to Sun",
    spa: "08:00 — 20:00 daily",
    pool: "Dawn until dusk",
  },

  social: {
    instagram: "https://www.instagram.com/royalsumix",
    pinterest: "https://www.pinterest.com/royalsumix",
    vimeo: "https://vimeo.com/royalsumix",
  },

  // ── Navigation ───────────────────────────────────────────
  nav: [
    { label: "Rooms & Suites", to: "/rooms" },
    { label: "Dining", to: "/dining" },
    { label: "Spa & Wellness", to: "/spa" },
    { label: "Experiences", to: "/experiences" },
    { label: "Gallery", to: "/gallery" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  footerNav: [
    { label: "Offers & Packages", to: "/offers" },
    { label: "Journal", to: "/journal" },
    { label: "Weddings & Events", to: "/experiences" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Stay", to: "/terms" },
  ],
  languages: ["EN", "IT", "FR"],
  currencies: ["EUR", "USD", "GBP", "INR", "NPR"],

  // ── Home page copy ───────────────────────────────────────
  hero: {
    eyebrow: "Italian Riviera · Est. 1987",
    titleLines: ["A sanctuary", "above the sea"],
    subcopy:
      "Forty-two suites carved into the cliffside, a Michelin-guided table, and a spa that smells of lemon blossom and sea salt.",
    slides: [
      {
        src: "https://images.unsplash.com/photo-1596746698204-d69844da956d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920",
        alt: "Infinity pool dissolving into the open sea at golden hour",
      },
      {
        src: "https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920",
        alt: "The illuminated facade of Royal Sumix at night",
      },
      {
        src: "https://images.unsplash.com/photo-1742844552193-2fd3425cd26d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920",
        alt: "Sunlight washing through the grand lobby",
      },
      {
        src: "https://images.unsplash.com/photo-1557750505-e7b4d1c40410?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920",
        alt: "A swimmer alone in the infinity pool at sunrise",
      },
    ],
  },

  intro: {
    eyebrow: "The Estate",
    titleLines: ["A house of quiet", "ceremony since 1987"],
    paragraphs: [
      "Founded by the Sumix family as a private summer residence, the house opened its doors to travellers in 1987 with a single promise — that luxury should feel like exhaling.",
      "Today the estate unfolds over three acres of terraced gardens: suites with hand-plastered walls, a saltwater infinity pool, and a kitchen that answers only to the seasons.",
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1735045634800-957fd0dad45e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        alt: "Chequered marble hall with glowing lanterns",
      },
      {
        src: "https://images.unsplash.com/photo-1588504633950-9dc518941e93?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
        alt: "Private wooden deck resting over calm water",
      },
    ],
    stats: [
      { value: 38, suffix: "", label: "Years of welcome" },
      { value: 42, suffix: "", label: "Suites & residences" },
      { value: 17, suffix: "", label: "International awards" },
      { value: 98, suffix: "%", label: "Guests who return" },
    ],
  },

  quote: {
    text: "Luxury is not thread counts and chandeliers. It is the feeling of being exactly where you should be.",
    attribution: "Elena Sumix, Founder",
    image:
      "https://images.unsplash.com/photo-1787059717832-a8f7d527d9a5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920",
    imageAlt: "The hotel reflected in the pool beneath lit palms at night",
  },

  marquee: [
    "Royal Sumix",
    "Costa Serena",
    "Est. 1987",
    "Sanctuary above the sea",
    "Forty-two suites",
    "Riviera, Italy",
  ],

  location: {
    eyebrow: "Finding Us",
    titleLines: ["Ninety minutes", "from everywhere"],
    body: "Set on a private headland between Portofino and Cinque Terre, the estate is reached by a single cypress-lined road — or by boat, which we recommend.",
    image:
      "https://images.unsplash.com/photo-1739520081275-f893dc11fbd6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "The estate courtyard at dusk, chairs set out beneath warm lights",
    transfers: [
      { label: "Genoa Airport", value: "75 min by car" },
      { label: "La Spezia Centrale", value: "25 min by car" },
      { label: "Private jetty", value: "Direct arrival by sea" },
    ],
  },

  newsletter: {
    title: "Letters from the cliff",
    body: "One unhurried letter each month — seasonal menus, quiet openings, and first access to residence releases. No noise, ever.",
  },

  seo: {
    title: "Royal Sumix — Boutique Hotel & Sanctuary, Italian Riviera",
    ogImage:
      "https://images.unsplash.com/photo-1596746698204-d69844da956d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
};

export default site;
