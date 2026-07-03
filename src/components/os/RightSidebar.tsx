"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { SectionId } from "@/types";

interface Layer {
  id: SectionId;
  label: string;
  num: string;
}

const LAYERS: Layer[] = [
  { id: "hero", label: "Cover", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "achievements", label: "Recognition", num: "03" },
  { id: "skills", label: "Toolkit", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function RightSidebar() {
  const { activeSection, scrollProgress } = useActiveSection();
  const [collapsed, setCollapsed] = useState(false);

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const opacityPct = Math.round(scrollProgress * 100);

  return (
    <motion.div
      data-no-brush
      className="fixed panel-glass no-select"
      style={{
        // Floating compact card — bottom right, above timeline
        right: 16,
        bottom: "calc(var(--timeline-h) + 16px)",
        zIndex: 30,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        minWidth: 200,
      }}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "10px 14px 8px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Drag handle dots */}
        <div className="flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,0.2)">
            <circle cx="2" cy="2" r="1.2"/><circle cx="2" cy="5" r="1.2"/><circle cx="2" cy="8" r="1.2"/>
            <circle cx="5" cy="2" r="1.2"/><circle cx="5" cy="5" r="1.2"/><circle cx="5" cy="8" r="1.2"/>
          </svg>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Layers
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            {LAYERS.length.toString().padStart(2, "0")}
          </span>
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              color: "rgba(255,255,255,0.25)",
              background: "none",
              border: "none",
              fontSize: 10,
              padding: 2,
            }}
          >
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Layer list */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "6px 0" }}>
              {LAYERS.map((layer) => {
                const isActive = activeSection === layer.id;
                return (
                  <motion.button
                    key={layer.id}
                    onClick={() => scrollTo(layer.id)}
                    className="flex items-center gap-3 w-full text-left transition-all"
                    style={{
                      padding: "5px 14px",
                      background: isActive
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0)",
                      border: "none",
                      cursor: "pointer",
                    }}
                    whileHover={{ background: "rgba(255,255,255,0.04)" } as any}
                  >
                    {/* Radio indicator */}
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${isActive ? "var(--accent)" : "rgba(255,255,255,0.15)"}`,
                        background: isActive ? "var(--accent)" : "rgba(0,0,0,0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 200ms ease",
                      }}
                    >
                      {isActive && (
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#fff",
                          }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        color: isActive
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.35)",
                        fontWeight: isActive ? 500 : 400,
                        letterSpacing: "0.01em",
                        flex: 1,
                      }}
                    >
                      <span style={{ color: "rgba(255,255,255,0.2)", marginRight: 6, fontFamily: "var(--font-mono)", fontSize: 9 }}>
                        {layer.num}·
                      </span>
                      {layer.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Opacity row */}
            <div
              style={{
                padding: "8px 14px 10px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Opacity
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {opacityPct}%
                </span>
              </div>
              <div
                style={{
                  height: 2,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 1,
                  marginTop: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${opacityPct}%`,
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: 1,
                    transition: "width 300ms ease",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
