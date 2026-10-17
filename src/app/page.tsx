import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import SignatureRail from "@/components/home/SignatureRail";
import Deals from "@/components/home/Deals";
import OrderVignette from "@/components/home/OrderVignette";
import Locations from "@/components/home/Locations";
import Teasers from "@/components/home/Teasers";
import GalleryParallax from "@/components/home/GalleryParallax";
import Closing from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <SignatureRail />
      <Deals />
      <OrderVignette />
      <Locations />
      <Teasers />
      <GalleryParallax />
      <Closing />
    </>
  );
}
