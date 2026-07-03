"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

interface AppItem {
  id: string;
  name: string;
  desc: string;
  abbr: string;
  color: string;
  bgOpacity: string;
  progressColor: string;
}

export default function Artboard04Skills() {
  const { accentColor } = useActiveTool();

  // 8 Toolkit Apps matching user request
  const apps: AppItem[] = [
    {
      id: "photoshop",
      name: "Photoshop",
      desc: "Compositing • Retouch",
      abbr: "Ps",
      color: "#00C8FF",
      bgOpacity: "#00C8FF1a",
      progressColor: "#00C8FF",
    },
    {
      id: "premiere",
      name: "Premiere Pro",
      desc: "Edit • Sequence",
      abbr: "Pr",
      color: "#EA77FF",
      bgOpacity: "#EA77FF1a",
      progressColor: "#EA77FF",
    },
    {
      id: "illustrator",
      name: "Illustrator",
      desc: "Vector • Logo",
      abbr: "Ai",
      color: "#FF9A00",
      bgOpacity: "#FF9A001a",
      progressColor: "#FF9A00",
    },
    {
      id: "figma",
      name: "Figma",
      desc: "UI • Layout",
      abbr: "Fg",
      color: "#0ACF83",
      bgOpacity: "#0ACF831a",
      progressColor: "#0ACF83",
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      desc: "AI Assistance • Prompting",
      abbr: "Gp",
      color: "#10A37F",
      bgOpacity: "#10A37F1a",
      progressColor: "#10A37F",
    },
    {
      id: "antigravity",
      name: "Antigravity",
      desc: "Agentic AI • Autopilot",
      abbr: "Ag",
      color: accentColor,
      bgOpacity: `${accentColor}1a`,
      progressColor: accentColor,
    },
    {
      id: "claude",
      name: "Claude",
      desc: "AI Writing • Ideation",
      abbr: "Cl",
      color: "#007ACC", // Styled as blue in the screenshot
      bgOpacity: "#007ACC1a",
      progressColor: "#007ACC",
    },
    {
      id: "vscode",
      name: "VS Code",
      desc: "Code Editor • Workspace",
      abbr: "Vs",
      color: "#E5245E", // Styled as magenta/pink in the screenshot
      bgOpacity: "#E5245E1a",
      progressColor: "#E5245E",
    },
  ];

  return (
    <section
      id="skills"
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
          04
        </span>
        <span style={{ letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
          TOOLKIT
        </span>
      </div>

      <div className="w-full max-w-[1200px]" style={{ margin: "0 auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
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
            The Toolkit
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(253, 244, 220, 0.45)",
              letterSpacing: "0.02em",
            }}
          >
            The apps I think and make in.
          </p>
        </motion.div>

        {/* 4x2 Grid Layout */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          style={{ width: "100%" }}
        >
          {apps.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{
                y: -6,
                borderColor: `${app.color}44`,
                background: `${app.color}0a`,
                boxShadow: `0 16px 36px ${app.color}15`,
              }}
              className="card relative overflow-hidden flex flex-col"
              style={{
                padding: "28px 24px",
                borderColor: "rgba(253, 244, 220, 0.08)",
                background: "rgba(253, 244, 220, 0.02)",
                cursor: "pointer",
                borderRadius: "12px",
                height: "100%",
                minHeight: 175,
              }}
              data-cursor-hover
            >
              {/* App Icon Rounded Square Box */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: app.bgOpacity,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: app.color,
                  fontFamily: "var(--font-sans)",
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  marginBottom: 20,
                  border: `1.5px solid ${app.color}33`,
                }}
              >
                {app.abbr}
              </div>

              {/* Title & Desc */}
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#FDF4DC",
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {app.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  color: "rgba(253, 244, 220, 0.45)",
                  letterSpacing: "0.02em",
                  marginBottom: 16,
                }}
              >
                {app.desc}
              </p>

              {/* Bottom Progress/Accent Line Indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: app.progressColor,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
