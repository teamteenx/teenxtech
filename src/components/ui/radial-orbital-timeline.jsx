"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";

import { useReducedMotion } from "framer-motion";
import { DesktopOrbital } from "@/components/desktop-orbital";
import { MobileOrbital } from "../mobile-orbital";

export default function RadialOrbitalTimeline({ timelineData = [] }) {
  const prefersReduced = useReducedMotion();
  const [expandedId, setExpandedId] = useState(null);
  const [angle, setAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [radius, setRadius] = useState(200);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const rafRef = useRef(0);
  const inViewRef = useRef(true);

  const relatedIds = useCallback(
    (id) => timelineData.find((i) => i.id === id)?.relatedIds || [],
    [timelineData]
  );

  const isRelated = useCallback(
    (id) => (activeId ? relatedIds(activeId).includes(id) : false),
    [activeId, relatedIds]
  );

  const toggleItem = useCallback(
    (id) => {
      setExpandedId((prev) => {
        const next = prev === id ? null : id;
        setActiveId(next);
        setAutoRotate(next ? false : true);
        if (next) centerViewOnNode(next);
        return next;
      });
    },
    [] // centerViewOnNode is defined below with stable ref usage
  );

  // Smooth, time-based rotation using rAF (paused when not visible or reduced motion)
  useEffect(() => {
    if (prefersReduced) return;

    let last = performance.now();
    const speedDegPerSec = 12; // gentle nigga, gentle or u will fuck this thing up
    const loop = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (autoRotate && inViewRef.current) {
        setAngle((a) => (a + speedDegPerSec * dt) % 360);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoRotate, prefersReduced]);

  // Pause rotation when component is off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? true;
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Adaptive radius on resize
  useEffect(() => {
    const update = () => {
      const box = orbitRef.current?.getBoundingClientRect();
      if (!box) return;
      const r = Math.max(
        120,
        Math.min(260, Math.floor(Math.min(box.width, box.height) * 0.32))
      );
      setRadius(r);
    };
    update();
    const ro = new ResizeObserver(update);
    if (orbitRef.current) ro.observe(orbitRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Center a node toward the top (270deg) when expanded, fuck this thing
  const centerViewOnNode = useCallback(
    (nodeId) => {
      const idx = timelineData.findIndex((i) => i.id === nodeId);
      if (idx < 0) return;
      const total = timelineData.length || 1;
      const targetAngle = (idx / total) * 360;
      setAngle((270 - targetAngle + 360) % 360);
    },
    [timelineData]
  );

  const positions = useMemo(() => {
    const total = timelineData.length || 1;
    return timelineData.map((_, index) => {
      const base = ((index / total) * 360 + angle) % 360;
      const rad = (base * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const zIndex = Math.round(100 + 50 * Math.cos(rad));
      const opacity = Math.max(
        0.45,
        Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(rad)) / 2))
      );
      return { x, y, zIndex, opacity };
    });
  }, [timelineData, angle, radius]);

  const onCanvasClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setActiveId(null);
      setAutoRotate(true);
    }
  };

  // Mobile fallback: show clean list cus ngapain di mobile full animation
  return (
    <div className="relative w-full bg-black text-white">
      {/* Mobile list UI */}
      <MobileOrbital
        timelineData={timelineData}
        isRelated={isRelated}
        expandedId={expandedId}
        toggleItem={toggleItem}
        positions={positions}
        statusStyles={statusStyles}
      />

      {/* Desktop orbital UI */}
      <DesktopOrbital
        containerRef={containerRef}
        onCanvasClick={onCanvasClick}
        orbitRef={orbitRef}
        timelineData={timelineData}
        isRelated={isRelated}
        expandedId={expandedId}
        toggleItem={toggleItem}
        positions={positions}
        statusStyles={statusStyles}
      />
    </div>
  );
}

function statusStyles(status) {
  switch (status) {
    case "hardware":
      return "text-white bg-purple-500 border-white";
    case "software":
      return "text-black bg-blue-500 border-black";
    case "marketing":
      return "text-white bg-green-500 border-white/50";
    default:
      return "text-white bg-gray-500 border-white/50";
  }
}
