"use client";

import React, { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function BottomTimeline() {
  const { scrollProgress } = useActiveSection();
  const [frame, setFrame] = useState(0);

  // Update frame counter
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 100000), 1000 / 24);
    return () => clearInterval(id);
  }, []);

  const formatFrame = (f: number) => {
    // Format frame count as HH:MM:SS:FF at 24fps
    const ff = f % 24;
    const totalSecs = Math.floor(f / 24);
    const ss = totalSecs % 60;
    const totalMins = Math.floor(totalSecs / 60);
    const mm = totalMins % 60;
    const hh = Math.floor(totalMins / 60) % 24;

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
  };

  // Generate ticks for the background (proportional layout)
  const ticksCount = 40;

  return (
    <div
      data-no-brush
      className="fixed bottom-0 left-0 right-0 panel flex items-center justify-between no-select"
      style={{
        height: "var(--timeline-h)",
        zIndex: "var(--z-timeline)",
        borderTop: "1px solid var(--border)",
        background: "var(--panel)",
        padding: "0 18px",
      }}
    >
      {/* Left: Timecode */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "#00F0FF",
          letterSpacing: "0.1em",
          fontWeight: 600,
        }}
      >
        {formatFrame(frame)}
      </div>

      {/* Center: Ticks representation */}
      <div
        className="flex-1 flex justify-between px-16 pointer-events-none"
        style={{ height: "100%", alignItems: "center" }}
      >
        {Array.from({ length: ticksCount }).map((_, i) => {
          // Playhead position relative to ticks
          const progressIndex = Math.round(scrollProgress * ticksCount);
          const isPlayhead = i === progressIndex;
          return (
            <div
              key={i}
              style={{
                width: 1,
                height: isPlayhead ? 16 : i % 5 === 0 ? 8 : 4,
                background: isPlayhead
                  ? "var(--accent)"
                  : "rgba(253, 244, 220, 0.12)",
                transition: "all 150ms ease",
              }}
            />
          );
        })}
      </div>

      {/* Right: Framerate */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "rgba(253, 244, 220, 0.4)",
          letterSpacing: "0.05em",
        }}
      >
        24 fps
      </div>
    </div>
  );
}
