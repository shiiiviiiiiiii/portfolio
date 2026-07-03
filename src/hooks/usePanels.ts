"use client";
import { create } from "zustand";

type PanelId = "command" | "terminal" | "ai" | "search" | "history";

interface PanelState {
  openPanel: PanelId | null;
  openPanel_fn: (panel: PanelId) => void;
  closePanel: () => void;
  togglePanel: (panel: PanelId) => void;
}

export const usePanels = create<PanelState>((set, get) => ({
  openPanel: null,
  openPanel_fn: (panel) => set({ openPanel: panel }),
  closePanel: () => set({ openPanel: null }),
  togglePanel: (panel) =>
    set({ openPanel: get().openPanel === panel ? null : panel }),
}));
