"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteData } from "@/lib/siteData";
import GoldDivider from "@/components/ui/GoldDivider";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        background: "var(--ivory)",
        position: "relative",
      }}
    >
      {/* Parallax floating florals */}
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, width: "clamp(180px, 24vw, 350px)", opacity: 0.9, pointerEvents: "none", zIndex: 0, mixBlendMode: "multiply", filter: "contrast(1.5) brightness(1.1) grayscale(0.2)" }}
      >
        <Image src="/images/floral-tl.png" alt="" width={350} height={350} className="w-full h-auto animate-float" />
      </motion.div>
      <motion.div
        style={{ position: "absolute", top: 0, right: 0, width: "clamp(180px, 24vw, 350px)", opacity: 0.9, pointerEvents: "none", zIndex: 0, mixBlendMode: "multiply", filter: "contrast(1.5) brightness(1.1) grayscale(0.2)" }}
      >
        <Image src="/images/floral-tr.png" alt="" width={350} height={350} className="w-full h-auto animate-float-slow" style={{ animationDelay: "1s" }} />
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center text-center gap-10">

        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.72rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)" }}
        >
          Together with their families
        </motion.p>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1
            className="font-couple-hero"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              lineHeight: 1.04,
            }}
          >
            {siteData.couple.bride}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--dusty-blue)",
              margin: "0.5rem 0",
            }}
          >
            &amp;
          </p>
          <h1
            className="font-couple-hero"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              lineHeight: 1.04,
            }}
          >
            {siteData.couple.groom}
          </h1>
        </motion.div>

        <GoldDivider ornament="9 May 2026" maxWidth={400} />

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="image-frame"
          id="hero-portrait"
        >
          <div style={{ position: "relative", width: "clamp(280px, 60vw, 520px)", aspectRatio: "3/4", overflow: "hidden" }}>
            <Image
              src="/images/gallery-15.webp"
              alt={`${siteData.couple.bride} and ${siteData.couple.groom}`}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 60vw, 520px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </motion.div>

        {/* Event details under portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <p className="font-date-signature" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", color: "var(--dusty-blue)" }}>
            {siteData.event.dayOfWeek}, {siteData.event.date}
          </p>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--grey-mid)" }}>
            {siteData.event.timeRange}
          </p>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "0.15em", color: "var(--grey-mid)" }}>
            {siteData.event.venue} · {siteData.event.venueSubtitle}
          </p>
        </motion.div>
      </div>

      {/* Minimal Bottom Divider */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "150px", height: "1px", background: "linear-gradient(to right, transparent, var(--gold), transparent)" }} />
      </motion.div>
    </section>
  );
}
