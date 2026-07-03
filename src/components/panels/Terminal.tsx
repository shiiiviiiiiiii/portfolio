"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";
import { terminalCommands } from "@/lib/data";

interface Line {
  id: number;
  type: "input" | "output" | "error";
  text: string;
}

const WELCOME = `ShivamOS Terminal v1.0.0
Type 'help' for available commands.
`;

export default function Terminal() {
  const { openPanel, closePanel } = usePanels();
  const isOpen = openPanel === "terminal";
  const [lines, setLines] = useState<Line[]>([{ id: 0, type: "output", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [position, setPosition] = useState({ x: 120, y: 80 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [lines]);

  const addLine = (type: Line["type"], text: string) => {
    setLines((prev) => [...prev, { id: idRef.current++, type, text }]);
  };

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;
      addLine("input", `shivam@os:~$ ${trimmed}`);
      setHistory((h) => [trimmed, ...h]);
      setHistIdx(-1);

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      const response = terminalCommands[trimmed];
      if (response) {
        if (trimmed === "github") window.open("https://github.com", "_blank");
        if (trimmed === "linkedin") window.open("https://www.linkedin.com/in/shiviiii/", "_blank");
        addLine("output", response);
      } else {
        addLine("error", `command not found: ${trimmed}\nType 'help' for available commands.`);
      }
    },
    []
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { execute(input); setInput(""); }
    if (e.key === "ArrowUp") { e.preventDefault(); const idx = Math.min(histIdx + 1, history.length - 1); setHistIdx(idx); setInput(history[idx] ?? ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); const idx = Math.max(histIdx - 1, -1); setHistIdx(idx); setInput(idx === -1 ? "" : history[idx]); }
    if (e.key === "Escape") closePanel();
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
          className="fixed panel-glass"
          style={{
            left: position.x,
            top: position.y,
            width: 600,
            height: 380,
            borderRadius: 8,
            overflow: "hidden",
            zIndex: 45,
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Title bar */}
          <div
            onMouseDown={onDragStart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid var(--border)",
              cursor: "grab",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div onClick={closePanel} style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", cursor: "pointer" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", flex: 1, textAlign: "center" }}>shivam@os:~</span>
          </div>

          {/* Output */}
          <div
            ref={bodyRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              lineHeight: 1.7,
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <div
                key={line.id}
                style={{
                  color:
                    line.type === "input"
                      ? "var(--green)"
                      : line.type === "error"
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  whiteSpace: "pre-wrap",
                  marginBottom: 2,
                }}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderTop: "1px solid var(--border)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)" }}>shivam@os:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-primary)",
                cursor: "text",
              }}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="cursor-blink" style={{ width: 8, height: 14, background: "var(--green)", opacity: 0.8 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
