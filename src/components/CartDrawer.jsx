import React from "react";
import { useShop } from "../context/ShopContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Gift,
  ShieldCheck,
  Tag,
  ArrowRight
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    formatPrice,
    rawSubtotalUSD,
    finalTotalUSD,
    discountUSD,
    shippingUSD,
    giftBoxUSD,
    isGiftBoxSelected,
    setIsGiftBoxSelected,
    freeShippingThresholdUSD,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    processCheckout
  } = useShop();

  if (!isCartOpen) return null;

  // Free shipping progress calculation
  const shippingProgress = Math.min(100, Math.round((rawSubtotalUSD / freeShippingThresholdUSD) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThresholdUSD - rawSubtotalUSD);

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
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
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
        {/* Top Header */}
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
            <ShoppingBag size={20} color="var(--muted-gold-light)" />
            <h3
              style={{
                fontFamily: "var(--font-serif-display)",
                fontSize: "1.3rem",
                color: "var(--warm-ivory)",
                fontWeight: 600
              }}
            >
              Your Royal Bag
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
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              color: "var(--warm-ivory)",
              padding: "0.3rem",
              borderRadius: "50%",
              display: "flex"
            }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            padding: "1rem 1.8rem",
            backgroundColor: "rgba(185, 154, 91, 0.12)",
            borderBottom: "1px solid rgba(185, 154, 91, 0.25)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.78rem",
              marginBottom: "0.4rem",
              fontWeight: 600,
              color: "var(--charcoal)"
            }}
          >
            {remainingForFreeShipping === 0 ? (
              <span style={{ color: "#2B6338", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Sparkles size={13} />
                Unlocked: Complimentary Royal White-Glove Delivery
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for Complimentary Delivery
              </span>
            )}
            <span>{shippingProgress}%</span>
          </div>

          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "rgba(0,0,0,0.08)",
              borderRadius: "3px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${shippingProgress}%`,
                height: "100%",
                background: "var(--gold-gradient)",
                transition: "width 0.4s ease"
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem 1.8rem" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                color: "var(--charcoal-soft)"
              }}
            >
              <ShoppingBag size={48} color="var(--muted-gold)" style={{ margin: "0 auto 1rem", opacity: 0.8 }} />
              <h4
                style={{
                  fontFamily: "var(--font-serif-display)",
                  color: "var(--burgundy)",
                  fontSize: "1.3rem",
                  marginBottom: "0.5rem"
                }}
              >
                Your Bag is Currently Empty
              </h4>
              <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                Select an heirloom drape from our archives or craft a custom piece in the Drape Studio.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
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
                Explore Curated Drapes
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.2rem",
                    borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "105px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid var(--muted-gold)"
                    }}
                  />

                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start"
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "var(--font-serif-display)",
                            fontSize: "0.98rem",
                            color: "var(--theme-heading-color)",
                            lineHeight: 1.25
                          }}
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          style={{ color: "var(--charcoal-muted)", padding: "0.2rem" }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ fontSize: "0.75rem", color: "var(--charcoal-muted)", marginTop: "0.2rem" }}>
                        Cut: {item.selectedSize}
                      </div>

                      {item.customNotes && (
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "var(--muted-gold-dark)",
                            fontStyle: "italic",
                            marginTop: "0.2rem"
                          }}
                        >
                          {item.customNotes}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0.6rem"
                      }}
                    >
                      {/* Quantity Modifier */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(185, 154, 91, 0.4)",
                          borderRadius: "16px",
                          backgroundColor: "var(--warm-ivory)"
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                          style={{ padding: "0.25rem 0.5rem", display: "flex" }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, padding: "0 0.4rem" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                          style={{ padding: "0.25rem 0.5rem", display: "flex" }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontFamily: "var(--font-serif-display)",
                          fontWeight: 700,
                          color: "var(--burgundy)"
                        }}
                      >
                        {formatPrice(item.priceUSD * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Checkout Actions & Order Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "1.4rem 1.8rem",
              backgroundColor: "var(--warm-ivory)",
              borderTop: "1px solid rgba(185, 154, 91, 0.3)"
            }}
          >
            {/* Heirloom Gift Packaging Toggle */}
            <div
              onClick={() => setIsGiftBoxSelected(!isGiftBoxSelected)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.7rem 0.9rem",
                borderRadius: "10px",
                backgroundColor: isGiftBoxSelected ? "rgba(109, 31, 50, 0.08)" : "var(--warm-ivory-light)",
                border: isGiftBoxSelected ? "1.5px solid var(--burgundy)" : "1px solid var(--warm-ivory-border)",
                marginBottom: "1rem",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <Gift size={20} color="var(--burgundy)" />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--charcoal)" }}>
                  Royal Velvet Heirloom Presentation Box
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--charcoal-muted)" }}>
                  Acid-free muslin wrap & 24K gold wax seal (+{formatPrice(35)})
                </div>
              </div>
              <input
                type="checkbox"
                checked={isGiftBoxSelected}
                onChange={() => {}}
                style={{ accentColor: "var(--burgundy)" }}
              />
            </div>

            {/* Privilege Coupon Input */}
            <div style={{ marginBottom: "1rem" }}>
              {appliedCoupon ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.85rem",
                    borderRadius: "8px",
                    backgroundColor: "rgba(43, 99, 56, 0.1)",
                    border: "1px solid #2B6338"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "#2B6338", fontWeight: 600 }}>
                    <Tag size={14} />
                    <span>Passkey {appliedCoupon.code}: {appliedCoupon.label}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ fontSize: "0.72rem", color: "var(--burgundy)", fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter passkey (e.g. ROYAL10)"
                    style={{
                      flex: 1,
                      padding: "0.5rem 0.8rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(185, 154, 91, 0.4)",
                      fontSize: "0.8rem",
                      outline: "none",
                      backgroundColor: "var(--warm-ivory-light)",
                      textTransform: "uppercase"
                    }}
                  />
                  <button
                    onClick={() => applyCoupon()}
                    style={{
                      padding: "0.5rem 0.9rem",
                      backgroundColor: "var(--burgundy)",
                      color: "var(--warm-ivory)",
                      borderRadius: "8px",
                      fontSize: "0.78rem",
                      fontWeight: 600
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <span style={{ fontSize: "0.72rem", color: "#C02C2C", display: "block", marginTop: "0.2rem" }}>
                  {couponError}
                </span>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.82rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--charcoal-soft)" }}>Subtotal</span>
                <span>{formatPrice(rawSubtotalUSD)}</span>
              </div>
              {giftBoxUSD > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--charcoal-soft)" }}>Heirloom Presentation Box</span>
                  <span>{formatPrice(giftBoxUSD)}</span>
                </div>
              )}
              {discountUSD > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#2B6338" }}>
                  <span>Royal Privilege Discount</span>
                  <span>-{formatPrice(discountUSD)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--charcoal-soft)" }}>Royal Armored Delivery</span>
                <span>{shippingUSD === 0 ? "Complimentary" : formatPrice(shippingUSD)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.18rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-serif-display)",
                  color: "var(--burgundy)",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid rgba(185, 154, 91, 0.3)"
                }}
              >
                <span>Total Investment</span>
                <span>{formatPrice(finalTotalUSD)}</span>
              </div>
            </div>

            {/* Checkout Action CTA */}
            <button
              onClick={processCheckout}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "30px",
                backgroundColor: "var(--burgundy)",
                color: "var(--warm-ivory)",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                boxShadow: "var(--shadow-burgundy)"
              }}
              className="gold-shimmer-btn"
            >
              <span>Authorize Royal Checkout</span>
              <ArrowRight size={17} color="var(--muted-gold-light)" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
