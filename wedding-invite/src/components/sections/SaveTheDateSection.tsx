"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/siteData";
import GoldDivider from "@/components/ui/GoldDivider";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-unit" style={{ minWidth: 70 }}>
      <span className="countdown-number">{String(value).padStart(2, "0")}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function SaveTheDateSection() {
  const { days, hours, minutes, seconds } = useCountdown(siteData.event.dateISO);

  return (
    <section
      id="save-the-date"
      className="section"
      style={{ background: "var(--white)" }}
    >
      <div className="container">
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
            textAlign: "center",
            marginBottom: "0.75rem",
          }}
        >
          Save the Date
        </motion.p>
        <motion.h2
          className="font-date-signature"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color: "#45372d",
            textAlign: "center",
            marginBottom: "3rem",
            lineHeight: 1.1,
          }}
        >
          {siteData.event.dayOfWeek}, {siteData.event.date}
        </motion.h2>

        <GoldDivider maxWidth={300} />

        <div className="save-date-layout">
          {/* Left: Countdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="save-date-countdown"
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--dusty-blue)",
              }}
            >
              Counting Down
            </p>
            <div className="countdown-card">
              <CountdownUnit value={days} label="Days" />
              <span className="countdown-separator">:</span>
              <CountdownUnit value={hours} label="Hours" />
              <span className="countdown-separator">:</span>
              <CountdownUnit value={minutes} label="Mins" />
              <span className="countdown-separator">:</span>
              <CountdownUnit value={seconds} label="Secs" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", color: "var(--charcoal)", letterSpacing: "0.05em" }}>
                {siteData.event.timeRange}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="wedding-feast-card"
            >
              <p className="wedding-feast-kicker">Wedding Feast</p>
              <h3 className="wedding-feast-title">Menu Highlights</h3>
              <p className="wedding-feast-copy">We will be serving</p>
              <div className="wedding-feast-list" aria-label="Wedding menu">
                <span className="wedding-feast-list__item">Biryani</span>
                <span className="wedding-feast-list__dot">✦</span>
                <span className="wedding-feast-list__item">Ice Cream</span>
              </div>

              <div className="wedding-feast-actions" aria-label="Quick jump actions">
                <motion.a
                  href="#guestbook"
                  className="btn-gold btn-gold--sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  <span>Go to Wishes</span>
                </motion.a>
                <motion.a
                  href="#rsvp"
                  className="btn-gold btn-gold--sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  <span>Go to RSVP</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Vertical divider */}
          <div className="save-date-divider" style={{ background: "linear-gradient(to bottom, transparent, var(--gold) 30%, var(--gold) 70%, transparent)", width: 1, height: "100%", minHeight: 200 }} />

          {/* Right: Venue + Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="save-date-venue"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--dusty-blue)",
              }}
            >
              The Venue
            </p>
            <div>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--charcoal)", lineHeight: 1.4, marginBottom: "0.25rem" }}>
                {siteData.event.venue}
              </p>
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.85rem", letterSpacing: "0.15em", color: "var(--dusty-blue)", textTransform: "uppercase" }}>
                {siteData.event.venueSubtitle}
              </p>
            </div>

            {/* Map */}
            <div className="map-container image-frame" style={{ overflow: "hidden", height: 260 }}>
              <iframe
                src={siteData.event.googleMapSrc}
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding venue map"
              />
            </div>

            <motion.a
              href={siteData.event.googleMapLink}
              target="_blank"
              rel="noreferrer"
              className="btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ alignSelf: "flex-start", textDecoration: "none", display: "inline-block" }}
            >
              <span>Open in Google Maps</span>
            </motion.a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
