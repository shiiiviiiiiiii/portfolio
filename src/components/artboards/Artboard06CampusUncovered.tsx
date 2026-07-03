"use client";
import React from "react";
import { motion } from "framer-motion";
import { campusStats } from "@/lib/data";

const POSTS = [
  { type: "image", emoji: "🎓", caption: "Orientation Week Coverage", likes: 1240, comments: 88 },
  { type: "reel", emoji: "🎬", caption: "Behind the Scenes: Tech Fest", likes: 3200, comments: 210 },
  { type: "image", emoji: "🏆", caption: "ZEITGEIST Winners Spotlight", likes: 2100, comments: 145 },
  { type: "reel", emoji: "📸", caption: "Campus Life: Day in the Life", likes: 4500, comments: 320 },
  { type: "image", emoji: "🤝", caption: "Collab with TechClub", likes: 890, comments: 67 },
  { type: "image", emoji: "🎨", caption: "Design Week Highlights", likes: 1560, comments: 112 },
];

const GROWTH_POINTS = [200, 800, 1500, 2800, 4200, 6100, 8000, 10000];

export default function Artboard06CampusUncovered() {
  const maxVal = Math.max(...GROWTH_POINTS);

  return (
    <section id="campus" className="relative" style={{ minHeight: "100vh", padding: "80px 48px" }}>
      <div className="artboard-label absolute" style={{ top: 12, left: 8 }}>Artboard 06 — Campus Uncovered</div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
        <div className="text-label flex items-center gap-3 mb-4">
          <div style={{ width: 24, height: 1, background: "var(--blue)" }} />
          Media Library
        </div>
        <h2 className="text-display-sm" style={{ color: "var(--text-primary)" }}>Campus<br /><span style={{ color: "var(--blue)" }}>Uncovered</span></h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 12, maxWidth: 480, lineHeight: 1.7 }}>
          A student-built media platform documenting campus life, events, and the people who make it happen.
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-3 mb-12">
        {campusStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="card p-4 flex-1"
            style={{ minWidth: 120 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div style={{ fontSize: 20, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{stat.value}</div>
            <div className="text-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        {/* Instagram grid */}
        <div>
          <div className="text-label mb-4 flex items-center gap-2"><span>📸</span> Content Feed</div>
          <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {POSTS.map((post, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: "1", background: "var(--panel)", border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer" }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
              >
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, var(--blue)22, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                  {post.emoji}
                </div>
                {post.type === "reel" && (
                  <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.6)", borderRadius: 2, padding: "1px 4px", fontFamily: "var(--font-mono)", fontSize: "8px", color: "white" }}>
                    REEL
                  </div>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "8px 6px 6px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "rgba(255,255,255,0.7)" }}>❤ {post.likes.toLocaleString()}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Growth chart */}
        <div>
          <div className="text-label mb-4 flex items-center gap-2"><span>📈</span> Follower Growth</div>
          <div className="card p-4">
            <div className="flex items-end gap-1" style={{ height: 160, paddingTop: 16 }}>
              {GROWTH_POINTS.map((val, i) => (
                <motion.div
                  key={i}
                  style={{ flex: 1, background: `linear-gradient(to top, var(--blue), var(--blue)44)`, borderRadius: "2px 2px 0 0", minWidth: 0 }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(val / maxVal) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "var(--text-disabled)" }}>{q}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-label">Total Followers</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 700, color: "var(--blue)" }}>10K+</span>
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="text-label mt-6 mb-3">Platform Breakdown</div>
          {[
            { platform: "Instagram", value: 60, color: "var(--accent)" },
            { platform: "LinkedIn", value: 25, color: "var(--blue)" },
            { platform: "YouTube", value: 15, color: "var(--orange)" },
          ].map((p) => (
            <div key={p.platform} className="mb-2">
              <div className="flex justify-between mb-1">
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-secondary)" }}>{p.platform}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)" }}>{p.value}%</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  style={{ background: p.color, width: 0 }}
                  whileInView={{ width: `${p.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
