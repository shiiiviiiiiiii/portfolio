"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useActiveTool } from "@/hooks/useActiveTool";

export default function Artboard08Contact() {
  const { accentColor } = useActiveTool();
  const [time, setTime] = useState("");

  // Live ticking clock in footer
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExportContact = () => {
    // Generate a simple vCard (.vcf) file download for Shivam Kumar
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Shivam Kumar
EMAIL;TYPE=PREF,INTERNET:0828tejas@gmail.com
TEL;TYPE=CELL:+918521528744
ADR;TYPE=HOME:;;Bengaluru;Karnataka;;India
TITLE:Software Engineer
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shivam_Kumar.vcf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: "100vh",
        padding: "80px 80px 120px",
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
          CONTACT
        </span>
      </div>

      {/* Main Centered Content */}
      <div
        className="flex flex-col items-center text-center justify-center w-full max-w-[900px]"
        style={{ marginTop: "40px" }}
      >
        {/* Giant display text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 6.2vw, 92px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.05em",
            color: "var(--text-primary)",
            marginBottom: 20,
          }}
        >
          Let&apos;s make
          <br />
          something
          <br />
          <span style={{ color: accentColor }}>worth saving.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(13px, 1.5vw, 16px)",
            color: "rgba(253, 244, 220, 0.45)",
            marginBottom: 32,
          }}
        >
          Open to freelance and creative collaborations.
        </motion.p>

        {/* Info Row: Location and Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "rgba(253, 244, 220, 0.65)",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <span>Bengaluru, India</span>
          <span style={{ color: "rgba(253, 244, 220, 0.15)" }}>·</span>
          <a
            href="mailto:0828tejas@gmail.com"
            style={{ color: "inherit", textDecoration: "none" }}
            className="hover:underline"
          >
            0828tejas@gmail.com
          </a>
        </motion.div>

        {/* Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center gap-3.5"
        >
          <button
            onClick={handleExportContact}
            className="btn btn-primary"
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              background: accentColor,
              color: "#121216",
              boxShadow: `0 8px 24px ${accentColor}22`,
            }}
            data-cursor-hover
          >
            Export Contact ▸
          </button>

          <motion.a
            href="https://www.linkedin.com/in/shiviiii/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              border: "1.5px solid var(--border)",
              color: "#FDF4DC",
              background: "rgba(253, 244, 220, 0.02)",
            }}
            whileHover={{
              y: -2,
              borderColor: "rgba(253, 244, 220, 0.35)",
              background: "rgba(253, 244, 220, 0.08)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            data-cursor-hover
          >
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/shiiiviiiiiiii"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              border: "1.5px solid var(--border)",
              color: "#FDF4DC",
              background: "rgba(253, 244, 220, 0.02)",
            }}
            whileHover={{
              y: -2,
              borderColor: "rgba(253, 244, 220, 0.35)",
              background: "rgba(253, 244, 220, 0.08)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            data-cursor-hover
          >
            GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Footer Section (Centered Copyright + Info Row) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-6 flex flex-col items-center"
        style={{
          left: 80,
          right: 80,
          borderTop: "1px solid rgba(253, 244, 220, 0.05)",
          paddingTop: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "rgba(253, 244, 220, 0.35)",
            letterSpacing: "0.05em",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          © 2026 Shivam Kumar
        </span>
        <div
          className="w-full flex items-center justify-between"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9.5px",
            color: "rgba(253, 244, 220, 0.25)",
            letterSpacing: "0.02em",
          }}
        >
          <span>Designed in Photoshop · Edited in Premiere Pro</span>
          <span>{time}</span>
        </div>
      </motion.div>
    </section>
  );
}
