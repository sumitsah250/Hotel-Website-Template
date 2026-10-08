// Journal entries — MOCKED sample content for the blog template.
export interface JournalPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "lemon-harvest",
    title: "Notes from the lemon harvest",
    category: "Estate Life",
    date: "2026-06-12",
    readTime: "4 min",
    excerpt:
      "Every June the terraces turn yellow and the whole house smells of citrus. Our head gardener on forty years of harvests.",
    image:
      "https://images.unsplash.com/photo-1739520081275-f893dc11fbd6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    imageAlt: "The estate courtyard at dusk",
    body: [
      "The first week of June, before the guests are properly awake, the ladders go up. The terraces above the house hold four hundred lemon trees, some planted before the hotel existed, and for ten days the whole estate smells of citrus oil and cut grass.",
      "Giulia, our head gardener, has led the harvest for forty years. She picks by hand, always before ten in the morning, because a lemon picked warm from the afternoon sun keeps its perfume for half as long. This is the kind of fact she offers without being asked, leaning on the ladder.",
      "Most of the fruit goes to the kitchen — the curd on the breakfast terrace, the sorbet that closes the tasting menu at Lume, the oil that starts the citrus ritual in the spa. The rest goes home with the staff in paper bags, a tradition older than the hotel itself.",
      "Guests are welcome to join the morning picking. Nobody is woken for it; the ladders are simply there, and the rule is the same as everywhere else in the house — nothing hurried.",
    ],
  },
  {
    slug: "summer-menu-lume",
    title: "Inside the summer menu at Lume",
    category: "Dining",
    date: "2026-05-28",
    readTime: "6 min",
    excerpt:
      "Anchovies at dawn, tomatoes still warm from the vine — how a seven-course menu is built from a single morning market.",
    image:
      "https://images.unsplash.com/photo-1676471926534-d5c9771909fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    imageAlt: "A plated fillet of fish with summer vegetables",
    body: [
      "The menu at Lume is decided at seven in the morning, standing between the fish crates at the harbour market. There is a printed menu, of course, but it is written in pencil.",
      "This summer's opening course is an anchovy marinated at dawn and dressed with charcoal oil and wild fennel. It is followed by a tomato course — three preparations, all from a single farm two valleys inland, picked the previous afternoon and still faintly warm when they arrive.",
      "The pasta course never changes its shape and always changes its mind: hand-cut tagliolini, this month with red prawns, bergamot and sea asparagus. Our pastaia rolls it in view of the first sitting, which is theatre we did not plan and would not remove.",
      "Dessert returns to the garden: lemon sorbet, torn meringue, olive oil pressed last November. Seven courses, roughly two and a half hours, and a cellar that leans toward producers small enough to know by name.",
    ],
  },
  {
    slug: "art-of-doing-nothing",
    title: "The art of doing nothing, properly",
    category: "Wellness",
    date: "2026-05-09",
    readTime: "5 min",
    excerpt:
      "Our spa director argues that rest is a skill — and shares the three rituals she teaches every arriving guest.",
    image:
      "https://images.unsplash.com/photo-1720118509152-2df877673bee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    imageAlt: "A candlelit bath drawn in the spa",
    body: [
      "Most guests arrive, our spa director likes to say, with their shoulders somewhere near their ears. Her job is not massage, she insists — it is subtraction. Removing urgency until what remains is a person lying still, listening to water.",
      "Her first ritual is the simplest: twenty minutes in the thermal circuit with no telephone, no book, no conversation. Guests resist it and then, on day three, defend it fiercely.",
      "The second is the dusk bath. A treatment suite is drawn with candles and estate oils half an hour before sunset, timed so that the light leaves the room exactly as the soak ends. It sounds precious. It works.",
      "The third ritual is not in the spa at all: breakfast on the terrace with nothing to read. Watching the ferries cross the bay counts, she says, as a complete morning's activity. Forty years of guest books suggest she is right.",
    ],
  },
];
