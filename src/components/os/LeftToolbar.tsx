"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";
import type { ToolId } from "@/types";

// ─── ICONS (18x18 matching the 60px toolbar proportion) ───────────────────────

const CursorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3l4.5 11 2-4.5 4.5-2L3 3z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1l2.5 2.5H9v3.5h3.5v-1.5l2.5 2.5-2.5 2.5v-1.5H9v3.5h1.5L8 15l-2-2.5h1.5V9H4v1.5L1.5 8l2.5-2.5V7h3.5V3.5H6L8 1z"/>
  </svg>
);

const SelectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="12" height="12" strokeDasharray="3 2" rx="1.5"/>
  </svg>
);

const LassoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3c-2 0-3 1.5-3 3s1 4 3.5 4.5S11 8.5 11 7s-1-3-3-3S5.5 6 6.5 8s3.5 1 4.5 3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CropIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 1v10h10M1 5h10v10"/>
  </svg>
);

const BrushIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.5 2a1.5 1.5 0 0 1 2.121 2.121L6 11.742l-2.5.758.758-2.5L11.5 2z"/>
    <path d="M4 13c0 .828-.895 1-2 1s-1-.172-1-1 .448-2 2-2c.5 0 1 .672 1 2z"/>
  </svg>
);

const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="2" y1="14" x2="14" y2="2" />
    <circle cx="2" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="2" r="1.5" fill="currentColor"/>
  </svg>
);

const TextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 3h12v2H9v8H7V5H2V3z"/>
  </svg>
);

interface Tool {
  id: ToolId;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  dividerAfter?: boolean;
}

const TOOLS: Tool[] = [
  { id: "cursor", icon: <CursorIcon />, label: "Cursor Tool", shortcut: "Q" },
  { id: "move", icon: <MoveIcon />, label: "Move Tool", shortcut: "V" },
  { id: "marquee", icon: <SelectIcon />, label: "Marquee Tool", shortcut: "M" },
  { id: "lasso", icon: <LassoIcon />, label: "Lasso Tool", shortcut: "L", dividerAfter: true },
  { id: "crop", icon: <CropIcon />, label: "Crop Tool", shortcut: "C" },
  { id: "brush", icon: <BrushIcon />, label: "Brush Tool", shortcut: "B" },
  { id: "pen", icon: <PenIcon />, label: "Pen Tool", shortcut: "P" },
  { id: "text", icon: <TextIcon />, label: "Type Tool", shortcut: "T" },
];

// ─── COLOR PICKER POPUP ───────────────────────────────────────────────────────

const ACCENT_PRESETS = [
  "#FF3D93", "#3578FF", "#FF8A3D", "#22C55E",
  "#A855F7", "#EF4444", "#06B6D4", "#EAB308",
];

function ColorPickerPopup({
  onSelect,
  currentColor,
  onClose,
}: {
  onSelect: (color: string) => void;
  currentColor: string;
  onClose: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    setTimeout(() => window.addEventListener("mousedown", handler), 100);
    return () => window.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <motion.div
      ref={popupRef}
      className="panel-glass"
      style={{
        position: "absolute",
        left: "calc(100% + 12px)",
        bottom: 0,
        width: 200,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        padding: 14,
        zIndex: 300,
      }}
      initial={{ opacity: 0, x: -12, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -12, scale: 0.95 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
          ACCENT
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.6)" }}>
          {currentColor.toUpperCase()}
        </span>
      </div>

      {/* Color grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
        {ACCENT_PRESETS.map((color) => (
          <motion.button
            key={color}
            onClick={() => { onSelect(color); onClose(); }}
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: 8,
              background: color,
              border: currentColor === color ? "2px solid white" : "2px solid rgba(0,0,0,0)",
              cursor: "pointer",
              position: "relative",
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {currentColor === color && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: 6,
                border: "2px solid rgba(255,255,255,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Custom hex input */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Custom</span>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onSelect(e.target.value)}
          style={{
            width: 36, height: 24, padding: 0, border: "none",
            borderRadius: 6, background: "none", cursor: "pointer",
          }}
        />
        <div style={{ flex: 1, height: 24, borderRadius: 6, background: currentColor }} />
      </div>
    </motion.div>
  );
}

// ─── TOOLBAR ──────────────────────────────────────────────────────────────────

export default function LeftToolbar() {
  const { activeTool, setTool, accentColor, setAccentColor } = useActiveTool();
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case "q": setTool("cursor"); break;
        case "v": setTool("move"); break;
        case "m": setTool("marquee"); break;
        case "l": setTool("lasso"); break;
        case "c": setTool("crop"); break;
        case "b": setTool("brush"); break;
        case "p": setTool("pen"); break;
        case "t": setTool("text"); break;
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [setTool]);

  // Apply accent color to CSS variable live
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
    document.documentElement.style.setProperty("--accent-dim", `${accentColor}22`);
    document.documentElement.style.setProperty("--accent-glow", `0 0 20px ${accentColor}55`);
  }, [accentColor]);

  return (
    <div
      data-no-brush
      className="fixed left-0 flex flex-col items-center panel no-select"
      style={{
        top: "var(--menubar-h)",
        bottom: "var(--timeline-h)",
        width: "var(--toolbar-w)",
        zIndex: 200,
        borderRight: "1px solid var(--border)",
        padding: "12px 0",
        gap: "4px",
      }}
    >
      {TOOLS.map((tool) => (
        <React.Fragment key={tool.id}>
          <div className="relative group flex justify-center" style={{ width: "100%" }}>
            <motion.button
              onClick={() => setTool(tool.id)}
              whileTap={{ scale: 0.88 }}
              className="flex items-center justify-center relative"
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                color: activeTool === tool.id ? "var(--text-primary)" : "rgba(255,255,255,0.35)",
                background: "rgba(0,0,0,0)",
                border: "none",
                position: "relative",
              }}
            >
              {activeTool === tool.id && (
                <motion.div
                  layoutId="active-tool-bg"
                  className="absolute inset-0 rounded-[12px]"
                  style={{
                    background: `${accentColor}22`,
                    border: `1.5px solid ${accentColor}33`,
                    boxShadow: `0 0 12px ${accentColor}11`,
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{tool.icon}</span>
            </motion.button>

            {/* Tooltip */}
            <div
              className="tooltip absolute opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)", zIndex: 300, whiteSpace: "nowrap" }}
            >
              {tool.label}
              <span style={{ marginLeft: 8, color: "var(--accent)", fontSize: "8px" }}>{tool.shortcut}</span>
            </div>
          </div>

          {tool.dividerAfter && (
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.06)", margin: "4px auto" }} />
          )}
        </React.Fragment>
      ))}

      {/* Color selector at bottom */}
      <div className="mt-auto mb-2 relative flex flex-col items-center" style={{ width: "100%" }}>
        <motion.button
          onClick={() => setShowColorPicker((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: accentColor,
            border: showColorPicker ? "2px solid rgba(255,255,255,0.6)" : "2px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            boxShadow: showColorPicker ? `0 0 14px ${accentColor}88` : "none",
            transition: "all 200ms ease",
          }}
        />

        {/* Color picker popup */}
        <AnimatePresence>
          {showColorPicker && (
            <ColorPickerPopup
              currentColor={accentColor}
              onSelect={setAccentColor}
              onClose={() => setShowColorPicker(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
