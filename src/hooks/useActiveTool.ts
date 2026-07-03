"use client";
import { create } from "zustand";
import type { ToolId } from "@/types";

interface ToolState {
  activeTool: ToolId;
  accentColor: string;
  setTool: (tool: ToolId) => void;
  setAccentColor: (color: string) => void;
}

export const useActiveTool = create<ToolState>((set) => ({
  activeTool: "cursor",
  accentColor: "#FF3D93",
  setTool: (tool) => set({ activeTool: tool }),
  setAccentColor: (color) => set({ accentColor: color }),
}));
