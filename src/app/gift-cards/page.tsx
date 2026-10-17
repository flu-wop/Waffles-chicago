import type { Metadata } from "next";
import GiftClient from "./GiftClient";

export const metadata: Metadata = {
  title: "Gift Cards",
  description: "Send a Chicago Waffles gift card by email or text. Valid for 12 months, no expiration fees.",
};

export default function GiftPage() {
  return <GiftClient />;
}
