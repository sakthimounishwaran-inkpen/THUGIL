import React from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import { Sparkles, Trophy, ArrowRight } from "lucide-react";

export default function BestsellersSection() {
  const { products, navigateToCategory } = useShop();

  // Filter bestsellers
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 6);

  return (
    <section
      id="bestsellers"
      style={{
        padding: "6rem 0 5rem",
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
              backgroundColor: "rgba(185, 154, 91, 0.15)",
              border: "1px solid var(--muted-gold)",
              marginBottom: "1rem"
            }}
          >
            <Trophy size={13} color="var(--muted-gold-dark)" />
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--theme-heading-color)",
                fontWeight: 700,
                fontFamily: "var(--font-serif-royal)"
              }}
            >
              Patron Acclaimed ✦ Certified Heirlooms
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
            The Bestsellers Gallery
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--theme-body-color)",
              fontFamily: "var(--font-serif-editorial)"
            }}
          >
            Worn by royalty, dignitaries, and discerning patrons across London, Paris, New Delhi,
            and New York. Each piece represents the zenith of our craft.
          </p>
        </div>

        {/* Bestsellers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "2rem"
          }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Section CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            onClick={() => navigateToCategory("womens-wear")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              backgroundColor: "var(--burgundy)",
              color: "#FAF5EB",
              padding: "0.85rem 2.2rem",
              borderRadius: "30px",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              boxShadow: "var(--shadow-burgundy)",
              transition: "all 0.3s ease"
            }}
            className="gold-shimmer-btn"
          >
            <span>Browse Full Imperial Wardrobe</span>
            <ArrowRight size={16} color="var(--muted-gold-light)" />
          </button>
        </div>
      </div>
    </section>
  );
}
