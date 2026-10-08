// Rooms data — swap entries to rebrand. Images: Unsplash placeholders.
export interface Room {
  slug: string;
  name: string;
  type: "Suite" | "Room" | "Residence" | "Penthouse";
  price: number; // per night, EUR
  capacity: number;
  size: number; // m²
  bed: string;
  view: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  description: string;
  amenities: string[];
  tag?: string;
}

const bath = {
  src: "https://images.unsplash.com/photo-1780846652435-ad0f9b550801?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
  alt: "Bathroom details on a wooden stool",
};
const breakfast = {
  src: "https://images.unsplash.com/photo-1646473224733-780716f42c80?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
  alt: "Breakfast tray with pastries and coffee served in bed",
};
const detail = {
  src: "https://images.unsplash.com/photo-1674042385136-28d23ca038ef?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000",
  alt: "Morning tray resting on crisp white bedding",
};

export const rooms: Room[] = [
  {
    slug: "signature-ivory-suite",
    name: "Signature Ivory Suite",
    type: "Suite",
    price: 890,
    capacity: 2,
    size: 68,
    bed: "Emperor king",
    view: "Full sea view",
    image:
      "https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "Lavish ivory-dressed bed beneath warm brass lamps",
    gallery: [
      { src: "https://images.unsplash.com/photo-1744000311897-510b64f9a2e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "Lavish ivory-dressed bed beneath warm brass lamps" },
      bath,
      breakfast,
    ],
    description:
      "Hand-plastered walls, a bed dressed in washed ivory linen, and a terrace that catches the first light over the bay. The bathroom is travertine, the minibar is local, and the silence is absolute.",
    amenities: ["Sea-view terrace", "King bed", "Soaking tub", "Butler service", "Daily pressing", "Riviera minibar"],
    tag: "Most loved",
  },
  {
    slug: "sumix-grand-king",
    name: "Sumix Grand King",
    type: "Room",
    price: 640,
    capacity: 2,
    size: 52,
    bed: "King",
    view: "Garden & partial sea",
    image:
      "https://images.unsplash.com/photo-1776763018972-588e27bf6511?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "King-size bed with a private seating area in soft lamplight",
    gallery: [
      { src: "https://images.unsplash.com/photo-1776763018972-588e27bf6511?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "King-size bed with a private seating area in soft lamplight" },
      detail,
      bath,
    ],
    description:
      "A generous corner room with a reading salon, deep armchairs and blackout silk drapes for long mornings. The writing desk faces the lemon grove.",
    amenities: ["Reading salon", "King bed", "Rain shower", "Nespresso atelier", "Writing desk"],
  },
  {
    slug: "atelier-loft",
    name: "The Atelier Loft",
    type: "Suite",
    price: 720,
    capacity: 3,
    size: 61,
    bed: "King + day bed",
    view: "Rooftops & sea",
    image:
      "https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "Loft bedroom with floor-to-ceiling windows and modern decor",
    gallery: [
      { src: "https://images.unsplash.com/photo-1758448755969-8791367cf5c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "Loft bedroom with floor-to-ceiling windows and modern decor" },
      breakfast,
      detail,
    ],
    description:
      "Double-height windows, a writer's desk, and a palette of bone, oak and bronze — made for slow creative mornings that turn into evenings.",
    amenities: ["Double-height windows", "Day bed", "Writing desk", "Record player", "Rain shower"],
  },
  {
    slug: "garden-residence",
    name: "Garden Residence",
    type: "Residence",
    price: 1150,
    capacity: 4,
    size: 96,
    bed: "Two kings",
    view: "Private garden",
    image:
      "https://images.unsplash.com/photo-1788217023349-ad7763845844?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "Wooden-framed bed opening onto a glass-walled garden bath",
    gallery: [
      { src: "https://images.unsplash.com/photo-1788217023349-ad7763845844?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "Wooden-framed bed opening onto a glass-walled garden bath" },
      bath,
      breakfast,
    ],
    description:
      "Two bedrooms wrapped around a private lemon garden, with an outdoor rain shower and a kitchen our chefs will happily cook in for you.",
    amenities: ["Private garden", "Two bedrooms", "Chef's kitchen", "Outdoor shower", "Lounge"],
    tag: "Families",
  },
  {
    slug: "horizon-deck-suite",
    name: "Horizon Deck Suite",
    type: "Suite",
    price: 980,
    capacity: 2,
    size: 74,
    bed: "Emperor king",
    view: "Panoramic sea",
    image:
      "https://images.unsplash.com/photo-1588504633950-9dc518941e93?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "Private wooden deck resting over still water at dusk",
    gallery: [
      { src: "https://images.unsplash.com/photo-1588504633950-9dc518941e93?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "Private wooden deck resting over still water at dusk" },
      breakfast,
      bath,
    ],
    description:
      "A suite that ends in a private deck above the water — breakfast is delivered by boat if you wish, and sunset is a private performance.",
    amenities: ["Private deck", "Boat breakfast", "King bed", "Outdoor bath", "Binoculars & charts"],
  },
  {
    slug: "royal-penthouse",
    name: "The Royal Penthouse",
    type: "Penthouse",
    price: 2400,
    capacity: 6,
    size: 210,
    bed: "Three suites",
    view: "360° terrace",
    image:
      "https://images.unsplash.com/photo-1655516433028-9e0e1599cf8b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    imageAlt: "Grand salon with a crystal chandelier and gilded ceiling",
    gallery: [
      { src: "https://images.unsplash.com/photo-1655516433028-9e0e1599cf8b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400", alt: "Grand salon with a crystal chandelier and gilded ceiling" },
      detail,
      breakfast,
    ],
    description:
      "The entire top floor: a grand salon, three suites, a private bar and a 360° terrace above the Riviera. A dedicated host lives one floor below.",
    amenities: ["360° terrace", "Private bar", "Three suites", "Dedicated host", "Grand piano"],
    tag: "Signature",
  },
];

export const roomTypes = ["All", "Room", "Suite", "Residence", "Penthouse"] as const;
export const capacities = ["Any", "2", "3", "4", "6"] as const;
export const priceBands = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under €750", min: 0, max: 750 },
  { label: "€750 – €1,200", min: 750, max: 1200 },
  { label: "€1,200+", min: 1200, max: Infinity },
] as const;
