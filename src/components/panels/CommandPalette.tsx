"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";

const COMMANDS = [
  { id: "open-resume", label: "Download Resume", icon: "📄", shortcut: "⌘D", action: "download" },
  { id: "projects", label: "Go to Projects", icon: "📁", shortcut: "⌘P", action: "scroll:projects" },
  { id: "about", label: "Go to About", icon: "👤", shortcut: "", action: "scroll:about" },
  { id: "skills", label: "Go to Skills", icon: "⚡", shortcut: "", action: "scroll:skills" },
  { id: "experience", label: "Go to Experience", icon: "⏱", shortcut: "", action: "scroll:experience" },
  { id: "contact", label: "Go to Contact", icon: "✉", shortcut: "", action: "scroll:contact" },
  { id: "github", label: "Open GitHub", icon: "🐙", shortcut: "", action: "open:https://github.com" },
  { id: "linkedin", label: "Open LinkedIn", icon: "💼", shortcut: "", action: "open:https://www.linkedin.com/in/shiviiii/" },
  { id: "terminal", label: "Open Terminal", icon: ">", shortcut: "~", action: "panel:terminal" },
  { id: "ai", label: "Open AI Assistant", icon: "✨", shortcut: "", action: "panel:ai" },
  { id: "history", label: "Open History Panel", icon: "⟳", shortcut: "", action: "panel:history" },
  { id: "hire", label: "Hire Shivam", icon: "🎯", shortcut: "", action: "scroll:contact" },
];

export default function CommandPalette() {
  const { openPanel, closePanel, openPanel_fn } = usePanels();
  const isOpen = openPanel === "command";
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelected(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); execute(filtered[selected]); }
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [isOpen, filtered, selected, closePanel]);

  const execute = (cmd: typeof COMMANDS[0]) => {
    closePanel();
    const [type, val] = cmd.action.split(":");
    if (type === "scroll") document.getElementById(val)?.scrollIntoView({ behavior: "smooth" });
    else if (type === "open") window.open(val, "_blank");
    else if (type === "panel") openPanel_fn(val as any);
    else if (type === "download") { /* trigger download */ }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[48]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />

          {/* Palette */}
          <motion.div
            className="fixed z-[49] panel-glass"
            style={{
              top: "20%",
              left: "50%",
              width: 560,
              maxHeight: 440,
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.94, y: -16, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.94, y: -16, x: "-50%" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search commands, sections, projects..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--text-primary)",
                  cursor: "text",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", padding: "2px 6px", border: "1px solid var(--border)", borderRadius: 2 }}>ESC</span>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 360, overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 32, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>No results</div>
              ) : (
                filtered.map((cmd, i) => (
                  <div
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 16px",
                      background: i === selected ? "rgba(255,61,147,0.08)" : "transparent",
                      borderLeft: i === selected ? "2px solid var(--accent)" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "background 100ms",
                    }}
                    onMouseEnter={() => setSelected(i)}
                  >
                    <span style={{ fontSize: 16, width: 24, textAlign: "center", flexShrink: 0 }}>{cmd.icon}</span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-primary)", flex: 1 }}>{cmd.label}</span>
                    {cmd.shortcut && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", padding: "2px 6px", border: "1px solid var(--border)", borderRadius: 2 }}>{cmd.shortcut}</span>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2" style={{ borderTop: "1px solid var(--border)" }}>
              {[
                { key: "↑↓", desc: "Navigate" },
                { key: "↵", desc: "Select" },
                { key: "ESC", desc: "Close" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-1.5">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", padding: "1px 4px", border: "1px solid var(--border)", borderRadius: 2 }}>{item.key}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-disabled)" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
