import React, { useState } from "react";
import { Sparkles, Eye, Shield, Feather, Clock, CheckCircle2 } from "lucide-react";

export default function ArtisanStory() {
  const [activeStep, setActiveStep] = useState(0);

  const craftsmanshipSteps = [
    {
      step: "01",
      title: "Mulberry Cultivation & Pure 3-Ply Spinning",
      location: "Mysore & Kanchipuram Guilds",
      hours: "40 hours",
      description:
        "Only Grade-6A pure mulberry silk filaments are hand-reeled into dense 3-ply yarn. This triple-twist technique imparts the iconic, crisp 'silken rustle' and majestic drape weight unique to authentic royal sarees and gowns."
    },
    {
      step: "02",
      title: "Silver-Dipped Muted Gold Zari Alchemy",
      location: "Surat & Varanasi Master Metallurgists",
      hours: "65 hours",
      description:
        "Microscopic flattened pure silver electroplated wire is wound delicately around a silk core, then given an antique muted gold bath (#B99A5B). The resulting zari possesses a luminous warmth that softens rather than glares under candlelight."
    },
    {
      step: "03",
      title: "The Interlocking Korvai & Kadhwa Loom Weave",
      location: "Ancient Temple Pit Looms",
      hours: "196 hours",
      description:
        "Two master artisans sit side by side on a pit loom. Using the Korvai interlocking shuttles, the Deep Burgundy body and heavy gold temple borders are woven together with zero seam lines, creating an indivisible tapestry that endures across generations."
    },
    {
      step: "04",
      title: "Silk Mark India Certification & Acid-Free Sealing",
      location: "THUGIL Heritage Quality Cellar",
      hours: "12 hours",
      description:
        "Each finished dress is tested for silk purity and genuine zari weight, tagged with a unique blockchain serial number, and preserved in natural unbleached muslin wrap inside our signature velvet heirloom box."
    }
  ];

  return (
    <section
      id="craftsmanship"
      style={{
        padding: "6rem 0",
        backgroundColor: "var(--charcoal-bg)",
        color: "var(--warm-ivory)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background: "radial-gradient(circle, rgba(109, 31, 50, 0.25) 0%, rgba(185, 154, 91, 0.08) 50%, transparent 80%)",
          pointerEvents: "none"
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 1rem",
              borderRadius: "20px",
              backgroundColor: "rgba(185, 154, 91, 0.15)",
              border: "1px solid var(--muted-gold)",
              marginBottom: "1rem"
            }}
          >
            <Sparkles size={14} color="var(--muted-gold-light)" />
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.76rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--muted-gold-light)",
                fontWeight: 600
              }}
            >
              Centuries of Masterloom Lineage
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
              color: "var(--warm-ivory)",
              lineHeight: 1.15,
              marginBottom: "1rem"
            }}
          >
            The Alchemy of Timeless Textiles
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              fontFamily: "var(--font-serif-editorial)",
              color: "var(--warm-ivory-muted)",
              lineHeight: 1.6
            }}
          >
            Every THUGIL creation bridges 800 years of handloom heritage with contemporary
            haute couture silhouette engineering.
          </p>
        </div>

        {/* 2-Column Showcase: Interactive Weave Macro on Left, Timeline on Right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "3.5rem",
            alignItems: "center"
          }}
          className="artisan-grid"
        >
          {/* LEFT: Macro Textile Craftsmanship Lens */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                border: "2px solid var(--muted-gold)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(185, 154, 91, 0.25)"
              }}
            >
              <img
                src="/images/fabric-craftsmanship.jpg"
                alt="Close-up macro of Deep Burgundy silk and Muted Gold zari craftsmanship"
                style={{
                  width: "100%",
                  height: "460px",
                  objectFit: "cover",
                  display: "block"
                }}
              />

              {/* Gold Gradient Scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(27, 24, 24, 0.95) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* Interactive Inspect Hotspot */}
              <div
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "48%",
                  backgroundColor: "rgba(109, 31, 50, 0.9)",
                  border: "2px solid var(--muted-gold)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(185, 154, 91, 0.8)",
                  animation: "pulseGoldGlow 2.5s infinite"
                }}
                title="Tested Silver-Dipped Gold Thread"
              >
                <Sparkles size={16} color="var(--muted-gold-light)" />
              </div>

              {/* Bottom Caption Pill */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.4rem"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif-royal)",
                      color: "var(--muted-gold-light)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 700
                    }}
                  >
                    Macro Inspection ✦ 240x Magnification
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--warm-ivory-muted)" }}>
                    100% Mulberry Warp
                  </span>
                </div>
                <p style={{ fontSize: "0.86rem", color: "var(--warm-ivory-light)", lineHeight: 1.4 }}>
                  Exquisite raised paisley zari weft intertwines with 3-ply Deep Burgundy silk yarns.
                  Woven with zero float threads on the back.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Step-by-Step Heritage Journey */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {craftsmanshipSteps.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: "1.4rem 1.6rem",
                    borderRadius: "14px",
                    backgroundColor: isActive ? "rgba(109, 31, 50, 0.45)" : "rgba(41, 38, 38, 0.6)",
                    border: isActive
                      ? "1.5px solid var(--muted-gold)"
                      : "1px solid rgba(185, 154, 91, 0.15)",
                    boxShadow: isActive ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  className="craft-step-card"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-serif-royal)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: isActive ? "var(--muted-gold-light)" : "var(--charcoal-muted)"
                        }}
                      >
                        {item.step}
                      </span>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif-display)",
                          fontSize: "1.15rem",
                          color: isActive ? "var(--warm-ivory)" : "var(--warm-ivory-muted)",
                          fontWeight: 600
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--muted-gold)",
                        fontFamily: "var(--font-serif-royal)",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {item.hours}
                    </span>
                  </div>

                  {isActive && (
                    <div style={{ animation: "fadeInScale 0.25s ease", marginTop: "0.6rem" }}>
                      <p
                        style={{
                          fontSize: "0.92rem",
                          color: "var(--warm-ivory-light)",
                          lineHeight: 1.55,
                          marginBottom: "0.75rem"
                        }}
                      >
                        {item.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          color: "var(--muted-gold-light)"
                        }}
                      >
                        <Shield size={13} />
                        <span>Origin: {item.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .artisan-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
