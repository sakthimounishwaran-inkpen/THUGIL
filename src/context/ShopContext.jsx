import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, DEPARTMENTS, CURRENCIES, OCCASIONS_LIST } from "../data/products";
import { tryOnService } from "../services/tryOnService";
import confetti from "canvas-confetti";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Navigation & View state ('home' | 'category')
  const [currentView, setCurrentView] = useState("home");
  const [selectedDepartment, setSelectedDepartment] = useState("womens-wear");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");

  // Filtering State
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'bestsellers'
  const [activeCatalogTab, setActiveCatalogTab] = useState("all"); // 'all' | 'new-arrivals' | 'bestsellers'

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("thugil_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("thugil_wishlist");
      return saved ? JSON.parse(saved) : ["thugil-w-01", "thugil-m-01"];
    } catch {
      return ["thugil-w-01", "thugil-m-01"];
    }
  });

  // Theme State: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("thugil_theme");
      return saved === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  // Unique Saree Dress Opening Loading Screen State
  const [isDrapeLoading, setIsDrapeLoading] = useState(true);

  // Currency selection
  const [currency, setCurrency] = useState("USD");

  // UI Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isFabricStudioOpen, setIsFabricStudioOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // AI Virtual Trial Room & Staff Admin
  const [isAITrialRoomOpen, setIsAITrialRoomOpen] = useState(false);
  const [isAIAdminOpen, setIsAIAdminOpen] = useState(false);
  const [aiTrialCredits, setAiTrialCredits] = useState(2);
  const [activeTryOnGarment, setActiveTryOnGarment] = useState(null);

  // Discount Coupons
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  // Luxury Gift Box Addon
  const [isGiftBoxSelected, setIsGiftBoxSelected] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Checkout modal
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [lastOrderInfo, setLastOrderInfo] = useState(null);

  // AI Virtual Trial Room Actions
  const openAITrialRoomWithProduct = (garment) => {
    setActiveTryOnGarment(garment);
    setIsAITrialRoomOpen(true);
  };

  const refreshAITrialStatus = async () => {
    try {
      const status = await tryOnService.getStatus();
      if (typeof status.trialsRemaining === "number") {
        setAiTrialCredits(status.trialsRemaining);
      }
    } catch (err) {
      console.warn("[THUGIL AI] Trial status check:", err.message);
    }
  };

  useEffect(() => {
    refreshAITrialStatus();
  }, []);

  // Synchronize hash in URL for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash || hash === "home") {
        setCurrentView("home");
        return;
      }
      const params = new URLSearchParams(hash);
      const dept = params.get("dept");
      const sub = params.get("sub");
      const occ = params.get("occ");

      if (dept) {
        setSelectedDepartment(dept);
        setSelectedSubcategory(sub || "All");
        setSelectedOccasion(occ || "All");
        setCurrentView("category");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update URL hash when department or subcategory changes
  const navigateToCategory = (deptId, sub = "All", occ = "All") => {
    setSelectedDepartment(deptId);
    setSelectedSubcategory(sub);
    setSelectedOccasion(occ);
    setCurrentView("category");
    setIsFilterDrawerOpen(false);

    const hashParams = new URLSearchParams();
    hashParams.set("dept", deptId);
    if (sub && sub !== "All") hashParams.set("sub", sub);
    if (occ && occ !== "All") hashParams.set("occ", occ);
    window.location.hash = hashParams.toString();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentView("home");
    window.location.hash = "home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToNewArrivals = () => {
    setActiveCatalogTab("new-arrivals");
    setCurrentView("home");
    setTimeout(() => {
      const el = document.getElementById("catalog-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const navigateToBestsellers = () => {
    setActiveCatalogTab("bestsellers");
    setCurrentView("home");
    setTimeout(() => {
      const el = document.getElementById("catalog-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const clearAllFilters = () => {
    setSelectedSubcategory("All");
    setSelectedOccasion("All");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 3000]);
    setInStockOnly(false);
    setSearchQuery("");
    setSortBy("featured");
    showToast("All filters have been reset", "info");
  };

  // Persist Cart & Wishlist
  useEffect(() => {
    try {
      localStorage.setItem("thugil_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("thugil_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Synchronize data-theme on html element and persist
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("thugil_theme", theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      showToast(`Switched to ${nextTheme === "dark" ? "Imperial Velvet Dark" : "Warm Ivory Light"} mode`, "info");
      return nextTheme;
    });
  };

  const triggerDrapeOpening = () => {
    setIsDrapeLoading(true);
  };

  // Toast dispatch
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Currency Converter helper
  const formatPrice = (priceInUSD) => {
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(priceInUSD * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  };

  const convertNumber = (priceInUSD) => {
    const cur = CURRENCIES[currency] || CURRENCIES.USD;
    return Math.round(priceInUSD * cur.rate);
  };

  // Cart operations
  const addToCart = (product, size = "Standard Royal Cut", quantity = 1, customNotes = "") => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedSize: size,
            quantity,
            customNotes
          }
        ];
      }
    });
    showToast(`Added "${product.name}" to your Royal Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
    showToast("Piece removed from your bag", "info");
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from your Atelier Wishlist`, "info");
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast(`Saved "${product.name}" to your Wishlist`);
    }
  };

  // Coupon handling
  const applyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === "ROYAL10") {
      setAppliedCoupon({ code: "ROYAL10", discountPercent: 10, label: "10% Royal Inaugural Privilege" });
      setCouponError("");
      showToast("Coupon ROYAL10 applied: 10% Royal Privilege!");
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#6D1F32", "#B99A5B", "#F7F1E7"]
      });
    } else if (code === "THUGILGOLD") {
      setAppliedCoupon({ code: "THUGILGOLD", fixedDiscountUSD: 150, label: "$150 Gold Atelier Credit" });
      setCouponError("");
      showToast("Coupon THUGILGOLD applied: $150 Atelier Credit!");
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#B99A5B", "#D5BA82", "#6D1F32"]
      });
    } else {
      setCouponError("Invalid luxury passkey. Try code ROYAL10 or THUGILGOLD.");
      showToast("Invalid code", "error");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    showToast("Coupon removed", "info");
  };

  // Cart calculations
  const rawSubtotalUSD = cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  const giftBoxUSD = isGiftBoxSelected && cart.length > 0 ? 35 : 0;
  
  let discountUSD = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountUSD = (rawSubtotalUSD * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.fixedDiscountUSD) {
      discountUSD = Math.min(appliedCoupon.fixedDiscountUSD, rawSubtotalUSD);
    }
  }

  // Free shipping threshold = $500 USD
  const freeShippingThresholdUSD = 500;
  const shippingUSD = rawSubtotalUSD >= freeShippingThresholdUSD || rawSubtotalUSD === 0 ? 0 : 45;
  const finalTotalUSD = Math.max(0, rawSubtotalUSD + giftBoxUSD + shippingUSD - discountUSD);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Simulated Checkout execution
  const processCheckout = () => {
    if (cart.length === 0) return;
    const orderNumber = "THG-" + Math.floor(100000 + Math.random() * 900000);
    const orderInfo = {
      orderNumber,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      items: [...cart],
      totalFormatted: formatPrice(finalTotalUSD),
      shippingMethod: "White-Glove Royal Armored Express Delivery"
    };

    setLastOrderInfo(orderInfo);
    setIsOrderPlaced(true);
    setCart([]);
    setIsCartOpen(false);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#6D1F32", "#B99A5B", "#F7F1E7", "#292626"]
    });
  };

  // Personalized Recommendation Engine
  const getRecommendations = (currentProductId, limit = 4) => {
    const current = PRODUCTS.find((p) => p.id === currentProductId);
    if (!current) {
      return PRODUCTS.slice(0, limit);
    }
    // Filter out current, prioritize complementary items (e.g. if saree -> jewellery / potli bag / footwear)
    const complementary = PRODUCTS.filter((p) => {
      if (p.id === current.id) return false;
      if (current.departmentId === "womens-wear" && p.departmentId === "accessories") return true;
      if (current.departmentId === "mens-wear" && (p.subcategory === "Veshti & Dhoti" || p.subcategory === "Scarves" || p.departmentId === "accessories")) return true;
      return p.departmentId === current.departmentId;
    });

    return complementary.slice(0, limit);
  };

  return (
    <ShopContext.Provider
      value={{
        // Catalog & Departments
        products: PRODUCTS,
        departments: DEPARTMENTS,
        occasionsList: OCCASIONS_LIST,

        // Navigation Views
        currentView,
        setCurrentView,
        selectedDepartment,
        setSelectedDepartment,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedOccasion,
        setSelectedOccasion,
        navigateToCategory,
        navigateToHome,
        navigateToNewArrivals,
        navigateToBestsellers,

        // Multi-attribute Filters
        selectedSizes,
        setSelectedSizes,
        selectedColors,
        setSelectedColors,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        activeCatalogTab,
        setActiveCatalogTab,
        clearAllFilters,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotalItems,
        rawSubtotalUSD,
        finalTotalUSD,
        discountUSD,
        shippingUSD,
        giftBoxUSD,
        isGiftBoxSelected,
        setIsGiftBoxSelected,
        freeShippingThresholdUSD,

        // Coupons
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,

        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,

        // Modals & Drawers
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isFabricStudioOpen,
        setIsFabricStudioOpen,

        // AI Virtual Trial Room & Staff Admin
        isAITrialRoomOpen,
        setIsAITrialRoomOpen,
        isAIAdminOpen,
        setIsAIAdminOpen,
        aiTrialCredits,
        setAiTrialCredits,
        activeTryOnGarment,
        setActiveTryOnGarment,
        openAITrialRoomWithProduct,
        refreshAITrialStatus,

        // Currencies & Formatting
        currency,
        setCurrency,
        formatPrice,
        convertNumber,

        // Light & Dark Theme
        theme,
        toggleTheme,

        // Saree Dress Opening Loading Screen
        isDrapeLoading,
        setIsDrapeLoading,
        triggerDrapeOpening,

        // Recommendations
        getRecommendations,

        // Toast & Checkout
        toasts,
        showToast,
        processCheckout,
        isOrderPlaced,
        setIsOrderPlaced,
        lastOrderInfo
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
