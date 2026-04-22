"use client";

import { motion } from "framer-motion";
import { siteData } from "@/lib/siteData";
import GoldDivider from "@/components/ui/GoldDivider";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function ParentsVerseSection() {
  return (
    <section
      id="parents"
      className="section"
      style={{ background: "var(--white)", textAlign: "center" }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>

        <GoldDivider full />

        {/* Bible Verse */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          style={{ maxWidth: 640, padding: "0 1rem" }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.5rem",
            }}
          >
            Our Foundation
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
              lineHeight: 1.7,
              color: "var(--charcoal)",
              margin: "0 0 1rem",
            }}
          >
            &ldquo;{siteData.verse.text}&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            — {siteData.verse.reference}
          </p>
        </motion.div>

        <GoldDivider maxWidth={300} />

        {/* Parents */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "2rem 3rem",
            alignItems: "start",
            maxWidth: 700,
            width: "100%",
          }}
        >
          {/* Bride's parents */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--dusty-blue)",
                marginBottom: "0.75rem",
              }}
            >
              {siteData.parents.bride.label}
            </p>
            <p
              className="font-name-statement font-name-statement--parents"
              style={{
                fontSize: "clamp(1.15rem, 2.7vw, 1.6rem)",
                fontWeight: 400,
                lineHeight: 1.9,
              }}
            >
              {siteData.parents.bride.father}
              <br />
              <span style={{ fontStyle: "italic", color: "var(--grey-mid)", fontSize: "0.9em" }}>&amp;</span>
              <br />
              {siteData.parents.bride.mother}
            </p>
          </div>

          {/* Center divider */}
          <div
            style={{
              width: "1px",
              height: "100%",
              background: "linear-gradient(to bottom, transparent, var(--gold), transparent)",
              margin: "0 auto",
            }}
          />

          {/* Groom's parents */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--dusty-blue)",
                marginBottom: "0.75rem",
              }}
            >
              {siteData.parents.groom.label}
            </p>
            <p
              className="font-name-statement font-name-statement--parents"
              style={{
                fontSize: "clamp(1.15rem, 2.7vw, 1.6rem)",
                fontWeight: 400,
                lineHeight: 1.9,
              }}
            >
              {siteData.parents.groom.father}
              <br />
              <span style={{ fontStyle: "italic", color: "var(--grey-mid)", fontSize: "0.9em" }}>&amp;</span>
              <br />
              {siteData.parents.groom.mother}
            </p>
          </div>
        </motion.div>

        <GoldDivider full />
      </div>
    </section>
  );
}
