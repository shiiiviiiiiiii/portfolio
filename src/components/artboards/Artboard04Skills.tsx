"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/lib/data";

function SkillBar({ skill, delay }: { skill: (typeof skills)[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const catColors: Record<string, string> = {
    Programming: "var(--accent)",
    Frontend: "var(--blue)",
    Backend: "var(--orange)",
    "AI & ML": "var(--purple)",
    Mobile: "var(--green)",
    "Data & BI": "#06B6D4",
    "Cloud & DevOps": "#EAB308",
    Databases: "#F97316",
    Cybersecurity: "var(--green)",
  };
  const color = catColors[skill.category] ?? "var(--accent)";

  return (
    <motion.div
      className="card p-3 transition-all"
      style={{
        cursor: "default",
        borderColor: hovered ? `${color}33` : "var(--border)",
        background: hovered ? `${color}08` : "var(--panel)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: 16 }}>{skill.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--text-primary)",
              }}
            >
              {skill.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: hovered ? color : "var(--text-muted)",
              }}
            >
              {skill.level}%
            </span>
          </div>
        </div>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ background: color, width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {hovered && (
        <div className="text-label mt-2">
          {skill.years} yr{skill.years !== 1 ? "s" : ""} · {skill.category}
        </div>
      )}
    </motion.div>
  );
}

export default function Artboard04Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="relative"
      style={{ minHeight: "100vh", padding: "80px 48px" }}
    >
      <div className="artboard-label absolute" style={{ top: 12, left: 8 }}>
        Artboard 04 — Skills
      </div>

      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-label flex items-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: "var(--purple)" }} />
            Assets Panel
          </div>
          <h2 className="text-display-sm" style={{ color: "var(--text-primary)" }}>
            Skills
          </h2>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 max-w-sm justify-end">
          <button
            onClick={() => setActiveCategory("All")}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              padding: "3px 8px",
              borderRadius: 2,
              border: `1px solid ${activeCategory === "All" ? "var(--accent)" : "var(--border)"}`,
              background: activeCategory === "All" ? "var(--accent-dim)" : "transparent",
              color: activeCategory === "All" ? "var(--accent)" : "var(--text-muted)",
              letterSpacing: "0.06em",
            }}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                padding: "3px 8px",
                borderRadius: 2,
                border: `1px solid ${activeCategory === cat ? "var(--accent)" : "var(--border)"}`,
                background: activeCategory === cat ? "var(--accent-dim)" : "transparent",
                color: activeCategory === cat ? "var(--accent)" : "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {filtered.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} delay={i * 0.04} />
        ))}
      </motion.div>
    </section>
  );
}
