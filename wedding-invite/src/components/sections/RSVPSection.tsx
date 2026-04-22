"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useGuestStore } from "@/store/guestStore";
import GoldDivider from "@/components/ui/GoldDivider";

type GuestCount = 1 | 2 | 3;

export default function RSVPSection() {
  const { guestName } = useGuestStore();
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState<GuestCount>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState(guestName || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null || !phone.trim() || !name.trim()) return;
    setSubmitting(true);
    setError("");

    const { error: err } = await supabase.from("rsvps").insert({
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guest_count: attending ? guestCount : 0,
    });

    if (err) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <section
      id="rsvp"
      className="section"
      style={{ background: "var(--ivory)", position: "relative" }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Kindly Reply By April 2026
          </p>
          <h2
            style={{
              fontFamily: "var(--font-pinyon), cursive",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--charcoal)",
              lineHeight: 1.1,
            }}
          >
            RSVP
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "1rem", color: "var(--grey-mid)", marginTop: "0.75rem" }}>
            We would be honored by your presence
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "3rem", border: "1px solid rgba(212,175,55,0.25)", background: "var(--white)", maxWidth: 480 }}
            >
              <p style={{ fontFamily: "var(--font-pinyon), cursive", fontSize: "3rem", color: "var(--dusty-blue)", marginBottom: "1rem" }}>
                Thank You
              </p>
              <GoldDivider maxWidth={200} />
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "1.05rem", color: "var(--charcoal)", marginTop: "1rem", lineHeight: 1.8 }}>
                {attending
                  ? `We are delighted, ${name}. We look forward to celebrating with you on 9 May 2026.`
                  : `Thank you for letting us know, ${name}. You will be in our hearts and prayers.`}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                width: "100%",
                maxWidth: 520,
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "3rem",
                border: "1px solid rgba(212,175,55,0.2)",
                background: "var(--white)",
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", top: 10, left: 10, right: 10, bottom: 10, border: "1px solid rgba(212,175,55,0.07)", pointerEvents: "none" }} />

              {/* Name */}
              {!guestName && (
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-gold"
                    placeholder="Your full name"
                    required
                  />
                </div>
              )}

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-gold"
                  placeholder="+95 ···"
                  required
                />
              </div>

              {/* Attending */}
              <div>
                <label style={labelStyle}>Will you attend?</label>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem" }}>
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      id={`rsvp-attending-${val ? "yes" : "no"}`}
                      onClick={() => setAttending(val)}
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        border: attending === val ? "1px solid var(--gold)" : "1px solid var(--grey-light)",
                        background: attending === val ? "rgba(212,175,55,0.08)" : "transparent",
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "0.8rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: attending === val ? "var(--gold)" : "var(--grey-mid)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {val ? "Joyfully Accepts" : "Regretfully Declines"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest count (only if attending) */}
              <AnimatePresence>
                {attending === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label style={labelStyle}>Number of Guests</label>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                      {([1, 2, 3] as GuestCount[]).map((n) => (
                        <button
                          key={n}
                          type="button"
                          id={`rsvp-guests-${n}`}
                          onClick={() => setGuestCount(n)}
                          style={{
                            width: 52,
                            height: 52,
                            border: guestCount === n ? "1px solid var(--gold)" : "1px solid var(--grey-light)",
                            background: guestCount === n ? "rgba(212,175,55,0.1)" : "transparent",
                            fontFamily: "var(--font-cormorant), serif",
                            fontSize: "1.1rem",
                            color: guestCount === n ? "var(--gold)" : "var(--grey-mid)",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && <p style={{ color: "#c0392b", fontSize: "0.85rem", fontFamily: "var(--font-cormorant), serif" }}>{error}</p>}

              <motion.button
                id="rsvp-submit"
                type="submit"
                disabled={submitting || attending === null || !phone.trim()}
                className="btn-gold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ alignSelf: "center" }}
              >
                <span>{submitting ? "Sending…" : "Confirm RSVP"}</span>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-cormorant), serif",
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--dusty-blue)",
  display: "block",
};
