"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";

import { useActiveTool } from "@/hooks/useActiveTool";

const NICKNAMES = ["SHIVAM", "TEJAS", "FORTOV", "MOTA", "SHIVIII"];

export default function Artboard00Hero() {
  const { openPanel_fn } = usePanels();
  const { activeTool } = useActiveTool();
  const [nickIdx, setNickIdx] = useState(0);

  const cycleNickname = () => {
    setNickIdx((prev) => (prev + 1) % NICKNAMES.length);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-start overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "0 80px",
        paddingTop: "calc(var(--menubar-h) + 40px)",
        background: "transparent",
      }}
    >
      {/* Artboard label */}
      <div
        className="artboard-label absolute"
        style={{ top: "calc(var(--menubar-h) + 12px)", left: 24 }}
      >
        Artboard 00 — Workspace
      </div>

      {/* Massive display content */}
      <div className="relative w-full" style={{ maxWidth: 1200, margin: "0 auto", marginTop: "24px" }}>
        
        {/* Monospace layout meta-tags (capsule headers matching screenshot) */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div
            style={{
              padding: "5px 12px",
              border: "1px solid rgba(253, 244, 220, 0.15)",
              borderRadius: "100px",
              background: "rgba(253, 244, 220, 0.03)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "rgba(253, 244, 220, 0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Software Engineer <span style={{ opacity: 0.35, marginLeft: 6 }}>1920 x 1080 px</span>
          </div>

          <div
            style={{
              padding: "5px 12px",
              border: "1px solid rgba(253, 244, 220, 0.15)",
              borderRadius: "100px",
              background: "rgba(253, 244, 220, 0.03)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "rgba(253, 244, 220, 0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Full Stack · AI & ML
          </div>

          <div
            style={{
              padding: "5px 12px",
              border: "1px solid rgba(253, 244, 220, 0.15)",
              borderRadius: "100px",
              background: "rgba(253, 244, 220, 0.03)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "rgba(253, 244, 220, 0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Patiala, Punjab, India
          </div>
        </motion.div>

        {/* Main Display Typography (Giant and Wide) */}
        <motion.div
          drag={activeTool === "move"}
          dragMomentum={false}
          onClick={cycleNickname}
          data-cursor-label="Scramble Name"
          data-cursor-hover
          style={{
            marginTop: "20px",
            marginBottom: "24px",
            cursor: activeTool === "move" ? "grab" : "pointer",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* First Name (Bouncing/Scrambling) */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-display"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {NICKNAMES[nickIdx]}
            </motion.h1>
          </div>

          {/* Last Name (Solid filled with user accent color) */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-display"
              style={{
                color: "var(--accent)",
                WebkitTextStroke: "1.5px #FDF4DC",
              }}
            >
              KUMAR
            </motion.h1>
          </div>
        </motion.div>

        {/* Story description paragraph (styled directly like screenshot subtitle) */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(253, 244, 220, 0.7)",
            maxWidth: 680,
            marginBottom: "28px",
          }}
        >
          I build things, tell stories, and chase ideas that live somewhere between{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>design,</span>{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>technology,</span>{" "}
          and a little bit of{" "}
          <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}>chaos.</span>
        </motion.p>

        {/* Navigation CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            className="btn btn-primary"
            onClick={() => scrollTo("projects")}
            data-cursor-hover
            style={{ padding: "12px 28px", borderRadius: "8px", fontSize: "13px" }}
          >
            Open Workspace
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => scrollTo("contact")}
            data-cursor-hover
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Ticks representation at the bottom above timeline */}
      <div
        className="absolute bottom-12 left-12"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "rgba(253, 244, 220, 0.2)",
        }}
      >
        00:00:00:00
      </div>
    </section>
  );
}
