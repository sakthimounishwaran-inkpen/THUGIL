import React, { useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";

export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const { theme } = useShop();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Golden Silk Threads / Dust Particles
    const particles = [];
    const count = 40;
    const isDark = theme === "dark";

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        color:
          i % 3 === 0
            ? isDark
              ? "rgba(213, 186, 130, 0.45)"
              : "rgba(185, 154, 91, 0.35)"
            : i % 2 === 0
            ? isDark
              ? "rgba(185, 154, 91, 0.3)"
              : "rgba(213, 186, 130, 0.25)"
            : isDark
            ? "rgba(109, 31, 50, 0.3)"
            : "rgba(109, 31, 50, 0.12)",
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.15,
        phase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Flowing Silk Wave 1 (Gold Thread Trace)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.3 + Math.sin(time) * 40);
      for (let x = 0; x <= width; x += 40) {
        const y =
          height * 0.3 +
          Math.sin(time + x * 0.002) * 50 +
          Math.cos(time * 0.6 + x * 0.003) * 25;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isDark
        ? "rgba(213, 186, 130, 0.08)"
        : "rgba(185, 154, 91, 0.06)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Flowing Silk Wave 2 (Burgundy Velvet Contour)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.7 + Math.cos(time * 0.8) * 35);
      for (let x = 0; x <= width; x += 50) {
        const y =
          height * 0.7 +
          Math.cos(time * 0.7 + x * 0.003) * 45 +
          Math.sin(time + x * 0.001) * 20;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isDark
        ? "rgba(109, 31, 50, 0.12)"
        : "rgba(109, 31, 50, 0.04)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Flowing Silk Wave 3 (Cross-Weave Zari Ribbon)
      ctx.beginPath();
      ctx.moveTo(0, height * 0.5 + Math.sin(time * 0.5) * 25);
      for (let x = 0; x <= width; x += 60) {
        const y =
          height * 0.5 +
          Math.sin(time * 0.8 + x * 0.0025) * 30;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = isDark
        ? "rgba(213, 186, 130, 0.05)"
        : "rgba(185, 154, 91, 0.035)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Draw floating golden particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.phase + time) * 0.25;
        p.y += p.vy;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.95
      }}
    />
  );
}
