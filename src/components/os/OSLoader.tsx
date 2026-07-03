"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

export default function OSLoader() {
  const { accentColor } = useActiveTool();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // Steps to display in loading logs matching creative suite loader
  const steps = [
    { threshold: 10, text: "Initializing workspace..." },
    { threshold: 30, text: "Loading Photoshop engine..." },
    { threshold: 55, text: "Loading Premiere Pro timeline..." },
    { threshold: 75, text: "Calibrating color profiles..." },
    { threshold: 90, text: "Importing selected works..." },
  ];

  useEffect(() => {
    // Ticking progress bar loader animation (1.8 seconds total)
    const duration = 1800;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        // Add tiny post-100 delay for visual satisfaction
        setTimeout(() => {
          setVisible(false);
        }, 350);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 w-full h-full flex flex-col items-center justify-center no-select"
          style={{
            background: "#0F0F12",
            zIndex: 999999, // Sits above absolutely everything (including cursor)
          }}
        >
          {/* Main content box */}
          <div style={{ width: 440, display: "flex", flexDirection: "column" }}>
            {/* Header branding block */}
            <div className="flex items-center gap-4 mb-8">
              {/* Logo rounded square box */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: accentColor,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${accentColor}33`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#121216",
                    letterSpacing: "-0.05em",
                    lineHeight: 1,
                  }}
                >
                  SK
                </span>
              </div>

              {/* Text metadata columns */}
              <div className="flex flex-col">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#FDF4DC",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  Shivam Kumar
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9.5px",
                    color: "rgba(253, 244, 220, 0.4)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Creative Suite • Portfolio Edition 2026
                </span>
              </div>
            </div>

            {/* Progress status indicators */}
            <div className="flex items-center justify-between mb-2">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9.5px",
                  color: "rgba(253, 244, 220, 0.5)",
                }}
              >
                {progress < 100 ? "Loading plugins..." : "Workspace ready."}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "#FDF4DC",
                  fontWeight: 600,
                }}
              >
                {progress}%
              </span>
            </div>

            {/* Slider track progress bar */}
            <div
              style={{
                width: "100%",
                height: 3,
                background: "rgba(253, 244, 220, 0.08)",
                borderRadius: "100px",
                overflow: "hidden",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: accentColor,
                  borderRadius: "100px",
                  transition: "width 50ms linear",
                }}
              />
            </div>

            {/* Monospace console loading log steps */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                lineHeight: 1.8,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {steps.map((step, idx) => {
                const isActive = progress >= step.threshold;
                const isCompleted = idx < steps.length - 1 ? progress >= steps[idx + 1].threshold : progress >= 100;
                
                let textColor = "rgba(253, 244, 220, 0.15)"; // pending
                let prefix = "•";

                if (isCompleted) {
                  textColor = "#10B981"; // success green
                  prefix = "✓";
                } else if (isActive) {
                  textColor = accentColor; // active accent color
                  prefix = "⚡";
                }

                return (
                  <div
                    key={idx}
                    style={{
                      color: textColor,
                      transition: "color 150ms ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span>{prefix}</span>
                    <span>{step.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
