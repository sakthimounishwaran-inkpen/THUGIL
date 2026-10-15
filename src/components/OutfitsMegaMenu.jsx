import React, { forwardRef } from "react";
import { useShop } from "../context/ShopContext";
import { OUTFITS_GROUPS } from "../data/outfitsData";
import { Sparkles, Scissors, ArrowRight } from "lucide-react";
import thugilIcon from "../assets/thugil.png";

const OutfitsMegaMenu = forwardRef(function OutfitsMegaMenu(
  { isOpen, onClose, onMouseEnter, onMouseLeave },
  ref
) {
  const { navigateToCategory, setIsFabricStudioOpen, setIsAITrialRoomOpen } = useShop();

  if (!isOpen) return null;

  const handleCategoryClick = (group, cat) => {
    navigateToCategory(group.deptId, cat.sub, cat.occ || "All");
    onClose();
  };

  const handleGroupHeaderClick = (group) => {
    navigateToCategory(group.deptId, "All");
    onClose();
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="outfits-mega-menu-container"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "var(--theme-bg-header)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "2px solid var(--muted-gold)",
        boxShadow: "0 28px 70px rgba(0, 0, 0, 0.35), 0 0 35px rgba(185, 154, 91, 0.2)",
        zIndex: 100,
        animation: "modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        color: "var(--theme-heading-color)"
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "2.2rem 2.5rem 1.6rem"
        }}
      >
        {/* 6 Royal Groups Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1.6rem",
            marginBottom: "1.8rem"
          }}
          className="outfits-grid"
        >
          {OUTFITS_GROUPS.map((group) => (
            <div
              key={group.id}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid rgba(185, 154, 91, 0.18)",
                paddingRight: "1rem"
              }}
              className="outfits-column"
            >
              {/* Group Heading */}
              <button
                type="button"
                onClick={() => handleGroupHeaderClick(group)}
                style={{
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  padding: "0 0 0.5rem 0",
                  cursor: "pointer",
                  borderBottom: "1.5px solid var(--muted-gold)",
                  marginBottom: "0.85rem",
                  transition: "opacity 0.2s"
                }}
                className="outfits-group-header-btn"
                title={`Explore all ${group.title}`}
              >
                <div
                  style={{
                    fontFamily: "var(--font-serif-royal)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--theme-heading-color)",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span>{group.title}</span>
                  <Sparkles size={11} color="var(--muted-gold)" />
                </div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.68rem",
                    color: "var(--muted-gold-dark)",
                    letterSpacing: "0.04em",
                    marginTop: "0.15rem",
                    fontFamily: "var(--font-sans)"
                  }}
                >
                  {group.tagline}
                </span>
              </button>

              {/* Compact Category Links */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.28rem",
                  flex: 1
                }}
              >
                {group.categories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategoryClick(group, cat)}
                    style={{
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      padding: "0.22rem 0.3rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      color: "var(--theme-body-color)",
                      transition: "all 0.2s ease",
                      lineHeight: 1.35
                    }}
                    className="outfits-cat-link"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* View Department Bottom Link */}
              <button
                type="button"
                onClick={() => handleGroupHeaderClick(group)}
                style={{
                  marginTop: "0.8rem",
                  paddingTop: "0.6rem",
                  borderTop: "1px dashed rgba(185, 154, 91, 0.25)",
                  background: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  textAlign: "left",
                  fontSize: "0.74rem",
                  fontFamily: "var(--font-serif-royal)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--muted-gold-dark)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
                className="outfits-view-all-link"
              >
                <span>View All</span>
                <ArrowRight size={11} />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Luxury Highlights Bar */}
        <div
          style={{
            paddingTop: "1.1rem",
            borderTop: "1px solid rgba(185, 154, 91, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8rem"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              color: "var(--theme-body-color)"
            }}
          >
            <Scissors size={15} color="var(--muted-gold)" />
            <span>
              <strong>Bespoke Drape Studio:</strong> Custom made-to-measure silhouettes & handcrafted borders.
            </span>
            <button
              type="button"
              onClick={() => {
                setIsFabricStudioOpen(true);
                onClose();
              }}
              style={{
                marginLeft: "0.5rem",
                color: "var(--burgundy)",
                textDecoration: "underline",
                fontWeight: 700,
                fontSize: "0.8rem",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Open Studio →
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              color: "var(--theme-body-color)"
            }}
          >
            <img
              src={thugilIcon || "/thugil.png"}
              alt="AI Try-On"
              style={{ width: "16px", height: "16px", objectFit: "contain" }}
            />
            <span>
              <strong>Virtual Fitting Room:</strong> Neural try-on with patron silhouettes.
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAITrialRoomOpen(true);
                onClose();
              }}
              style={{
                marginLeft: "0.5rem",
                color: "var(--burgundy)",
                textDecoration: "underline",
                fontWeight: 700,
                fontSize: "0.8rem",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Try Online →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .outfits-cat-link:hover {
          color: var(--burgundy) !important;
          transform: translateX(4px);
          font-weight: 600;
        }
        [data-theme="dark"] .outfits-cat-link:hover {
          color: var(--muted-gold-light) !important;
        }
        .outfits-group-header-btn:hover {
          opacity: 0.85;
        }
        .outfits-view-all-link:hover {
          color: var(--burgundy) !important;
        }
        [data-theme="dark"] .outfits-view-all-link:hover {
          color: var(--muted-gold-light) !important;
        }
        .outfits-column:last-child {
          border-right: none !important;
          padding-right: 0 !important;
        }
        .outfits-mega-menu-container::before {
          content: "";
          position: absolute;
          top: -24px;
          left: 0;
          right: 0;
          height: 24px;
          background: transparent;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
});

export default OutfitsMegaMenu;
