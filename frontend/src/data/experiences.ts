// Experiences & events packages — data-driven.
export interface Experience {
  slug: string;
  title: string;
  category: "On the water" | "On the estate" | "Celebrations";
  duration: string;
  priceNote: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const experiences: Experience[] = [
  {
    slug: "gozzo-day",
    title: "A day aboard our gozzo",
    category: "On the water",
    duration: "Full day",
    priceNote: "From €680 for two",
    description:
      "Our wooden gozzo, a captain who knows every cove, a picnic from the kitchen and anchorages you will not find on a map.",
    image:
      "https://images.unsplash.com/photo-1770563864411-488559bf7a56?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "A wooden gozzo floating near colourful harbour buildings",
  },
  {
    slug: "sunset-cliffs",
    title: "Sunset at the cliff edge",
    category: "On the water",
    duration: "3 hours",
    priceNote: "From €240 for two",
    description:
      "A slow cruise along the cliffs at golden hour with chilled vermouth and the house's anchovy toast.",
    image:
      "https://images.unsplash.com/photo-1787574441665-e16aa244fe75?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "A small boat near a rocky cliffside at dusk",
  },
  {
    slug: "pasta-atelier",
    title: "The pasta atelier",
    category: "On the estate",
    duration: "Half day",
    priceNote: "From €160 per guest",
    description:
      "Flour, eggs and forty years of technique — roll tagliolini with our pastaia, then eat your work on the terrace.",
    image:
      "https://images.unsplash.com/photo-1642354571956-d77dfd9596bb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "Hands feeding dough through a pasta machine",
  },
  {
    slug: "lemon-harvest",
    title: "Lemon harvest morning",
    category: "On the estate",
    duration: "2 hours",
    priceNote: "Complimentary for residents",
    description:
      "June only. Pick from the terraced groves with our head gardener, then press your own lemonade for lunch.",
    image:
      "https://images.unsplash.com/photo-1739520081275-f893dc11fbd6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "The estate courtyard at dusk among the trees",
  },
  {
    slug: "weddings",
    title: "Weddings on the terrace",
    category: "Celebrations",
    duration: "Bespoke",
    priceNote: "Up to 80 guests",
    description:
      "The terrace, the garden and the grand salon dressed for your day — a dedicated celebrations atelier handles everything.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "A long celebration table set with flowers and glassware",
  },
  {
    slug: "private-events",
    title: "Private occasions",
    category: "Celebrations",
    duration: "Bespoke",
    priceNote: "By proposal",
    description:
      "Anniversaries, board retreats, launches. Whole-estate hire available in the quiet season.",
    image:
      "https://images.unsplash.com/photo-1561593367-66c79c2294e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
    imageAlt: "An elegant dining table set for a private occasion",
  },
];
