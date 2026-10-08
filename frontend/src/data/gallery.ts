// Gallery — categories drive the filter tabs on the Gallery page.
export interface GalleryItem {
  src: string;
  alt: string;
  category: "Estate" | "Suites" | "Dining" | "Wellness" | "Celebrations";
  ratio: "tall" | "wide" | "square";
}

export const gallery: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1766164185798-d6e7eb23a131?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "The illuminated facade at night",
    category: "Estate",
    ratio: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "Ivory suite dressed for the evening",
    category: "Suites",
    ratio: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "The chef finishing a plate at Lume",
    category: "Dining",
    ratio: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1776763018829-ad685e621871?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "Lounge chairs beside the indoor thermal pool",
    category: "Wellness",
    ratio: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "A martini resting on the dark bar",
    category: "Dining",
    ratio: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1735045634800-957fd0dad45e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "Chequered hall with glowing lanterns",
    category: "Estate",
    ratio: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1710587385270-08f30d66bf31?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "A place setting with garden flowers",
    category: "Celebrations",
    ratio: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1730367019975-4ad8d9e14ef2?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    alt: "The blue stillness of the indoor pool",
    category: "Wellness",
    ratio: "tall",
  },
];
