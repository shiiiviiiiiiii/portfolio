"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";
import { projects, skills, experiences, achievements } from "@/lib/data";

const ALL_ITEMS = [
  ...projects.map((p) => ({ type: "Project", label: p.title.replace("\n", " "), sub: p.subtitle, color: p.color })),
  ...skills.map((s) => ({ type: "Skill", label: s.name, sub: s.category, color: "var(--text-muted)" })),
  ...experiences.map((e) => ({ type: "Experience", label: e.company, sub: e.role, color: "var(--green)" })),
  ...achievements.map((a) => ({ type: "Achievement", label: a.title, sub: a.event, color: "var(--orange)" })),
];

export default function SearchPanel() {
  const { openPanel, closePanel } = usePanels();
  const isOpen = openPanel === "search";
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.sub.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS.slice(0, 8);

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(""); setSelected(0); }
  }, [isOpen]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [isOpen, filtered, closePanel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[48]"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closePanel}
          />
          <motion.div
            className="fixed z-[49] panel-glass"
            style={{ top: "15%", left: "50%", width: 580, maxHeight: 480, borderRadius: 8, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, scale: 0.94, y: -16, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.94, y: -16, x: "-50%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>🔍</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search projects, skills, experience..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-primary)", cursor: "text" }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", padding: "2px 6px", border: "1px solid var(--border)", borderRadius: 2 }}>ESC</span>
            </div>

            {/* Type filters */}
            <div className="flex gap-2 px-4 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="text-label">
                {query ? `${filtered.length} results` : "Recent"}
              </span>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 380, overflowY: "auto" }}>
              {filtered.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 16px",
                    background: i === selected ? "rgba(255,255,255,0.04)" : "transparent",
                    borderLeft: i === selected ? "2px solid var(--accent)" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "background 100ms",
                  }}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "2px 6px", border: `1px solid ${item.color}44`, borderRadius: 2, color: item.color, letterSpacing: "0.06em", flexShrink: 0 }}>
                    {item.type.toUpperCase()}
                  </span>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-primary)" }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
