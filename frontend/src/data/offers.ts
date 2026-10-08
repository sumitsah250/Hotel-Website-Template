// Special offers & packages — data-driven, swap freely.
export interface Offer {
  slug: string;
  title: string;
  eyebrow: string;
  priceNote: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const offers: Offer[] = [
  {
    slug: "gastronomy-escape",
    title: "The Gastronomy Escape",
    eyebrow: "Two nights · Tasting menu",
    priceNote: "From €1,480 for two",
    description:
      "Two nights in a sea-view suite, a seven-course tasting at Lume, and a morning in the kitchen with our chef.",
    image:
      "https://images.unsplash.com/photo-1689672235501-6dc1e56d454c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "A composed plate beside a glass of white wine",
  },
  {
    slug: "wellness-retreat",
    title: "Wellness in Residence",
    eyebrow: "Three nights · Daily rituals",
    priceNote: "From €2,100 for two",
    description:
      "Three nights with daily spa rituals, sunrise yoga on the deck and a personalised nutrition menu.",
    image:
      "https://images.unsplash.com/photo-1720118509152-2df877673bee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "Candles and a drawn bath in the candlelit spa",
  },
  {
    slug: "celebrations",
    title: "Celebrations & Vows",
    eyebrow: "Bespoke · Up to 80 guests",
    priceNote: "By private proposal",
    description:
      "The terrace, the garden and the grand salon, dressed for your day — with a dedicated celebrations atelier.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "A long celebration table set with flowers and glassware",
  },
];
