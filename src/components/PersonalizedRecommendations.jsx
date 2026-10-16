import React from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import { HeartHandshake } from "lucide-react";

export default function PersonalizedRecommendations() {
  const { products, cart, wishlist } = useShop();

  // Find personalized recommendations based on wishlist, cart, or featured pieces
  const relevantIds = [...cart.map((i) => i.id), ...wishlist];
  
  // Pick top recommendations avoiding duplicates
  const recommended = products
    .filter((p) => !relevantIds.includes(p.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  return (
    <section
      id="recommendations"
      style={{
        padding: "5rem 0 6rem",
        backgroundColor: "rgba(185, 154, 91, 0.04)",
        borderTop: "1px solid rgba(185, 154, 91, 0.2)",
        position: "relative"
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.8rem",
              borderRadius: "20px",
              backgroundColor: "rgba(109, 31, 50, 0.08)",
              border: "1px solid var(--muted-gold)",
              marginBottom: "1rem"
            }}
          >
            <HeartHandshake size={14} color="var(--muted-gold-dark)" />
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
              Tailored For Your Taste
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontFamily: "var(--font-serif-display)",
              color: "var(--theme-heading-color)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "0.8rem"
            }}
          >
            Recommended For You
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--theme-body-color)",
              fontFamily: "var(--font-serif-editorial)"
            }}
          >
            Curated according to your aesthetic affinities. Each silhouette harmonizes effortlessly
            with your existing wardrobe selections.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "2rem"
          }}
        >
          {recommended.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
