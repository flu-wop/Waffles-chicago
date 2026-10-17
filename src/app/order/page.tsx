import type { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = { title: "Checkout" };

export default function OrderPage() {
  return <OrderClient />;
}
