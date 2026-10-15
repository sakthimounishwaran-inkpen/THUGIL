import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";
import { tryOnService } from "../services/tryOnService";
import { PRODUCTS } from "../data/products";
import FloatingAITryOnButton from "./FloatingAITryOnButton";
import thugilLogo from "../assets/thugil.png";
import {
  Sparkles,
  Upload,
  X,
  Check,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Download,
  RefreshCw,
  Eye,
  ShieldCheck,
  Heart,
  Layers,
  ChevronRight,
  Info,
  Sliders,
  Copy,
  ExternalLink,
  Shield,
  Clock
} from "lucide-react";

export default function AITrialRoomModal() {
  const {
    isAITrialRoomOpen,
    setIsAITrialRoomOpen,
    setIsAIAdminOpen,
    aiTrialCredits,
    setAiTrialCredits,
    activeTryOnGarment,
    setActiveTryOnGarment,
    wishlist,
    formatPrice,
    addToCart,
    setQuickViewProduct,
    showToast
  } = useShop();

  // Photo & Garment Selection
  const [userPhoto, setUserPhoto] = useState("/images/model_preset_female.jpg");
  const [userPhotoName, setUserPhotoName] = useState("Royal Patron Preset (Priya)");
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [selectedGarmentSize, setSelectedGarmentSize] = useState("Standard Royal Cut");

  // Drag and Drop States
  const [isOutfitDragOver, setIsOutfitDragOver] = useState(false);
  const [isPhotoDragOver, setIsPhotoDragOver] = useState(false);

  // Wardrobe Panel Tabs & Filtering
  const [wardrobeTab, setWardrobeTab] = useState("wishlist"); // "wishlist" | "catalog"
  const [catalogDepartment, setCatalogDepartment] = useState("All");
  const [catalogSearch, setCatalogSearch] = useState("");

  // AI Inference & Generation States
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [errorNotice, setErrorNotice] = useState(null);

  // VIP Lead Access Request Form States
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    mobile: "",
    email: "",
    preferredCategory: "Women's Wear",
    consentGiven: false
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccessInfo, setLeadSuccessInfo] = useState(null);

  // File Input Ref
  const fileInputRef = useRef(null);

  // Sync with activeTryOnGarment from external triggers (e.g., from ProductCard or QuickView)
  useEffect(() => {
    if (activeTryOnGarment) {
      setSelectedGarment(activeTryOnGarment);
      if (activeTryOnGarment.sizes && activeTryOnGarment.sizes.length > 0) {
        setSelectedGarmentSize(activeTryOnGarment.sizes[0]);
      }
    }
  }, [activeTryOnGarment]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAITrialRoomOpen) {
        setIsAITrialRoomOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAITrialRoomOpen, setIsAITrialRoomOpen]);

  // Model Presets
  const modelPresets = [
    {
      id: "female-priya",
      name: "Priya (Saree & Couture)",
      label: "Royal Lady",
      image: "/images/model_preset_female.jpg",
      gender: "Women's Wear"
    },
    {
      id: "male-vikram",
      name: "Vikram (Kurta & Suits)",
      label: "Royal Gentleman",
      image: "/images/model_preset_male.jpg",
      gender: "Men's Wear"
    },
    {
      id: "kids-ananya",
      name: "Ananya (Silk & Festive)",
      label: "Young Princess",
      image: "/images/model_preset_kids.jpg",
      gender: "Kids' Wear"
    }
  ];

  // Map wishlist IDs to product objects
  const wishlistProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  // Filter Catalog
  const filteredCatalogProducts = PRODUCTS.filter((item) => {
    const matchesDept =
      catalogDepartment === "All" ||
      (catalogDepartment === "Traditional Wear"
        ? item.category?.toLowerCase().includes("saree") ||
          item.subcategory?.toLowerCase().includes("saree") ||
          item.subcategory?.toLowerCase().includes("lehenga") ||
          item.subcategory?.toLowerCase().includes("kurta") ||
          item.subcategory?.toLowerCase().includes("veshti")
        : catalogDepartment === "Western Wear"
        ? item.category?.toLowerCase().includes("western") ||
          item.subcategory?.toLowerCase().includes("gown") ||
          item.subcategory?.toLowerCase().includes("blazer") ||
          item.subcategory?.toLowerCase().includes("suit")
        : item.departmentId === catalogDepartment);

    const matchesSearch =
      !catalogSearch ||
      item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      (item.subcategory && item.subcategory.toLowerCase().includes(catalogSearch.toLowerCase()));

    return matchesDept && matchesSearch;
  });

  // Handle patron photo upload via FileReader
  const handlePhotoFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file (JPG, PNG, or WEBP).", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserPhoto(e.target.result);
      setUserPhotoName(file.name);
      setTryOnResult(null);
      setErrorNotice(null);
      showToast("Patron photograph loaded successfully.", "info");
    };
    reader.readAsDataURL(file);
  };

  // Drag & drop handlers for outfit slot
  const handleOutfitDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsOutfitDragOver(true);
  };

  const handleOutfitDragLeave = () => {
    setIsOutfitDragOver(false);
  };

  const handleOutfitDrop = (e) => {
    e.preventDefault();
    setIsOutfitDragOver(false);
    try {
      const dataStr = e.dataTransfer.getData("application/json") || e.dataTransfer.getData("text/plain");
      if (dataStr) {
        const product = JSON.parse(dataStr);
        if (product && product.id) {
          selectGarment(product);
          showToast(`Selected "${product.name}" for virtual try-on!`, "success");
        }
      }
    } catch (err) {
      console.warn("Could not parse dropped outfit:", err);
    }
  };

  const selectGarment = (product) => {
    setSelectedGarment(product);
    setActiveTryOnGarment(product);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedGarmentSize(product.sizes[0]);
    }
    setTryOnResult(null);
    setErrorNotice(null);
  };

  // Execute AI Virtual Try-On
  const handleProceedTryOn = async () => {
    if (!userPhoto) {
      showToast("Please upload or select a patron photo first.", "info");
      return;
    }
    if (!selectedGarment) {
      showToast("Please drag or select an outfit to try on.", "info");
      return;
    }
    if (aiTrialCredits <= 0) {
      setShowLeadForm(true);
      showToast("Free trial limit reached. Please submit a VIP access request.", "info");
      return;
    }

    setIsProcessing(true);
    setErrorNotice(null);
    setTryOnResult(null);
    setProcessingStage(1);

    // Progressive visual steps
    const stepInterval = setInterval(() => {
      setProcessingStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1800);

    try {
      const res = await tryOnService.processTryOn({
        userImage: userPhoto,
        garmentImage: selectedGarment.image,
        garmentId: selectedGarment.id,
        garmentName: selectedGarment.name,
        category: selectedGarment.category || selectedGarment.subcategory
      });

      clearInterval(stepInterval);
      setIsProcessing(false);

      if (res.success && res.resultImageUrl) {
        setTryOnResult(res);
        if (typeof res.trialsRemaining === "number") {
          setAiTrialCredits(res.trialsRemaining);
        }
        showToast("Royal AI Fitting successfully rendered!", "success");
      } else if (res.status === 503 || res.error === "AI_CREDENTIALS_MISSING") {
        setErrorNotice({
          type: "credentials_missing",
          title: "AI Virtual Try-On Engine Ready",
          message:
            "The THUGIL AI Virtual Trial Room backend pipeline is completely installed and operational. To enable real neural inference, provide your external AI Provider credentials in your environment file.",
          setupInstructions: res.setupInstructions || "Add FASHN_API_KEY or REPLICATE_API_TOKEN to your .env file."
        });
      } else if (res.status === 403 || res.error === "TRIAL_LIMIT_EXCEEDED") {
        setAiTrialCredits(0);
        setShowLeadForm(true);
      } else {
        setErrorNotice({
          type: "error",
          title: "AI Generation Notice",
          message: res.message || res.error || "The AI virtual try-on engine could not process the request."
        });
      }
    } catch (err) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setErrorNotice({
        type: "error",
        title: "Connection Notice",
        message: err.message || "Unable to reach the virtual trial room service. Please ensure the server is running."
      });
    }
  };

  // Submit VIP Access Request
  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.mobile || !leadForm.email) {
      showToast("Please fill in your name, mobile number, and email.", "error");
      return;
    }
    if (!leadForm.consentGiven) {
      showToast("Please check the consent box to process your VIP trial access.", "error");
      return;
    }

    setIsSubmittingLead(true);
    try {
      const res = await tryOnService.requestAccess(leadForm);
      setIsSubmittingLead(false);
      if (res.success) {
        setLeadSuccessInfo(res);
        showToast("VIP Access Request submitted successfully!", "success");
      } else {
        showToast(res.error || "Submission failed. Please try again.", "error");
      }
    } catch (err) {
      setIsSubmittingLead(false);
      showToast(err.message || "Network error submitting VIP request.", "error");
    }
  };

  const handleDownloadResult = () => {
    if (!tryOnResult?.resultImageUrl) return;
    const a = document.createElement("a");
    a.href = tryOnResult.resultImageUrl;
    a.download = `THUGIL_Royal_Fitting_${selectedGarment?.name?.replace(/\s+/g, "_") || "Couture"}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Downloaded high-resolution AI fitting result.", "success");
  };

  const handleAddToCartFromResult = () => {
    if (!selectedGarment) return;
    addToCart(selectedGarment, selectedGarmentSize, 1);
    showToast(`Added ${selectedGarment.name} (${selectedGarmentSize}) to your bag!`, "success");
  };

  return (
    <>
      {/* ===================================================================
          1. OFFICIAL FLOATING "AI TRY-ON" BUTTON (Bottom Right)
          =================================================================== */}
      <FloatingAITryOnButton
        onClick={() => {
          setIsAITrialRoomOpen(true);
          setErrorNotice(null);
        }}
      />

      {/* ===================================================================
          2. VIRTUAL DRESSING ROOM POPUP (MODAL)
          =================================================================== */}
      {isAITrialRoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-trial-title"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(18, 14, 15, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem"
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAITrialRoomOpen(false);
          }}
        >
          <div
            className="ai-tryon-modal-container"
            style={{
              width: "100%",
              maxWidth: "1280px",
              height: "92vh",
              maxHeight: "920px",
              backgroundColor: "var(--theme-bg-elevated)",
              border: "1.5px solid var(--muted-gold)",
              borderRadius: "20px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(185, 154, 91, 0.35)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {/* ----------------- MODAL HEADER ----------------- */}
            <div
              style={{
                padding: "1rem 1.6rem",
                backgroundColor: "var(--burgundy)",
                borderBottom: "1.5px solid var(--muted-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                color: "#FAF5EB"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#FAF5EB",
                    border: "1.5px solid var(--muted-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={thugilLogo || "/thugil.png"}
                    alt="THUGIL AI"
                    style={{ width: "26px", height: "26px", objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h2
                      id="ai-trial-title"
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif-royal)",
                        fontSize: "1.15rem",
                        letterSpacing: "0.08em",
                        color: "var(--warm-ivory)",
                        fontWeight: 700
                      }}
                    >
                      THUGIL AI VIRTUAL TRIAL ROOM
                    </h2>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        backgroundColor: "rgba(185, 154, 91, 0.25)",
                        border: "1px solid var(--muted-gold)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "8px",
                        fontWeight: 600,
                        color: "var(--muted-gold-light)"
                      }}
                    >
                      Imperial Fitting Suite
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "0.15rem 0 0",
                      fontSize: "0.78rem",
                      color: "rgba(250, 245, 235, 0.8)",
                      letterSpacing: "0.02em"
                    }}
                  >
                    Drag & drop luxury garments from your wardrobe onto your silhouette for instant neural fitting
                  </p>
                </div>
              </div>

              {/* Header Right Badges & Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                {/* Trial Credits Chip */}
                <div
                  style={{
                    backgroundColor: "rgba(24, 21, 21, 0.6)",
                    border: "1px solid var(--muted-gold)",
                    borderRadius: "18px",
                    padding: "0.35rem 0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    fontSize: "0.76rem"
                  }}
                >
                  <span style={{ color: "var(--muted-gold-light)", fontWeight: 700 }}>
                    {aiTrialCredits > 0 ? `✦ ${aiTrialCredits}/2 Free Trials Available` : "✦ Free Trials Exhausted"}
                  </span>
                  {aiTrialCredits === 0 && (
                    <button
                      onClick={() => setShowLeadForm(true)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--warm-ivory)",
                        textDecoration: "underline",
                        fontSize: "0.72rem",
                        cursor: "pointer",
                        fontWeight: 600
                      }}
                    >
                      Request VIP Access
                    </button>
                  )}
                </div>

                {/* Staff Admin Portal Trigger */}
                <button
                  onClick={() => setIsAIAdminOpen(true)}
                  title="Atelier Staff Management Portal"
                  style={{
                    backgroundColor: "rgba(24, 21, 21, 0.4)",
                    border: "1px solid rgba(185, 154, 91, 0.4)",
                    color: "var(--muted-gold-light)",
                    borderRadius: "50%",
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  className="hover:scale-105"
                >
                  <Shield size={16} />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsAITrialRoomOpen(false)}
                  aria-label="Close Virtual Trial Room"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFF",
                    borderRadius: "50%",
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ----------------- MODAL BODY: 2-COLUMN LUXURY WORKSPACE ----------------- */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.95fr",
                flexGrow: 1,
                overflow: "hidden"
              }}
              className="ai-tryon-grid-columns"
            >
              {/* ==============================================================
                  LEFT PANEL: CUSTOMER DRESSING CANVAS & PREVIEW
                  ============================================================== */}
              <div
                style={{
                  padding: "1.4rem",
                  overflowY: "auto",
                  borderRight: "1px solid rgba(185, 154, 91, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  backgroundColor: "var(--theme-bg-main)"
                }}
              >
                {/* NOTICE BANNER (Missing AI Credentials or Error) */}
                {errorNotice && (
                  <div
                    style={{
                      backgroundColor:
                        errorNotice.type === "credentials_missing" ? "rgba(185, 154, 91, 0.12)" : "rgba(109, 31, 50, 0.14)",
                      border: `1.5px solid ${errorNotice.type === "credentials_missing" ? "var(--muted-gold)" : "var(--burgundy)"}`,
                      borderRadius: "14px",
                      padding: "1.1rem 1.25rem",
                      position: "relative"
                    }}
                  >
                    <button
                      onClick={() => setErrorNotice(null)}
                      style={{
                        position: "absolute",
                        top: "0.8rem",
                        right: "0.8rem",
                        background: "none",
                        border: "none",
                        color: "var(--theme-text-muted)",
                        cursor: "pointer"
                      }}
                    >
                      <X size={15} />
                    </button>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <AlertCircle
                        size={20}
                        color={errorNotice.type === "credentials_missing" ? "var(--muted-gold-dark)" : "var(--burgundy)"}
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <div>
                        <h4
                          style={{
                            margin: "0 0 0.3rem",
                            fontSize: "0.92rem",
                            fontFamily: "var(--font-serif-royal)",
                            color: "var(--theme-heading-color)",
                            fontWeight: 700
                          }}
                        >
                          {errorNotice.title}
                        </h4>
                        <p
                          style={{
                            margin: "0 0 0.6rem",
                            fontSize: "0.8rem",
                            lineHeight: 1.5,
                            color: "var(--theme-text-body)"
                          }}
                        >
                          {errorNotice.message}
                        </p>

                        {errorNotice.setupInstructions && (
                          <div
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.35)",
                              border: "1px dashed rgba(185, 154, 91, 0.4)",
                              borderRadius: "8px",
                              padding: "0.6rem 0.8rem",
                              fontFamily: "monospace",
                              fontSize: "0.75rem",
                              color: "var(--muted-gold-light)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <span>FASHN_API_KEY=your_key or REPLICATE_API_TOKEN=your_token</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText("FASHN_API_KEY=\nREPLICATE_API_TOKEN=");
                                showToast("Copied environment template to clipboard!", "info");
                              }}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--warm-ivory)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontSize: "0.72rem"
                              }}
                            >
                              <Copy size={13} /> Copy
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* VIP ACCESS REQUEST DIALOG OVERLAY */}
                {showLeadForm && (
                  <div
                    style={{
                      backgroundColor: "var(--theme-bg-card)",
                      border: "1.5px solid var(--muted-gold)",
                      borderRadius: "16px",
                      padding: "1.3rem",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                      animation: "fadeIn 0.25s ease"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.75rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ShieldCheck size={18} color="var(--muted-gold)" />
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-serif-royal)",
                            fontSize: "1rem",
                            color: "var(--theme-heading-color)"
                          }}
                        >
                          VIP Trial Room Access Request
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowLeadForm(false)}
                        style={{ background: "none", border: "none", color: "var(--theme-text-muted)", cursor: "pointer" }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {leadSuccessInfo ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "1.5rem 1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.75rem"
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(52, 102, 67, 0.15)",
                            border: "1.5px solid #346643",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Check size={24} color="#346643" />
                        </div>
                        <h4 style={{ margin: 0, fontFamily: "var(--font-serif-royal)", fontSize: "1.05rem" }}>
                          VIP Request Registered Successfully
                        </h4>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            color: "var(--theme-text-muted)",
                            maxWidth: "400px",
                            margin: 0,
                            lineHeight: 1.5
                          }}
                        >
                          {leadSuccessInfo.message} (Reference ID:{" "}
                          <strong style={{ color: "var(--muted-gold-dark)" }}>{leadSuccessInfo.requestId}</strong>)
                        </p>
                        <div
                          style={{
                            marginTop: "0.5rem",
                            display: "flex",
                            gap: "0.75rem"
                          }}
                        >
                          <button
                            onClick={() => {
                              setLeadSuccessInfo(null);
                              setShowLeadForm(false);
                            }}
                            style={{
                              backgroundColor: "var(--burgundy)",
                              color: "#FAF5EB",
                              border: "1px solid var(--muted-gold)",
                              borderRadius: "20px",
                              padding: "0.5rem 1.2rem",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer"
                            }}
                          >
                            Return to Trial Room
                          </button>
                          <button
                            onClick={() => setIsAIAdminOpen(true)}
                            style={{
                              backgroundColor: "transparent",
                              color: "var(--theme-heading-color)",
                              border: "1px solid var(--muted-gold)",
                              borderRadius: "20px",
                              padding: "0.5rem 1.2rem",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              cursor: "pointer"
                            }}
                          >
                            Open Atelier Staff Portal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitLead} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.8rem",
                            color: "var(--theme-text-muted)",
                            lineHeight: 1.45
                          }}
                        >
                          Complimentary trial limit reached (2 sessions). Provide your contact details to receive additional VIP AI trial credits approved by THUGIL Atelier staff.
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={leadForm.name}
                              onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                              placeholder="e.g. Radhika Sharma"
                              style={{
                                width: "100%",
                                padding: "0.55rem 0.75rem",
                                borderRadius: "8px",
                                border: "1px solid var(--theme-border)",
                                fontSize: "0.82rem",
                                boxSizing: "border-box"
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={leadForm.mobile}
                              onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })}
                              placeholder="+91 98765 43210"
                              style={{
                                width: "100%",
                                padding: "0.55rem 0.75rem",
                                borderRadius: "8px",
                                border: "1px solid var(--theme-border)",
                                fontSize: "0.82rem",
                                boxSizing: "border-box"
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "0.75rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={leadForm.email}
                              onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                              placeholder="patron@domain.com"
                              style={{
                                width: "100%",
                                padding: "0.55rem 0.75rem",
                                borderRadius: "8px",
                                border: "1px solid var(--theme-border)",
                                fontSize: "0.82rem",
                                boxSizing: "border-box"
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.74rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                              Preferred Wardrobe
                            </label>
                            <select
                              value={leadForm.preferredCategory}
                              onChange={(e) => setLeadForm({ ...leadForm, preferredCategory: e.target.value })}
                              style={{
                                width: "100%",
                                padding: "0.55rem 0.75rem",
                                borderRadius: "8px",
                                border: "1px solid var(--theme-border)",
                                fontSize: "0.82rem",
                                boxSizing: "border-box"
                              }}
                            >
                              <option value="Women's Wear">Women's Wear</option>
                              <option value="Men's Wear">Men's Wear</option>
                              <option value="Kids' Wear">Kids' Wear</option>
                              <option value="Traditional Wear">Traditional Silk</option>
                              <option value="Western Wear">Western Couture</option>
                            </select>
                          </div>
                        </div>

                        {/* Explicit Consent Checkbox */}
                        <label
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                            fontSize: "0.73rem",
                            color: "var(--theme-text-body)",
                            cursor: "pointer",
                            lineHeight: 1.4,
                            marginTop: "0.2rem"
                          }}
                        >
                          <input
                            type="checkbox"
                            required
                            checked={leadForm.consentGiven}
                            onChange={(e) => setLeadForm({ ...leadForm, consentGiven: e.target.checked })}
                            style={{ marginTop: "2px" }}
                          />
                          <span>
                            I explicitly consent to THUGIL Atelier collecting and processing my contact details to grant additional AI trial credits, contact me regarding royal styling, and manage my VIP access under data privacy standards.
                          </span>
                        </label>

                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          style={{
                            backgroundColor: "var(--burgundy)",
                            color: "#FAF5EB",
                            border: "1.5px solid var(--muted-gold)",
                            borderRadius: "22px",
                            padding: "0.65rem 1.4rem",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            cursor: isSubmittingLead ? "not-allowed" : "pointer",
                            boxShadow: "0 4px 15px rgba(109, 31, 50, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            marginTop: "0.3rem"
                          }}
                        >
                          {isSubmittingLead ? (
                            <>
                              <RefreshCw size={14} className="animate-spin" />
                              <span>Submitting VIP Request...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles size={14} color="var(--muted-gold-light)" />
                              <span>Request Additional VIP Trial Credits</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* ----------------- STEP 1 & 2 DUAL INTERACTION CANVAS ----------------- */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.1rem"
                  }}
                  className="ai-tryon-dual-canvas"
                >
                  {/* LEFT: PATRON SILHOUETTE PHOTO CONTAINER */}
                  <div
                    style={{
                      backgroundColor: "var(--theme-bg-card)",
                      borderRadius: "16px",
                      border: "1px solid var(--theme-border)",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-serif-royal)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "var(--muted-gold-dark)",
                          letterSpacing: "0.06em"
                        }}
                      >
                        1. Patron Silhouette
                      </span>
                      {userPhoto && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--burgundy)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "underline"
                          }}
                        >
                          Change Photo
                        </button>
                      )}
                    </div>

                    {/* Image Preview Box or Empty Dropzone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsPhotoDragOver(true);
                      }}
                      onDragLeave={() => setIsPhotoDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsPhotoDragOver(false);
                        if (e.dataTransfer.files?.[0]) {
                          handlePhotoFile(e.dataTransfer.files[0]);
                        }
                      }}
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "3/4",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#F3EDE2",
                        border: isPhotoDragOver ? "2px dashed var(--burgundy)" : "1px solid rgba(185, 154, 91, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {userPhoto ? (
                        <>
                          <img
                            src={userPhoto}
                            alt="Patron Silhouette Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top center"
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: "0.5rem 0.75rem",
                              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                              color: "#FAF5EB",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between"
                            }}
                          >
                            <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                              {userPhotoName}
                            </span>
                            <span style={{ color: "var(--muted-gold-light)" }}>Ready</span>
                          </div>
                        </>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            textAlign: "center",
                            padding: "1rem",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem"
                          }}
                        >
                          <Upload size={28} color="var(--muted-gold-dark)" />
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--theme-heading-color)" }}>
                            Upload Full-Length Photo
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "var(--theme-text-muted)" }}>
                            Drag & drop or click to browse
                          </span>
                        </div>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files?.[0]) handlePhotoFile(e.target.files[0]);
                      }}
                    />

                    {/* Pre-set Royal Models Bar */}
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.68rem",
                          textTransform: "uppercase",
                          color: "var(--theme-text-muted)",
                          fontWeight: 700,
                          marginBottom: "0.4rem",
                          letterSpacing: "0.05em"
                        }}
                      >
                        Or Select Atelier Model Preset:
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
                        {modelPresets.map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => {
                              setUserPhoto(preset.image);
                              setUserPhotoName(preset.name);
                              setTryOnResult(null);
                              setErrorNotice(null);
                            }}
                            style={{
                              backgroundColor: userPhoto === preset.image ? "var(--burgundy)" : "var(--theme-bg-main)",
                              color: userPhoto === preset.image ? "#FAF5EB" : "var(--theme-text-body)",
                              border: `1px solid ${userPhoto === preset.image ? "var(--muted-gold)" : "var(--theme-border)"}`,
                              borderRadius: "8px",
                              padding: "0.35rem 0.2rem",
                              fontSize: "0.66rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              textAlign: "center",
                              transition: "all 0.2s ease"
                            }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: "DROP YOUR OUTFIT HERE" TARGET SLOT */}
                  <div
                    onDragOver={handleOutfitDragOver}
                    onDragLeave={handleOutfitDragLeave}
                    onDrop={handleOutfitDrop}
                    style={{
                      backgroundColor: isOutfitDragOver ? "rgba(109, 31, 50, 0.08)" : "var(--theme-bg-card)",
                      borderRadius: "16px",
                      border: isOutfitDragOver
                        ? "2px dashed var(--burgundy)"
                        : selectedGarment
                        ? "1.5px solid var(--muted-gold)"
                        : "2px dashed rgba(185, 154, 91, 0.45)",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.25s ease",
                      position: "relative"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-serif-royal)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "var(--muted-gold-dark)",
                          letterSpacing: "0.06em"
                        }}
                      >
                        2. Outfit Slot
                      </span>
                      {selectedGarment && (
                        <button
                          onClick={() => {
                            setSelectedGarment(null);
                            setActiveTryOnGarment(null);
                            setTryOnResult(null);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--burgundy)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "underline"
                          }}
                        >
                          Clear Outfit
                        </button>
                      )}
                    </div>

                    {/* Outfit Slot Content */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "3/4",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#F3EDE2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(185, 154, 91, 0.25)"
                      }}
                    >
                      {selectedGarment ? (
                        <>
                          <img
                            src={selectedGarment.image}
                            alt={selectedGarment.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "top center"
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: "0.6rem 0.75rem",
                              background: "linear-gradient(to top, rgba(18, 14, 15, 0.92), transparent)",
                              color: "#FAF5EB"
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-serif-royal)",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {selectedGarment.name}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: "0.2rem"
                              }}
                            >
                              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted-gold-light)" }}>
                                {formatPrice(selectedGarment.priceUSD)}
                              </span>
                              <span style={{ fontSize: "0.68rem", opacity: 0.85 }}>
                                {selectedGarment.subcategory || selectedGarment.category}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "1.2rem",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.6rem"
                          }}
                        >
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(185, 154, 91, 0.15)",
                              border: "1px solid var(--muted-gold)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Layers size={22} color="var(--muted-gold-dark)" />
                          </div>
                          <div>
                            <span
                              style={{
                                display: "block",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-serif-royal)",
                                color: "var(--theme-heading-color)"
                              }}
                            >
                              Drop Your Outfit Here
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: "0.72rem",
                                color: "var(--theme-text-muted)",
                                marginTop: "0.25rem",
                                lineHeight: 1.4
                              }}
                            >
                              Drag any piece from your wishlist or catalog on the right, or click "✦ Slot In"
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Size Selector for the Selected Garment */}
                    {selectedGarment && selectedGarment.sizes && (
                      <div>
                        <span
                          style={{
                            display: "block",
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            color: "var(--theme-text-muted)",
                            fontWeight: 700,
                            marginBottom: "0.35rem",
                            letterSpacing: "0.05em"
                          }}
                        >
                          Select Tailored Size:
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {selectedGarment.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedGarmentSize(s)}
                              style={{
                                backgroundColor: selectedGarmentSize === s ? "var(--burgundy)" : "transparent",
                                color: selectedGarmentSize === s ? "#FAF5EB" : "var(--theme-text-body)",
                                border: `1px solid ${selectedGarmentSize === s ? "var(--muted-gold)" : "var(--theme-border)"}`,
                                borderRadius: "6px",
                                padding: "0.2rem 0.55rem",
                                fontSize: "0.68rem",
                                fontWeight: 600,
                                cursor: "pointer"
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ----------------- STEP 3: PROCEED CTA OR PROCESSING STATE ----------------- */}
                {isProcessing ? (
                  <div
                    style={{
                      backgroundColor: "var(--theme-bg-card)",
                      border: "1.5px solid var(--muted-gold)",
                      borderRadius: "16px",
                      padding: "1.4rem",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.85rem",
                      boxShadow: "0 10px 30px rgba(109, 31, 50, 0.15)"
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <div
                        className="animate-spin"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          border: "3px solid rgba(185, 154, 91, 0.2)",
                          borderTopColor: "var(--burgundy)"
                        }}
                      />
                      <Sparkles size={24} color="var(--muted-gold)" />
                    </div>

                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontFamily: "var(--font-serif-royal)",
                          fontSize: "1.05rem",
                          color: "var(--theme-heading-color)"
                        }}
                      >
                        {processingStage === 1 && "1. Analyzing Patron Silhouette & Pose..."}
                        {processingStage === 2 && "2. Draping Silk Weave & Garment Contours..."}
                        {processingStage === 3 && "3. Synthesizing Neural AI Haute Couture Fit..."}
                        {processingStage >= 4 && "4. Rendering High-Definition Royal Result..."}
                      </h4>
                      <p
                        style={{
                          margin: "0.3rem 0 0",
                          fontSize: "0.78rem",
                          color: "var(--theme-text-muted)"
                        }}
                      >
                        Synthesizing true fabric physics, pleated drapes, and zari illumination...
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        width: "80%",
                        height: "4px",
                        backgroundColor: "rgba(185, 154, 91, 0.2)",
                        borderRadius: "4px",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${processingStage * 25}%`,
                          backgroundColor: "var(--burgundy)",
                          transition: "width 0.4s ease"
                        }}
                      />
                    </div>
                  </div>
                ) : tryOnResult?.resultImageUrl ? (
                  /* ----------------- AI TRY-ON SUCCESS RESULT VIEW ----------------- */
                  <div
                    style={{
                      backgroundColor: "var(--theme-bg-card)",
                      border: "1.5px solid var(--muted-gold)",
                      borderRadius: "16px",
                      padding: "1.2rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      boxShadow: "0 12px 35px rgba(109, 31, 50, 0.2)"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(52, 102, 67, 0.15)",
                            border: "1px solid #346643",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Check size={16} color="#346643" />
                        </div>
                        <h4
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-serif-royal)",
                            fontSize: "0.98rem",
                            color: "var(--theme-heading-color)"
                          }}
                        >
                          AI Royal Fitting Completed
                        </h4>
                      </div>

                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--muted-gold-dark)",
                          fontWeight: 700
                        }}
                      >
                        ✦ {aiTrialCredits} Free Trials Remaining
                      </span>
                    </div>

                    {/* Result Output Image with Comparison */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "3/4",
                        maxHeight: "440px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#181515"
                      }}
                    >
                      <img
                        src={tryOnResult.resultImageUrl}
                        alt="Royal AI Virtual Fitting Result"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center"
                        }}
                      />

                      <div
                        style={{
                          position: "absolute",
                          top: "0.75rem",
                          right: "0.75rem",
                          backgroundColor: "rgba(18, 14, 15, 0.8)",
                          backdropFilter: "blur(6px)",
                          border: "1px solid var(--muted-gold)",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "14px",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          color: "var(--muted-gold-light)",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase"
                        }}
                      >
                        THUGIL Neural Drape
                      </div>
                    </div>

                    {/* Result Action Buttons (Try Another Outfit, Change Photo, Download, View Product, Add to Bag) */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                        gap: "0.6rem"
                      }}
                    >
                      <button
                        onClick={() => {
                          setTryOnResult(null);
                          setSelectedGarment(null);
                          setActiveTryOnGarment(null);
                          setWardrobeTab("wishlist");
                        }}
                        style={{
                          backgroundColor: "var(--theme-bg-main)",
                          color: "var(--theme-text-body)",
                          border: "1px solid var(--theme-border)",
                          borderRadius: "12px",
                          padding: "0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem"
                        }}
                      >
                        <RefreshCw size={14} />
                        <span>Try Another Outfit</span>
                      </button>

                      <button
                        onClick={() => {
                          setTryOnResult(null);
                          fileInputRef.current?.click();
                        }}
                        style={{
                          backgroundColor: "var(--theme-bg-main)",
                          color: "var(--theme-text-body)",
                          border: "1px solid var(--theme-border)",
                          borderRadius: "12px",
                          padding: "0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem"
                        }}
                      >
                        <Upload size={14} />
                        <span>Change Photo</span>
                      </button>

                      <button
                        onClick={handleDownloadResult}
                        style={{
                          backgroundColor: "var(--theme-bg-main)",
                          color: "var(--theme-text-body)",
                          border: "1px solid var(--muted-gold)",
                          borderRadius: "12px",
                          padding: "0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem"
                        }}
                      >
                        <Download size={14} color="var(--muted-gold-dark)" />
                        <span>Download Result</span>
                      </button>

                      <button
                        onClick={() => {
                          if (selectedGarment) setQuickViewProduct(selectedGarment);
                        }}
                        style={{
                          backgroundColor: "var(--theme-bg-main)",
                          color: "var(--theme-text-body)",
                          border: "1px solid var(--theme-border)",
                          borderRadius: "12px",
                          padding: "0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem"
                        }}
                      >
                        <Eye size={14} />
                        <span>View Product</span>
                      </button>

                      <button
                        onClick={handleAddToCartFromResult}
                        style={{
                          backgroundColor: "var(--burgundy)",
                          color: "#FAF5EB",
                          border: "1px solid var(--muted-gold)",
                          borderRadius: "12px",
                          padding: "0.6rem",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.35rem",
                          gridColumn: "1 / -1"
                        }}
                        className="gold-shimmer-btn"
                      >
                        <ShoppingBag size={15} color="var(--muted-gold-light)" />
                        <span>Add Draped Outfit to Bag ({formatPrice(selectedGarment?.priceUSD || 0)})</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* PROCEED BUTTON */
                  <div>
                    <button
                      onClick={handleProceedTryOn}
                      disabled={!userPhoto || !selectedGarment}
                      style={{
                        width: "100%",
                        backgroundColor: !userPhoto || !selectedGarment ? "rgba(109, 31, 50, 0.45)" : "var(--burgundy)",
                        color: "#FAF5EB",
                        border: "1.5px solid var(--muted-gold)",
                        borderRadius: "30px",
                        padding: "0.95rem 1.6rem",
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: !userPhoto || !selectedGarment ? "not-allowed" : "pointer",
                        boxShadow:
                          !userPhoto || !selectedGarment
                            ? "none"
                            : "0 10px 25px rgba(109, 31, 50, 0.4), 0 0 15px rgba(185, 154, 91, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.7rem",
                        transition: "all 0.3s ease"
                      }}
                      className={userPhoto && selectedGarment ? "gold-shimmer-btn" : ""}
                    >
                      <Sparkles size={18} color="var(--muted-gold-light)" />
                      <span>
                        PROCEED TO AI TRY-ON{" "}
                        {aiTrialCredits > 0 ? `(${aiTrialCredits} Free Try-On${aiTrialCredits === 1 ? "" : "s"} Left)` : "(VIP Access Required)"}
                      </span>
                      <ArrowRight size={18} />
                    </button>

                    {(!userPhoto || !selectedGarment) && (
                      <p
                        style={{
                          margin: "0.5rem 0 0",
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "var(--theme-text-muted)"
                        }}
                      >
                        {!userPhoto && !selectedGarment
                          ? "Select a patron silhouette photo and an outfit from the right to enable try-on."
                          : !userPhoto
                          ? "Upload or choose a patron photo on the left."
                          : "Drop or select an outfit from your wardrobe on the right."}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ==============================================================
                  RIGHT PANEL: WARDROBE (WISHLIST & CATALOG BROWSER)
                  ============================================================== */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "var(--theme-bg-card)",
                  overflow: "hidden"
                }}
              >
                {/* WARDROBE TABS (Wishlist vs Catalog) */}
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid var(--theme-border)",
                    backgroundColor: "var(--theme-bg-elevated)"
                  }}
                >
                  <button
                    onClick={() => setWardrobeTab("wishlist")}
                    style={{
                      flex: 1,
                      padding: "0.85rem 1rem",
                      backgroundColor: wardrobeTab === "wishlist" ? "var(--theme-bg-card)" : "transparent",
                      color: wardrobeTab === "wishlist" ? "var(--burgundy)" : "var(--theme-text-muted)",
                      border: "none",
                      borderBottom: wardrobeTab === "wishlist" ? "2.5px solid var(--burgundy)" : "2.5px solid transparent",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif-royal)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.45rem",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Heart size={15} color={wardrobeTab === "wishlist" ? "var(--burgundy)" : "currentColor"} />
                    <span>Wishlist Wardrobe ({wishlistProducts.length})</span>
                  </button>

                  <button
                    onClick={() => setWardrobeTab("catalog")}
                    style={{
                      flex: 1,
                      padding: "0.85rem 1rem",
                      backgroundColor: wardrobeTab === "catalog" ? "var(--theme-bg-card)" : "transparent",
                      color: wardrobeTab === "catalog" ? "var(--burgundy)" : "var(--theme-text-muted)",
                      border: "none",
                      borderBottom: wardrobeTab === "catalog" ? "2.5px solid var(--burgundy)" : "2.5px solid transparent",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif-royal)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.45rem",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Layers size={15} />
                    <span>Explore Catalog</span>
                  </button>
                </div>

                {/* TAB 1: WISHLIST WARDROBE CONTENT */}
                {wardrobeTab === "wishlist" && (
                  <div
                    style={{
                      padding: "1rem",
                      overflowY: "auto",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem"
                    }}
                  >
                    {wishlistProducts.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "3rem 1.5rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.85rem",
                          margin: "auto"
                        }}
                      >
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(109, 31, 50, 0.08)",
                            border: "1px dashed var(--muted-gold)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Heart size={26} color="var(--muted-gold-dark)" />
                        </div>
                        <h4
                          style={{
                            margin: 0,
                            fontFamily: "var(--font-serif-royal)",
                            fontSize: "1rem",
                            color: "var(--theme-heading-color)"
                          }}
                        >
                          Your Wishlist is Empty
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.78rem",
                            color: "var(--theme-text-muted)",
                            lineHeight: 1.5,
                            maxWidth: "280px"
                          }}
                        >
                          Save pieces to your Wishlist using the heart icon on any product, or browse our Imperial Catalog right now.
                        </p>
                        <button
                          onClick={() => setWardrobeTab("catalog")}
                          style={{
                            backgroundColor: "var(--burgundy)",
                            color: "#FAF5EB",
                            border: "1px solid var(--muted-gold)",
                            borderRadius: "20px",
                            padding: "0.5rem 1.2rem",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            marginTop: "0.3rem"
                          }}
                        >
                          Browse Catalog Pieces
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingBottom: "0.4rem"
                          }}
                        >
                          <span style={{ fontSize: "0.74rem", color: "var(--theme-text-muted)" }}>
                            Drag items or click <strong>Slot In</strong> to drape
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "var(--muted-gold-dark)", fontWeight: 700 }}>
                            {wishlistProducts.length} Saved Piece{wishlistProducts.length === 1 ? "" : "s"}
                          </span>
                        </div>

                        {wishlistProducts.map((product) => {
                          const isSelected = selectedGarment?.id === product.id;
                          return (
                            <div
                              key={product.id}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData("application/json", JSON.stringify(product));
                                e.dataTransfer.setData("text/plain", JSON.stringify(product));
                              }}
                              onClick={() => selectGarment(product)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.85rem",
                                padding: "0.65rem",
                                borderRadius: "12px",
                                backgroundColor: isSelected ? "rgba(109, 31, 50, 0.08)" : "var(--theme-bg-main)",
                                border: isSelected ? "1.5px solid var(--muted-gold)" : "1px solid var(--theme-border)",
                                cursor: "grab",
                                transition: "all 0.2s ease"
                              }}
                              className="wardrobe-item-card"
                            >
                              <div
                                style={{
                                  width: "60px",
                                  height: "75px",
                                  borderRadius: "8px",
                                  overflow: "hidden",
                                  flexShrink: 0,
                                  backgroundColor: "#F3EDE2"
                                }}
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top"
                                  }}
                                />
                              </div>

                              <div style={{ flexGrow: 1, minWidth: 0 }}>
                                <span
                                  style={{
                                    display: "block",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    color: "var(--theme-heading-color)",
                                    fontFamily: "var(--font-serif-royal)",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {product.name}
                                </span>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    marginTop: "0.2rem"
                                  }}
                                >
                                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--muted-gold-dark)" }}>
                                    {formatPrice(product.priceUSD)}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "0.68rem",
                                      backgroundColor: "rgba(185, 154, 91, 0.15)",
                                      padding: "0.1rem 0.4rem",
                                      borderRadius: "6px",
                                      color: "var(--theme-text-muted)"
                                    }}
                                  >
                                    {product.subcategory || product.category}
                                  </span>
                                </div>

                                {product.sizes && (
                                  <span
                                    style={{
                                      display: "block",
                                      fontSize: "0.68rem",
                                      color: "var(--theme-text-muted)",
                                      marginTop: "0.2rem"
                                    }}
                                  >
                                    Sizes: {product.sizes.slice(0, 3).join(", ")}
                                    {product.sizes.length > 3 ? "..." : ""}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectGarment(product);
                                }}
                                style={{
                                  backgroundColor: isSelected ? "var(--burgundy)" : "var(--theme-bg-card)",
                                  color: isSelected ? "#FAF5EB" : "var(--burgundy)",
                                  border: "1px solid var(--muted-gold)",
                                  borderRadius: "16px",
                                  padding: "0.35rem 0.75rem",
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  flexShrink: 0
                                }}
                              >
                                {isSelected ? "✓ Slotted" : "✦ Slot In"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: EXPLORE CATALOG CONTENT */}
                {wardrobeTab === "catalog" && (
                  <div
                    style={{
                      padding: "1rem",
                      overflowY: "auto",
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.8rem"
                    }}
                  >
                    {/* Search & Category Filter Pills */}
                    <input
                      type="text"
                      placeholder="Search saree, kurta, gown, lehenga..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.55rem 0.85rem",
                        borderRadius: "10px",
                        border: "1px solid var(--theme-border)",
                        fontSize: "0.8rem",
                        boxSizing: "border-box"
                      }}
                    />

                    {/* Department Quick Pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {[
                        "All",
                        "womens-wear",
                        "mens-wear",
                        "kids-wear",
                        "Traditional Wear",
                        "Western Wear"
                      ].map((dept) => {
                        const label =
                          dept === "womens-wear"
                            ? "Women"
                            : dept === "mens-wear"
                            ? "Men"
                            : dept === "kids-wear"
                            ? "Kids"
                            : dept;
                        return (
                          <button
                            key={dept}
                            onClick={() => setCatalogDepartment(dept)}
                            style={{
                              backgroundColor: catalogDepartment === dept ? "var(--burgundy)" : "var(--theme-bg-main)",
                              color: catalogDepartment === dept ? "#FAF5EB" : "var(--theme-text-body)",
                              border: `1px solid ${catalogDepartment === dept ? "var(--muted-gold)" : "var(--theme-border)"}`,
                              borderRadius: "14px",
                              padding: "0.22rem 0.65rem",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              cursor: "pointer"
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Catalog Items List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.4rem" }}>
                      {filteredCatalogProducts.slice(0, 30).map((product) => {
                        const isSelected = selectedGarment?.id === product.id;
                        return (
                          <div
                            key={product.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("application/json", JSON.stringify(product));
                              e.dataTransfer.setData("text/plain", JSON.stringify(product));
                            }}
                            onClick={() => selectGarment(product)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.85rem",
                              padding: "0.65rem",
                              borderRadius: "12px",
                              backgroundColor: isSelected ? "rgba(109, 31, 50, 0.08)" : "var(--theme-bg-main)",
                              border: isSelected ? "1.5px solid var(--muted-gold)" : "1px solid var(--theme-border)",
                              cursor: "grab",
                              transition: "all 0.2s ease"
                            }}
                            className="wardrobe-item-card"
                          >
                            <div
                              style={{
                                width: "60px",
                                height: "75px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                flexShrink: 0,
                                backgroundColor: "#F3EDE2"
                              }}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "top"
                                }}
                              />
                            </div>

                            <div style={{ flexGrow: 1, minWidth: 0 }}>
                              <span
                                style={{
                                  display: "block",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  color: "var(--theme-heading-color)",
                                  fontFamily: "var(--font-serif-royal)",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {product.name}
                              </span>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  marginTop: "0.2rem"
                                }}
                              >
                                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--muted-gold-dark)" }}>
                                  {formatPrice(product.priceUSD)}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.68rem",
                                    backgroundColor: "rgba(185, 154, 91, 0.15)",
                                    padding: "0.1rem 0.4rem",
                                    borderRadius: "6px",
                                    color: "var(--theme-text-muted)"
                                  }}
                                >
                                  {product.subcategory || product.category}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                selectGarment(product);
                              }}
                              style={{
                                backgroundColor: isSelected ? "var(--burgundy)" : "var(--theme-bg-card)",
                                color: isSelected ? "#FAF5EB" : "var(--burgundy)",
                                border: "1px solid var(--muted-gold)",
                                borderRadius: "16px",
                                padding: "0.35rem 0.75rem",
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                flexShrink: 0
                              }}
                            >
                              {isSelected ? "✓ Slotted" : "✦ Slot In"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
