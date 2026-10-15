import React from "react";
import { useShop } from "../context/ShopContext";
import { X, Ruler, Sparkles, CheckCircle2 } from "lucide-react";

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(41, 38, 38, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 230,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeInScale 0.25s ease"
      }}
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div
        style={{
          backgroundColor: "var(--warm-ivory-light)",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.5rem 2rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          border: "2px solid var(--muted-gold)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            backgroundColor: "rgba(41, 38, 38, 0.08)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--charcoal)"
          }}
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--muted-gold-dark)",
              fontFamily: "var(--font-serif-royal)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "0.4rem"
            }}
          >
            <Ruler size={14} />
            <span>THUGIL Atelier Fit Standard</span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "1.85rem",
              color: "var(--burgundy)"
            }}
          >
            Bespoke Sizing & Drape Dimensions
          </h3>
        </div>

        {/* Section 1: Sarees & Drapes */}
        <div style={{ marginBottom: "2rem" }}>
          <h4
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "1.2rem",
              color: "var(--burgundy)",
              marginBottom: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Sparkles size={16} color="var(--muted-gold)" />
            <span>Heritage Silk Sarees & Drapes</span>
          </h4>
          <p style={{ fontSize: "0.86rem", color: "var(--charcoal-soft)", marginBottom: "0.8rem" }}>
            All THUGIL handloom sarees follow the imperial 6.3-meter length (including a 0.8-meter
            unstitched pure silk blouse piece with matching zari sleeves).
          </p>
          <div
            style={{
              backgroundColor: "rgba(109, 31, 50, 0.05)",
              border: "1px solid rgba(185, 154, 91, 0.3)",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
              fontSize: "0.82rem"
            }}
          >
            <strong>Total Drape Length:</strong> 6.30 meters | <strong>Width:</strong> 47.5 inches (120 cm) |{" "}
            <strong>Pallu Drop:</strong> 1.1 meters heavily embellished with tested zari
          </div>
        </div>

        {/* Section 2: Gowns, Lehengas & Anarkalis Table */}
        <div style={{ marginBottom: "2rem" }}>
          <h4
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "1.2rem",
              color: "var(--burgundy)",
              marginBottom: "0.8rem"
            }}
          >
            Couture Gowns, Lehengas & Anarkalis
          </h4>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.82rem",
                textAlign: "left"
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "var(--burgundy)", color: "var(--warm-ivory)" }}>
                  <th style={{ padding: "0.65rem 0.8rem" }}>Size</th>
                  <th style={{ padding: "0.65rem 0.8rem" }}>US / UK</th>
                  <th style={{ padding: "0.65rem 0.8rem" }}>Bust (in)</th>
                  <th style={{ padding: "0.65rem 0.8rem" }}>Waist (in)</th>
                  <th style={{ padding: "0.65rem 0.8rem" }}>Hip (in)</th>
                  <th style={{ padding: "0.65rem 0.8rem" }}>Skirt Flare</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--warm-ivory-border)" }}>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>XS</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>US 0-2 / UK 4-6</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>32 - 33"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>25 - 26"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>35 - 36"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>5.8 meters</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--warm-ivory-border)", backgroundColor: "rgba(185, 154, 91, 0.06)" }}>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>S</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>US 4-6 / UK 8-10</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>34 - 35"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>27 - 28"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>37 - 38"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>6.0 meters</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--warm-ivory-border)" }}>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>M</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>US 8-10 / UK 12-14</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>36 - 37"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>29 - 30"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>39 - 40"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>6.2 meters</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--warm-ivory-border)", backgroundColor: "rgba(185, 154, 91, 0.06)" }}>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 600 }}>L</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>US 12-14 / UK 16</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>38 - 40"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>31 - 33"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>41 - 43"</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>6.2 meters</td>
                </tr>
                <tr style={{ backgroundColor: "rgba(109, 31, 50, 0.08)" }}>
                  <td style={{ padding: "0.6rem 0.8rem", fontWeight: 700, color: "var(--burgundy)" }}>
                    Bespoke
                  </td>
                  <td colSpan={5} style={{ padding: "0.6rem 0.8rem", fontStyle: "italic" }}>
                    Custom tailored to your exact millimeter profile by our Master Patternist.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Made to Measure Promise */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            backgroundColor: "rgba(43, 99, 56, 0.08)",
            border: "1px solid #2B6338",
            borderRadius: "10px",
            padding: "0.8rem 1rem",
            fontSize: "0.82rem",
            color: "#1E4C2A"
          }}
        >
          <CheckCircle2 size={20} color="#2B6338" flexShrink={0} />
          <div>
            <strong>Complimentary Alteration Guarantee:</strong> If your couture dress does not fit
            with absolute perfection, our atelier covers round-trip courier and precision tailoring adjustments.
          </div>
        </div>
      </div>
    </div>
  );
}
