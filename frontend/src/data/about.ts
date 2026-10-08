// About page content — timeline, values, team, awards.
export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
}
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
}
export interface Award {
  year: string;
  title: string;
  org: string;
}

export const timeline: TimelineEntry[] = [
  {
    year: "1952",
    title: "A summer house",
    text: "Arturo Sumix, a Genoese shipbuilder, restores a ruined watchtower above the bay as a family summer house.",
  },
  {
    year: "1987",
    title: "Doors open",
    text: "Elena Sumix opens nine rooms to travellers. The rule she writes in the guest book still stands: nothing hurried.",
  },
  {
    year: "2001",
    title: "The pool on the cliff",
    text: "The saltwater infinity pool is cut into the rock — the first of its kind on this stretch of coast.",
  },
  {
    year: "2014",
    title: "Lume is born",
    text: "The old boathouse becomes Lume. Its first tasting menu is written on the back of a tide chart.",
  },
  {
    year: "2023",
    title: "Forty-two suites",
    text: "The atelier wing and residences complete the estate. The family still lives on the top floor.",
  },
];

export const values = [
  {
    title: "Quiet over loud",
    text: "No music by the pool, no announcements, no queues. Luxury that whispers.",
  },
  {
    title: "Local by instinct",
    text: "Ninety percent of what we serve is grown, caught or made within thirty kilometres.",
  },
  {
    title: "Care that anticipates",
    text: "The best service is the kind you never had to ask for. We train for it daily.",
  },
  {
    title: "Time as an amenity",
    text: "Late breakfasts, slow check-outs, and no schedule you did not choose yourself.",
  },
];

export const team: TeamMember[] = [
  {
    name: "Elena Sumix",
    role: "Founder & custodian",
    image:
      "https://images.unsplash.com/photo-1651084296297-2c66780dc322?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    imageAlt: "A member of the house team in the signature red coat",
  },
  {
    name: "Marco Bellandi",
    role: "Head concierge",
    image:
      "https://images.unsplash.com/photo-1651084310370-3620a5ac94fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    imageAlt: "The head concierge in the house red coat",
  },
  {
    name: "Sofia Marchetti",
    role: "Guest experience",
    image:
      "https://images.unsplash.com/photo-1734604859174-e5976744485b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    imageAlt: "Two members of the guest experience team",
  },
];

export const awards: Award[] = [
  { year: "2025", title: "World's 50 Best Hotels — No. 31", org: "50 Best" },
  { year: "2025", title: "Two Keys", org: "MICHELIN Guide" },
  { year: "2024", title: "Best Boutique Hotel, Europe", org: "World Travel Awards" },
  { year: "2024", title: "Gold List", org: "Condé Nast Traveller" },
  { year: "2023", title: "Hotel of the Year, Italy", org: "Gambero Rosso" },
];
