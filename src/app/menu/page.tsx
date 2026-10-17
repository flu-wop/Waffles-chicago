import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description: "Waffles, pancakes, skillets, benedicts, brunch cocktails and more — the full Chicago Waffles menu.",
};

export default function MenuPage() {
  return <MenuClient />;
}
