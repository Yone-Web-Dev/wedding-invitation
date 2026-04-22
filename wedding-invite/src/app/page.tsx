"use client";

import { useGuestStore } from "@/store/guestStore";
import { AnimatePresence } from "framer-motion";

import NameGate from "@/components/entrance/NameGate";
import RealLetterScene from "@/components/entrance/RealLetterScene";
import MainSite from "@/components/MainSite";

export default function Home() {
  const { phase } = useGuestStore();

  return (
    <AnimatePresence mode="wait">
      {phase === "gate" && <NameGate key="gate" />}
      {phase === "letter" && <RealLetterScene key="letter" />}
      {phase === "main" && <MainSite key="main" />}
    </AnimatePresence>
  );
}
