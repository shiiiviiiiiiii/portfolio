"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { useFloatingWindows } from "@/hooks/useFloatingWindows";
import type { Project } from "@/types";

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors = {
    live: "var(--green)",
    wip: "var(--orange)",
    archived: "var(--text-muted)",
  };
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 2,
        border: `1px solid ${colors[status]}33`,
        background: `${colors[status]}11`,
      }}
    >
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: colors[status] }} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.08em",
          color: colors[status],
          textTransform: "uppercase",
        }}
      >
        {status}
      </span>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      className="card relative overflow-hidden"
      style={{ cursor: "pointer", padding: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: `0 20px 60px ${project.color}22` }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
    >
      {/* Gradient top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color}44)` }} />

      {/* Mouse glow */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      <div style={{ padding: "20px 24px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <StatusBadge status={project.status} />
          <div className="text-label">{project.duration}</div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.3,
            marginBottom: 8,
            whiteSpace: "pre-line",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            color: "var(--text-muted)",
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          {project.subtitle}
        </p>

        <p
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: 16,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.05em",
                padding: "2px 6px",
                borderRadius: 2,
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--text-disabled)",
                padding: "2px 6px",
              }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)" }}>
            {project.role}
          </div>
          <motion.div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: project.color,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Open PSD →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Artboard02Projects() {
  const { openProject } = useFloatingWindows();
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "AI & ML", "Web", "Mobile", "Data"];

  return (
    <section
      id="projects"
      className="relative"
      style={{ minHeight: "100vh", padding: "80px 48px" }}
    >
      <div className="artboard-label absolute" style={{ top: 12, left: 8 }}>
        Artboard 02 — Projects
      </div>

      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-label flex items-center gap-3 mb-4">
            <div style={{ width: 24, height: 1, background: "var(--orange)" }} />
            Featured Work
          </div>
          <h2 className="text-display-sm" style={{ color: "var(--text-primary)" }}>
            Projects
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex gap-1.5 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                padding: "4px 10px",
                borderRadius: 2,
                border: `1px solid ${filter === cat ? "var(--orange)" : "var(--border)"}`,
                background: filter === cat ? "var(--orange-dim)" : "transparent",
                color: filter === cat ? "var(--orange)" : "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <ProjectCard
              project={project}
              onClick={() => openProject(project)}
            />
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-label mt-8 text-center"
      >
        Click any card to open as a PSD window
      </motion.p>
    </section>
  );
}
