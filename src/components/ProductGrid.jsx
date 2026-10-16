import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { DEPARTMENTS } from "../data/products";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowUpDown, X, ArrowRight } from "lucide-react";

export default function ProductGrid() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    navigateToCategory
  } = useShop();

  const [activeDeptTab, setActiveDeptTab] = useState("all");
  const [activeSubTab, setActiveSubTab] = useState("all");

  const currentDept = DEPARTMENTS.find((d) => d.id === activeDeptTab);

  // Filter products by active tab & search query
  const filteredProducts = products
    .filter((prod) => {
      const matchesDept =
        activeDeptTab === "all" ||
        (activeDeptTab === "occasion-collections"
          ? prod.occasions && prod.occasions.length > 0
          : prod.departmentId === activeDeptTab);

      const matchesSub =
        activeSubTab === "all" || prod.subcategory === activeSubTab;

      const matchesSearch =
        !searchQuery ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (prod.specs?.fabric && prod.specs.fabric.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDept && matchesSub && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.priceUSD - b.priceUSD;
      if (sortBy === "price-high") return b.priceUSD - a.priceUSD;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === "bestsellers") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0; // default featured
    });

  return (
    <section
      id="collections"
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
              The Royal Archive Collection
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
            Curated Drapes & Bespoke Couture
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--theme-body-color)",
              fontFamily: "var(--font-serif-editorial)"
            }}
          >
            Explore all masterpieces from master looms across Kanchipuram, Varanasi, Kashmir,
            and the THUGIL Haute Couture Atelier.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            marginBottom: "3rem"
          }}
        >
          {/* Department Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              overflowX: "auto",
              paddingBottom: "0.6rem",
              scrollbarWidth: "none"
            }}
            className="category-scroll"
          >
            <button
              onClick={() => {
                setActiveDeptTab("all");
                setActiveSubTab("all");
              }}
              style={{
                padding: "0.55rem 1.25rem",
                borderRadius: "24px",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                backgroundColor:
                  activeDeptTab === "all" ? "var(--burgundy)" : "var(--theme-bg-card)",
                color: activeDeptTab === "all" ? "#FAF5EB" : "var(--theme-body-color)",
                border:
                  activeDeptTab === "all"
                    ? "1px solid var(--muted-gold)"
                    : "1px solid rgba(185, 154, 91, 0.28)",
                boxShadow: activeDeptTab === "all" ? "var(--shadow-burgundy)" : "none",
                transition: "all 0.25s ease"
              }}
              className="cat-pill-btn"
            >
              All Masterpieces
            </button>

            {DEPARTMENTS.map((dept) => {
              const isSelected = activeDeptTab === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveDeptTab(dept.id);
                    setActiveSubTab("all");
                  }}
                  style={{
                    padding: "0.55rem 1.25rem",
                    borderRadius: "24px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    backgroundColor: isSelected ? "var(--burgundy)" : "var(--theme-bg-card)",
                    color: isSelected ? "#FAF5EB" : "var(--theme-body-color)",
                    border: isSelected
                      ? "1px solid var(--muted-gold)"
                      : "1px solid rgba(185, 154, 91, 0.28)",
                    boxShadow: isSelected ? "var(--shadow-burgundy)" : "none",
                    transition: "all 0.25s ease"
                  }}
                  className="cat-pill-btn"
                >
                  {dept.name}
                </button>
              );
            })}
          </div>

          {/* Subcategory Pills (when a specific department is active) */}
          {currentDept && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "0.2rem 0"
              }}
            >
              <button
                onClick={() => setActiveSubTab("all")}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: "16px",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  backgroundColor:
                    activeSubTab === "all" ? "var(--muted-gold)" : "rgba(185, 154, 91, 0.08)",
                  color: activeSubTab === "all" ? "#181515" : "var(--theme-heading-color)",
                  border: "1px solid rgba(185, 154, 91, 0.35)"
                }}
              >
                All {currentDept.shortName}
              </button>

              {currentDept.subcategories.map((sub) => {
                const isSubSel = activeSubTab === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubTab(sub)}
                    style={{
                      padding: "0.35rem 0.9rem",
                      borderRadius: "16px",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      backgroundColor: isSubSel ? "var(--muted-gold)" : "rgba(185, 154, 91, 0.08)",
                      color: isSubSel ? "#181515" : "var(--theme-heading-color)",
                      border: "1px solid rgba(185, 154, 91, 0.35)"
                    }}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sub Controls: Active Filter Notice, Dedicated Category Link & Sort Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              paddingTop: "0.8rem",
              borderTop: "1px solid rgba(185, 154, 91, 0.2)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--theme-body-color)",
                  fontWeight: 500
                }}
              >
                Showing <strong>{filteredProducts.length}</strong> mastercraft pieces
              </span>

              {searchQuery && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    backgroundColor: "rgba(109, 31, 50, 0.08)",
                    border: "1px solid var(--muted-gold)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "16px",
                    fontSize: "0.78rem",
                    color: "var(--theme-heading-color)"
                  }}
                >
                  Searching: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {currentDept && (
                <button
                  onClick={() => navigateToCategory(currentDept.id, activeSubTab === "all" ? "All" : activeSubTab)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.78rem",
                    color: "var(--burgundy)",
                    fontWeight: 700,
                    textDecoration: "underline"
                  }}
                >
                  <span>Open Dedicated {currentDept.shortName} Page</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowUpDown size={15} color="var(--muted-gold-dark)" />
              <label
                htmlFor="sort-select"
                style={{ fontSize: "0.82rem", color: "var(--theme-body-color)", fontWeight: 500 }}
              >
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(185, 154, 91, 0.35)",
                  backgroundColor: "var(--theme-bg-card)",
                  color: "var(--theme-body-color)",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="featured">Featured Atelier Pieces</option>
                <option value="newest">Newest Drops</option>
                <option value="bestsellers">Bestsellers First</option>
                <option value="price-low">Investment: Low to High</option>
                <option value="price-high">Investment: High to Low</option>
                <option value="rating">Patron Acclaimed (Highest Rated)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "2rem"
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              backgroundColor: "var(--theme-bg-card)",
              borderRadius: "16px",
              border: "1px dashed var(--muted-gold)"
            }}
          >
            <Sparkles size={32} color="var(--muted-gold)" style={{ margin: "0 auto 1rem" }} />
            <h3
              style={{
                fontFamily: "var(--font-serif-display)",
                color: "var(--burgundy)",
                fontSize: "1.5rem",
                marginBottom: "0.5rem"
              }}
            >
              No Heirloom Pieces Found
            </h3>
            <p style={{ color: "var(--theme-muted-color)", marginBottom: "1.5rem" }}>
              No items match your active search filter or category selection.
            </p>
            <button
              onClick={() => {
                setActiveDeptTab("all");
                setActiveSubTab("all");
                setSearchQuery("");
              }}
              style={{
                backgroundColor: "var(--burgundy)",
                color: "#FAF5EB",
                padding: "0.65rem 1.4rem",
                borderRadius: "24px",
                fontSize: "0.85rem",
                fontWeight: 600
              }}
              className="gold-shimmer-btn"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
