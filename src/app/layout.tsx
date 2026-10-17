import type { Metadata, Viewport } from "next";
import "@fontsource-variable/readex-pro";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartDrawer, Grain, ReserveModal, Toast } from "@/components/Overlays";

export const metadata: Metadata = {
  title: {
    default: "Chicago Waffles — Breakfast & Brunch Since 2011",
    template: "%s · Chicago Waffles",
  },
  description:
    "Fresh waffles, pancakes, skillets and brunch across five Chicago-area locations. Order online, reserve a table, or cater your next morning.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SmoothScroll />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <ReserveModal />
          <Toast />
          <Grain />
        </CartProvider>
      </body>
    </html>
  );
}
