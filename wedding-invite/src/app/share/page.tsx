import type { Metadata } from "next";
import Link from "next/link";

const shareUrl = "https://soeandnawweddinginvitation.vercel.app/share";
const previewImage = "https://soeandnawweddinginvitation.vercel.app/teams-preview.png";

export const metadata: Metadata = {
  title: "Naw Hae So Paw & Soe Yan Naing — Wedding Invitation",
  description: "Saturday, 9 May 2026 · Judson Church, Yangon University",
  openGraph: {
    title: "Naw Hae So Paw & Soe Yan Naing — Wedding",
    description: "Saturday, 9 May 2026 · Judson Church, Yangon University",
    type: "website",
    url: shareUrl,
    images: [
      {
        url: previewImage,
        secureUrl: previewImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Naw Hae So Paw and Soe Yan Naing wedding invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naw Hae So Paw & Soe Yan Naing — Wedding",
    description: "Saturday, 9 May 2026 · Judson Church, Yangon University",
    images: [previewImage],
  },
};

export default function SharePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="stationery-card w-full max-w-xl text-center space-y-4">
        <p className="text-xs tracking-[0.28em] uppercase text-gold">Wedding Invitation</p>
        <h1 className="text-4xl md:text-5xl font-name-statement font-name-statement--hero">
          Naw Hae So Paw &amp; Soe Yan Naing
        </h1>
        <p className="text-lg text-charcoal">Saturday, 9 May 2026 · Judson Church, Yangon University</p>
        <div className="pt-2">
          <Link href="/" className="btn-gold inline-flex items-center justify-center">
            <span>Open Invitation</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
