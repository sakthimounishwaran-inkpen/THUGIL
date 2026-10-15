import React from "react";
import { useShop } from "../context/ShopContext";
import { CheckCircle, Sparkles, X, Package, ShieldCheck, Download } from "lucide-react";

export default function OrderConfirmationModal() {
  const { isOrderPlaced, setIsOrderPlaced, lastOrderInfo } = useShop();

  if (!isOrderPlaced || !lastOrderInfo) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(41, 38, 38, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 250,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeInScale 0.3s ease"
      }}
      onClick={() => setIsOrderPlaced(false)}
    >
      <div
        style={{
          backgroundColor: "var(--warm-ivory-light)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2.8rem 2.2rem",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 50px rgba(185, 154, 91, 0.35)",
          border: "2px solid var(--muted-gold)",
          textAlign: "center",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOrderPlaced(false)}
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
            color: "var(--charcoal)"
          }}
          aria-label="Close confirmation"
        >
          <X size={20} />
        </button>

        {/* Brand Stamp */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "rgba(109, 31, 50, 0.1)",
            border: "2px solid var(--muted-gold)",
            margin: "0 auto 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-gold)"
          }}
          className="animate-glow"
        >
          <Sparkles size={32} color="var(--burgundy)" />
        </div>

        <div
          style={{
            fontFamily: "var(--font-serif-royal)",
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted-gold-dark)",
            fontWeight: 700,
            marginBottom: "0.3rem"
          }}
        >
          Royal Commission Confirmed
        </div>

        <h2
          style={{
            fontFamily: "var(--font-serif-display)",
            fontSize: "2.1rem",
            color: "var(--burgundy)",
            lineHeight: 1.15,
            marginBottom: "0.6rem"
          }}
        >
          Gratitude from the Loom
        </h2>

        <p style={{ fontSize: "0.95rem", color: "var(--charcoal-soft)", marginBottom: "1.8rem" }}>
          Your order has been officially registered with the THUGIL Master Guild. Your bespoke
          heirloom pieces are now entering meticulous inspection, muslin packaging, and sealed courier transit.
        </p>

        {/* Order Details Card */}
        <div
          style={{
            backgroundColor: "var(--warm-ivory)",
            border: "1px solid rgba(185, 154, 91, 0.35)",
            borderRadius: "14px",
            padding: "1.2rem 1.5rem",
            textAlign: "left",
            fontSize: "0.85rem",
            marginBottom: "1.8rem"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ color: "var(--charcoal-muted)" }}>Order Reference:</span>
            <strong style={{ color: "var(--burgundy)", fontFamily: "var(--font-serif-royal)" }}>
              {lastOrderInfo.orderNumber}
            </strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ color: "var(--charcoal-muted)" }}>Date of Commission:</span>
            <span>{lastOrderInfo.date}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
            <span style={{ color: "var(--charcoal-muted)" }}>Courier Service:</span>
            <span style={{ color: "var(--charcoal)" }}>{lastOrderInfo.shippingMethod}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "0.6rem",
              borderTop: "1px solid rgba(185, 154, 91, 0.25)",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--burgundy)",
              fontFamily: "var(--font-serif-display)"
            }}
          >
            <span>Authorized Total:</span>
            <span>{lastOrderInfo.totalFormatted}</span>
          </div>
        </div>

        {/* Security & Authenticity Guarantee */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.78rem",
            color: "var(--muted-gold-dark)",
            marginBottom: "2rem"
          }}
        >
          <ShieldCheck size={16} />
          <span>Includes Physical Silk Mark Holographic Certificate & Care Parchment</span>
        </div>

        <button
          onClick={() => setIsOrderPlaced(false)}
          style={{
            backgroundColor: "var(--burgundy)",
            color: "var(--warm-ivory)",
            padding: "0.9rem 2.2rem",
            borderRadius: "28px",
            fontSize: "0.88rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            boxShadow: "var(--shadow-burgundy)"
          }}
          className="gold-shimmer-btn"
        >
          Return to Royal Archives
        </button>
      </div>
    </div>
  );
}
