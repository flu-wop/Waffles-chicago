import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Waffles, plates and places — a look inside Chicago Waffles.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
