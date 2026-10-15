import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { DEPARTMENTS, COLOR_PALETTES, OCCASIONS_LIST } from "../data/products";
import ProductCard from "./ProductCard";
import {
  Sparkles,
  ArrowUpDown,
  X,
  ChevronRight,
  Filter,
  Check,
  RotateCcw,
  LayoutGrid,
  Grid3X3
} from "lucide-react";

export default function CategoryPage() {
  const {
    products,
    selectedDepartment,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedOccasion,
    setSelectedOccasion,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    searchQuery,
    sortBy,
    setSortBy,
    navigateToHome,
    navigateToCategory,
    clearAllFilters,
    formatPrice,
    getRecommendations
  } = useShop();

  const [gridCols, setGridCols] = useState(3); // 3 or 4 columns

  // Find department definition
  const dept = DEPARTMENTS.find((d) => d.id === selectedDepartment) || DEPARTMENTS[0];

  // Available Sizes in this department
  const sizeOptions = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "Standard Drape (6.3m)",
    "Custom Made-to-Measure",
    "Free Size"
  ];

  // Filter products by all active criteria
  const filteredProducts = products.filter((prod) => {
    // 1. Department match (or Occasion collection cross-link)
    const matchesDept =
      dept.id === "occasion-collections"
        ? (selectedOccasion === "All" && selectedSubcategory === "All")
          ? prod.occasions && prod.occasions.length > 0
          : prod.occasions && (
              (selectedOccasion !== "All" && prod.occasions.includes(selectedOccasion)) ||
              (selectedSubcategory !== "All" && (
                prod.occasions.includes(selectedSubcategory) ||
                (selectedSubcategory === "Festive Wear" && prod.occasions.includes("Festive Collection"))
              ))
            )
        : prod.departmentId === dept.id;

    // 2. Subcategory match with smart alias support for OUTFITS drawer
    const matchesSub =
      selectedSubcategory === "All" ||
      prod.subcategory === selectedSubcategory ||
      (selectedSubcategory === "Western Dresses" && (prod.subcategory === "Western Wear" || prod.subcategory === "Dresses")) ||
      (selectedSubcategory === "Ethnic Wear" && (prod.subcategory === "Ethnic Wear" || prod.subcategory === "Kids’ Ethnic Wear")) ||
      (selectedSubcategory === "Boys' Clothing" && (prod.subcategory === "Boys’ Clothing" || prod.subcategory === "Boys' Clothing")) ||
      (selectedSubcategory === "Girls' Clothing" && (prod.subcategory === "Girls’ Clothing" || prod.subcategory === "Girls' Clothing" || prod.subcategory === "Frocks")) ||
      (selectedSubcategory === "Suits" && (prod.subcategory === "Suits" || prod.subcategory === "Blazers")) ||
      (selectedSubcategory === "Casual Wear" && (prod.subcategory === "Casual Wear" || prod.occasions?.includes("Casual Wear"))) ||
      (selectedSubcategory === "Formal Wear" && (prod.subcategory === "Formal Wear" || prod.occasions?.includes("Office Wear"))) ||
      (selectedSubcategory === "Bridal Wear" && (prod.subcategory === "Bridal Wear" || prod.occasions?.includes("Bridal Collection"))) ||
      (selectedSubcategory === "Party Wear" && (prod.subcategory === "Party Wear" || prod.occasions?.includes("Party Wear"))) ||
      (selectedSubcategory === "Festive Wear" && (prod.subcategory === "Festive Collection" || prod.occasions?.includes("Festive Collection"))) ||
      (dept.id === "occasion-collections" && (
        (prod.occasions && prod.occasions.includes(selectedSubcategory)) ||
        (selectedSubcategory === "Festive Wear" && prod.occasions?.includes("Festive Collection"))
      ));

    // 3. Occasion match
    const matchesOcc =
      selectedOccasion === "All" ||
      (prod.occasions && (
        prod.occasions.includes(selectedOccasion) ||
        (selectedOccasion === "Festive Wear" && prod.occasions.includes("Festive Collection"))
      ));

    // 4. Size match
    const matchesSize =
      selectedSizes.length === 0 ||
      (prod.sizes && prod.sizes.some((s) => selectedSizes.some((sel) => s.includes(sel))));

    // 5. Color match
    const matchesColor =
      selectedColors.length === 0 ||
      (prod.colors && prod.colors.some((c) => selectedColors.includes(c.name)));

    // 6. Price range match
    const matchesPrice =
      prod.priceUSD >= priceRange[0] && prod.priceUSD <= priceRange[1];

    // 7. In stock match
    const matchesStock = !inStockOnly || prod.inStock;

    // 8. Search query match
    const matchesSearch =
      !searchQuery ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.specs?.fabric && prod.specs.fabric.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      matchesDept &&
      matchesSub &&
      matchesOcc &&
      matchesSize &&
      matchesColor &&
      matchesPrice &&
      matchesStock &&
      matchesSearch
    );
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.priceUSD - b.priceUSD;
    if (sortBy === "price-high") return b.priceUSD - a.priceUSD;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    if (sortBy === "bestsellers") return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    return 0; // default featured
  });

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter((c) => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const activeFiltersCount =
    (selectedSubcategory !== "All" ? 1 : 0) +
    (selectedOccasion !== "All" ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 3000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // Recommendations for bottom of category
  const recommendations = getRecommendations(sortedProducts[0]?.id, 4);

  return (
    <div className="category-page" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Grand Category Hero Banner */}
      <div
        style={{
          position: "relative",
          padding: "5rem 0 4rem",
          overflow: "hidden",
          borderBottom: "1px solid rgba(185, 154, 91, 0.35)",
          backgroundColor: "#181515"
        }}
      >
        <img
          src={dept.bannerImage}
          alt={dept.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            opacity: 0.35,
            filter: "brightness(0.7) contrast(1.15)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(41, 12, 20, 0.95) 0%, rgba(24, 21, 21, 0.88) 50%, rgba(41, 38, 38, 0.7) 100%)"
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "var(--muted-gold-light)",
              marginBottom: "1.5rem"
            }}
          >
            <button
              onClick={navigateToHome}
              style={{
                color: "rgba(250, 245, 235, 0.75)",
                transition: "color 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF5EB")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 245, 235, 0.75)")}
            >
              Home
            </button>
            <ChevronRight size={14} color="var(--muted-gold)" />
            <button
              onClick={() => navigateToCategory(dept.id, "All")}
              style={{
                color: selectedSubcategory === "All" ? "var(--muted-gold-light)" : "rgba(250, 245, 235, 0.75)",
                fontWeight: selectedSubcategory === "All" ? 700 : 400
              }}
            >
              {dept.name}
            </button>
            {selectedSubcategory !== "All" && (
              <>
                <ChevronRight size={14} color="var(--muted-gold)" />
                <span style={{ color: "#FAF5EB", fontWeight: 700 }}>
                  {selectedSubcategory}
                </span>
              </>
            )}
          </nav>

          {/* Department Title & Description */}
          <div style={{ maxWidth: "820px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                backgroundColor: "rgba(185, 154, 91, 0.15)",
                border: "1px solid var(--muted-gold)",
                marginBottom: "1rem"
              }}
            >
              <Sparkles size={13} color="var(--muted-gold-light)" />
              <span
                style={{
                  fontSize: "0.74rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--muted-gold-light)",
                  fontWeight: 600
                }}
              >
                {dept.tagline}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
                color: "#FAF5EB",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1rem"
              }}
            >
              {selectedSubcategory !== "All" ? selectedSubcategory : dept.name}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-serif-editorial)",
                fontSize: "1.2rem",
                color: "rgba(250, 245, 235, 0.9)",
                lineHeight: 1.5,
                maxWidth: "720px"
              }}
            >
              {dept.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subcategory Pills Quick Bar */}
      <div
        style={{
          position: "sticky",
          top: "65px",
          zIndex: 40,
          backgroundColor: "var(--theme-bg-header)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(185, 154, 91, 0.25)",
          padding: "0.85rem 0",
          boxShadow: "0 4px 15px rgba(0,0,0,0.04)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              paddingBottom: "2px"
            }}
          >
            <button
              onClick={() => setSelectedSubcategory("All")}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                backgroundColor:
                  selectedSubcategory === "All" ? "var(--burgundy)" : "rgba(185, 154, 91, 0.08)",
                color: selectedSubcategory === "All" ? "#FAF5EB" : "var(--theme-heading-color)",
                border:
                  selectedSubcategory === "All"
                    ? "1px solid var(--muted-gold)"
                    : "1px solid rgba(185, 154, 91, 0.3)",
                boxShadow: selectedSubcategory === "All" ? "var(--shadow-burgundy)" : "none",
                transition: "all 0.2s ease"
              }}
            >
              All {dept.shortName}
            </button>

            {dept.subcategories.map((sub) => {
              const isSelected = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  style={{
                    padding: "0.45rem 1.1rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                    backgroundColor: isSelected ? "var(--burgundy)" : "rgba(185, 154, 91, 0.08)",
                    color: isSelected ? "#FAF5EB" : "var(--theme-heading-color)",
                    border: isSelected
                      ? "1px solid var(--muted-gold)"
                      : "1px solid rgba(185, 154, 91, 0.3)",
                    boxShadow: isSelected ? "var(--shadow-burgundy)" : "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Catalog Section with Sidebar + Products Grid */}
      <div className="container" style={{ padding: "3rem 2rem 5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "270px 1fr",
            gap: "2.8rem",
            alignItems: "start"
          }}
          className="category-layout-grid"
        >
          {/* LEFT SIDEBAR: Multi-Faceted Filters */}
          <aside
            style={{
              position: "sticky",
              top: "140px",
              backgroundColor: "var(--theme-bg-card)",
              borderRadius: "16px",
              padding: "1.6rem 1.4rem",
              border: "1px solid rgba(185, 154, 91, 0.3)",
              boxShadow: "var(--shadow-sm)"
            }}
            className="filter-sidebar"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                paddingBottom: "0.8rem",
                borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Filter size={16} color="var(--burgundy)" />
                <span
                  style={{
                    fontFamily: "var(--font-serif-royal)",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--theme-heading-color)"
                  }}
                >
                  Atelier Filters
                </span>
                {activeFiltersCount > 0 && (
                  <span
                    style={{
                      backgroundColor: "var(--burgundy)",
                      color: "#FAF5EB",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.74rem",
                    color: "var(--burgundy)",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  <RotateCcw size={11} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Filter Section 1: Subcategories */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div
                style={{
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted-gold-dark)",
                  fontWeight: 700,
                  marginBottom: "0.6rem"
                }}
              >
                Subcategory
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                  maxHeight: "180px",
                  overflowY: "auto",
                  paddingRight: "0.3rem"
                }}
              >
                <button
                  onClick={() => setSelectedSubcategory("All")}
                  style={{
                    textAlign: "left",
                    fontSize: "0.82rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "6px",
                    backgroundColor:
                      selectedSubcategory === "All"
                        ? "rgba(109, 31, 50, 0.1)"
                        : "transparent",
                    color:
                      selectedSubcategory === "All"
                        ? "var(--burgundy)"
                        : "var(--theme-body-color)",
                    fontWeight: selectedSubcategory === "All" ? 700 : 400
                  }}
                >
                  All Subcategories
                </button>
                {dept.subcategories.map((sub) => {
                  const isSel = selectedSubcategory === sub;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      style={{
                        textAlign: "left",
                        fontSize: "0.82rem",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "6px",
                        backgroundColor: isSel ? "rgba(109, 31, 50, 0.1)" : "transparent",
                        color: isSel ? "var(--burgundy)" : "var(--theme-body-color)",
                        fontWeight: isSel ? 700 : 400
                      }}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 2: Occasion */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div
                style={{
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted-gold-dark)",
                  fontWeight: 700,
                  marginBottom: "0.6rem"
                }}
              >
                Occasion
              </div>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(185, 154, 91, 0.35)",
                  backgroundColor: "var(--theme-bg-main)",
                  color: "var(--theme-body-color)",
                  fontSize: "0.82rem",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="All">All Royal Occasions</option>
                {OCCASIONS_LIST.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Section 3: Colors */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div
                style={{
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted-gold-dark)",
                  fontWeight: 700,
                  marginBottom: "0.6rem"
                }}
              >
                Atelier Color Palette
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {COLOR_PALETTES.map((pal) => {
                  const isSel = selectedColors.includes(pal.name);
                  return (
                    <button
                      key={pal.name}
                      onClick={() => toggleColor(pal.name)}
                      title={pal.name}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: pal.hex,
                        border: isSel
                          ? "2.5px solid var(--burgundy)"
                          : "1px solid rgba(185, 154, 91, 0.4)",
                        boxShadow: isSel ? "0 0 8px rgba(109, 31, 50, 0.4)" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: isSel ? "scale(1.15)" : "scale(1)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {isSel && (
                        <Check
                          size={13}
                          color={pal.name === "Warm Ivory" ? "#292626" : "#FAF5EB"}
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 4: Sizes */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div
                style={{
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted-gold-dark)",
                  fontWeight: 700,
                  marginBottom: "0.6rem"
                }}
              >
                Sizes & Cuts
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {sizeOptions.map((sz) => {
                  const isSel = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      style={{
                        padding: "0.3rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.74rem",
                        fontWeight: isSel ? 700 : 400,
                        backgroundColor: isSel ? "var(--burgundy)" : "transparent",
                        color: isSel ? "#FAF5EB" : "var(--theme-body-color)",
                        border: isSel
                          ? "1px solid var(--muted-gold)"
                          : "1px solid rgba(185, 154, 91, 0.3)",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Section 5: Price Range */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-serif-royal)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--muted-gold-dark)",
                  fontWeight: 700,
                  marginBottom: "0.6rem"
                }}
              >
                <span>Price Ceiling</span>
                <span style={{ color: "var(--theme-heading-color)", fontWeight: 700 }}>
                  {formatPrice(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                style={{
                  width: "100%",
                  accentColor: "var(--burgundy)",
                  cursor: "pointer"
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.72rem",
                  color: "var(--theme-muted-color)",
                  marginTop: "0.2rem"
                }}
              >
                <span>{formatPrice(0)}</span>
                <span>{formatPrice(3000)}+</span>
              </div>
            </div>

            {/* Filter Section 6: In-Stock Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.6rem",
                borderTop: "1px solid rgba(185, 154, 91, 0.2)"
              }}
            >
              <label
                htmlFor="in-stock-toggle"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--theme-body-color)",
                  cursor: "pointer"
                }}
              >
                Ready to Ship Only
              </label>
              <input
                id="in-stock-toggle"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{
                  accentColor: "var(--burgundy)",
                  width: "16px",
                  height: "16px",
                  cursor: "pointer"
                }}
              />
            </div>
          </aside>

          {/* RIGHT COLUMN: Products Grid Header & Product Listing */}
          <div>
            {/* Controls Bar: Results Count, Active Tags, Sort By & Column View */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2rem",
                paddingBottom: "1.2rem",
                borderBottom: "1px solid rgba(185, 154, 91, 0.25)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--theme-body-color)", fontWeight: 600 }}>
                  Showing <strong>{sortedProducts.length}</strong> mastercraft pieces
                </span>

                {selectedSubcategory !== "All" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      backgroundColor: "rgba(109, 31, 50, 0.08)",
                      border: "1px solid var(--muted-gold)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "14px",
                      fontSize: "0.75rem",
                      color: "var(--theme-heading-color)"
                    }}
                  >
                    Subcategory: {selectedSubcategory}
                    <button onClick={() => setSelectedSubcategory("All")}>
                      <X size={12} />
                    </button>
                  </span>
                )}

                {selectedOccasion !== "All" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      backgroundColor: "rgba(109, 31, 50, 0.08)",
                      border: "1px solid var(--muted-gold)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "14px",
                      fontSize: "0.75rem",
                      color: "var(--theme-heading-color)"
                    }}
                  >
                    Occasion: {selectedOccasion}
                    <button onClick={() => setSelectedOccasion("All")}>
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown & Column View Selector */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <ArrowUpDown size={14} color="var(--muted-gold-dark)" />
                  <select
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

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    border: "1px solid rgba(185, 154, 91, 0.3)",
                    borderRadius: "8px",
                    padding: "0.2rem"
                  }}
                  className="grid-col-toggle"
                >
                  <button
                    onClick={() => setGridCols(3)}
                    title="3 Columns Grid"
                    style={{
                      padding: "0.3rem",
                      borderRadius: "6px",
                      backgroundColor: gridCols === 3 ? "var(--burgundy)" : "transparent",
                      color: gridCols === 3 ? "#FAF5EB" : "var(--theme-body-color)",
                      display: "flex"
                    }}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    title="4 Columns Grid"
                    style={{
                      padding: "0.3rem",
                      borderRadius: "6px",
                      backgroundColor: gridCols === 4 ? "var(--burgundy)" : "transparent",
                      color: gridCols === 4 ? "#FAF5EB" : "var(--theme-body-color)",
                      display: "flex"
                    }}
                  >
                    <LayoutGrid size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {sortedProducts.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    gridCols === 4
                      ? "repeat(auto-fill, minmax(280px, 1fr))"
                      : "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "2.5rem"
                }}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 2rem",
                  backgroundColor: "var(--theme-bg-card)",
                  borderRadius: "16px",
                  border: "1px dashed var(--muted-gold)"
                }}
              >
                <Sparkles size={36} color="var(--muted-gold)" style={{ margin: "0 auto 1rem" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    color: "var(--theme-heading-color)",
                    fontSize: "1.6rem",
                    marginBottom: "0.5rem"
                  }}
                >
                  No Heirloom Pieces Found
                </h3>
                <p
                  style={{
                    color: "var(--theme-muted-color)",
                    maxWidth: "460px",
                    margin: "0 auto 1.8rem",
                    fontSize: "0.92rem"
                  }}
                >
                  No items match your active filters in {dept.name}. Try expanding your search
                  criteria or reset filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  style={{
                    backgroundColor: "var(--burgundy)",
                    color: "#FAF5EB",
                    padding: "0.75rem 1.6rem",
                    borderRadius: "24px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    boxShadow: "var(--shadow-burgundy)"
                  }}
                  className="gold-shimmer-btn"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Personalized Recommendations ("Complete The Royal Look") */}
        {recommendations.length > 0 && (
          <div
            style={{
              marginTop: "6rem",
              paddingTop: "4rem",
              borderTop: "1px solid rgba(185, 154, 91, 0.3)"
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "16px",
                  backgroundColor: "rgba(109, 31, 50, 0.08)",
                  border: "1px solid var(--muted-gold)",
                  marginBottom: "0.8rem"
                }}
              >
                <Sparkles size={13} color="var(--muted-gold)" />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-serif-royal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--muted-gold-dark)",
                    fontWeight: 700
                  }}
                >
                  The Royal Stylist Curates
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "var(--theme-heading-color)"
                }}
              >
                Complete The Royal Ensemble
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif-editorial)",
                  fontSize: "1.1rem",
                  color: "var(--theme-body-color)"
                }}
              >
                Harmonizing jewels, accessories, and celebratory drapes hand-selected to pair with this collection.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem"
              }}
            >
              {recommendations.map((rec) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .category-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .filter-sidebar {
            display: none !important;
          }
          .grid-col-toggle {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
