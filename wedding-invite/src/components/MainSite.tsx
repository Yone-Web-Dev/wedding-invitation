"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import ParentsVerseSection from "@/components/sections/ParentsVerseSection";
import SlideshowSection from "@/components/sections/SlideshowSection";
import SaveTheDateSection from "@/components/sections/SaveTheDateSection";
import GallerySection from "@/components/sections/GallerySection";
import GuestbookSection from "@/components/sections/GuestbookSection";
import RSVPSection from "@/components/sections/RSVPSection";
import FooterSection from "@/components/sections/FooterSection";
import GoldDivider from "@/components/ui/GoldDivider";

export default function MainSite() {
  return (
    <div className="wedding-frame">
      <motion.main
        className="wedding-frame__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{ background: "var(--ivory)" }}
      >
        <HeroSection />
        <GoldDivider full />
        <ParentsVerseSection />
        <GoldDivider full />
        <SlideshowSection />
        <GoldDivider full />
        <SaveTheDateSection />
        <GoldDivider full />
        <GallerySection />
        <GoldDivider full />
        <GuestbookSection />
        <GoldDivider full />
        <RSVPSection />
        <FooterSection />
      </motion.main>
    </div>
  );
}
