"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useActiveTool } from "@/hooks/useActiveTool";
import type { SectionId } from "@/types";

const NAV_ITEMS: { label: string; section: SectionId }[] = [
  { label: "About", section: "about" },
  { label: "Experience", section: "experience" },
  { label: "Recognition", section: "achievements" },
  { label: "Contact", section: "contact" },
];

export default function MenuBar() {
  const { activeSection } = useActiveSection();
  const { accentColor } = useActiveTool();

  const scrollTo = (section: SectionId) => {
    const el = document.getElementById(section);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      data-no-brush
      className="fixed top-0 left-0 right-0 flex items-center justify-between panel-glass no-select"
      style={{
        height: "var(--menubar-h)",
        zIndex: "var(--z-menubar)",
        borderBottom: "1px solid var(--border)",
        padding: "0 24px",
      }}
    >
      {/* Left: Yellow Logo Box */}
      <div className="flex items-center">
        <div
          style={{
            width: 24,
            height: 24,
            background: accentColor,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 10px ${accentColor}33`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 800,
              color: "#121216",
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            SK
          </span>
        </div>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.section}
            onClick={() => scrollTo(item.section)}
            className="transition-colors duration-200"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 500,
              color: activeSection === item.section ? "var(--text-primary)" : "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Available for freelance Status Indicator */}
      <div className="flex items-center gap-2">
        <motion.div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00F0FF",
            boxShadow: "0 0 8px #00F0FF",
          }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 500,
            color: "rgba(253, 244, 220, 0.6)",
            letterSpacing: "0.05em",
          }}
        >
          Available for freelance
        </span>
      </div>
    </div>
  );
}
