import { site } from "@/config/site.js";
import { Hero } from "@/components/home/Hero";
import { BookingBar } from "@/components/home/BookingBar";
import { Intro } from "@/components/home/Intro";
import { Marquee } from "@/components/motion/Marquee";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { Amenities } from "@/components/home/Amenities";
import { QuoteBreak } from "@/components/home/QuoteBreak";
import { DiningHighlight } from "@/components/home/DiningHighlight";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { Offers } from "@/components/home/Offers";
import { LocationTeaser } from "@/components/home/LocationTeaser";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <Intro />
      <Marquee items={site.marquee} />
      <FeaturedRooms />
      <Amenities />
      <QuoteBreak />
      <DiningHighlight />
      <GalleryPreview />
      <Testimonials />
      <Offers />
      <LocationTeaser />
      <Newsletter />
    </>
  );
}
