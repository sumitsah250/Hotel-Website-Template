// Guest testimonials — MOCKED sample data.
export interface Testimonial {
  quote: string;
  name: string;
  origin: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We arrived for two nights and stayed for six. Nobody at Royal Sumix ever said no — they simply found a quieter way to say yes.",
    name: "Charlotte & Marc Deveraux",
    origin: "Paris, France",
    context: "Stayed in the Horizon Deck Suite",
  },
  {
    quote:
      "The kind of hotel that ruins other hotels for you. Dinner at Lume was the single best meal of our honeymoon.",
    name: "Amara Okafor",
    origin: "London, United Kingdom",
    context: "Honeymoon, June",
  },
  {
    quote:
      "I have photographed hotels for twenty years. This is the only one I return to as a guest.",
    name: "Jonas Lindqvist",
    origin: "Stockholm, Sweden",
    context: "Travel photographer",
  },
  {
    quote:
      "My children still talk about the boat breakfast. My husband still talks about the spa. I still talk about both.",
    name: "Isabella Romano",
    origin: "Milan, Italy",
    context: "Family stay, Garden Residence",
  },
];
