"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

interface TimelineBlock {
  id: string;
  track: string;
  label: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  bgColor: string;
  accentColor: string;
  shadowColor: string;
  widthPercent: number;
}

const WAVE_BARS = [
  { h: 10, d: 0.1 }, { h: 16, d: 0.3 }, { h: 8, d: 0.2 }, { h: 22, d: 0.5 }, { h: 14, d: 0.4 },
  { h: 6, d: 0.1 }, { h: 18, d: 0.7 }, { h: 12, d: 0.3 }, { h: 24, d: 0.2 }, { h: 10, d: 0.6 },
  { h: 16, d: 0.1 }, { h: 8, d: 0.3 }, { h: 22, d: 0.5 }, { h: 14, d: 0.4 }, { h: 6, d: 0.2 },
  { h: 18, d: 0.7 }, { h: 12, d: 0.1 }, { h: 24, d: 0.3 }, { h: 10, d: 0.5 }, { h: 16, d: 0.2 },
  { h: 8, d: 0.4 }, { h: 22, d: 0.1 }, { h: 14, d: 0.6 }, { h: 6, d: 0.3 }, { h: 18, d: 0.2 },
  { h: 12, d: 0.5 }, { h: 24, d: 0.4 }, { h: 10, d: 0.1 }, { h: 16, d: 0.7 }, { h: 8, d: 0.3 },
  { h: 22, d: 0.2 }, { h: 14, d: 0.5 }, { h: 6, d: 0.1 }, { h: 18, d: 0.4 }, { h: 12, d: 0.6 }
];

