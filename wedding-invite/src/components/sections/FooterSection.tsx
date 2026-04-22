"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteData } from "@/lib/siteData";

export default function FooterSection() {
  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: "var(--ivory)",
        padding: "6rem 2rem 4rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Jungle + floral background wash */}
      <div aria-hidden="true" className="thankyou-jungle-bg" />

      {/* Soft floral corners */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "clamp(180px, 22vw, 360px)",
            opacity: 0.75,
            mixBlendMode: "multiply",
            filter: "contrast(1.45) brightness(1.1) grayscale(0.15)",
          }}
          animate={{ y: [0, -10, 0], opacity: [0.68, 0.82, 0.68] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/floral-tl.png" alt="" width={360} height={360} className="w-full h-auto" priority={false} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "clamp(180px, 22vw, 360px)",
            opacity: 0.75,
            mixBlendMode: "multiply",
            filter: "contrast(1.45) brightness(1.1) grayscale(0.15)",
          }}
          animate={{ y: [0, -8, 0], opacity: [0.68, 0.82, 0.68] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/floral-tr.png" alt="" width={360} height={360} className="w-full h-auto" priority={false} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "clamp(180px, 22vw, 360px)",
            opacity: 0.6,
            mixBlendMode: "multiply",
            filter: "contrast(1.45) brightness(1.1) grayscale(0.15)",
          }}
          animate={{ y: [0, 10, 0], opacity: [0.54, 0.72, 0.54] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/floral-bl.png" alt="" width={360} height={360} className="w-full h-auto" priority={false} />
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "clamp(180px, 22vw, 360px)",
            opacity: 0.6,
            mixBlendMode: "multiply",
            filter: "contrast(1.45) brightness(1.1) grayscale(0.15)",
          }}
          animate={{ y: [0, 8, 0], opacity: [0.54, 0.72, 0.54] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/images/floral-br.png" alt="" width={360} height={360} className="w-full h-auto" priority={false} />
        </motion.div>

        {/* Subtle gold vignette to unify */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(900px 420px at 50% 30%, rgba(212,175,55,0.06), transparent 60%), radial-gradient(900px 420px at 50% 95%, rgba(212,175,55,0.05), transparent 65%)",
            opacity: 1,
          }}
        />
      </div>

      {/* Top Gold Line for Footer */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          With Love &amp; Gratitude
        </motion.p>

        {/* Massive Thank You */}
        <motion.h2
          className="section-title-thankyou"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1 }}
          style={{
            fontSize: "clamp(4rem, 15vw, 10rem)",
            color: "var(--charcoal)",
            lineHeight: 1.0,
            letterSpacing: "0.01em",
          }}
        >
          Thank You
        </motion.h2>

        {/* Gold thin line */}
        <hr style={{ border: "none", height: "1px", background: "linear-gradient(to right, transparent, var(--gold), transparent)", width: "clamp(120px, 30vw, 300px)" }} />

        {/* Names */}
        <motion.p
          className="font-couple-footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
          }}
        >
          {siteData.couple.bride} &amp; {siteData.couple.groom}
        </motion.p>

        {/* Date fading out */}
        <motion.p
          className="font-date-signature"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
            letterSpacing: "0.14em",
            color: "rgba(44,44,44,0.78)",
          }}
        >
          {siteData.event.dayOfWeek}, {siteData.event.date}
        </motion.p>

        {/* Verse */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: "0.8rem",
            color: "var(--grey-mid)",
            maxWidth: 400,
            lineHeight: 1.8,
            marginTop: "0.5rem",
          }}
        >
          &ldquo;Unless the LORD builds the house&hellip;&rdquo; &mdash; Psalms 127:1
        </motion.p>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "var(--grey-light)",
            marginTop: "3rem",
            paddingBottom: "1rem",
          }}
        >
          {siteData.event.venue} · {siteData.event.date}
        </p>

        <p
          className="dev-signature"
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            paddingBottom: "1.25rem",
          }}
        >
          Design &amp; Development by Yone (A Developer).
        </p>
      </div>
    </footer>
  );
}
