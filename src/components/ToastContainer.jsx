import React from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        pointerEvents: "none"
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: "auto",
            backgroundColor: "var(--charcoal-bg)",
            color: "var(--warm-ivory)",
            border: "1.5px solid var(--muted-gold)",
            borderRadius: "14px",
            padding: "0.85rem 1.25rem",
            boxShadow: "0 12px 30px rgba(0,0,0,0.4), 0 0 20px rgba(185, 154, 91, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.85rem",
            maxWidth: "380px",
            animation: "fadeInScale 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {toast.type === "error" ? (
            <AlertCircle size={18} color="#E05252" flexShrink={0} />
          ) : toast.type === "info" ? (
            <Info size={18} color="var(--muted-gold)" flexShrink={0} />
          ) : (
            <Sparkles size={18} color="var(--muted-gold-light)" flexShrink={0} />
          )}

          <div style={{ lineHeight: 1.35 }}>{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