export default function Artboard03Experience() {
  const { accentColor } = useActiveTool();
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const synthRef = useRef<{ stop: () => void } | null>(null);

  // Clean up audio synthesis on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  const isHoveredRef = useRef(false);

  const playMelody = () => {
    isHoveredRef.current = true;
    try {
      const audio = new Audio("/country_roads.mp3");
      audio.volume = 0.25; // A pleasant volume level
      audio.loop = true;
      audio.currentTime = 4.0; // Skip the first 4 seconds of silent/slow intro

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // If the user moved their mouse out while it was still buffering, pause it safely
            if (!isHoveredRef.current) {
              audio.pause();
              audio.src = "";
            }
          })
          .catch(() => {
            // Catch the AbortError silently (prevents Next.js development crash overlay)
          });
      }

      synthRef.current = {
        stop: () => {
          isHoveredRef.current = false;
          try {
            audio.pause();
            audio.src = ""; // Unloads buffer stream to prevent network leaks
          } catch (e) {}
        }
      };
    } catch (e) {}
  };

  const blocks: TimelineBlock[] = [
    {
      id: "v3",
      track: "V3 - 25-now",
      label: "V3",
      title: "Campus Uncovered",
      organization: "Co-founder • June 2025 – Present",
      duration: "25-now",
      description: "Co-founded student media platform • Grown to 10K+ followers • 60% instagram reach boost",
      bgColor: "#112F26", // Solid matte green
      accentColor: "#10B981", // Bright emerald green
      shadowColor: "rgba(16, 185, 129, 0.3)",
      widthPercent: 95,
    },
    {
      id: "v2",
      track: "V2 - 24-25",
      label: "V2",
      title: "Saturnalia & Thapar Nautanki Team",
      organization: "Overall Finance Head / Student Head • June 2024 – May 2025",
      duration: "24-25",
      description: "Managed 1 Crore budget operations • Directing and leading campus-wide theatrical productions",
      bgColor: "#29183E", // Solid matte purple
      accentColor: "#A855F7", // Bright purple
      shadowColor: "rgba(168, 85, 247, 0.3)",
      widthPercent: 75,
    },
    {
      id: "v1",
      track: "V1 - 23-25",
      label: "V1",
      title: "Frosh TIET & Plex Consulting Wing",
      organization: "Finance & Design Head / Student Consultant • June 2023 – March 2025",
      duration: "23-25",
      description: "Centralized validation system for 3,500+ students • Cut check-in times by 90% using QR codes",
      bgColor: "#3D2B14", // Solid matte brown/yellow
      accentColor: "#EAB308", // Bright yellow
      shadowColor: "rgba(234, 179, 8, 0.3)",
      widthPercent: 50,
    },
  ];

  return (
    <section
      id="experience"
      className="relative flex flex-col justify-center"
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
          02
        </span>
        <span style={{ letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
          EXPERIENCE
        </span>
      </div>

      <div className="w-full max-w-[1200px]" style={{ margin: "0 auto" }}>
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: 12,
            }}
          >
            The Timeline
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(253, 244, 220, 0.4)",
              letterSpacing: "0.02em",
            }}
          >
            Where the frames were cut.
          </p>
        </motion.div>

        {/* Premiere Pro Timeline Layout Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "#08080A", // Solid opaque background (not transparent / no glass)
            border: "1.5px solid rgba(253, 244, 220, 0.08)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}
        >
          {/* Timeline timecode ticks header ruler */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              borderBottom: "1px solid rgba(253, 244, 220, 0.06)",
              background: "#0E0E12", // Solid dark ticks header
              height: "32px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRight: "1px solid rgba(253, 244, 220, 0.06)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "rgba(253, 244, 220, 0.3)",
              }}
            >
              TRACKS
            </div>
            {/* Ticks representation */}
            <div className="flex justify-between px-10 text-[9px] text-white/30 font-mono tracking-wider pointer-events-none">
              <span>00:00</span>
              <span>02:00</span>
              <span>04:00</span>
              <span>06:00</span>
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
            </div>
          </div>

          {/* Timeline tracks body */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {blocks.map((block, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  borderBottom: "1px solid rgba(253, 244, 220, 0.05)",
                  minHeight: "88px",
                  alignItems: "center",
                }}
              >
                {/* Track label */}
                <div
                  style={{
                    borderRight: "1px solid rgba(253, 244, 220, 0.05)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingLeft: "16px",
                    background: "#0B0B0D", // Solid dark tracks sidebar labels
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(253, 244, 220, 0.7)",
                      fontWeight: 600,
                    }}
                  >
                    {block.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "8px",
                      color: "rgba(253, 244, 220, 0.25)",
                      marginTop: 2,
                    }}
                  >
                    {block.duration}
                  </span>
                </div>

                {/* Track workspace */}
                <div className="w-full h-full relative flex items-center px-4">
                  {/* Clip Block (Solid matte styling with bright borders and shadow glow on hover) */}
                  <motion.div
                    onMouseEnter={() => setHoveredBlock(block.id)}
                    onMouseLeave={() => setHoveredBlock(null)}
                    animate={{
                      y: hoveredBlock === block.id ? -2 : 0,
                      boxShadow: hoveredBlock === block.id 
                        ? `0 8px 24px ${block.shadowColor}` 
                        : "0 4px 12px rgba(0,0,0,0.15)",
                      filter: hoveredBlock === block.id ? "brightness(1.15)" : "brightness(1)",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{
                      width: `${block.widthPercent}%`,
                      background: block.bgColor,
                      border: "1.5px solid rgba(253, 244, 220, 0.08)",
                      borderLeft: `4px solid ${block.accentColor}`,
                      borderRadius: "0 6px 6px 0",
                      padding: "10px 16px",
                      height: "calc(100% - 16px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: "#FDF4DC",
                        }}
                      >
                        {block.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.85)",
                        marginTop: 2,
                        fontWeight: 500,
                      }}
                    >
                      {block.organization}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.45)",
                        marginTop: 4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {block.description}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}

            {/* Audio Track A1 with dynamic bouncing equalizer waveform on hover */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                minHeight: "76px",
                alignItems: "center",
              }}
            >
              {/* Audio Label */}
              <div
                style={{
                  borderRight: "1px solid rgba(253, 244, 220, 0.05)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "16px",
                  background: "#0B0B0D",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "rgba(253, 244, 220, 0.7)",
                    fontWeight: 600,
                  }}
                >
                  A1
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    color: "rgba(253, 244, 220, 0.25)",
                    marginTop: 2,
                  }}
                >
                  Always
                </span>
              </div>

              {/* Waveform track */}
              <div className="w-full h-full flex items-center px-4 relative">
                <motion.div
                  onMouseEnter={() => {
                    setHoveredBlock("a1");
                    playMelody();
                  }}
                  onMouseLeave={() => {
                    setHoveredBlock(null);
                    if (synthRef.current) {
                      synthRef.current.stop();
                      synthRef.current = null;
                    }
                  }}
                  animate={{
                    y: hoveredBlock === "a1" ? -2 : 0,
                    boxShadow: hoveredBlock === "a1" 
                      ? "0 8px 24px rgba(16, 185, 129, 0.3)" 
                      : "0 4px 12px rgba(0,0,0,0.15)",
                    filter: hoveredBlock === "a1" ? "brightness(1.15)" : "brightness(1)",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    width: "95%",
                    height: "calc(100% - 16px)",
                    background: "#112F26", // Solid matte green background (not transparent)
                    border: "1.5px solid rgba(253, 244, 220, 0.08)",
                    borderLeft: "4px solid #10B981",
                    borderRadius: "0 6px 6px 0",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 18px",
                    cursor: "pointer",
                  }}
                >
                  {/* Digital audio equalizer visualizer representation */}
                  <div style={{ display: "flex", alignItems: "center", gap: 3, height: 32, flexShrink: 0, width: 140 }}>
                    {WAVE_BARS.map((bar, index) => (
                      <motion.div
                        key={index}
                        style={{
                          width: 2.2,
                          backgroundColor: "#10B981",
                          borderRadius: 0.8,
                          transformOrigin: "center",
                        }}
                        initial={{ height: bar.h }}
                        animate={hoveredBlock === "a1" ? {
                          height: [bar.h, bar.h * 2.2, bar.h * 0.4, bar.h * 1.6, bar.h],
                        } : {
                          height: bar.h,
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: bar.d,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10.5px",
                      color: "#FDF4DC",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      marginLeft: 24,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Code • Design • Drama • Finance
                  </span>
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
