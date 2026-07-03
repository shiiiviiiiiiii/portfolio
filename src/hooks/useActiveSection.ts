"use client";
import { create } from "zustand";
import type { SectionId } from "@/types";

interface SectionState {
  activeSection: SectionId;
  scrollProgress: number;
  setActiveSection: (section: SectionId) => void;
  setScrollProgress: (progress: number) => void;
}

export const useActiveSection = create<SectionState>((set) => ({
  activeSection: "hero",
  scrollProgress: 0,
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
