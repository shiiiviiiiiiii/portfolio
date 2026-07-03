"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePanels } from "@/hooks/usePanels";
import { useActiveTool } from "@/hooks/useActiveTool";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { SectionId } from "@/types";
import MenuBar from "@/components/os/MenuBar";
import LeftToolbar from "@/components/os/LeftToolbar";
import RightSidebar from "@/components/os/RightSidebar";
import BottomTimeline from "@/components/os/BottomTimeline";
import CustomCursor from "@/components/cursor/CustomCursor";
import CommandPalette from "@/components/panels/CommandPalette";
import Terminal from "@/components/panels/Terminal";
import AIAssistant from "@/components/panels/AIAssistant";
import SearchPanel from "@/components/panels/SearchPanel";
import HistoryPanel from "@/components/panels/HistoryPanel";
import ProjectWindows from "@/components/windows/ProjectWindow";
import OSLoader from "@/components/os/OSLoader";

function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}



// ─── AUDIO SYNTHESIZERS (Zero dependencies) ───────────────────────────────────

const playShutterSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 0.08; // 80ms click
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  } catch (err) {
    console.warn("Audio Context blocked or failed:", err);
  }
};

const playLassoSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (err) {}
};

const playZoomSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (err) {}
};

// ─── UNIFIED INTERACTIVE WORKSPACE CANVAS ──────────────────────────────────────

