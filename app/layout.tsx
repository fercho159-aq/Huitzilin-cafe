import type { Metadata } from "next";
import { Caveat, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/providers/language-provider";
import { BranchProvider } from "@/providers/branch-provider";
import { CartProvider } from "@/providers/cart-provider";
import { AuthProvider } from "@/providers/session-provider";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Huitzitzilin Cafe — Café mexicano en Vancouver | Pedidos Pick-Up & DoorDash",
  description:
    "Huitzitzilin Cafe — café mexicano, matchas de la casa, bagels y pan dulce en Vancouver, BC. Pide para recoger o entrega vía DoorDash. ES / EN / FR.",
  keywords: [
    "café mexicano Vancouver",
    "Mexican coffee Vancouver",
    "café de olla",
    "matcha fresa Vancouver",
    "bagels Vancouver",
    "pick-up coffee",
    "DoorDash Vancouver",
    "Yaletown café",
    "Main Street café",
  ],
  openGraph: {
    title: "Huitzitzilin Cafe — Mexican-Canadian café in Vancouver",
    description: "Café de olla, matchas, bagels & pan dulce. Order pickup or DoorDash.",
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "/en/",
      "fr-CA": "/fr/",
      es: "/es/",
    },
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Huitzitzilin Cafe",
  image: "/images/cafe-talavera.jpg",
  address: [
    { "@type": "PostalAddress", streetAddress: "1142 Mainland St", addressLocality: "Vancouver", addressRegion: "BC", postalCode: "V6B 5P2", addressCountry: "CA" },
    { "@type": "PostalAddress", streetAddress: "2418 Main St", addressLocality: "Vancouver", addressRegion: "BC", postalCode: "V5T 3E2", addressCountry: "CA" },
    { "@type": "PostalAddress", streetAddress: "4391 Main St", addressLocality: "Vancouver", addressRegion: "BC", postalCode: "V5V 3R3", addressCountry: "CA" },
  ],
  telephone: "+1-604-555-0142",
  servesCuisine: ["Mexican Coffee", "Café de olla", "Bagels", "Pan dulce", "Matcha"],
  priceRange: "$$",
  openingHours: "Mo-Su 07:00-19:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${caveat.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full">
        <AuthProvider>
          <LanguageProvider>
            <BranchProvider>
              <CartProvider>{children}</CartProvider>
            </BranchProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
