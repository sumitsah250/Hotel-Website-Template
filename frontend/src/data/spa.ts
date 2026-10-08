// Spa & wellness content.
export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
}

export const treatments: Treatment[] = [
  {
    name: "Riviera citrus ritual",
    duration: "90 min",
    price: "€210",
    description: "Estate lemon and bergamot oils, warm stones, and a finish of cold-pressed sea salt scrub.",
  },
  {
    name: "Deep tissue, slow",
    duration: "75 min",
    price: "€180",
    description: "Unhurried therapeutic work with warm olive oil — the antidote to travel and screens.",
  },
  {
    name: "Thermal circuit",
    duration: "2 hours",
    price: "€95",
    description: "Sauna, steam, cold plunge and the candlelit relaxation pool, with herbal infusions throughout.",
  },
  {
    name: "Couples' dusk ritual",
    duration: "120 min",
    price: "€420",
    description: "A private suite at golden hour: side-by-side massages, a drawn bath, and champagne on the terrace.",
  },
  {
    name: "Sunrise yoga",
    duration: "60 min",
    price: "€45",
    description: "On the cliff deck, above the water. Mats, blankets and silence provided.",
  },
];

export const wellness = {
  poolsImage:
    "https://images.unsplash.com/photo-1730367019975-4ad8d9e14ef2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  poolsAlt: "The blue stillness of the indoor thermal pool",
  ritualImage:
    "https://images.unsplash.com/photo-1706795033849-7ca391f007c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  ritualAlt: "Candles, towels and honey arranged for a treatment",
};
