"use client";
import { create } from "zustand";
import type { FloatingWindow, Project } from "@/types";

interface WindowsState {
  windows: FloatingWindow[];
  topZ: number;
  openProject: (project: Project) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
}

export const useFloatingWindows = create<WindowsState>((set, get) => ({
  windows: [],
  topZ: 40,

  openProject: (project) => {
    const { windows, topZ } = get();
    const existing = windows.find((w) => w.data?.id === project.id);
    if (existing) {
      set({
        windows: windows.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, zIndex: topZ + 1 } : w
        ),
        topZ: topZ + 1,
      });
      return;
    }
    const newWindow: FloatingWindow = {
      id: `proj-${project.id}-${Date.now()}`,
      type: "project",
      x: 80 + windows.length * 24,
      y: 60 + windows.length * 24,
      width: 840,
      height: 580,
      minimized: false,
      maximized: false,
      zIndex: topZ + 1,
      data: project,
    };
    set({ windows: [...windows, newWindow], topZ: topZ + 1 });
  },

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    })),

  maximizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    })),

  bringToFront: (id) => {
    const topZ = get().topZ + 1;
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, zIndex: topZ } : w)),
      topZ,
    }));
  },

  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)),
    })),
}));
