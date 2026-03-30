import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The PopKitchen | Cantine • Café • Traiteur — Marseille",
  description:
    "Comfort food du monde à Marseille. Cantine, café et traiteur. Halal, végétarien, sans gluten et sans lactose friendly. 45 bd national, 13001 Marseille.",
  keywords: [
    "restaurant marseille",
    "cantine marseille",
    "cuisine du monde",
    "halal marseille",
    "traiteur marseille",
    "comfort food",
    "the popkitchen",
  ],
  openGraph: {
    title: "The PopKitchen | Cantine • Café • Traiteur",
    description:
      "Comfort food du monde à Marseille. Comme chez mamie, mais globetrotteuse.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
