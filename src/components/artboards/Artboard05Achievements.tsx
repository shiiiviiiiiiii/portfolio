"use client";

import React from "react";
import { motion } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

export default function Artboard05Achievements() {
  const { accentColor } = useActiveTool();

  const awards = [
    { title: "Winner, Nukkad Natak Competition – ZEITGEIST", right: "IIT Ropar · 2025" },
    { title: "Runner-up, Table Tennis Tournament", right: "IIT Roorkee · 2025" },
    { title: "Cybersecurity Certification", right: "Professional · 2024" },
    { title: "Flutter Development Certification", right: "Google · 2023" },
  ];

  const education = [
    {
      degree: "B.E. in Electronics and Computer Engineering",
      institution: "Thapar Institute of Eng. & Tech.",
      right: "2022 – Present",
    },
    {
      degree: "CBSE – Class XII",
      institution: "Chinmaya Vidyalaya, Bokaro",
      right: "2021",
    },
    {
      degree: "CBSE – Class X",
      institution: "St. Xavier's Higher Secondary School",
      right: "2019",
    },
  ];

  const skillsList = [
    "HTML", "CSS", "C/C++", "Python", "JavaScript",
    "Power BI", "Figma", "Firebase", "Photoshop",
    "Illustrator", "Notion", "Excel"
  ];

  return (
    <section
      id="achievements"
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
          03
        </span>
        <span style={{ letterSpacing: "0.1em", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
          RECOGNITION
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
            Awards & Education
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(253, 244, 220, 0.4)",
              letterSpacing: "0.02em",
            }}
          >
            A few proud moments and where the craft was sharpened.
          </p>
        </motion.div>

        {/* 2-Column Split Layout */}
        <div
          className="grid gap-16"
          style={{
            gridTemplateColumns: "1.1fr 1fr",
            alignItems: "start",
          }}
        >
          {/* Left Column: Awards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
              }}
            >
              <span style={{ color: accentColor, fontSize: "9px" }}>▶</span>
              Awards
            </h3>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {awards.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(253, 244, 220, 0.06)",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(253, 244, 220, 0.85)",
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(253, 244, 220, 0.35)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.right}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Education & Skills */}
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            
            {/* Education Sub-section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <span style={{ color: accentColor, fontSize: "9px" }}>▶</span>
                Education
              </h3>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {education.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(253, 244, 220, 0.06)",
                      gap: 16,
                    }}
                  >
                    <div className="flex flex-col">
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "rgba(253, 244, 220, 0.85)",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.degree}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "11px",
                          color: "rgba(253, 244, 220, 0.35)",
                          marginTop: 4,
                        }}
                      >
                        {item.institution}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "rgba(253, 244, 220, 0.35)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.right}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills Sub-section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 20,
                }}
              >
                <span style={{ color: accentColor, fontSize: "9px" }}>▶</span>
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "6px 14px",
                      border: "1px solid rgba(253, 244, 220, 0.15)",
                      borderRadius: "100px",
                      background: "rgba(253, 244, 220, 0.03)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "rgba(253, 244, 220, 0.65)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
