"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/siteData";

const INTERVAL = 2000; // 2 s

export default function SlideshowSection() {
  const slides = siteData.slideshow;
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent((next + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => go(current + 1, 1), [current, go]);
  const goPrev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || isHovered) return;
    timerRef.current = setTimeout(goNext, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, isHovered, goNext]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "16%" : "-16%",
      opacity: 0,
      scale: 1.08,
      rotate: dir > 0 ? 1.6 : -1.6,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-16%" : "16%",
      opacity: 0,
      scale: 0.94,
      rotate: dir > 0 ? -1.2 : 1.2,
      filter: "blur(4px)",
    }),
  } as const;

  return (
    <section
      id="slideshow"
      className="section"
      style={{
        background: "linear-gradient(180deg, #fdfbf7 0%, #f4f0e8 50%, #fdfbf7 100%)",
        overflow: "hidden",
        padding: "5rem 0",
      }}
    >
      {/* ── Header ── */}
      <div className="container" style={{ textAlign: "center", marginBottom: "3rem", padding: "0 2rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.75rem",
          }}
        >
          ✦ &nbsp; Highlights &nbsp; ✦
        </motion.p>
        <motion.h2
          className="section-title-moments"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            color: "var(--charcoal)",
            lineHeight: 1.05,
          }}
        >
          Moments Together
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            height: 1,
            background: "linear-gradient(to right, transparent, var(--gold), transparent)",
            maxWidth: 320,
            margin: "1.2rem auto 0",
          }}
        />
      </div>

      {/* ── Main stage ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "relative",
          width: "min(92vw, 780px)",
          margin: "0 auto",
          aspectRatio: "16/10",
        }}
      >
        {/* Elegant outer frame */}
        <div
          style={{
            position: "absolute",
            inset: -14,
            border: "1px solid rgba(212,175,55,0.26)",
            pointerEvents: "none",
            zIndex: 3,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.45) inset, 0 14px 40px rgba(80,60,22,0.12)",
          }}
        />
        {/* Inner accent */}
        <div
          style={{
            position: "absolute",
            inset: -5,
            border: "1px solid rgba(212,175,55,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
        <motion.div
          animate={{ opacity: [0.45, 0.8, 0.45], rotate: [0, 360] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: -38,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "conic-gradient(from 210deg at 50% 50%, rgba(212,175,55,0), rgba(232,208,120,0.24), rgba(212,175,55,0), rgba(232,208,120,0.2), rgba(212,175,55,0))",
            mixBlendMode: "soft-light",
          }}
        />

        {/* Corner ornaments */}
        {[
          { top: -18, left: -18 },
          { top: -18, right: -18 },
          { bottom: -18, left: -18 },
          { bottom: -18, right: -18 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            style={{
              position: "absolute",
              width: 22,
              height: 22,
              borderTop: i < 2 ? "1.5px solid rgba(212,175,55,0.7)" : undefined,
              borderBottom: i >= 2 ? "1.5px solid rgba(212,175,55,0.7)" : undefined,
              borderLeft: i % 2 === 0 ? "1.5px solid rgba(212,175,55,0.7)" : undefined,
              borderRight: i % 2 === 1 ? "1.5px solid rgba(212,175,55,0.7)" : undefined,
              pointerEvents: "none",
              zIndex: 4,
              ...pos,
            }}
          />
        ))}

        {/* Slide container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.15), 0 4px 20px rgba(212,175,55,0.08)",
          }}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                willChange: "transform, opacity, filter",
              }}
            >
              <Image
                src={slides[current]}
                alt=""
                fill
                aria-hidden
                sizes="(max-width: 900px) 92vw, 780px"
                style={{ objectFit: "cover", filter: "blur(22px) saturate(1.15)", transform: "scale(1.1)" }}
                draggable={false}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(24,20,16,0.22)",
                }}
              />
              <Image
                src={slides[current]}
                alt={`Wedding moment ${current + 1}`}
                fill
                sizes="(max-width: 900px) 92vw, 780px"
                style={{ objectFit: "contain", padding: "0.7rem" }}
                priority={current === 0}
                draggable={false}
              />
              {/* Subtle vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at center, transparent 54%, rgba(0,0,0,0.22) 100%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Slide counter */}
          <motion.div
            key={`counter-${current}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: 16,
              right: 20,
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.75)",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </motion.div>
        </div>

        {/* Prev / Next arrows */}
        {[
          { dir: -1, label: "Previous", side: "left" as const, symbol: "‹" },
          { dir: 1, label: "Next", side: "right" as const, symbol: "›" },
        ].map(({ dir, label, side, symbol }) => (
          <motion.button
            key={side}
            onClick={() => (dir < 0 ? goPrev() : goNext())}
            aria-label={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="slide-arrow"
            style={{
              position: "absolute",
              top: "50%",
              [side]: -54,
              transform: "translateY(-50%)",
              zIndex: 5,
              width: 44,
              height: 44,
              background: "rgba(253,251,247,0.92)",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "var(--gold)",
              fontFamily: "serif",
              fontSize: "1.6rem",
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.45) inset",
            }}
          >
            {symbol}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Dot + progress indicators ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.55rem",
          marginTop: "2.2rem",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              go(i, i > current ? 1 : -1);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000);
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 7,
              height: 7,
              borderRadius: 4,
              background:
                i === current
                  ? "var(--gold)"
                  : "rgba(212,175,55,0.28)",
              border: i === current ? "none" : "1px solid rgba(212,175,55,0.3)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.45s cubic-bezier(0.43,0.13,0.23,0.96)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Progress fill for active dot */}
            {i === current && (
              <motion.span
                key={current}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.35)",
                  transformOrigin: "left",
                  borderRadius: 4,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Thumbnail strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          marginTop: "1.8rem",
          padding: "0 2rem",
          flexWrap: "wrap",
        }}
      >
        {slides.map((src, i) => (
          <motion.button
            key={i}
            onClick={() => {
              go(i, i > current ? 1 : -1);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 3000);
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 54,
              height: 36,
              padding: 0,
              border: i === current ? "2px solid var(--gold)" : "1px solid rgba(212,175,55,0.22)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              opacity: i === current ? 1 : 0.55,
              transition: "all 0.35s ease",
              flexShrink: 0,
              boxShadow: i === current ? "0 4px 14px rgba(212,175,55,0.3)" : "none",
            }}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Thumb ${i + 1}`}
              fill
              sizes="54px"
              style={{ objectFit: "cover", pointerEvents: "none" }}
              draggable={false}
            />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
