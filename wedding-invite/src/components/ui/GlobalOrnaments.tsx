"use client";

import { motion } from "framer-motion";

export default function GlobalOrnaments() {
  return (
    <div className="global-ornaments" aria-hidden="true">
      {/* Divine ambient light */}
      <div className="global-ornaments__light" />

      {/* Sparkle stardust (lightweight, elegant) */}
      <div className="global-ornaments__sparkles">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className={`global-ornaments__sparkle global-ornaments__sparkle--${i + 1}`} />
        ))}
      </div>

      {/* Slow-moving corner botanicals (subtle, premium) */}
      <motion.div
        className="global-ornaments__corner global-ornaments__corner--tl"
        animate={{ y: [0, -10, 0], x: [0, -6, 0], rotate: [-0.6, 0.6, -0.6] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="global-ornaments__corner global-ornaments__corner--tr"
        animate={{ y: [0, -10, 0], x: [0, 6, 0], rotate: [0.6, -0.6, 0.6] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="global-ornaments__corner global-ornaments__corner--bl"
        animate={{ y: [0, 10, 0], x: [0, -6, 0], rotate: [0.5, -0.5, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="global-ornaments__corner global-ornaments__corner--br"
        animate={{ y: [0, 10, 0], x: [0, 6, 0], rotate: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* A gentle botanical sweep for depth */}
      <motion.div
        className="global-ornaments__spray global-ornaments__spray--a"
        animate={{ y: [0, -12, 0], opacity: [0.22, 0.34, 0.22] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="global-ornaments__spray global-ornaments__spray--b"
        animate={{ y: [0, 10, 0], opacity: [0.16, 0.26, 0.16] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle shimmer layer */}
      <div className="global-ornaments__shimmer" />
    </div>
  );
}

