import React from "react";
import { useShop } from "../context/ShopContext";
import { DEPARTMENTS } from "../data/products";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FeaturedCollections() {
  const { navigateToCategory } = useShop();

  return (
    <section
      id="featured-collections"
      style={{
        padding: "6rem 0 4rem",
        backgroundColor: "transparent",
        position: "relative"
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "750px",
            margin: "0 auto 3.5rem"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.9rem",
              borderRadius: "20px",
              backgroundColor: "rgba(109, 31, 50, 0.08)",
              border: "1px solid rgba(185, 154, 91, 0.35)",
              marginBottom: "1rem"
            }}
          >
            <Sparkles size={13} color="var(--muted-gold)" />
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--theme-heading-color)",
                fontWeight: 600,
                fontFamily: "var(--font-serif-royal)"
              }}
            >
              The Grand Wardrobe 2026
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
              fontFamily: "var(--font-serif-display)",
              color: "var(--theme-heading-color)",
              fontWeight: 700,
              lineHeight: 1.18,
              marginBottom: "1rem"
            }}
          >
            Explore Royal Departments
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--theme-body-color)",
              fontFamily: "var(--font-serif-editorial)"
            }}
          >
            Six distinguished universes of heritage fashion. Crafted for royalty across generations,
            from timeless silk sarees and bespoke sherwanis to junior couture and antique jewels.
          </p>
        </div>

        {/* 6 Department Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "2.2rem"
          }}
        >
          {DEPARTMENTS.map((dept, index) => (
            <div
              key={dept.id}
              onClick={() => navigateToCategory(dept.id, "All")}
              style={{
                position: "relative",
                borderRadius: "18px",
                overflow: "hidden",
                height: "440px",
                cursor: "pointer",
                border: "1px solid rgba(185, 154, 91, 0.3)",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2rem"
              }}
              className="dept-showcase-card"
            >
              {/* Background Photography */}
              <img
                src={dept.bannerImage}
                alt={dept.name}
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                className="dept-card-img"
              />

              {/* Multi-layered Vignette Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(35, 12, 18, 0.95) 0%, rgba(41, 38, 38, 0.5) 55%, rgba(41, 38, 38, 0.15) 100%)"
                }}
              />

              {/* Top Department Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.4rem",
                  left: "1.4rem",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.25rem 0.7rem",
                  borderRadius: "16px",
                  backgroundColor: "rgba(41, 38, 38, 0.8)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--muted-gold)",
                  color: "var(--muted-gold-light)",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-serif-royal)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600
                }}
              >
                <span>0{index + 1} ✦ {dept.subcategories.length} Collections</span>
              </div>

              {/* Bottom Card Content */}
              <div style={{ position: "relative", zIndex: 2, color: "#FAF5EB" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-serif-royal)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted-gold-light)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: "0.3rem"
                  }}
                >
                  {dept.tagline}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "1.85rem",
                    fontWeight: 700,
                    color: "#FAF5EB",
                    marginBottom: "0.6rem",
                    lineHeight: 1.15
                  }}
                >
                  {dept.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(250, 245, 235, 0.85)",
                    lineHeight: 1.45,
                    marginBottom: "1.4rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {dept.description}
                </p>

                {/* Subcategories pill preview */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.4rem"
                  }}
                >
                  {dept.subcategories.slice(0, 4).map((sub) => (
                    <span
                      key={sub}
                      style={{
                        fontSize: "0.72rem",
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(4px)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "12px",
                        color: "rgba(250, 245, 235, 0.95)",
                        border: "1px solid rgba(185, 154, 91, 0.3)"
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                  {dept.subcategories.length > 4 && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--muted-gold-light)",
                        padding: "0.2rem 0.4rem",
                        fontWeight: 600
                      }}
                    >
                      +{dept.subcategories.length - 4} more
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted-gold-light)",
                    transition: "all 0.2s"
                  }}
                  className="explore-cta-link"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dept-showcase-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(109, 31, 50, 0.3), 0 0 30px rgba(185, 154, 91, 0.25) !important;
          border-color: var(--muted-gold) !important;
        }
        .dept-showcase-card:hover .dept-card-img {
          transform: scale(1.06);
        }
        .dept-showcase-card:hover .explore-cta-link {
          color: #FFF !important;
          transform: translateX(4px);
        }
        @media (max-width: 640px) {
          .dept-showcase-card {
            padding: 1.35rem !important;
            height: 390px !important;
          }
        }
      `}</style>
    </section>
  );
}
