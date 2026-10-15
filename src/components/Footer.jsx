import React, { useState } from "react";
import { Sparkles, ArrowRight, Shield, Award, Globe, Heart, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";
import thugilIcon from "../assets/thugil.png";

export default function Footer() {
  const {
    showToast,
    setIsFabricStudioOpen,
    setIsSizeGuideOpen,
    setIsAITrialRoomOpen,
    setIsAIAdminOpen
  } = useShop();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    showToast("Welcome to the THUGIL Royal Gazette! Use code ROYAL10 for 10% off your inaugural order.");
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--charcoal-bg)",
        color: "var(--warm-ivory)",
        borderTop: "2px solid var(--muted-gold)",
        paddingTop: "5rem",
        paddingBottom: "3rem",
        position: "relative"
      }}
    >
      <div className="container">
        {/* Top 4 Pillars Trust Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid rgba(185, 154, 91, 0.25)"
          }}
        >
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.4)",
                border: "1px solid var(--muted-gold)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Award size={20} color="var(--muted-gold-light)" />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-serif-display)", color: "var(--warm-ivory)", fontSize: "1.05rem" }}>
                Silk Mark Certified
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--warm-ivory-muted)", marginTop: "0.2rem" }}>
                100% pure natural mulberry silk authenticated by government textile laboratories.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.4)",
                border: "1px solid var(--muted-gold)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Sparkles size={20} color="var(--muted-gold-light)" />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-serif-display)", color: "var(--warm-ivory)", fontSize: "1.05rem" }}>
                Certified Gold Zari
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--warm-ivory-muted)", marginTop: "0.2rem" }}>
                Tested silver and gold metallized yarn that maintains its soft warm sheen for decades.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.4)",
                border: "1px solid var(--muted-gold)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Globe size={20} color="var(--muted-gold-light)" />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-serif-display)", color: "var(--warm-ivory)", fontSize: "1.05rem" }}>
                Royal Armored Transit
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--warm-ivory-muted)", marginTop: "0.2rem" }}>
                Express DHL & FedEx priority shipping with custom velvet box packaging.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            <div
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.4)",
                border: "1px solid var(--muted-gold)",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Shield size={20} color="var(--muted-gold-light)" />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-serif-display)", color: "var(--warm-ivory)", fontSize: "1.05rem" }}>
                Lifetime Preservation
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--warm-ivory-muted)", marginTop: "0.2rem" }}>
                Heirloom preservation guide, acid-free packaging, and complimentary styling care.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Main Footer Links & Newsletter */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr 0.9fr 1.3fr",
            gap: "3rem",
            padding: "4rem 0",
            borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
          }}
          className="footer-middle-grid"
        >
          {/* Brand Info */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                marginBottom: "1.3rem"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid rgba(185, 154, 91, 0.7)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35), 0 0 14px rgba(185, 154, 91, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
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
                    width: "38px",
                    height: "38px",
                    objectFit: "contain",
                    display: "block"
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "1.9rem",
                    fontWeight: 700,
                    color: "var(--warm-ivory)",
                    letterSpacing: "0.12em",
                    lineHeight: 1
                  }}
                >
                  THUGIL
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif-royal)",
                    fontSize: "0.6rem",
                    color: "var(--muted-gold-light)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "3px",
                    fontWeight: 600
                  }}
                >
                  Timeless Fabrics
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--warm-ivory-muted)",
                lineHeight: 1.6,
                marginBottom: "1.5rem"
              }}
            >
              THUGIL represents the pinnacle of South Asian handloom couture. Each dress, saree, and
              lehenga is a numbered heirloom, handwoven by generational masters of Kanchipuram and Varanasi.
            </p>
            <div style={{ fontSize: "0.78rem", color: "var(--muted-gold-light)" }}>
              Ateliers: Erode ✦ Chennai ✦ Kanchipuram ✦ London ✦ New York
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-serif-royal)",
                color: "var(--muted-gold-light)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.2rem"
              }}
            >
              Royal Archives
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.85rem" }}>
              <li><a href="#collections" style={{ color: "var(--warm-ivory-muted)" }}>Kanjivaram Silk Sarees</a></li>
              <li><a href="#collections" style={{ color: "var(--warm-ivory-muted)" }}>Haute Couture Gowns</a></li>
              <li><a href="#collections" style={{ color: "var(--warm-ivory-muted)" }}>Royal Bridal Lehengas</a></li>
              <li><a href="#collections" style={{ color: "var(--warm-ivory-muted)" }}>Banarasi Brocade Silks</a></li>
              <li><a href="#collections" style={{ color: "var(--warm-ivory-muted)" }}>Luminous Tissue Organzas</a></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-serif-royal)",
                color: "var(--muted-gold-light)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.2rem"
              }}
            >
              Concierge
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.85rem" }}>
              <li>
                <button
                  onClick={() => setIsAITrialRoomOpen(true)}
                  style={{ color: "var(--muted-gold-light)", textAlign: "left", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.35rem" }}
                >
                  <Sparkles size={13} color="var(--muted-gold-light)" />
                  <span>AI Virtual Trial Room</span>
                </button>
              </li>
              <li>
                <button onClick={() => setIsFabricStudioOpen(true)} style={{ color: "var(--warm-ivory-muted)", textAlign: "left" }}>
                  Bespoke Drape Studio
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} style={{ color: "var(--warm-ivory-muted)", textAlign: "left" }}>
                  Made-to-Measure Size Chart
                </button>
              </li>
              <li><a href="#craftsmanship" style={{ color: "var(--warm-ivory-muted)" }}>Silk Mark Authenticity</a></li>
              <li><a href="#lookbook" style={{ color: "var(--warm-ivory-muted)" }}>Runway Lookbook</a></li>
              <li>
                <button
                  onClick={() => setIsAIAdminOpen(true)}
                  style={{ color: "var(--warm-ivory-muted)", textAlign: "left", fontSize: "0.78rem", opacity: 0.8 }}
                >
                  Atelier Staff Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Gazette */}
          <div>
            <h5
              style={{
                fontFamily: "var(--font-serif-royal)",
                color: "var(--muted-gold-light)",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem"
              }}
            >
              The Royal Gazette
            </h5>
            <p style={{ fontSize: "0.82rem", color: "var(--warm-ivory-muted)", marginBottom: "1rem" }}>
              Receive exclusive private previews of newly completed loom pieces before public release.
            </p>

            {isSubscribed ? (
              <div
                style={{
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(43, 99, 56, 0.2)",
                  border: "1px solid #2B6338",
                  color: "var(--warm-ivory)",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <Check size={16} color="var(--muted-gold)" />
                <span>Subscribed. Enjoy privilege code <strong>ROYAL10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex" }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your private email"
                    style={{
                      flex: 1,
                      padding: "0.65rem 0.9rem",
                      borderRadius: "8px 0 0 8px",
                      border: "1px solid var(--muted-gold)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "var(--warm-ivory)",
                      fontSize: "0.82rem",
                      outline: "none"
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0.65rem 1.1rem",
                      backgroundColor: "var(--burgundy)",
                      color: "var(--warm-ivory)",
                      borderRadius: "0 8px 8px 0",
                      border: "1px solid var(--muted-gold)",
                      borderLeft: "none",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    className="gold-shimmer-btn"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={16} color="var(--muted-gold-light)" />
                  </button>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--muted-gold)" }}>
                  ✦ Instant 10% Inaugural Privilege Code Unlocked
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Manifesto */}
        <div
          style={{
            paddingTop: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.78rem",
            color: "var(--charcoal-muted)"
          }}
        >
          <div>
            © {new Date().getFullYear()} THUGIL Luxury Handlooms & Haute Couture. All Rights Reserved.
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Certified Silk Mark: SM-IN-9824</span>
            <span>Terms of Royal Commission</span>
            <span>Privacy & Vault Charter</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-middle-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-middle-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
