"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGuestStore } from "@/store/guestStore";

export default function NameGate() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setGuestName, setPhase } = useGuestStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      inputRef.current?.focus();
      return;
    }
    setSubmitting(true);
    setGuestName(name.trim());

    // Brief delay then transition to letter phase
    setTimeout(() => {
      setPhase("letter");
    }, 600);
  };

  return (
    <motion.div
      className="entrance-overlay flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #f8f5ef 0%, #fdfbf7 52%, #f0ece4 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div aria-hidden="true" className="entrance-scene-frame" />

      {/* Decorative corner ornaments */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.85,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: -26,
            left: -26,
            width: "clamp(220px, 22vw, 420px)",
            aspectRatio: "1 / 1",
            backgroundImage: "url(/ornaments/floral-corner.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.28,
            mixBlendMode: "multiply",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: -26,
            right: -26,
            width: "clamp(220px, 22vw, 420px)",
            aspectRatio: "1 / 1",
            backgroundImage: "url(/ornaments/floral-corner.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            transform: "scaleX(-1)",
            opacity: 0.28,
            mixBlendMode: "multiply",
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Center content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ maxWidth: 620, width: "100%" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
      >
        <div
          className="stationery-card namegate-card"
          style={{
            margin: "0 auto",
            maxWidth: 560,
            borderRadius: 18,
            padding: "clamp(1.6rem, 4vw, 2.4rem) clamp(1.4rem, 4vw, 2.6rem)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Floral border ornaments */}
          <div aria-hidden="true" className="namegate-card__orn namegate-card__orn--tl" />
          <div aria-hidden="true" className="namegate-card__orn namegate-card__orn--tr" />
          <div aria-hidden="true" className="namegate-card__orn namegate-card__orn--bl" />
          <div aria-hidden="true" className="namegate-card__orn namegate-card__orn--br" />

          <div style={{ position: "relative", zIndex: 1 }}>
          {/* Overline */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.68rem",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.2rem",
            }}
          >
            Wedding Invitation
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-pinyon), cursive",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 7vw, 3.4rem)",
              lineHeight: 1.05,
              color: "var(--charcoal)",
              marginBottom: "0.6rem",
            }}
          >
            A seat awaits you
          </h1>

          {/* Prompt */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              lineHeight: 1.7,
              color: "rgba(44,44,44,0.74)",
              marginBottom: "1.6rem",
              fontStyle: "italic",
            }}
          >
            May we have your name for this invitation?
          </p>

          {/* Thin gold divider */}
          <hr
            style={{
              border: "none",
              height: "1px",
              background: "linear-gradient(to right, transparent, var(--gold), transparent)",
              margin: "0 auto 1.8rem",
              maxWidth: 240,
            }}
          />

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6rem" }}>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <input
                ref={inputRef}
                id="guest-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="input-gold"
                autoComplete="name"
                disabled={submitting}
                autoFocus
              />
              <p
                style={{
                  marginTop: "0.7rem",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.82rem",
                  color: "rgba(107,107,107,0.88)",
                  letterSpacing: "0.03em",
                }}
              >
                We’ll personalize the invitation for you.
              </p>
            </div>

            <motion.button
              id="name-gate-submit"
              type="submit"
              className="btn-gold"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ borderRadius: 999 }}
            >
              <span>{submitting ? "Opening…" : "Open Invitation"}</span>
            </motion.button>
          </form>

          {/* Tiny verse */}
          <motion.p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "rgba(107,107,107,0.78)",
              marginTop: "1.6rem",
              letterSpacing: "0.04em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
          >
            “Love is patient, love is kind.” — 1 Corinthians 13:4
          </motion.p>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          aria-hidden="true"
          style={{
            margin: "2.2rem auto 0",
            width: "min(520px, 78vw)",
            height: 1,
            opacity: 0.9,
            background: "linear-gradient(to right, transparent, rgba(212,175,55,0.55), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
