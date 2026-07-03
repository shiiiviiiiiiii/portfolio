"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFloatingWindows } from "@/hooks/useFloatingWindows";
import type { FloatingWindow as FW } from "@/types";

const TABS = ["Overview", "Architecture", "Tech Stack", "Challenges"];

function ProjectWindowInner({ win }: { win: FW }) {
  const { closeWindow, minimizeWindow, maximizeWindow, bringToFront, moveWindow } =
    useFloatingWindows();
  const [activeTab, setActiveTab] = useState("Overview");
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const project = win.data!;

  const onTitleMouseDown = (e: React.MouseEvent) => {
    if (win.maximized) return;
    bringToFront(win.id);
    setDragging(true);
    dragOffset.current = { x: e.clientX - win.x, y: e.clientY - win.y };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging) moveWindow(win.id, e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [dragging, win.id, moveWindow]);

  if (win.minimized) return null;

  const style = win.maximized
    ? {
        left: 48,
        top: 28,
        right: 260,
        bottom: 64,
        width: "auto",
        height: "auto",
        zIndex: win.zIndex,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <motion.div
      className="fixed panel-glass flex flex-col overflow-hidden"
      style={{ ...style, borderRadius: 8, boxShadow: `0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px ${project.color}33` }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => bringToFront(win.id)}
    >
      {/* Color accent top */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`, flexShrink: 0 }} />

      {/* Title bar */}
      <div
        onMouseDown={onTitleMouseDown}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid var(--border)",
          cursor: dragging ? "grabbing" : "grab",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {/* Window controls */}
        <div style={{ display: "flex", gap: 6 }}>
          <div
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57", cursor: "pointer" }}
          />
          <div
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E", cursor: "pointer" }}
          />
          <div
            onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
            style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840", cursor: "pointer" }}
          />
        </div>

        {/* Title */}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", flex: 1, textAlign: "center" }}>
          {project.title.replace("\n", " ")} — {project.subtitle}
        </span>

        {/* Status badge */}
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "8px", padding: "1px 6px",
          border: `1px solid ${project.color}44`,
          borderRadius: 2, color: project.color, letterSpacing: "0.08em",
        }}>
          {project.status.toUpperCase()}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.06em",
              color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab ? `2px solid ${project.color}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all 150ms",
            }}
          >
            {tab}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", textDecoration: "none" }}>
            GitHub →
          </a>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {activeTab === "Overview" && (
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 4, whiteSpace: "pre-line" }}>{project.title}</h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: project.color }}>{project.subtitle}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>{project.description}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Role", value: project.role },
                { label: "Duration", value: project.duration },
                { label: "Team Size", value: `${project.team} people` },
                { label: "Lines of Code", value: project.linesOfCode },
                { label: "Impact", value: project.impact },
                { label: "Status", value: project.status },
              ].map((item) => (
                <div key={item.label} style={{ padding: "12px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 4 }}>
                  <div className="text-label mb-1">{item.label}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-primary)", fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Architecture" && (
          <div>
            <div className="text-label mb-6">System Architecture</div>
            <div className="flex flex-col gap-3">
              {project.architecture.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 4 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: project.color, width: 20, textAlign: "right" }}>L{i + 1}</div>
                  <div style={{ width: 1, height: 24, background: "var(--border)" }} />
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-primary)" }}>{item}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Tech Stack" && (
          <div>
            <div className="text-label mb-6">Technologies Used</div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <motion.div key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                  style={{ padding: "6px 14px", background: `${project.color}15`, border: `1px solid ${project.color}33`, borderRadius: 4, fontFamily: "var(--font-mono)", fontSize: 11, color: project.color, letterSpacing: "0.04em" }}>
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Challenges" && (
          <div>
            <div className="text-label mb-6">Engineering Challenges</div>
            <div className="flex flex-col gap-4">
              {project.challenges.map((ch, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  style={{ padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 4, borderLeft: `3px solid ${project.color}` }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{ch}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectWindows() {
  const { windows } = useFloatingWindows();
  return (
    <AnimatePresence>
      {windows.map((win) => (
        <ProjectWindowInner key={win.id} win={win} />
      ))}
    </AnimatePresence>
  );
}
