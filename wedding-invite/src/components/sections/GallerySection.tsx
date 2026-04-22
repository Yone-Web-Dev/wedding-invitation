"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteData } from "@/lib/siteData";
import GoldDivider from "@/components/ui/GoldDivider";

export default function GallerySection() {
  const { gallery } = siteData;

  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "var(--ivory)" }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Gallery
          </p>
          <h2
            className="section-title-story"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--charcoal)",
              lineHeight: 1.1,
            }}
          >
            Our Story
          </h2>
        </motion.div>

        <GoldDivider maxWidth={200} />

        {/* Masonry grid */}
        <div className="masonry" style={{ width: "100%" }}>
          {gallery.map((item, i) => {
            const ratio = item.aspect === "portrait" ? "3/4" : item.aspect === "landscape" ? "4/3" : "1/1";
            return (
              <motion.div
                key={i}
                className="masonry-item image-frame gallery-photo-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.022, y: -8, transition: { duration: 0.35 } }}
                style={{
                  position: "relative",
                  aspectRatio: ratio,
                  height: "auto",
                  overflow: "hidden",
                  animationDelay: `${(i % 5) * 0.4}s`,
                  boxShadow: "0 4px 28px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <div aria-hidden="true" className="gallery-photo-card__border" />
                <div aria-hidden="true" className="gallery-photo-card__glow" />
                <Image
                  src={item.src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  loading="lazy"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
