"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGuestStore } from "@/store/guestStore";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function RealLetterScene() {
  const { guestName, setPhase } = useGuestStore();
  const [zooming, setZooming] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCTA(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    if (zooming) return;
    setZooming(true);
    setTimeout(() => setPhase("main"), 1400);
  };

  return (
    <motion.div
      className="entrance-overlay"
      data-lenis-prevent
      style={{
        background: "linear-gradient(160deg, #f8f5ef 0%, #fdfbf7 50%, #f0ece4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: "1.25rem",
        padding: "clamp(16px, 3vw, 34px)",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "4rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: zooming ? 0 : 1 }}
      transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div aria-hidden="true" className="entrance-scene-frame" />
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-18% -10%",
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(70% 40% at 50% 30%, rgba(212,175,55,0.15), rgba(212,175,55,0.02) 60%, transparent 100%), radial-gradient(65% 35% at 50% 85%, rgba(244,216,205,0.2), transparent 70%)",
          mixBlendMode: "soft-light",
        }}
        animate={{ rotate: [0, 7, -5, 0], scale: [1, 1.03, 1.02, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ambient petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: `rgba(212,175,55,${0.08 + i * 0.03})`,
            top: `${10 + i * 14}%`,
            left: `${5 + i * 13}%`,
            pointerEvents: "none",
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: zooming ? 0 : 1, y: zooming ? -8 : 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          textAlign: "center",
          maxWidth: 640,
          paddingTop: "clamp(8px, 1.2vh, 14px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.65rem",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.9)",
            marginBottom: "0.65rem",
          }}
        >
          Your Invitation
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
            color: "rgba(44,44,44,0.78)",
            letterSpacing: "0.02em",
          }}
        >
          Please take a moment to read, then open the celebration.
        </p>
        {guestName && (
          <p
            style={{
              marginTop: "0.55rem",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.78rem",
              color: "rgba(107,107,107,0.9)",
              letterSpacing: "0.08em",
            }}
          >
            Prepared for{" "}
            <span className="font-human" style={{ color: "rgba(212,175,55,0.95)", fontSize: "1.05em" }}>
              {guestName}
            </span>
          </p>
        )}
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{
          scale: zooming ? 1.15 : 1,
          opacity: zooming ? 0 : 1,
          y: zooming ? -30 : 0,
        }}
        transition={{ duration: zooming ? 1.4 : 1.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        style={{
          position: "relative",
          width: "min(92vw, 520px)",
          maxWidth: "min(92vw, 520px)",
          marginTop: "0.5rem",
          marginBottom: "clamp(120px, 16vh, 180px)",
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-10px",
            borderRadius: 24,
            padding: "1px",
            background:
              "linear-gradient(130deg, rgba(212,175,55,0.78), rgba(232,208,120,0.28), rgba(212,175,55,0.82))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
          animate={{ opacity: [0.65, 1, 0.68], scale: [1, 1.01, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="letter-image-frame">
          <Image
            src="/invitation-letter.png"
            alt="Wedding invitation letter"
            width={768}
            height={1152}
            priority
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 14,
            }}
          />
        </div>
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-22px",
            borderRadius: 28,
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(212,175,55,0), rgba(232,208,120,0.22), rgba(212,175,55,0), rgba(232,208,120,0.18), rgba(212,175,55,0))",
            opacity: 0.5,
            mixBlendMode: "soft-light",
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Floating CTA */}
      <AnimatePresence>
        {showCTA && !zooming && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              bottom: "max(18px, env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
              zIndex: 50,
              pointerEvents: "none",
              padding: "0 16px",
            }}
          >
            {/* Soft footer scrim so CTA never feels like it overlaps content */}
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                height: 180,
                background:
                  "linear-gradient(to top, rgba(253, 251, 247, 0.98) 0%, rgba(253, 251, 247, 0.70) 45%, rgba(253, 251, 247, 0) 100%)",
                zIndex: -1,
                pointerEvents: "none",
              }}
            />

            {/* Animated arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.8rem", letterSpacing: "0.05em" }}
            >
              ▼
            </motion.div>

            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(212,175,55,0.35)" }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(212,175,55,0)",
                  "0 0 22px rgba(212,175,55,0.25)",
                  "0 0 0px rgba(212,175,55,0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                pointerEvents: "auto",
                background: "rgba(253, 251, 247, 0.75)",
                border: "1px solid rgba(212,175,55,0.75)",
                color: "#d4af37",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "0.82rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "0.85rem 2.8rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: 999,
                textShadow: "0 1px 0 rgba(255,255,255,0.65)",
              }}
              id="letter-enter-btn"
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                ✦ &nbsp; Click here to open your invitation &nbsp; ✦
              </span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{
                pointerEvents: "none",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: "0.78rem",
                color: "rgba(107,107,107,0.9)",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              Tap to enter · Smooth scroll & music-ready experience inside
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
