import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check, ChevronDown } from "lucide-react";

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    openAITrialRoomWithProduct
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [showCraftWeave, setShowCraftWeave] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard Royal Cut"
  );
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const isSaved = wishlist.includes(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (product.sizes && product.sizes.length > 1 && !isSizeSelectorOpen) {
      setIsSizeSelectorOpen(true);
      return;
    }
    addToCart(product, selectedSize, 1);
    setIsAddedSuccess(true);
    setIsSizeSelectorOpen(false);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleSelectSizeAndAdd = (e, size) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, 1);
    setIsAddedSuccess(true);
    setIsSizeSelectorOpen(false);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowCraftWeave(false);
        setIsSizeSelectorOpen(false);
      }}
      onClick={() => setQuickViewProduct(product)}
      style={{
        position: "relative",
        backgroundColor: "var(--theme-bg-card)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(185, 154, 91, 0.28)",
        boxShadow: isHovered
          ? "0 18px 40px rgba(109, 31, 50, 0.16), 0 0 24px rgba(185, 154, 91, 0.22)"
          : "var(--shadow-sm)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column"
      }}
      className="product-luxury-card"
    >
      {/* Top Media Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "135%", // 3:4 Luxury fashion portrait aspect ratio
          overflow: "hidden",
          backgroundColor: "#F3EDE2"
        }}
      >
        <img
          src={showCraftWeave ? (product.craftImage || "/images/fabric-craftsmanship.jpg") : imgSrc}
          onError={() => setImgSrc("/images/kanjivaram-saree.jpg")}
          alt={product.name}
          loading="lazy"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
            transform: isHovered ? "scale(1.04)" : "scale(1)"
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: "absolute",
            top: "0.9rem",
            left: "0.9rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            zIndex: 2
          }}
        >
          {product.badge && (
            <span
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.94)",
                color: "#FAF5EB",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "0.22rem 0.6rem",
                borderRadius: "14px",
                border: "1px solid var(--muted-gold)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.18)"
              }}
            >
              {product.badge}
            </span>
          )}

          {product.isNewArrival && !product.badge?.includes("New") && (
            <span
              style={{
                backgroundColor: "rgba(185, 154, 91, 0.92)",
                color: "#181515",
                fontSize: "0.68rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 700,
                padding: "0.2rem 0.55rem",
                borderRadius: "12px"
              }}
            >
              ✦ New Drop
            </span>
          )}

          {product.stockCount <= 3 && (
            <span
              style={{
                backgroundColor: "rgba(41, 38, 38, 0.88)",
                color: "var(--muted-gold-light)",
                fontSize: "0.66rem",
                padding: "0.18rem 0.5rem",
                borderRadius: "12px",
                fontWeight: 500
              }}
            >
              Only {product.stockCount} Woven
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Floating Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "0.9rem",
            backgroundColor: "rgba(253, 251, 247, 0.94)",
            border: "1px solid rgba(185, 154, 91, 0.4)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--burgundy)",
            boxShadow: "var(--shadow-sm)",
            zIndex: 3,
            transition: "transform 0.2s ease, background 0.2s ease"
          }}
          className="wishlist-btn"
        >
          <Heart size={18} fill={isSaved ? "var(--burgundy)" : "none"} />
        </button>

        {/* Weave Inspection Toggle Pill (Micro Zari Texture) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowCraftWeave(!showCraftWeave);
          }}
          style={{
            position: "absolute",
            bottom: isHovered ? "3.8rem" : "0.9rem",
            left: "0.9rem",
            backgroundColor: showCraftWeave ? "var(--muted-gold)" : "rgba(41, 38, 38, 0.84)",
            color: showCraftWeave ? "#181515" : "#FAF5EB",
            backdropFilter: "blur(6px)",
            border: "1px solid var(--muted-gold)",
            fontSize: "0.7rem",
            fontWeight: 600,
            padding: "0.28rem 0.7rem",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            zIndex: 2,
            transition: "all 0.3s ease"
          }}
        >
          <Sparkles size={11} />
          <span>{showCraftWeave ? "View Garment" : "Inspect Zari Weave"}</span>
        </button>

        {/* Quick View & AI Try-On Slide-up Action Bar on Hover */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.65rem 0.8rem",
            background: "linear-gradient(to top, rgba(41, 38, 38, 0.94), transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            opacity: isHovered ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 3
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            style={{
              backgroundColor: "rgba(253, 251, 247, 0.96)",
              color: "var(--burgundy)",
              border: "1px solid var(--muted-gold)",
              padding: "0.4rem 0.85rem",
              borderRadius: "20px",
              fontSize: "0.74rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer"
            }}
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openAITrialRoomWithProduct(product);
            }}
            style={{
              backgroundColor: "var(--burgundy)",
              color: "#FAF5EB",
              border: "1px solid var(--muted-gold)",
              padding: "0.4rem 0.85rem",
              borderRadius: "20px",
              fontSize: "0.74rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              boxShadow: "0 4px 12px rgba(109, 31, 50, 0.3)",
              cursor: "pointer"
            }}
            className="gold-shimmer-btn"
          >
            <Sparkles size={13} color="var(--muted-gold-light)" />
            <span>AI Try-On</span>
          </button>
        </div>
      </div>

      {/* Bottom Product Details */}
      <div
        style={{
          padding: "1.2rem 1.25rem 1.4rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between"
        }}
      >
        <div>
          {/* Subcategory & Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.35rem"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.72rem",
                color: "var(--muted-gold-dark)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700
              }}
            >
              {product.subcategory || product.category}
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.78rem",
                color: "var(--theme-body-color)"
              }}
            >
              <Star size={13} fill="var(--muted-gold)" color="var(--muted-gold)" />
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: "var(--theme-muted-color)", fontSize: "0.72rem" }}>
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Garment Title */}
          <h3
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "1.18rem",
              color: "var(--theme-heading-color)",
              fontWeight: 600,
              lineHeight: 1.25,
              marginBottom: "0.35rem"
            }}
            className="product-card-title"
          >
            {product.name}
          </h3>

          {/* Subtitle / Weave specification */}
          <p
            style={{
              fontSize: "0.85rem",
              fontFamily: "var(--font-serif-editorial)",
              color: "var(--theme-body-color)",
              lineHeight: 1.35,
              marginBottom: "0.9rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
            className="product-card-subtitle"
          >
            {product.subtitle}
          </p>

          {/* Color Swatches and Available Sizes */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "0.5rem"
            }}
          >
            {/* Colors Preview */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--theme-muted-color)" }}>
                Palette:
              </span>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                {product.colors && product.colors.length > 0 ? (
                  product.colors.map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        border: "1px solid rgba(185, 154, 91, 0.4)",
                        display: "inline-block"
                      }}
                    />
                  ))
                ) : (
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: "#6D1F32",
                      border: "1px solid #B99A5B"
                    }}
                  />
                )}
              </div>
            </div>

            {/* Available Sizes Tag */}
            {product.sizes && product.sizes.length > 0 && (
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "var(--theme-muted-color)",
                  letterSpacing: "0.02em"
                }}
              >
                {product.sizes.length} sizes available
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Bag CTA */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.9rem",
            borderTop: "1px solid rgba(185, 154, 91, 0.2)"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.45rem" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-serif-display)",
                  fontWeight: 700,
                  color: "var(--theme-heading-color)"
                }}
                className="product-card-price"
              >
                {formatPrice(product.priceUSD)}
              </span>
              {product.originalPriceUSD && (
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--theme-muted-color)",
                    textDecoration: "line-through"
                  }}
                >
                  {formatPrice(product.originalPriceUSD)}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: "0.66rem",
                color: "var(--muted-gold-dark)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 600
              }}
            >
              Certified Authenticity
            </span>
          </div>

          {/* Quick Add Button with Size Popover */}
          <div style={{ position: "relative" }}>
            <button
              onClick={handleQuickAdd}
              disabled={isAddedSuccess}
              style={{
                backgroundColor: isAddedSuccess ? "#346643" : "var(--burgundy)",
                color: "#FAF5EB",
                padding: "0.55rem 0.95rem",
                borderRadius: "22px",
                fontSize: "0.8rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                boxShadow: "0 4px 12px rgba(109, 31, 50, 0.2)",
                transition: "all 0.25s ease"
              }}
              className="gold-shimmer-btn"
            >
              {isAddedSuccess ? (
                <>
                  <Check size={14} color="#FFF" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} color="var(--muted-gold-light)" />
                  <span>Add to Bag</span>
                  {product.sizes && product.sizes.length > 1 && (
                    <ChevronDown size={12} color="var(--muted-gold-light)" />
                  )}
                </>
              )}
            </button>

            {/* Quick Size Selection Popover */}
            {isSizeSelectorOpen && product.sizes && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "absolute",
                  bottom: "120%",
                  right: 0,
                  backgroundColor: "var(--theme-bg-elevated)",
                  backdropFilter: "blur(14px)",
                  border: "1px solid var(--muted-gold)",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-lg)",
                  padding: "0.6rem",
                  minWidth: "190px",
                  zIndex: 20,
                  animation: "fadeInScale 0.2s ease"
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--muted-gold-dark)",
                    marginBottom: "0.4rem",
                    paddingBottom: "0.2rem",
                    borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
                  }}
                >
                  Select Cut & Add
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={(e) => handleSelectSizeAndAdd(e, sz)}
                      style={{
                        textAlign: "left",
                        padding: "0.35rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.78rem",
                        color: "var(--theme-body-color)",
                        backgroundColor:
                          selectedSize === sz ? "rgba(109, 31, 50, 0.12)" : "transparent",
                        fontWeight: selectedSize === sz ? 700 : 400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(109, 31, 50, 0.1)")}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          selectedSize === sz ? "rgba(109, 31, 50, 0.12)" : "transparent")
                      }
                    >
                      <span>{sz}</span>
                      <ShoppingBag size={12} color="var(--muted-gold)" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