function InteractiveCanvas() {
  const { activeTool, accentColor } = useActiveTool();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tempCanvasRef = useRef<HTMLCanvasElement>(null); // For overlay preview drawings
  const [textInput, setTextInput] = useState<{ x: number; y: number } | null>(null);
  const [textVal, setTextVal] = useState("");
  
  const painting = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>([]);
  const textFinalizerRef = useRef<(val: string, coord: { x: number; y: number }) => void>(undefined);

  // Single unified setup effect to guarantee canvas context is ready when listeners attach
  useEffect(() => {
    const canvas = canvasRef.current;
    const tempCanvas = tempCanvasRef.current;
    if (!canvas || !tempCanvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    const c = canvas.getContext("2d");
    const tc = tempCanvas.getContext("2d");
    if (!c || !tc) return;

    // Clear drawings on tool switch
    c.clearRect(0, 0, canvas.width, canvas.height);
    tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

    const handleResize = () => {
      // Save canvas state before resizing
      const tempImage = c.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      tempCanvas.width = window.innerWidth;
      tempCanvas.height = window.innerHeight;
      c.putImageData(tempImage, 0, 0);
    };
    window.addEventListener("resize", handleResize);

    const onMouseDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.tagName === "BUTTON" ||
        el.tagName === "A" ||
        el.tagName === "INPUT" ||
        el.tagName === "TEXTAREA" ||
        el.closest("[data-no-brush]")
      )
        return;
      if (activeTool === "cursor" || activeTool === "move") return;

      painting.current = true;
      startPoint.current = { x: e.clientX, y: e.clientY };
      points.current = [{ x: e.clientX, y: e.clientY }];

      if (activeTool === "brush") {
        c.beginPath();
        c.moveTo(e.clientX, e.clientY);
      } else if (activeTool === "text") {
        setTextInput({ x: e.clientX, y: e.clientY });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!painting.current) return;
      const pt = { x: e.clientX, y: e.clientY };
      points.current.push(pt);

      if (activeTool === "brush") {
        c.globalCompositeOperation = "source-over";
        c.strokeStyle = accentColor;
        c.lineWidth = 3;
        c.lineCap = "round";
        c.lineJoin = "round";
        c.lineTo(pt.x, pt.y);
        c.stroke();
        c.beginPath();
        c.moveTo(pt.x, pt.y);
      } else if (activeTool === "pen") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tc.strokeStyle = accentColor;
        tc.lineWidth = 2.5;
        tc.setLineDash([]);
        tc.beginPath();
        tc.moveTo(startPoint.current.x, startPoint.current.y);
        tc.lineTo(pt.x, pt.y);
        tc.stroke();
      } else if (activeTool === "lasso") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tc.strokeStyle = accentColor;
        tc.lineWidth = 1.5;
        tc.setLineDash([4, 4]);
        tc.beginPath();
        tc.moveTo(startPoint.current.x, startPoint.current.y);
        points.current.forEach((p) => tc.lineTo(p.x, p.y));
        tc.stroke();
      } else if (activeTool === "marquee" || activeTool === "crop") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tc.strokeStyle = accentColor;
        tc.lineWidth = 1.5;
        if (activeTool === "marquee") {
          tc.setLineDash([5, 3]);
        } else {
          tc.setLineDash([]);
        }
        const w = pt.x - startPoint.current.x;
        const h = pt.y - startPoint.current.y;
        tc.strokeRect(startPoint.current.x, startPoint.current.y, w, h);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!painting.current) return;
      painting.current = false;
      const pt = { x: e.clientX, y: e.clientY };

      if (activeTool === "pen") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        c.strokeStyle = accentColor;
        c.lineWidth = 2.5;
        c.beginPath();
        c.moveTo(startPoint.current.x, startPoint.current.y);
        c.lineTo(pt.x, pt.y);
        c.stroke();
      } else if (activeTool === "lasso") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        c.strokeStyle = accentColor;
        c.lineWidth = 1.5;
        c.beginPath();
        c.moveTo(startPoint.current.x, startPoint.current.y);
        points.current.forEach((p) => c.lineTo(p.x, p.y));
        c.closePath();
        c.stroke();
        playLassoSound();
      } else if (activeTool === "marquee") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        playShutterSound();
        window.dispatchEvent(new CustomEvent("screenshot-flash"));
      } else if (activeTool === "crop") {
        tc.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        const cx = (startPoint.current.x + pt.x) / 2;
        const cy = (startPoint.current.y + pt.y) / 2;
        playZoomSound();
        window.dispatchEvent(new CustomEvent("crop-zoom", { detail: { x: cx, y: cy } }));
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    textFinalizerRef.current = (val: string, coord: { x: number; y: number }) => {
      if (val.trim() !== "") {
        c.font = '500 14px "General Sans", sans-serif';
        c.fillStyle = accentColor;
        c.fillText(val, coord.x, coord.y + 12);
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      painting.current = false;
    };
  }, [activeTool, accentColor]);

  const finalizeText = () => {
    if (!textInput || !textFinalizerRef.current) return;
    textFinalizerRef.current(textVal, textInput);
    setTextInput(null);
    setTextVal("");
  };

  return (
    <>
      {/* Target drawing canvas layers */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <canvas
        ref={tempCanvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 6,
        }}
      />

      {/* Floating text input */}
      {textInput && (
        <input
          type="text"
          autoFocus
          value={textVal}
          onChange={(e) => setTextVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") finalizeText();
          }}
          onBlur={finalizeText}
          style={{
            position: "fixed",
            left: textInput.x,
            top: textInput.y,
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: accentColor,
            background: "rgba(18, 18, 21, 0.95)",
            border: `1.5px solid ${accentColor}`,
            borderRadius: "6px",
            padding: "4px 10px",
            outline: "none",
            zIndex: 300,
            boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
          }}
        />
      )}
    </>
  );
}

// ─── ZOOM CANVAS (Supporting Crop Tool Auto Zoom) ─────────────────────────────

