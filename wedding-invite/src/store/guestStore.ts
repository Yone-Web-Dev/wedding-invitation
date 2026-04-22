import { create } from "zustand";

interface GuestState {
  guestName: string;
  setGuestName: (name: string) => void;
  phase: "gate" | "letter" | "main";
  setPhase: (phase: "gate" | "letter" | "main") => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  guestName: "",
  setGuestName: (name) => set({ guestName: name }),
  phase: "gate",
  setPhase: (phase) => set({ phase }),
}));
