"use client";

import React, { useEffect, useRef } from "react";
import { useActiveTool } from "@/hooks/useActiveTool";

const TOOL_LABELS: Record<string, string> = {
  cursor: "Cursor",
  move: "Move",
  marquee: "Marquee",
  lasso: "Lasso",
  brush: "Brush",
  pen: "Pen",
  text: "Type",
  crop: "Crop",
  colorpicker: "Color Selector",
};

interface TrailTile {
  col: number;
  row: number;
  age: number;
  maxAge: number;
}

export default function CustomCursor() {
  const { activeTool, accentColor } = useActiveTool();

  // Refs for direct DOM manipulation
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const followDotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastPos = useRef({ x: -100, y: -100 });
  const innerX = useRef(-100);
  const innerY = useRef(-100);
  const outerX = useRef(-100);
  const outerY = useRef(-100);
  const followX = useRef(-100);
  const followY = useRef(-100);

  // Background Grid Trail state
  const trail = useRef<TrailTile[]>([]);
  const lastTileKey = useRef<string>("");
  const rafRef = useRef<number>(0);

  // Resize canvas to full viewport
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set up mouse events and hardware-accelerated animation loop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      lastPos.current = { x, y };

      const el = e.target as HTMLElement;
      const isHovering =
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.closest("[data-cursor-hover]") !== null;

      // Direct DOM class toggling (Morph from Circle to Rounded Square on hover)
      if (outerRingRef.current) {
        if (isHovering) {
          outerRingRef.current.style.width = "32px";
          outerRingRef.current.style.height = "32px";
          outerRingRef.current.style.borderRadius = "6px"; // Rounded Corner Square
          outerRingRef.current.style.borderColor = "rgba(253, 244, 220, 0.35)"; // Constant warm white color
        } else {
          outerRingRef.current.style.width = "32px";
          outerRingRef.current.style.height = "32px";
          outerRingRef.current.style.borderRadius = "50%"; // Circle
          outerRingRef.current.style.borderColor = "rgba(253, 244, 220, 0.35)";
        }
      }

      // Calculate grid coordinates to trigger tile highlights in the trail
      const canvas = canvasRef.current;
      if (canvas) {
        const offsetX = ((canvas.width / 2) % 40 + 40) % 40;
        const offsetY = ((canvas.height / 2) % 40 + 40) % 40;

        const col = Math.floor((x - offsetX) / 40);
        const row = Math.floor((y - offsetY) / 40);
        const key = `${col},${row}`;

        if (lastTileKey.current !== key) {
          lastTileKey.current = key;
          trail.current.push({ col, row, age: 0, maxAge: 10 });
        }
      }
    };

    const handleMouseDown = () => {
      if (innerDotRef.current) {
        innerDotRef.current.style.width = "3px";
        innerDotRef.current.style.height = "3px";
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.width = "22px";
        outerRingRef.current.style.height = "22px";
      }
    };

    const handleMouseUp = () => {
      if (innerDotRef.current) {
        innerDotRef.current.style.width = "5px";
        innerDotRef.current.style.height = "5px";
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.width = "36px";
        outerRingRef.current.style.height = "36px";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    const animate = () => {
      const tx = lastPos.current.x;
      const ty = lastPos.current.y;

      innerX.current = lerp(innerX.current, tx, 0.85);
      innerY.current = lerp(innerY.current, ty, 0.85);
      outerX.current = lerp(outerX.current, tx, 0.12);
      outerY.current = lerp(outerY.current, ty, 0.12);
      followX.current = lerp(followX.current, tx, 0.08);
      followY.current = lerp(followY.current, ty, 0.08);

      // Direct DOM style updates to bypass React render cycles
      if (innerDotRef.current) {
        innerDotRef.current.style.transform = `translate3d(${innerX.current}px, ${innerY.current}px, 0)`;
      }
      // Outer ring doesn't stretch or rotate anymore, keeping its perfect circle/square shape
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate3d(${outerX.current}px, ${outerY.current}px, 0)`;
      }
      if (followDotRef.current) {
        followDotRef.current.style.transform = `translate3d(${followX.current}px, ${followY.current}px, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${innerX.current + 14}px, ${innerY.current + 14}px, 0)`;
      }

      // Draw Grid Highlight Trail on Background Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const offsetX = ((canvas.width / 2) % 40 + 40) % 40;
          const offsetY = ((canvas.height / 2) % 40 + 40) % 40;

          trail.current.forEach((tile) => {
            const progress = tile.age / tile.maxAge;
            const alpha = 1 - progress;

            const tx = tile.col * 40 + offsetX;
            const ty = tile.row * 40 + offsetY;

            // Render glowing fill (extremely soft)
            ctx.fillStyle = accentColor;
            ctx.globalAlpha = alpha * 0.02;
            ctx.fillRect(tx + 1, ty + 1, 38, 38);

            // Render thin tile border outline (delicate)
            ctx.strokeStyle = accentColor;
            ctx.globalAlpha = alpha * 0.12;
            ctx.lineWidth = 1;
            ctx.strokeRect(tx + 0.5, ty + 0.5, 39, 39);

            tile.age += 1;
          });

          // Filter out finished tiles
          trail.current = trail.current.filter((t) => t.age <= t.maxAge);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [accentColor]);

  return (
    <>
      {/* Background Canvas for Grid Tile Highlights Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Elastic soft glow follow dot */}
      <div
        ref={followDotRef}
        className="fixed pointer-events-none rounded-full top-0 left-0"
        style={{
          width: 8,
          height: 8,
          background: accentColor,
          marginTop: -4,
          marginLeft: -4,
          opacity: 0.45,
          filter: "blur(1.5px)",
          boxShadow: `0 0 12px ${accentColor}`,
          zIndex: 9998,
          willChange: "transform",
        }}
      />

      {/* Outer ring (Morphs to rounded square on hover, stays uniform) */}
      <div
        ref={outerRingRef}
        className="fixed pointer-events-none z-[9999] rounded-full border top-0 left-0"
        style={{
          width: 32,
          height: 32,
          marginTop: -16,
          marginLeft: -16,
          borderColor: "rgba(253, 244, 220, 0.35)",
          transition: "width 200ms ease, height 200ms ease, border-color 200ms ease, border-radius 200ms ease",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Inner dot */}
      <div
        ref={innerDotRef}
        className="fixed pointer-events-none z-[9999] rounded-full bg-[#FDF4DC] top-0 left-0"
        style={{
          width: 5,
          height: 5,
          marginTop: -2.5,
          marginLeft: -2.5,
          transition: "width 100ms ease, height 100ms ease",
          willChange: "transform",
        }}
      />

      {/* Tool label */}
      {activeTool !== "cursor" && (
        <div
          ref={labelRef}
          className="fixed pointer-events-none z-[9999] top-0 left-0"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: "var(--text-muted)",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            padding: "2px 6px",
            borderRadius: "2px",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {TOOL_LABELS[activeTool] ?? activeTool}
        </div>
      )}
    </>
  );
}
