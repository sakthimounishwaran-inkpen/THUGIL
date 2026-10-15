import React from "react";
import { useShop } from "../context/ShopContext";
import { DEPARTMENTS } from "../data/products";
import { Sparkles, ArrowRight, ShieldCheck, Scissors } from "lucide-react";

export default function MegaMenu({ activeDeptId, onClose }) {
  const { navigateToCategory, setIsFabricStudioOpen } = useShop();

  if (!activeDeptId) return null;

  const currentDept = DEPARTMENTS.find((d) => d.id === activeDeptId);
  if (!currentDept) return null;

  // Split subcategories into 2 or 3 balanced columns
  const subcats = currentDept.subcategories;
  const colSize = Math.ceil(subcats.length / (subcats.length > 10 ? 3 : 2));
  const col1 = subcats.slice(0, colSize);
  const col2 = subcats.slice(colSize, colSize * 2);
  const col3 = subcats.slice(colSize * 2);

  const handleSubClick = (sub) => {
    navigateToCategory(currentDept.id, sub);
    onClose();
  };

  const handleViewAll = () => {
    navigateToCategory(currentDept.id, "All");
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "var(--theme-bg-header)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "2px solid var(--muted-gold)",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25), 0 0 30px rgba(185, 154, 91, 0.15)",
        zIndex: 100,
        animation: "fadeInScale 0.25s ease",
        color: "var(--theme-heading-color)"
      }}
      className="mega-menu-container"
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "2.5rem 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "1.1fr 1.6fr 1fr",
          gap: "2.5rem"
        }}
      >
        {/* Column 1: Department Overview & Heritage Summary */}
        <div
          style={{
            borderRight: "1px solid rgba(185, 154, 91, 0.2)",
            paddingRight: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "14px",
                backgroundColor: "rgba(109, 31, 50, 0.08)",
                border: "1px solid rgba(185, 154, 91, 0.3)",
                marginBottom: "0.8rem",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "var(--muted-gold-dark)",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              <Sparkles size={11} color="var(--muted-gold)" />
              <span>Royal Department</span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--theme-heading-color)",
                marginBottom: "0.4rem",
                lineHeight: 1.15
              }}
            >
              {currentDept.name}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.82rem",
                color: "var(--muted-gold-dark)",
                letterSpacing: "0.06em",
                marginBottom: "0.8rem",
                fontWeight: 600
              }}
            >
              {currentDept.tagline}
            </p>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--theme-body-color)",
                lineHeight: 1.5,
                marginBottom: "1.5rem"
              }}
            >
              {currentDept.description}
            </p>
          </div>

          <div>
            <button
              onClick={handleViewAll}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                backgroundColor: "var(--burgundy)",
                color: "#FAF5EB",
                padding: "0.75rem 1.4rem",
                borderRadius: "24px",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "var(--shadow-burgundy)",
                transition: "all 0.3s ease"
              }}
              className="gold-shimmer-btn"
            >
              <span>Explore All {currentDept.shortName}</span>
              <ArrowRight size={15} color="var(--muted-gold-light)" />
            </button>
          </div>
        </div>

        {/* Column 2: Subcategories (Organized in 2 or 3 neat columns) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-serif-royal)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--muted-gold-dark)",
              fontWeight: 700,
              marginBottom: "1.2rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid rgba(185, 154, 91, 0.25)"
            }}
          >
            Curated Sub-Collections ({currentDept.subcategories.length})
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: col3.length > 0 ? "1fr 1fr 1fr" : "1fr 1fr",
              gap: "1.2rem"
            }}
          >
            {/* Sub Column 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {col1.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubClick(sub)}
                  style={{
                    textAlign: "left",
                    fontSize: "0.88rem",
                    color: "var(--theme-body-color)",
                    transition: "all 0.2s ease",
                    padding: "0.2rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                  className="mega-menu-link"
                >
                  <span className="dot" style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--muted-gold)", opacity: 0.6 }} />
                  <span>{sub}</span>
                </button>
              ))}
            </div>

            {/* Sub Column 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {col2.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubClick(sub)}
                  style={{
                    textAlign: "left",
                    fontSize: "0.88rem",
                    color: "var(--theme-body-color)",
                    transition: "all 0.2s ease",
                    padding: "0.2rem 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                  className="mega-menu-link"
                >
                  <span className="dot" style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--muted-gold)", opacity: 0.6 }} />
                  <span>{sub}</span>
                </button>
              ))}
            </div>

            {/* Sub Column 3 (if applicable) */}
            {col3.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {col3.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubClick(sub)}
                    style={{
                      textAlign: "left",
                      fontSize: "0.88rem",
                      color: "var(--theme-body-color)",
                      transition: "all 0.2s ease",
                      padding: "0.2rem 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                    className="mega-menu-link"
                  >
                    <span className="dot" style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--muted-gold)", opacity: 0.6 }} />
                    <span>{sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Featured Spotlight Card */}
        {currentDept.featuredHighlight && (
          <div
            onClick={() => handleSubClick(currentDept.featuredHighlight.sub)}
            style={{
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1.5px solid var(--muted-gold)",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              height: "260px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "1.2rem",
              background: "#181515"
            }}
            className="mega-menu-spotlight"
          >
            <img
              src={currentDept.featuredHighlight.image}
              alt={currentDept.featuredHighlight.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                transition: "transform 0.5s ease"
              }}
              className="spotlight-img"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(35, 12, 18, 0.92) 0%, rgba(41, 38, 38, 0.4) 60%, transparent 100%)"
              }}
            />

            <div style={{ position: "relative", zIndex: 2, color: "#FAF5EB" }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted-gold-light)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.2rem"
                }}
              >
                Featured Highlight ✦ {currentDept.featuredHighlight.sub}
              </span>
              <h4
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontSize: "1.1rem",
                  color: "#FAF5EB",
                  marginBottom: "0.2rem",
                  lineHeight: 1.2
                }}
              >
                {currentDept.featuredHighlight.title}
              </h4>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(250, 245, 235, 0.8)",
                  marginBottom: "0.6rem"
                }}
              >
                {currentDept.featuredHighlight.subtitle}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--muted-gold-light)"
                }}
              >
                <span>From ${currentDept.featuredHighlight.priceUSD} USD</span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.75rem",
                    textDecoration: "underline"
                  }}
                >
                  Shop Now <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Service Micro-Bar */}
      <div
        style={{
          backgroundColor: "rgba(109, 31, 50, 0.05)",
          borderTop: "1px solid rgba(185, 154, 91, 0.2)",
          padding: "0.6rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.78rem",
          color: "var(--theme-body-color)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShieldCheck size={14} color="var(--muted-gold)" />
            <span>100% Certified Mulberry Silk & Silk Mark India Authenticity</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Sparkles size={14} color="var(--muted-gold)" />
            <span>Complimentary Global White-Glove Delivery Over $500</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsFabricStudioOpen(true);
            onClose();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--burgundy)",
            fontWeight: 700,
            fontSize: "0.78rem"
          }}
        >
          <Scissors size={14} color="var(--muted-gold-dark)" />
          <span>Launch Bespoke 3D Drape Studio</span>
        </button>
      </div>

      <style>{`
        .mega-menu-link:hover {
          color: var(--burgundy) !important;
          transform: translateX(4px);
        }
        .mega-menu-link:hover .dot {
          background-color: var(--burgundy) !important;
          opacity: 1 !important;
        }
        .mega-menu-spotlight:hover .spotlight-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
