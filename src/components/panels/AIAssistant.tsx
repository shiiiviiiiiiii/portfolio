"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";
import { aiResponses } from "@/lib/data";

const QUICK_PROMPTS = [
  { label: "Summarize Shivam", key: "summarize" },
  { label: "Why hire Shivam?", key: "hire" },
  { label: "Campus Uncovered?", key: "campus uncovered" },
  { label: "Retinopathy project?", key: "retinopathy project" },
  { label: "Education", key: "education" },
  { label: "Key strengths", key: "strengths" },
];

interface Message { role: "user" | "ai"; text: string; }

export default function AIAssistant() {
  const { openPanel, closePanel } = usePanels();
  const isOpen = openPanel === "ai";
  const [messages, setMessages] = useState<Message[]>([{ role: "ai", text: aiResponses.default }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [position, setPosition] = useState({ x: 80, y: 80 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [isOpen]);

  const respond = (key: string, userText: string) => {
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setThinking(true);
    setTimeout(() => {
      const lKey = key.toLowerCase();
      let response = aiResponses.default;
      for (const [k, v] of Object.entries(aiResponses)) {
        if (lKey.includes(k) || k.includes(lKey)) { response = v; break; }
      }
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setThinking(false);
    }, 800 + Math.random() * 600);
  };

  const submit = () => {
    if (!input.trim()) return;
    respond(input.trim(), input.trim());
    setInput("");
  };

  const onDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging) setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y }); };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed panel-glass flex flex-col"
          style={{
            left: position.x,
            top: position.y,
            width: 380,
            height: 500,
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 45,
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,61,147,0.2)",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div
            onMouseDown={onDragStart}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,61,147,0.08)", borderBottom: "1px solid rgba(255,61,147,0.15)", cursor: "grab", flexShrink: 0 }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600, color: "var(--text-primary)", flex: 1 }}>Ask Shivam AI</span>
            <motion.button onClick={closePanel} style={{ color: "var(--text-muted)", fontSize: 16 }} whileHover={{ color: "var(--text-primary)" }}>×</motion.button>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-1.5 p-3" style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.key}
                onClick={() => respond(p.key, p.label)}
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px", padding: "3px 8px", borderRadius: 2, border: "1px solid var(--border)", color: "var(--text-muted)", background: "transparent", letterSpacing: "0.04em", transition: "all 150ms" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "var(--accent)"; (e.target as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "var(--border)"; (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "8px 12px",
                    borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                    background: msg.role === "user" ? "var(--accent)" : "rgba(255,255,255,0.06)",
                    border: msg.role === "ai" ? "1px solid var(--border)" : "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    lineHeight: 1.7,
                    color: "var(--text-primary)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div style={{ display: "flex", gap: 4, padding: "8px 12px" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--border)", flexShrink: 0 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); if (e.key === "Escape") closePanel(); }}
              placeholder="Ask anything about Shivam..."
              style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 4, padding: "8px 12px", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-primary)", outline: "none", cursor: "text" }}
            />
            <motion.button
              onClick={submit}
              style={{ padding: "8px 12px", background: "var(--accent)", border: "none", borderRadius: 4, color: "white", fontSize: 14, fontWeight: 700 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ↑
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
