import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NewArrivalsSection() {
  const { products, navigateToCategory } = useShop();
  const [filterDept, setFilterDept] = useState("all");

  const newArrivals = products.filter((p) => p.isNewArrival);
  const displayedArrivals = newArrivals.filter((p) =>
    filterDept === "all" ? true : p.departmentId === filterDept
  );

  return (
    <section
      id="new-arrivals"
      style={{
        padding: "6rem 0 5rem",
        backgroundColor: "rgba(109, 31, 50, 0.03)",
        borderTop: "1px solid rgba(185, 154, 91, 0.2)",
        borderBottom: "1px solid rgba(185, 154, 91, 0.2)",
        position: "relative"
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem"
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                backgroundColor: "rgba(185, 154, 91, 0.12)",
                border: "1px solid var(--muted-gold)",
                marginBottom: "0.8rem"
              }}
            >
              <Sparkles size={13} color="var(--muted-gold-dark)" />
              <span
                style={{
                  fontSize: "0.74rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--theme-heading-color)",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif-royal)"
                }}
              >
                Seasonal Haute Drops
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontFamily: "var(--font-serif-display)",
                color: "var(--theme-heading-color)",
                fontWeight: 700,
                lineHeight: 1.15
              }}
            >
              New Arrivals Archive
            </h2>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--theme-body-color)",
                fontFamily: "var(--font-serif-editorial)",
                marginTop: "0.3rem"
              }}
            >
              Fresh off master looms across India and the THUGIL Haute Couture Atelier.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All New Drops" },
              { id: "womens-wear", label: "Women" },
              { id: "mens-wear", label: "Men" },
              { id: "kids-wear", label: "Kids" },
              { id: "unisex-wear", label: "Unisex" },
              { id: "accessories", label: "Accessories" }
            ].map((tab) => {
              const isSel = filterDept === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterDept(tab.id)}
                  style={{
                    padding: "0.45rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    backgroundColor: isSel ? "var(--burgundy)" : "var(--theme-bg-card)",
                    color: isSel ? "#FAF5EB" : "var(--theme-body-color)",
                    border: isSel
                      ? "1px solid var(--muted-gold)"
                      : "1px solid rgba(185, 154, 91, 0.28)",
                    boxShadow: isSel ? "var(--shadow-burgundy)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "2rem"
          }}
        >
          {displayedArrivals.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All New Drops Button */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            onClick={() => navigateToCategory(filterDept === "all" ? "womens-wear" : filterDept)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              backgroundColor: "transparent",
              color: "var(--theme-heading-color)",
              border: "1.5px solid var(--muted-gold)",
              padding: "0.8rem 2rem",
              borderRadius: "30px",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "all 0.3s ease"
            }}
            className="gold-shimmer-btn"
          >
            <span>Explore All New Drops</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
