import type { Metadata } from "next";
import {
  Pinyon_Script,
  Cormorant_Garamond,
  Kaushan_Script,
  Great_Vibes,
  Playfair_Display,
  Cinzel_Decorative,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import GlobalOrnaments from "@/components/ui/GlobalOrnaments";

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const kaushanScript = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kaushan",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Naw Hae So Paw & Soe Yan Naing — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the marriage of Naw Hae So Paw and Soe Yan Naing on Saturday, 9 May 2026 at Judson Church, Yangon University.",
  keywords: ["wedding", "invitation", "Naw Hae So Paw", "Soe Yan Naing", "Judson Church", "Yangon"],
  openGraph: {
    title: "Naw Hae So Paw & Soe Yan Naing — Wedding",
    description: "Saturday, 9 May 2026 · Judson Church, Yangon University",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pinyonScript.variable} ${cormorantGaramond.variable} ${kaushanScript.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${cinzelDecorative.variable}`}
    >
      <body className="antialiased">
        <div className="app-shell">
          <GlobalOrnaments />
          <LenisProvider>
            <div className="app-content">{children}</div>
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
