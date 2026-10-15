import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import {
  X,
  Sparkles,
  Scissors,
  Check,
  ShoppingBag,
  Info,
  Sliders,
  Palette,
  Maximize2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DrapeStudio() {
  const { isFabricStudioOpen, setIsFabricStudioOpen, addToCart, formatPrice } = useShop();

  // Customizer state
  const [silhouette, setSilhouette] = useState("saree");
  const [primaryColor, setPrimaryColor] = useState("#6D1F32");
  const [accentZari, setAccentZari] = useState("korvai-temple");
  const [fabricType, setFabricType] = useState("mulberry-silk");
  const [monogramText, setMonogramText] = useState("T & G ✦ 2026");
  const [isLightingSheen, setIsLightingSheen] = useState(true);

  if (!isFabricStudioOpen) return null;

  // Silhouettes config
  const silhouettes = [
    {
      id: "saree",
      name: "The Royal Saree Drape",
      sub: "6.3m Handloom Drape with Running Blouse",
      basePrice: 1250,
      image: "/images/kanjivaram-saree.jpg"
    },
    {
      id: "gown",
      name: "Empress Plissé Fusion Gown",
      sub: "Sculpted Bodice with Accordion Pleats",
      basePrice: 1850,
      image: "/images/couture-gown.jpg"
    },
    {
      id: "lehenga",
      name: "Imperial 16-Kali Bridal Lehenga",
      sub: "Full Voluminous Flare with Dual Dupatta",
      basePrice: 2350,
      image: "/images/bridal-lehenga.jpg"
    },
    {
      id: "anarkali",
      name: "Fluted Velvet Anarkali Dress",
      sub: "Floor-Sweeping Panel Cut with Tulle Veil",
      basePrice: 1400,
      image: "/images/anarkali-dress.jpg"
    }
  ];

  // Palette colors strictly honoring brand guidelines
  const paletteOptions = [
    {
      hex: "#6D1F32",
      name: "Deep Burgundy",
      sub: "Heritage Wine & Velvet Depth",
      description: "Our signature royal pigment reminiscent of pomegranate wine and temple velvet."
    },
    {
      hex: "#F7F1E7",
      name: "Warm Ivory",
      sub: "Luminous Moonlight & Pearl",
      description: "Organic warm ivory unbleached natural silk with gentle ambient glow."
    },
    {
      hex: "#B99A5B",
      name: "Muted Gold",
      sub: "Antique Tested Zari Luster",
      description: "Subtle brushed metallic thread dipped in pure electroplated silver and gold."
    },
    {
      hex: "#292626",
      name: "Charcoal Noir",
      sub: "Imperial Slate Velvet",
      description: "Deep obsidian charcoal offering high-contrast theatrical elegance."
    }
  ];

  // Zari motifs
  const zariMotifs = [
    {
      id: "korvai-temple",
      name: "Korvai Temple Gopuram",
      premium: 120,
      desc: "Sacred interlocking triangular spires woven in heavy gold thread"
    },
    {
      id: "kadhwa-jaal",
      name: "Kadhwa Floral Jaal",
      premium: 180,
      desc: "Authentic Banarasi vine embroidery with zero floating threads"
    },
    {
      id: "antique-zardozi",
      name: "Royal Court Zardozi",
      premium: 240,
      desc: "Hand-raised dabka wire work, sequins and French knot stitches"
    },
    {
      id: "minimal-piping",
      name: "Haute Minimalist Piping",
      premium: 50,
      desc: "Sleek 10mm pure gold zari cord piping along hems and necklines"
    }
  ];

  // Fabric types
  const fabricTypes = [
    {
      id: "mulberry-silk",
      name: "Pure 3-Ply Mulberry Raw Silk",
      multiplier: 1.0,
      desc: "Heavy, lustrous handfeel with iconic silk rustle"
    },
    {
      id: "tissue-organza",
      name: "Liquid Gold Tissue Organza",
      multiplier: 1.1,
      desc: "Ultra-featherweight metallic silk with radiant refraction"
    },
    {
      id: "silk-velvet",
      name: "Royal Micro-Velvet",
      multiplier: 1.18,
      desc: "Plush, opulent velvet pile with sculpted couture draping"
    }
  ];

  const currentSilhouette = silhouettes.find((s) => s.id === silhouette);
  const currentZari = zariMotifs.find((z) => z.id === accentZari);
  const currentFabric = fabricTypes.find((f) => f.id === fabricType);

  // Price math
  const calculatedPriceUSD = Math.round(
    (currentSilhouette.basePrice + currentZari.premium) * currentFabric.multiplier +
      (monogramText.trim() ? 65 : 0)
  );

  const handleAddBespokeToBag = () => {
    const bespokeProduct = {
      id: `bespoke-${Date.now()}`,
      name: `Bespoke ${currentSilhouette.name}`,
      subtitle: `Custom Woven: ${paletteOptions.find((p) => p.hex === primaryColor)?.name} • ${currentFabric.name}`,
      category: "Bespoke Drape Studio",
      priceUSD: calculatedPriceUSD,
      image: currentSilhouette.image,
      craftImage: "/images/fabric-craftsmanship.jpg",
      badge: "One-of-a-Kind Atelier",
      specs: {
        fabric: currentFabric.name,
        zari: currentZari.name,
        weaveTime: "240-300 hours dedicated atelier production",
        origin: "THUGIL Bespoke Master Loom",
        drapeLength: "Custom Made-to-Measure",
        washCare: "Specialist Luxury Dry Clean"
      },
      colorScheme: {
        primary: primaryColor,
        primaryName: paletteOptions.find((p) => p.hex === primaryColor)?.name,
        accent: "#B99A5B",
        accentName: currentZari.name
      }
    };

    addToCart(
      bespokeProduct,
      "Bespoke Tailored Measurement",
      1,
      `Palette: ${primaryColor} | Zari: ${currentZari.name} | Monogram: "${monogramText}"`
    );

    setIsFabricStudioOpen(false);

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.7 },
      colors: ["#6D1F32", "#B99A5B", "#F7F1E7"]
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(41, 38, 38, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      onClick={() => setIsFabricStudioOpen(false)}
    >
      <div
        style={{
          backgroundColor: "var(--warm-ivory-light)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "1180px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 80px rgba(0,0,0,0.4), 0 0 50px rgba(185, 154, 91, 0.3)",
          border: "2px solid var(--muted-gold)",
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
        className="drape-studio-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsFabricStudioOpen(false)}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            backgroundColor: "rgba(41, 38, 38, 0.08)",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--charcoal)",
            zIndex: 10,
            transition: "all 0.2s ease"
          }}
          className="icon-hover-btn"
          aria-label="Close Drape Studio"
        >
          <X size={20} />
        </button>

        {/* LEFT COLUMN: Interactive Atelier Visualizer Stage */}
        <div
          style={{
            backgroundColor: "var(--charcoal-bg)",
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderRight: "1px solid rgba(185, 154, 91, 0.3)"
          }}
        >
          {/* Header watermark */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "1.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            <Sparkles size={16} color="var(--muted-gold)" />
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                color: "var(--muted-gold-light)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase"
              }}
            >
              THUGIL Haute Drape Studio
            </span>
          </div>

          {/* Live Lighting Simulation Toggle */}
          <button
            onClick={() => setIsLightingSheen(!isLightingSheen)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.8rem",
              backgroundColor: isLightingSheen ? "var(--muted-gold)" : "rgba(255,255,255,0.1)",
              color: isLightingSheen ? "var(--charcoal-bg)" : "var(--warm-ivory)",
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "0.3rem 0.7rem",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem"
            }}
          >
            <Sparkles size={12} />
            <span>{isLightingSheen ? "Ambient Gold Sheen ON" : "Studio Light"}</span>
          </button>

          {/* Garment Visualizer Frame */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
              height: "480px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              border: "1.5px solid var(--muted-gold)",
              margin: "2rem 0 1.5rem"
            }}
          >
            <img
              src={currentSilhouette.image}
              alt={currentSilhouette.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                transition: "all 0.5s ease"
              }}
            />

            {/* Dynamic Interactive Color Tint Layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: primaryColor,
                mixBlendMode: primaryColor === "#F7F1E7" ? "soft-light" : "color",
                opacity: primaryColor === "#6D1F32" ? 0.35 : 0.45,
                pointerEvents: "none",
                transition: "all 0.4s ease"
              }}
            />

            {/* Ambient Gold Shimmer Lighting Overlay */}
            {isLightingSheen && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at 40% 30%, rgba(213, 186, 130, 0.35) 0%, transparent 65%)",
                  mixBlendMode: "overlay",
                  pointerEvents: "none"
                }}
              />
            )}

            {/* Custom Gold Monogram Thread Preview on Garment */}
            {monogramText.trim() && (
              <div
                style={{
                  position: "absolute",
                  bottom: "1.2rem",
                  right: "1.2rem",
                  backgroundColor: "rgba(41, 38, 38, 0.85)",
                  border: "1px solid var(--muted-gold)",
                  borderRadius: "8px",
                  padding: "0.35rem 0.75rem",
                  color: "var(--muted-gold-light)",
                  fontFamily: "var(--font-serif-royal)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
                }}
              >
                ✦ Inscribed: {monogramText}
              </div>
            )}
          </div>

          {/* Quick specs pill */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(185, 154, 91, 0.2)",
              borderRadius: "12px",
              padding: "0.75rem 1.25rem",
              width: "100%",
              maxWidth: "380px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.78rem",
              color: "var(--warm-ivory)"
            }}
          >
            <div>
              <span style={{ color: "var(--muted-gold-light)" }}>Silhouette:</span>{" "}
              {currentSilhouette.name}
            </div>
            <div>
              <span style={{ color: "var(--muted-gold-light)" }}>Estimated Craft:</span> 260h
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customization Controls & Configuration */}
        <div
          style={{
            padding: "2.5rem 2.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto"
          }}
        >
          <div>
            <div style={{ marginBottom: "1.8rem" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-serif-royal)",
                  letterSpacing: "0.15em",
                  color: "var(--muted-gold-dark)",
                  textTransform: "uppercase",
                  fontWeight: 600
                }}
              >
                Bespoke Atelier Commission
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontSize: "1.85rem",
                  color: "var(--theme-heading-color)",
                  lineHeight: 1.2,
                  marginTop: "0.2rem"
                }}
              >
                Design Your Timeless Drape
              </h2>
            </div>

            {/* Step 1: Choose Garment Silhouette */}
            <div style={{ marginBottom: "1.8rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.6rem"
                }}
              >
                1. Select Silhouette Cut
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem"
                }}
              >
                {silhouettes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSilhouette(s.id)}
                    style={{
                      textAlign: "left",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border:
                        silhouette === s.id
                          ? "1.5px solid var(--muted-gold)"
                          : "1px solid var(--warm-ivory-border)",
                      backgroundColor:
                        silhouette === s.id ? "rgba(185, 154, 91, 0.15)" : "var(--theme-bg-card)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "var(--theme-heading-color)"
                      }}
                    >
                      {s.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--theme-muted-color)" }}>
                      From {formatPrice(s.basePrice)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Primary Palette Color */}
            <div style={{ marginBottom: "1.8rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.6rem"
                }}
              >
                2. Master Weave Palette
              </label>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.6rem" }}>
                {paletteOptions.map((p) => {
                  const isSelected = primaryColor === p.hex;
                  return (
                    <button
                      key={p.hex}
                      onClick={() => setPrimaryColor(p.hex)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        padding: "0.45rem 0.85rem",
                        borderRadius: "20px",
                        border: isSelected
                          ? "2px solid var(--muted-gold)"
                          : "1px solid var(--warm-ivory-border)",
                        backgroundColor: isSelected ? "rgba(185, 154, 91, 0.15)" : "transparent",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--theme-body-color)"
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: p.hex,
                          border: "1px solid rgba(0,0,0,0.15)"
                        }}
                      />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: "0.76rem", color: "var(--theme-muted-color)", fontStyle: "italic" }}>
                {paletteOptions.find((p) => p.hex === primaryColor)?.description}
              </p>
            </div>

            {/* Step 3: Choose Zari & Border Accent Motif */}
            <div style={{ marginBottom: "1.8rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.6rem"
                }}
              >
                3. Zari Border & Pallu Technique
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem"
                }}
              >
                {zariMotifs.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setAccentZari(z.id)}
                    style={{
                      textAlign: "left",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      border:
                        accentZari === z.id
                          ? "1.5px solid var(--muted-gold-dark)"
                          : "1px solid var(--warm-ivory-border)",
                      backgroundColor:
                        accentZari === z.id ? "rgba(185, 154, 91, 0.12)" : "var(--theme-bg-card)"
                    }}
                  >
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--theme-body-color)" }}>
                      {z.name}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--muted-gold-dark)" }}>
                      +{formatPrice(z.premium)} zari work
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Bespoke Monogram Inscription */}
            <div style={{ marginBottom: "1.8rem" }}>
              <label
                htmlFor="monogram-input"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.4rem"
                }}
              >
                4. Gold Thread Monogram (Optional Heirloom Inscription)
              </label>
              <input
                id="monogram-input"
                type="text"
                value={monogramText}
                onChange={(e) => setMonogramText(e.target.value)}
                placeholder="e.g. Royal Monogram, Initials or Date"
                maxLength={25}
                style={{
                  width: "100%",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "8px",
                  border: "1px solid var(--muted-gold)",
                  backgroundColor: "var(--theme-bg-card)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--theme-body-color)",
                  outline: "none"
                }}
              />
              <span style={{ fontSize: "0.72rem", color: "var(--theme-muted-color)" }}>
                Hand-embroidered with authentic gold thread on the inner border (+{formatPrice(65)})
              </span>
            </div>
          </div>

          {/* Bottom Total & Add to Bag Action */}
          <div
            style={{
              paddingTop: "1.2rem",
              borderTop: "1px solid rgba(185, 154, 91, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--theme-muted-color)", textTransform: "uppercase" }}>
                Total Atelier Commission
              </div>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "var(--font-serif-display)",
                  fontWeight: 700,
                  color: "var(--theme-heading-color)"
                }}
              >
                {formatPrice(calculatedPriceUSD)}
              </div>
            </div>

            <button
              onClick={handleAddBespokeToBag}
              style={{
                backgroundColor: "var(--burgundy)",
                color: "var(--warm-ivory)",
                padding: "0.95rem 1.8rem",
                borderRadius: "28px",
                fontSize: "0.88rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                boxShadow: "var(--shadow-burgundy)"
              }}
              className="gold-shimmer-btn"
            >
              <ShoppingBag size={18} color="var(--muted-gold-light)" />
              <span>Order Bespoke Drape</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .drape-studio-modal {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