export function ZoomCanvas({ children }: { children: React.ReactNode }) {
  const [zoom, setZoom] = useState(1);
  const [cropCenter, setCropCenter] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCropZoom = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail;
      const rect = contentRef.current?.getBoundingClientRect();
      if (rect) {
        // Calculate coordinate relative to ZoomCanvas origin to account for scrolls and panels margins
        const relX = x - rect.left;
        const relY = y - rect.top;
        setCropCenter({ x: relX, y: relY });
      } else {
        setCropCenter({ x, y });
      }
      setZoom(1.8);

      // Return to normal page scale after 1.2 seconds
      setTimeout(() => {
        setZoom(1);
      }, 1200);
    };

    window.addEventListener("crop-zoom", handleCropZoom);
    return () => window.removeEventListener("crop-zoom", handleCropZoom);
  }, []);

  return (
    <div
      ref={contentRef}
      style={{
        transformOrigin: zoom === 1 ? "top center" : `${cropCenter.x}px ${cropCenter.y}px`,
        transform: `scale(${zoom})`,
        transition: "transform 400ms cubic-bezier(0.19,1,0.22,1)",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}

// ─── SCREENSHOT FLASH & TOAST PREVIEW ──────────────────────────────────────────

function ScreenshotFlashOverlay() {
  const [flash, setFlash] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const triggerFlash = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    };
    window.addEventListener("screenshot-flash", triggerFlash);
    return () => window.removeEventListener("screenshot-flash", triggerFlash);
  }, []);

  return (
    <>
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#ffffff",
              zIndex: 99999,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            className="panel-glass"
            style={{
              position: "fixed",
              bottom: "calc(var(--timeline-h) + 16px)",
              left: 24,
              padding: "10px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 9999,
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
              border: "1.5px solid rgba(253, 244, 220, 0.1)",
            }}
          >
            <span style={{ fontSize: 16 }}>📸</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Area screenshot copied to clipboard!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── MASTER SHELL ─────────────────────────────────────────────────────────────

export default function OSShell({ children }: { children: React.ReactNode }) {
  const { openPanel_fn, closePanel, openPanel } = usePanels();
  const { setScrollProgress, setActiveSection } = useActiveSection();
  const { accentColor, setAccentColor } = useActiveTool();

  // Load accent color from localStorage on initial mount
  useEffect(() => {
    const savedColor = localStorage.getItem("portfolio-accent-color");
    if (savedColor) {
      setAccentColor(savedColor);
    }
  }, [setAccentColor]);

  // Persist accent color changes to localStorage and synchronize globally
  useEffect(() => {
    if (accentColor) {
      localStorage.setItem("portfolio-accent-color", accentColor);
      document.documentElement.style.setProperty("--accent", accentColor);
      document.documentElement.style.setProperty("--accent-dim", `${accentColor}15`);
    }
  }, [accentColor]);

  useEffect(() => {
    const sections: SectionId[] = ["hero", "about", "experience", "achievements", "skills", "contact"];
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));

      const active = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });
      if (active) {
        setActiveSection(active);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrollProgress, setActiveSection]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA";

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPanel === "command" ? closePanel() : openPanel_fn("command");
        return;
      }
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        openPanel === "search" ? closePanel() : openPanel_fn("search");
        return;
      }
      if (e.key === "`" && !isInput) {
        e.preventDefault();
        openPanel === "terminal" ? closePanel() : openPanel_fn("terminal");
        return;
      }
      if (e.key === "Escape") {
        closePanel();
        return;
      }
    };

    window.addEventListener("keydown", down);
    return () => {
      window.removeEventListener("keydown", down);
    };
  }, [openPanel, openPanel_fn, closePanel]);

  return (
    <>
      {/* Dynamic Creative Suite loading screen on entry */}
      <OSLoader />

      {/* Background layers */}
      <GrainOverlay />

      {/* Screen flash for Marquee tool screenshot feedback */}
      <ScreenshotFlashOverlay />

      {/* Interactive canvas overlay — z-index 5 & 6 */}
      <InteractiveCanvas />

      {/* Custom cursor — z-index 9999 */}
      <CustomCursor />

      {/* OS Chrome */}
      <MenuBar />
      <LeftToolbar />
      <RightSidebar />
      <BottomTimeline />

      {/* Floating panels */}
      <CommandPalette />
      <Terminal />
      <AIAssistant />
      <SearchPanel />
      <HistoryPanel />

      {/* Draggable project windows */}
      <ProjectWindows />

      <main
        style={{
          marginLeft: "var(--toolbar-w)",
          marginRight: 0,
          marginTop: "var(--menubar-h)",
          marginBottom: "var(--timeline-h)",
          position: "relative",
          zIndex: 1,
          minHeight: "calc(100vh - var(--menubar-h) - var(--timeline-h))",
        }}
      >
        <ZoomCanvas>{children}</ZoomCanvas>
      </main>
    </>
  );
}
