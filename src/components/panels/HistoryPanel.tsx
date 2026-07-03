"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";
import { historyMilestones } from "@/lib/data";

export default function HistoryPanel() {
  const { openPanel, closePanel } = usePanels();
  const isOpen = openPanel === "history";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[48]"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />
          <motion.div
            className="fixed z-[49] panel-glass flex flex-col"
            style={{
              top: "var(--menubar-h)",
              right: "var(--sidebar-w)",
              width: 320,
              bottom: "var(--timeline-h)",
              borderLeft: "1px solid var(--border)",
              borderRight: "1px solid var(--border)",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)", flexShrink: 0 }}
            >
              <span className="text-panel-title">History</span>
              <button onClick={closePanel} style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-muted)" }}>×</button>
            </div>

            {/* Timeline */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}>
              <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div style={{ position: "absolute", left: 15, top: 0, bottom: 0, width: 1, background: "var(--border)" }} />

                {historyMilestones.map((m, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 mb-5 relative"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {/* Dot */}
                    <div style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: "var(--panel)",
                      border: "1px solid var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, position: "relative", zIndex: 1, fontSize: 14,
                    }}>
                      {m.icon}
                    </div>

                    {/* Content */}
                    <div style={{ paddingTop: 4 }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 2 }}>
                        {m.year}
                      </div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {m.event}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
