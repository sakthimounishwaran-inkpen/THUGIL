import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Sparkles,
  ShieldCheck,
  Check,
  Calendar,
  Ruler
} from "lucide-react";
import confetti from "canvas-confetti";

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    wishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
    openAITrialRoomWithProduct,
    showToast
  } = useShop();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeMedia, setActiveMedia] = useState("garment");
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      if (quickViewProduct.sizes && quickViewProduct.sizes.length > 0) {
        setSelectedSize(quickViewProduct.sizes[0]);
      } else {
        setSelectedSize("Standard Royal Cut");
      }
      if (quickViewProduct.colors && quickViewProduct.colors.length > 0) {
        setSelectedColor(quickViewProduct.colors[0].name);
      } else {
        setSelectedColor(quickViewProduct.colorScheme?.primaryName || "Signature");
      }
      setActiveMedia("garment");
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = wishlist.includes(quickViewProduct.id);
  const availableSizes = quickViewProduct.sizes || ["Standard Royal Cut"];

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBookAppointment = () => {
    showToast("Virtual Atelier Private Consultation booked. Our master stylist will contact you via WhatsApp & Email.");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#B99A5B", "#6D1F32", "#F7F1E7"]
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(41, 38, 38, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 210,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeInScale 0.25s ease"
      }}
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        style={{
          backgroundColor: "var(--theme-bg-elevated)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "1060px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 70px rgba(0,0,0,0.4), 0 0 40px rgba(185, 154, 91, 0.25)",
          border: "2px solid var(--muted-gold)",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
        className="quickview-modal-content"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            backgroundColor: "rgba(41, 38, 38, 0.08)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--theme-heading-color)",
            zIndex: 10,
            transition: "all 0.2s ease"
          }}
          className="icon-hover-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* LEFT MEDIA COLUMN */}
        <div
          style={{
            backgroundColor: "#181515",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid rgba(185, 154, 91, 0.2)"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
              height: "490px",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1.5px solid var(--muted-gold)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
              marginBottom: "1rem"
            }}
          >
            <img
              src={activeMedia === "garment" ? quickViewProduct.image : (quickViewProduct.craftImage || "/images/fabric-craftsmanship.jpg")}
              alt={quickViewProduct.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                transition: "all 0.4s ease"
              }}
            />

            {/* Top Badge */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                backgroundColor: "var(--burgundy)",
                color: "#FAF5EB",
                fontSize: "0.72rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "14px",
                border: "1px solid var(--muted-gold)",
                fontWeight: 600
              }}
            >
              {quickViewProduct.badge || "Heritage Craft"}
            </div>
          </div>

          {/* Media Switcher Thumbnails */}
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button
              onClick={() => setActiveMedia("garment")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "16px",
                backgroundColor: activeMedia === "garment" ? "var(--muted-gold)" : "rgba(255,255,255,0.1)",
                color: activeMedia === "garment" ? "#181515" : "#FAF5EB",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              <span>Full Garment</span>
            </button>

            <button
              onClick={() => setActiveMedia("craft")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "16px",
                backgroundColor: activeMedia === "craft" ? "var(--muted-gold)" : "rgba(255,255,255,0.1)",
                color: activeMedia === "craft" ? "#181515" : "#FAF5EB",
                fontSize: "0.75rem",
                fontWeight: 600
              }}
            >
              <Sparkles size={12} />
              <span>Micro Zari Texture</span>
            </button>
          </div>
        </div>

        {/* RIGHT DETAILS COLUMN */}
        <div style={{ padding: "2.5rem 2.2rem", overflowY: "auto" }}>
          {/* Category & Rating */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.4rem"
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.76rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted-gold-dark)",
                fontWeight: 700
              }}
            >
              {quickViewProduct.department} ✦ {quickViewProduct.subcategory || quickViewProduct.category}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Star size={14} fill="var(--muted-gold)" color="var(--muted-gold)" />
              <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{quickViewProduct.rating}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--theme-muted-color)" }}>
                ({quickViewProduct.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "1.75rem",
              color: "var(--theme-heading-color)",
              lineHeight: 1.2,
              marginBottom: "0.4rem"
            }}
          >
            {quickViewProduct.name}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-serif-editorial)",
              color: "var(--theme-body-color)",
              marginBottom: "1.2rem",
              fontSize: "1.1rem"
            }}
          >
            {quickViewProduct.subtitle}
          </p>

          {/* Pricing */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.8rem",
              marginBottom: "1.4rem",
              paddingBottom: "1.2rem",
              borderBottom: "1px solid rgba(185, 154, 91, 0.25)"
            }}
          >
            <span
              style={{
                fontSize: "1.9rem",
                fontFamily: "var(--font-serif-display)",
                fontWeight: 700,
                color: "var(--theme-heading-color)"
              }}
            >
              {formatPrice(quickViewProduct.priceUSD)}
            </span>
            {quickViewProduct.originalPriceUSD && (
              <span
                style={{
                  fontSize: "1.1rem",
                  color: "var(--theme-muted-color)",
                  textDecoration: "line-through"
                }}
              >
                {formatPrice(quickViewProduct.originalPriceUSD)}
              </span>
            )}
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--muted-gold-dark)",
                fontWeight: 600,
                backgroundColor: "rgba(185, 154, 91, 0.15)",
                padding: "0.2rem 0.5rem",
                borderRadius: "10px"
              }}
            >
              Complimentary Royal Shipping
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--theme-body-color)",
              lineHeight: 1.6,
              marginBottom: "1.5rem"
            }}
          >
            {quickViewProduct.description}
          </p>

          {/* Masterloom Specs */}
          {quickViewProduct.specs && (
            <div
              style={{
                backgroundColor: "rgba(109, 31, 50, 0.04)",
                border: "1px solid rgba(185, 154, 91, 0.3)",
                borderRadius: "12px",
                padding: "1rem 1.2rem",
                marginBottom: "1.5rem"
              }}
            >
              <div
                style={{
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.6rem"
                }}
              >
                Masterloom Specifications
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem",
                  fontSize: "0.78rem"
                }}
              >
                {quickViewProduct.specs.fabric && (
                  <div>
                    <strong style={{ color: "var(--theme-heading-color)" }}>Fabric:</strong>{" "}
                    <span style={{ color: "var(--theme-body-color)" }}>{quickViewProduct.specs.fabric}</span>
                  </div>
                )}
                {quickViewProduct.specs.zari && (
                  <div>
                    <strong style={{ color: "var(--theme-heading-color)" }}>Zari Purity:</strong>{" "}
                    <span style={{ color: "var(--theme-body-color)" }}>{quickViewProduct.specs.zari}</span>
                  </div>
                )}
                {quickViewProduct.specs.weaveTime && (
                  <div>
                    <strong style={{ color: "var(--theme-heading-color)" }}>Artisan Hours:</strong>{" "}
                    <span style={{ color: "var(--theme-body-color)" }}>{quickViewProduct.specs.weaveTime}</span>
                  </div>
                )}
                {quickViewProduct.specs.origin && (
                  <div>
                    <strong style={{ color: "var(--theme-heading-color)" }}>Origin:</strong>{" "}
                    <span style={{ color: "var(--theme-body-color)" }}>{quickViewProduct.specs.origin}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
            <div style={{ marginBottom: "1.2rem" }}>
              <div
                style={{
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--theme-heading-color)",
                  marginBottom: "0.5rem"
                }}
              >
                Select Palette: <strong>{selectedColor}</strong>
              </div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: c.hex,
                      border:
                        selectedColor === c.name
                          ? "2.5px solid var(--burgundy)"
                          : "1px solid rgba(185, 154, 91, 0.4)",
                      transform: selectedColor === c.name ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.2s"
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem"
              }}
            >
              <label
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--theme-heading-color)"
                }}
              >
                Select Size / Cut
              </label>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.75rem",
                  color: "var(--burgundy)",
                  textDecoration: "underline"
                }}
              >
                <Ruler size={13} />
                <span>Atelier Sizing Guide</span>
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    border:
                      selectedSize === s
                        ? "1.5px solid var(--burgundy)"
                        : "1px solid rgba(185, 154, 91, 0.3)",
                    backgroundColor:
                      selectedSize === s ? "rgba(109, 31, 50, 0.12)" : "transparent",
                    color: selectedSize === s ? "var(--burgundy)" : "var(--theme-body-color)",
                    fontWeight: selectedSize === s ? 700 : 400
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs: Add to Bag + Wishlist */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem" }}>
            <button
              onClick={handleAdd}
              disabled={isAddedSuccess}
              style={{
                flex: 1,
                padding: "0.95rem 1.5rem",
                borderRadius: "28px",
                backgroundColor: isAddedSuccess ? "#346643" : "var(--burgundy)",
                color: "#FAF5EB",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                boxShadow: "var(--shadow-burgundy)",
                transition: "all 0.25s ease"
              }}
              className="gold-shimmer-btn"
            >
              {isAddedSuccess ? (
                <>
                  <Check size={18} color="#FFF" />
                  <span>Added to Royal Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} color="var(--muted-gold-light)" />
                  <span>Add to Royal Bag</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(quickViewProduct)}
              style={{
                padding: "0.95rem",
                borderRadius: "50%",
                border: "1.5px solid var(--muted-gold)",
                color: "var(--burgundy)",
                backgroundColor: "var(--theme-bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Wishlist"
            >
              <Heart size={20} fill={isSaved ? "var(--burgundy)" : "none"} />
            </button>
          </div>

          {/* AI Virtual Try-On Instant Action */}
          <button
            onClick={() => {
              openAITrialRoomWithProduct(quickViewProduct);
              setQuickViewProduct(null);
            }}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "14px",
              border: "1.5px solid var(--muted-gold)",
              backgroundColor: "rgba(109, 31, 50, 0.08)",
              color: "var(--burgundy)",
              fontSize: "0.84rem",
              fontWeight: 700,
              fontFamily: "var(--font-serif-royal)",
              letterSpacing: "0.06em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.55rem",
              marginBottom: "0.75rem",
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}
            className="hover:scale-102"
          >
            <Sparkles size={16} color="var(--muted-gold-dark)" />
            <span>AI Virtual Trial Room — Drape on Silhouette</span>
          </button>

          {/* Virtual Fitting Appointment CTA */}
          <button
            onClick={handleBookAppointment}
            style={{
              width: "100%",
              padding: "0.65rem 1rem",
              borderRadius: "12px",
              border: "1px dashed var(--muted-gold-dark)",
              backgroundColor: "rgba(185, 154, 91, 0.08)",
              color: "var(--burgundy)",
              fontSize: "0.8rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem"
            }}
          >
            <Calendar size={15} color="var(--muted-gold-dark)" />
            <span>Book Private Video Consultation with Master Stylist</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .quickview-modal-content {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
