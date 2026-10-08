// Dining menus — drive the animated tabs on the Dining page.
export interface MenuItem {
  name: string;
  description: string;
  price: string;
}
export interface MenuTab {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
}

export const menus: MenuTab[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    note: "On the terrace, 7:00 — 11:30",
    items: [
      { name: "Riviera basket", description: "Warm focaccia, croissants, lemon curd, estate honey", price: "28" },
      { name: "Eggs in purgatory", description: "Slow tomatoes, basil, grilled sourdough", price: "22" },
      { name: "Fig & ricotta toast", description: "Whipped ricotta, thyme, toasted pine nuts", price: "18" },
      { name: "Citrus & yogurt", description: "Sheep's milk yogurt, blood orange, bee pollen, granola", price: "16" },
      { name: "Smoked fish plate", description: "House-cured sea bass, capers, lemon butter, toast", price: "26" },
      { name: "Pancakes, amalfi style", description: "Lemon ricotta pancakes, warm mascarpone, candied zest", price: "19" },
      { name: "The full Sumix", description: "Eggs any way, cured fish, cheeses, juices, coffee service", price: "38" },
    ],
  },
  {
    id: "lunch",
    label: "Terrace Lunch",
    note: "Poolside & shaded tables, 12:30 — 15:30",
    items: [
      { name: "Crudo of the day", description: "Whatever the boats brought, olive oil, sea salt, nothing else", price: "24" },
      { name: "Caprese, our way", description: "Buffalo mozzarella, three tomatoes, basil oil, focaccia crumbs", price: "19" },
      { name: "Trofie al pesto", description: "Hand-twisted pasta, Genovese basil, pine nuts, green beans", price: "23" },
      { name: "Grilled octopus", description: "Charred tentacle, chickpea purée, wild oregano", price: "29" },
      { name: "Lobster roll, riviera", description: "Buttered brioche, lemon aioli, sea herbs", price: "34" },
      { name: "Chopped garden salad", description: "Terrace leaves, farro, aged pecorino, citrus vinaigrette", price: "17" },
    ],
  },
  {
    id: "tasting",
    label: "Tasting Menu",
    note: "Seven courses · Lume, evenings only",
    items: [
      { name: "Anchovy, lemon, charcoal", description: "Marinated at dawn, charcoal oil, wild fennel", price: "—" },
      { name: "Tomato three ways", description: "Still warm from the vine, basil water, olive snow", price: "—" },
      { name: "Hand-cut tagliolini", description: "Red prawns, bergamot, sea asparagus", price: "—" },
      { name: "Risotto, midnight", description: "Cuttlefish ink, lemon, a single sweet shrimp", price: "—" },
      { name: "Catch of the day", description: "Salt crust, fennel pollen, saffron broth", price: "—" },
      { name: "Aged beef, bone marrow", description: "Smoked shallot, forty-year balsamic", price: "—" },
      { name: "Lemon from our garden", description: "Sorbet, meringue, olive oil", price: "—" },
      { name: "The whole menu", description: "Seven courses, wine pairing available", price: "145" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    note: "Until midnight, at Lume or the bar",
    items: [
      { name: "The lemon garden", description: "Estate lemon sorbet, torn meringue, olive oil, sea salt", price: "14" },
      { name: "Dark chocolate & amaro", description: "72% ganache, amaro caramel, cocoa nib tuile", price: "15" },
      { name: "Tiramisù al tavolo", description: "Assembled beside you, espresso poured last", price: "16" },
      { name: "Poached peach", description: "Verbena, almond cream, brown butter crumble", price: "13" },
      { name: "Cheese from the hills", description: "Three farmhouse cheeses, estate honey, walnut bread", price: "18" },
    ],
  },
  {
    id: "bar",
    label: "The Gilt Bar",
    note: "Until the last guest goes upstairs",
    items: [
      { name: "Sumix martini", description: "Trolley service, lemon leaf, frozen glass", price: "24" },
      { name: "Riviera spritz", description: "Amaro, chinotto, champagne, burnt orange", price: "19" },
      { name: "Fig leaf old fashioned", description: "Bourbon, fig leaf syrup, smoked salt", price: "22" },
      { name: "Cliffside negroni", description: "Barrel-rested gin, campari, wormwood vermouth", price: "21" },
      { name: "The quiet hour", description: "Zero-proof — seedlip, cucumber, cold-pressed apple", price: "14" },
      { name: "Bar plates", description: "Anchovy toast, olives, aged parmesan, taralli", price: "12—24" },
    ],
  },
  {
    id: "cellar",
    label: "Wine Cellar",
    note: "Small producers, pours chosen nightly",
    items: [
      { name: "Vermentino 'Levante'", description: "Colline di Levanto — saline, citrus pith, our house pour", price: "14" },
      { name: "Cerasuolo 'Notte'", description: "Abruzzo rosé — sour cherry, drunk cold on the terrace", price: "13" },
      { name: "Barolo 'Vigna Rionda'", description: "2018 — for the beef course, decanted an hour", price: "32" },
      { name: "Champagne 'Sumix cuvée'", description: "Grower champagne bottled for the house", price: "26" },
      { name: "Vin santo & cantucci", description: "To finish — ten-year barrel, almond biscuits", price: "12" },
      { name: "Sommelier's flight", description: "Five pours matched to your table, narrated or silent", price: "85" },
    ],
  },
];

export const venues = [
  {
    name: "Lume",
    kind: "Fine dining",
    description:
      "One long candlelit room, twelve tables, a kitchen that answers to the morning market. Seven courses, or four if you ask nicely.",
    hours: "19:00 — 23:00 · Tue to Sun",
    image:
      "https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "The chef pouring sauce over a plated dish at Lume",
  },
  {
    name: "The Gilt Bar",
    kind: "Cocktails & cellar",
    description:
      "Low light, deep chairs, a martini trolley that comes to you. The cellar leans toward small Riviera producers and old amari.",
    hours: "17:00 — late, daily",
    image:
      "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "A martini resting on the dark bar in low light",
  },
  {
    name: "The Breakfast Terrace",
    kind: "Mornings & lunch",
    description:
      "Coffee service under the pergola, the day's papers pressed flat, and a lunch menu built for wet hair and bare feet.",
    hours: "7:00 — 15:30, daily",
    image:
      "https://images.unsplash.com/photo-1646473224733-780716f42c80?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "A breakfast tray with pastries and coffee",
  },
  {
    name: "The Chef's Counter",
    kind: "Six seats · one seating",
    description:
      "A marble counter inside the kitchen itself. The chefs narrate or stay silent — your call — through ten unlisted courses.",
    hours: "One seating, 20:00 · Wed to Sat",
    image:
      "https://images.unsplash.com/photo-1642354571956-d77dfd9596bb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    alt: "Hands feeding dough through a pasta machine in the kitchen",
  },
];
