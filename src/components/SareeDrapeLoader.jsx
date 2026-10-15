import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import thugilIcon from "../assets/thugil.png";
import { Sparkles, Scissors } from "lucide-react";

export default function SareeDrapeLoader() {
  const { isDrapeLoading, setIsDrapeLoading } = useShop();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("weaving"); // weaving, unfolding, parted
  const [statusText, setStatusText] = useState("Spinning pure 3-ply mulberry silk...");

  useEffect(() => {
    if (!isDrapeLoading) {
      setProgress(0);
      setStage("weaving");
      return;
    }

    // Animated progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          setStatusText("Interlocking 24K gold zari korvai border...");
          return prev + 2;
        } else if (prev < 75) {
          setStatusText("Gathering royal handloom silk pleats...");
          return prev + 3;
        } else if (prev < 98) {
          setStatusText("Unfolding the timeless royal drape...");
          return prev + 4;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isDrapeLoading]);

  // Once 100% reached, trigger the saree opening sequence
  useEffect(() => {
    if (progress >= 100) {
      setStage("unfolding");
      const timer = setTimeout(() => {
        setStage("parted");
        const closeTimer = setTimeout(() => {
          setIsDrapeLoading(false);
        }, 900);
        return () => clearTimeout(closeTimer);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, setIsDrapeLoading]);

  if (!isDrapeLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "transparent",
        pointerEvents: stage === "parted" ? "none" : "auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* LEFT SAREE DRAPE PANEL (Deep Burgundy Silk with Golden Zari Border) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50.5%",
          backgroundColor: "#4A1220",
          backgroundImage:
            "radial-gradient(ellipse at 80% 50%, #6D1F32 0%, #4A1220 70%, #2A0912 100%)",
          boxShadow: "15px 0 40px rgba(0,0,0,0.6)",
          zIndex: 2,
          transition: "transform 1.1s cubic-bezier(0.77, 0, 0.175, 1)",
          transform:
            stage === "unfolding" || stage === "parted"
              ? "translateX(-105%) skewX(-6deg)"
              : "translateX(0) skewX(0deg)",
          borderRight: "4px solid #B99A5B",
          overflow: "hidden"
        }}
      >
        {/* Subtle Silk Weave Texture Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(185, 154, 91, 0.04) 10px, rgba(185, 154, 91, 0.04) 11px)",
            pointerEvents: "none"
          }}
        />

        {/* Vertical Golden Zari Pallu Border Tracery */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: "12px",
            width: "36px",
            borderRight: "2px dashed #D5BA82",
            borderLeft: "1px solid rgba(185, 154, 91, 0.4)",
            background: "linear-gradient(180deg, rgba(185, 154, 91, 0.15), rgba(185, 154, 91, 0.05))"
          }}
        />
      </div>

      {/* RIGHT SAREE DRAPE PANEL (Deep Burgundy Pleats with Golden Border) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50.5%",
          backgroundColor: "#4A1220",
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, #6D1F32 0%, #4A1220 70%, #2A0912 100%)",
          boxShadow: "-15px 0 40px rgba(0,0,0,0.6)",
          zIndex: 2,
          transition: "transform 1.1s cubic-bezier(0.77, 0, 0.175, 1)",
          transform:
            stage === "unfolding" || stage === "parted"
              ? "translateX(105%) skewX(6deg)"
              : "translateX(0) skewX(0deg)",
          borderLeft: "4px solid #B99A5B",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(185, 154, 91, 0.04) 10px, rgba(185, 154, 91, 0.04) 11px)",
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "12px",
            width: "36px",
            borderLeft: "2px dashed #D5BA82",
            borderRight: "1px solid rgba(185, 154, 91, 0.4)",
            background: "linear-gradient(180deg, rgba(185, 154, 91, 0.15), rgba(185, 154, 91, 0.05))"
          }}
        />
      </div>

      {/* CENTER CEREMONIAL UNVEILING STAGE */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "460px",
          padding: "2rem",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: stage === "parted" ? 0 : 1,
          transform: stage === "parted" ? "scale(1.08)" : "scale(1)"
        }}
      >
        {/* Brand Royal Clasp Medallion with Official THUGIL Logo */}
        <div
          style={{
            width: "132px",
            height: "132px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "3px solid #B99A5B",
            boxShadow: "0 0 50px rgba(185, 154, 91, 0.75), 0 16px 40px rgba(0, 0, 0, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.4rem",
            position: "relative",
            animation: "pulseGoldGlow 2.5s infinite",
            padding: "12px",
            flexShrink: 0
          }}
        >
          <img
            src={thugilIcon || "/thugil.png"}
            onError={(e) => {
              if (e.currentTarget.src !== window.location.origin + "/thugil.png") {
                e.currentTarget.src = "/thugil.png";
              }
            }}
            alt="THUGIL"
            style={{
              width: "102px",
              height: "102px",
              objectFit: "contain",
              display: "block"
            }}
          />
        </div>

        {/* Brand Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1.8rem"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "3rem",
              fontWeight: 700,
              color: "#FAF5EB",
              letterSpacing: "0.15em",
              textShadow: "0 4px 16px rgba(0, 0, 0, 0.7)",
              lineHeight: 1
            }}
          >
            THUGIL
          </span>
          <span
            style={{
              fontFamily: "var(--font-serif-royal)",
              fontSize: "0.85rem",
              color: "#D5BA82",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              marginTop: "6px",
              fontWeight: 600
            }}
          >
            Timeless Fabrics
          </span>
        </div>

        {/* Silk Loom Status Narrative */}
        <p
          style={{
            fontFamily: "var(--font-serif-editorial)",
            fontSize: "1.15rem",
            color: "#F7F1E7",
            fontStyle: "italic",
            marginBottom: "1.2rem",
            letterSpacing: "0.02em",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)"
          }}
        >
          {statusText}
        </p>

        {/* Gold Thread Loading Meter */}
        <div
          style={{
            width: "280px",
            height: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "2px",
            overflow: "hidden",
            marginBottom: "0.8rem",
            border: "0.5px solid rgba(185, 154, 91, 0.3)"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #93763A, #D5BA82, #B99A5B)",
              boxShadow: "0 0 10px #D5BA82",
              transition: "width 0.1s linear"
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "280px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-serif-royal)",
            color: "#D5BA82",
            letterSpacing: "0.1em"
          }}
        >
          <span>PALLU LOOM</span>
          <span>{progress}%</span>
        </div>

        {/* Quick Skip button */}
        <button
          onClick={() => setIsDrapeLoading(false)}
          style={{
            marginTop: "1.8rem",
            color: "rgba(247, 241, 231, 0.7)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Enter Boutique Directly →
        </button>
      </div>
    </div>
  );
}
