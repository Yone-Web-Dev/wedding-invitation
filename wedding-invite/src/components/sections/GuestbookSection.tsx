"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Wish } from "@/lib/supabase";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useGuestStore } from "@/store/guestStore";
import GoldDivider from "@/components/ui/GoldDivider";

export default function GuestbookSection() {
  const { guestName } = useGuestStore();
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [allWishes, setAllWishes] = useState<Wish[] | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [message, setMessage] = useState("");
  const [authorNameInput, setAuthorNameInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const authorName = useMemo(() => {
    return (guestName || authorNameInput).trim();
  }, [guestName, authorNameInput]);

  // Fetch existing wishes
  useEffect(() => {
    const fetchWishes = async () => {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);
      if (data) setWishes(data as Wish[]);
    };
    fetchWishes();

    // Real-time subscription
    const channel = supabase
      .channel("wishes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, (payload: RealtimePostgresInsertPayload<Wish>) => {
        setWishes((prev) => [payload.new, ...prev]);
        setAllWishes((prev) => (prev ? [payload.new, ...prev] : prev));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const openAllWishes = async () => {
    setShowAll(true);
    if (allWishes) return;
    setLoadingAll(true);
    const { data, error: err } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (!err && data) setAllWishes(data as Wish[]);
    setLoadingAll(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !authorName.trim()) return;
    setSending(true);
    setError("");

    const { error: err } = await supabase.from("wishes").insert({
      name: authorName,
      message: message.trim(),
    });

    if (err) {
      setError("Could not send your wish. Please try again.");
    } else {
      setMessage("");
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
    setSending(false);
  };

  return (
    <section
      id="guestbook"
      className="section"
      style={{ background: "var(--white)" }}
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
            Guestbook
          </p>
          <h2
            className="section-title-wishes"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--charcoal)",
              lineHeight: 1.1,
            }}
          >
            Wedding Wishes
          </h2>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "1rem", color: "var(--grey-mid)", marginTop: "0.75rem" }}>
            Leave a blessing for the couple
          </p>
        </motion.div>

        <div className="guestbook-layout" style={{ width: "100%" }}>
          {/* Submit Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="guestbook-panel guestbook-panel--form"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "2.5rem",
              border: "1px solid rgba(212,175,55,0.2)",
              background: "var(--ivory)",
              position: "relative",
            }}
          >
            <div style={{ position: "absolute", top: 8, left: 8, right: 8, bottom: 8, border: "1px solid rgba(212,175,55,0.08)", pointerEvents: "none" }} />

            {!guestName && (
              <div>
                <label style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--dusty-blue)", display: "block", marginBottom: "0.5rem" }}>
                  Your Name
                </label>
                <input
                  id="wish-author-name"
                  type="text"
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                  className="input-gold"
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div>
              <label style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--dusty-blue)", display: "block", marginBottom: "0.5rem" }}>
                {guestName ? `Your Wish, ${guestName}` : "Your Wish"}
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    // submit the form (Enter to send, Shift+Enter for newline)
                    (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
                  }
                }}
                placeholder="Write your blessing for the couple…"
                rows={4}
                required
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--gold)",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1rem",
                  color: "var(--charcoal)",
                  lineHeight: 1.7,
                  resize: "none",
                  outline: "none",
                  padding: "0.25rem 0",
                  letterSpacing: "0.02em",
                }}
              />
            </div>

            {error && <p style={{ color: "#c0392b", fontSize: "0.85rem", fontFamily: "var(--font-cormorant), serif" }}>{error}</p>}

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: "var(--dusty-blue)", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "0.95rem", textAlign: "center" }}
                >
                  ✦ Your wish has been sent. Thank you! ✦
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              id="wish-submit"
              type="submit"
              disabled={sending || !message.trim()}
              className="btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ alignSelf: "center" }}
            >
              <span>{sending ? "Sending…" : "Send Your Wish"}</span>
            </motion.button>
          </motion.form>

          {/* Wishes showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="guestbook-panel guestbook-panel--showcase"
          >
            <div className="guestbook-showcase__header">
              <p className="guestbook-showcase__kicker">Blessings Received</p>
              <h3 className="guestbook-showcase__title">Visitors&rsquo; Wishes</h3>
            </div>
            <GoldDivider maxWidth={220} />

            {wishes.length > 0 ? (
              <>
                <div className="guestbook-showcase__list" tabIndex={0} data-lenis-prevent>
                  {wishes.slice(0, 10).map((wish, i) => (
                  <motion.article
                    key={wish.id}
                    className="guestbook-wish-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25) }}
                  >
                    <p className="guestbook-wish-card__message">&ldquo;{wish.message}&rdquo;</p>
                    <div className="guestbook-wish-card__divider" />
                    <div className="guestbook-wish-card__meta">
                      <p className="guestbook-wish-card__name">{wish.name}</p>
                      <p className="guestbook-wish-card__date">
                        {new Date(wish.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </motion.article>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "0.9rem" }}>
                  <motion.button
                    type="button"
                    className="btn-gold btn-gold--sm"
                    onClick={openAllWishes}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View all wishes</span>
                  </motion.button>
                </div>
              </>
            ) : (
              <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", color: "var(--grey-mid)", fontSize: "1rem", textAlign: "center" }}>
                Be the first to leave a wish…
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            className="wishes-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="All wedding wishes"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              className="wishes-modal__panel"
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="wishes-modal__header">
                <div>
                  <p className="wishes-modal__kicker">All Blessings</p>
                  <h3 className="wishes-modal__title">Wedding Wishes</h3>
                </div>
                <motion.button
                  type="button"
                  className="btn-gold btn-gold--sm"
                  onClick={() => setShowAll(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Close</span>
                </motion.button>
              </div>

              <div className="wishes-modal__list" tabIndex={0} data-lenis-prevent>
                {loadingAll ? (
                  <p style={{ textAlign: "center", fontStyle: "italic", color: "var(--grey-mid)" }}>Loading…</p>
                ) : (allWishes ?? wishes).length > 0 ? (
                  (allWishes ?? wishes).map((wish) => (
                    <article key={wish.id} className="guestbook-wish-card">
                      <p className="guestbook-wish-card__message">&ldquo;{wish.message}&rdquo;</p>
                      <div className="guestbook-wish-card__divider" />
                      <div className="guestbook-wish-card__meta">
                        <p className="guestbook-wish-card__name">{wish.name}</p>
                        <p className="guestbook-wish-card__date">
                          {new Date(wish.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <p style={{ textAlign: "center", fontStyle: "italic", color: "var(--grey-mid)" }}>No wishes yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
