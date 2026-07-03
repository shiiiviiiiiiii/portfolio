"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

export default function Artboard01About() {
  const { accentColor } = useActiveTool();

  const stats = [
    { value: "4 yrs", label: "Experience" },
    { value: "1 Cr", label: "Budget Managed" },
    { value: "3K+", label: "Campus Uncovered Followers" },
  ];

  return (
    <section
      id="about"
      className="relative flex items-center"
      style={{
        minHeight: "100vh",
        padding: "80px 80px",
        background: "transparent",
      }}
    >
      {/* Artboard label */}
      <div
        className="artboard-label absolute flex items-center gap-2"
        style={{ top: "calc(var(--menubar-h) + 16px)", left: 24 }}
      >
        <span
          style={{
            background: accentColor,
            color: "#121216",
            padding: "2px 6px",
            borderRadius: "3px",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
          }}
        >
          01
        </span>
        <span style={{ letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
          ABOUT
        </span>
      </div>

      <div
        className="w-full max-w-[1200px] margin-auto grid gap-20 items-center"
        style={{
          gridTemplateColumns: "1fr 1.2fr",
          margin: "0 auto",
        }}
      >
        {/* Left: Photoshop Cutout Photo with selection bounds */}
        <div className="flex justify-center items-center">
          <div
            className="relative animate-selection"
            style={{
              padding: "24px",
              background: "rgba(253, 244, 220, 0.01)",
            }}
          >
            {/* Marching ants selection outline */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <rect
                x="0.75"
                y="0.75"
                width="calc(100% - 1.5px)"
                height="calc(100% - 1.5px)"
                fill="none"
                stroke="rgba(253, 244, 220, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="6, 4"
                rx="8"
                ry="8"
                style={{
                  animation: "marching-ants 0.8s linear infinite",
                }}
              />
            </svg>
            {/* Corner anchor points (Photoshop select anchors) */}
            <div style={{ position: "absolute", top: -3, left: -3, width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", top: -3, right: -3, width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", bottom: -3, left: -3, width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", bottom: -3, right: -3, width: 6, height: 6, background: accentColor }} />
            {/* Center anchor points */}
            <div style={{ position: "absolute", top: "50%", left: -3, transform: "translateY(-50%)", width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", top: "50%", right: -3, transform: "translateY(-50%)", width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, background: accentColor }} />
            <div style={{ position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, background: accentColor }} />

            {/* Tooltip sticker top right */}
            <motion.div
              className="absolute shadow-lg"
              style={{
                top: 10,
                right: -32,
                background: accentColor,
                color: "#121216",
                padding: "6px 12px",
                borderRadius: "8px",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                transform: "rotate(6deg)",
                zIndex: 10,
                boxShadow: `0 8px 24px ${accentColor}33`,
              }}
              animate={{ rotate: [6, 4, 6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              creating since age 11
            </motion.div>

            {/* Cutout Photo sticker */}
            <img
              src="/lil_shivam_real.jpg"
              alt="Shivam childhood cutout"
              style={{
                maxHeight: "440px",
                width: "auto",
                objectFit: "contain",
                display: "block",
                borderRadius: "4px",
                border: "1.5px solid rgba(253, 244, 220, 0.15)",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.5))",
                userSelect: "none",
              }}
              draggable={false}
            />

            {/* Layer tag at bottom left */}
            <div
              style={{
                position: "absolute",
                bottom: -12,
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "4px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "rgba(253, 244, 220, 0.6)",
                letterSpacing: "0.02em",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              lil_shivam_real.jpg
            </div>
          </div>
        </div>

        {/* Right: Creative content matching reference */}
        <div>
          {/* Display title */}
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(32px, 4.2vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: 28,
            }}
          >
            Some people sleep
            <br />
            on ideas. I wake up
            <br />
            with <span style={{ color: accentColor }}>them.</span>
          </h2>

          {/* Description paragraphs */}
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(253, 244, 220, 0.65)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: 40,
              maxWidth: "540px",
            }}
          >
            <p>
              I&apos;m someone who finds joy in building things that people genuinely enjoy using. Sometimes that&apos;s a website, sometimes a product, sometimes a brand, and sometimes just an idea that deserves to exist. I love working where design, technology, and storytelling meet, turning messy thoughts into experiences that feel simple, intentional, and memorable.
            </p>
            <p>
              Whether I&apos;m designing interfaces, building products, leading creative teams, or experimenting with AI, I&apos;m always chasing the same goal: creating work that leaves things a little better than I found them.
            </p>
            <p>
              I see AI as a creative partner, not a shortcut. It helps me move faster, explore more ideas, and focus my energy on what matters most—thinking deeply, designing thoughtfully, and building experiences that people remember.
            </p>
          </div>

          {/* Stats row: clean text-only layout with no boxes or borders */}
          <div className="flex items-center gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 800,
                    color: accentColor,
                    lineHeight: 1,
                    marginBottom: 6,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "rgba(253, 244, 220, 0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
