"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { resumeData } from "@/lib/data";

export default function Artboard07Resume() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <section id="resume" className="relative" style={{ minHeight: "80vh", padding: "80px 48px" }}>
      <div className="artboard-label absolute" style={{ top: 12, left: 8 }}>Artboard 07 — Resume</div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
        <div className="text-label flex items-center gap-3 mb-4">
          <div style={{ width: 24, height: 1, background: "var(--green)" }} />
          Export Window
        </div>
        <h2 className="text-display-sm" style={{ color: "var(--text-primary)" }}>Resume</h2>
      </motion.div>

      <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Preview */}
        <motion.div
          className="card p-6"
          style={{ aspectRatio: "8.5/11", position: "relative", overflow: "hidden", maxWidth: 400 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--accent), var(--blue))" }} />
          <div style={{ paddingTop: 24 }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>Shivam Kumar</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", marginBottom: 16, letterSpacing: "0.06em" }}>SOFTWARE ENGINEER · AI ENTHUSIAST · FULL STACK</div>
            <div className="hairline mb-4" />
            {["Education", "Experience", "Projects", "Skills", "Achievements"].map((section) => (
              <div key={section} style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{section}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[1, 2].map((j) => (
                    <div key={j} style={{ height: 6, background: "var(--border)", borderRadius: 1, width: j === 1 ? "90%" : "70%" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* ATS Score badge */}
          <div style={{ position: "absolute", top: 16, right: 16, background: "var(--green-dim)", border: "1px solid var(--green)", borderRadius: 2, padding: "4px 8px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--green)", letterSpacing: "0.08em" }}>ATS</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--green)", lineHeight: 1 }}>{resumeData.atsScore}</div>
          </div>
        </motion.div>

        {/* Export options */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-label mb-6">Export Options</div>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { label: "Download PDF", desc: "ATS-optimized, 1 page", icon: "⬇", primary: true },
              { label: "View Online", desc: "Open in browser", icon: "↗", primary: false },
              { label: "Copy Link", desc: "Share resume link", icon: "🔗", primary: false },
            ].map((opt) => (
              <motion.button
                key={opt.label}
                className={opt.primary ? "btn btn-primary" : "btn btn-ghost"}
                style={{ justifyContent: "flex-start", padding: "12px 16px" }}
                onClick={opt.primary ? handleDownload : undefined}
                whileTap={{ scale: 0.97 }}
                data-cursor-hover
              >
                <span style={{ fontSize: 14 }}>{opt.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{downloading && opt.primary ? "Downloading..." : opt.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 1 }}>{opt.desc}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Metadata */}
          <div className="card p-4">
            <div className="text-label mb-4">File Info</div>
            {[
              { label: "Version", value: resumeData.version },
              { label: "Last Updated", value: resumeData.lastUpdated },
              { label: "Format", value: resumeData.format },
              { label: "Pages", value: resumeData.pages.toString() },
              { label: "ATS Score", value: `${resumeData.atsScore}/100` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)" }}>{item.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-secondary)" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
