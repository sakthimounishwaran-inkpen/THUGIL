import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, ArrowUpRight, Play, Pause } from "lucide-react";

export default function LookbookMarquee() {
  const { products, setQuickViewProduct } = useShop();
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items for seamless infinite horizontal loop
  const marqueeItems = [...products, ...products];

  return (
    <section
      id="lookbook"
      style={{
        padding: "5rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(185, 154, 91, 0.2)",
        borderBottom: "1px solid rgba(185, 154, 91, 0.2)",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div className="container" style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--muted-gold)",
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.76rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "0.4rem"
              }}
            >
              <Sparkles size={13} />
              <span>Haute Editorial Showcase</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "clamp(2rem, 3.2vw, 2.7rem)",
                color: "var(--theme-heading-color)",
                lineHeight: 1.15
              }}
            >
              The Runway & Palace Atelier Lookbook
            </h2>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "20px",
              backgroundColor: "rgba(109, 31, 50, 0.08)",
              border: "1px solid var(--muted-gold)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--theme-heading-color)"
            }}
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{isPaused ? "Resume Motion" : "Pause Showcase"}</span>
          </button>
        </div>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "1.8rem",
          animation: `marqueeSlide 38s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running"
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {marqueeItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            onClick={() => setQuickViewProduct(item)}
            style={{
              position: "relative",
              width: "300px",
              height: "420px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(185, 154, 91, 0.35)",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "transform 0.4s ease"
            }}
            className="lookbook-card"
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                transition: "transform 0.5s ease"
              }}
            />

            {/* Gradient Scrim */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(41, 38, 38, 0.88) 100%)",
                pointerEvents: "none"
              }}
            />

            {/* Top Tag */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                backgroundColor: "rgba(109, 31, 50, 0.85)",
                color: "var(--warm-ivory)",
                padding: "0.25rem 0.65rem",
                borderRadius: "12px",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase"
              }}
            >
              {item.badge || item.category}
            </div>

            {/* Bottom Caption & View Trigger */}
            <div
              style={{
                position: "absolute",
                bottom: "1.2rem",
                left: "1.2rem",
                right: "1.2rem",
                color: "var(--warm-ivory)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "1.1rem",
                    color: "var(--warm-ivory)",
                    lineHeight: 1.25,
                    marginBottom: "0.2rem"
                  }}
                >
                  {item.name}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--muted-gold-light)" }}>
                  {item.category}
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "var(--muted-gold)",
                  color: "var(--charcoal-bg)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .lookbook-card:hover img {
          transform: scale(1.05);
        }
        .lookbook-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(109, 31, 50, 0.25);
        }
      `}</style>
    </section>
  );
}
