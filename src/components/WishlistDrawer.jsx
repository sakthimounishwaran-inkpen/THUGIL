import React from "react";
import { useShop } from "../context/ShopContext";
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from "lucide-react";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct,
    openAITrialRoomWithProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(41, 38, 38, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 220,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeInScale 0.2s ease"
      }}
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "var(--theme-bg-card)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.4rem 1.8rem",
            backgroundColor: "var(--burgundy-dark)",
            color: "var(--warm-ivory)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(185, 154, 91, 0.3)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Heart size={20} fill="var(--muted-gold-light)" color="var(--muted-gold-light)" />
            <h3
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.3rem",
                color: "var(--warm-ivory)",
                fontWeight: 600
              }}
            >
              Saved Masterpieces
            </h3>
            <span
              style={{
                fontSize: "0.75rem",
                backgroundColor: "var(--muted-gold)",
                color: "var(--charcoal-bg)",
                padding: "0.15rem 0.5rem",
                borderRadius: "12px",
                fontWeight: 700
              }}
            >
              {wishlist.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{ color: "var(--warm-ivory)", padding: "0.3rem" }}
            aria-label="Close wishlist"
          >
            <X size={22} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem 1.8rem" }}>
          {savedProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                color: "var(--charcoal-soft)"
              }}
            >
              <Heart size={48} color="var(--muted-gold)" style={{ margin: "0 auto 1rem", opacity: 0.8 }} />
              <h4
                style={{
                  fontFamily: "var(--font-serif-display)",
                  color: "var(--burgundy)",
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem"
                }}
              >
                Your Wishlist is Empty
              </h4>
              <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                Tap the heart on any heirloom piece to save it for your bridal trousseau or gala wardrobe.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                style={{
                  backgroundColor: "var(--burgundy)",
                  color: "var(--warm-ivory)",
                  padding: "0.65rem 1.4rem",
                  borderRadius: "24px",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
                className="gold-shimmer-btn"
              >
                Discover Collections
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {savedProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.2rem",
                    borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "105px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid var(--muted-gold)",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setQuickViewProduct(product);
                    }}
                  />

                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h4
                          style={{
                            fontFamily: "var(--font-serif-display)",
                            fontSize: "0.98rem",
                            color: "var(--theme-heading-color)",
                            lineHeight: 1.25,
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            setIsWishlistOpen(false);
                            setQuickViewProduct(product);
                          }}
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          style={{ color: "var(--charcoal-muted)", padding: "0.2rem" }}
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: "0.75rem", color: "var(--muted-gold-dark)", textTransform: "uppercase", marginTop: "0.2rem" }}>
                        {product.category}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.6rem" }}>
                      <span
                        style={{
                          fontSize: "1.05rem",
                          fontFamily: "var(--font-serif-display)",
                          fontWeight: 700,
                          color: "var(--burgundy)"
                        }}
                      >
                        {formatPrice(product.priceUSD)}
                      </span>

                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => {
                            setIsWishlistOpen(false);
                            openAITrialRoomWithProduct(product);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            backgroundColor: "rgba(109, 31, 50, 0.1)",
                            color: "var(--burgundy)",
                            border: "1px solid var(--muted-gold)",
                            padding: "0.45rem 0.75rem",
                            borderRadius: "18px",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            cursor: "pointer"
                          }}
                          title="Try-On this piece in AI Trial Room"
                        >
                          <Sparkles size={12} color="var(--muted-gold-dark)" />
                          <span>AI Try-On</span>
                        </button>

                        <button
                          onClick={() => {
                            addToCart(product, "Standard Royal Cut", 1);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            backgroundColor: "var(--burgundy)",
                            color: "var(--warm-ivory)",
                            padding: "0.45rem 0.85rem",
                            borderRadius: "18px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            cursor: "pointer"
                          }}
                          className="gold-shimmer-btn"
                        >
                          <ShoppingBag size={13} color="var(--muted-gold-light)" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
