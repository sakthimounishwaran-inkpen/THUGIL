import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";
import { DEPARTMENTS, CURRENCIES } from "../data/products";
import OutfitsMegaMenu from "./OutfitsMegaMenu";
import { OUTFITS_GROUPS } from "../data/outfitsData";
import thugilIcon from "../assets/thugil.png";
import {
  ShoppingBag,
  Heart,
  Search,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Scissors,
  Sun,
  Moon,
  RotateCcw
} from "lucide-react";

export default function Navbar() {
  const {
    products,
    cartTotalItems,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    setIsFabricStudioOpen,
    setIsSizeGuideOpen,
    setQuickViewProduct,
    theme,
    toggleTheme,
    triggerDrapeOpening,
    navigateToCategory,
    navigateToHome
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOutfitsOpen, setIsMobileOutfitsOpen] = useState(true);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isOutfitsOpen, setIsOutfitsOpen] = useState(false);

  const searchInputRef = useRef(null);
  const outfitsTimeoutRef = useRef(null);
  const outfitsTriggerRef = useRef(null);
  const outfitsMenuRef = useRef(null);
  const isOutfitsLockedByClick = useRef(false);

  // Scroll detection for sticky header refinement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterOutfits = () => {
    if (outfitsTimeoutRef.current) {
      clearTimeout(outfitsTimeoutRef.current);
      outfitsTimeoutRef.current = null;
    }
    setIsOutfitsOpen(true);
  };

  const handleMouseLeaveOutfits = () => {
    // If user explicitly clicked the menu open, keep it open until click outside or toggle
    if (isOutfitsLockedByClick.current) {
      return;
    }
    if (outfitsTimeoutRef.current) {
      clearTimeout(outfitsTimeoutRef.current);
    }
    outfitsTimeoutRef.current = setTimeout(() => {
      setIsOutfitsOpen(false);
    }, 350);
  };

  const handleToggleOutfitsClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (outfitsTimeoutRef.current) {
      clearTimeout(outfitsTimeoutRef.current);
      outfitsTimeoutRef.current = null;
    }
    setIsOutfitsOpen((prev) => {
      const nextState = !prev;
      isOutfitsLockedByClick.current = nextState;
      return nextState;
    });
  };

  const handleCloseOutfits = () => {
    if (outfitsTimeoutRef.current) {
      clearTimeout(outfitsTimeoutRef.current);
      outfitsTimeoutRef.current = null;
    }
    isOutfitsLockedByClick.current = false;
    setIsOutfitsOpen(false);
  };

  // Outside click and ESC listeners to guarantee stable, accessible mega-menu interaction
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isOutfitsOpen) return;
      const clickedTrigger = outfitsTriggerRef.current && outfitsTriggerRef.current.contains(e.target);
      const clickedMenu = outfitsMenuRef.current && outfitsMenuRef.current.contains(e.target);
      if (!clickedTrigger && !clickedMenu) {
        handleCloseOutfits();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseOutfits();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOutfitsOpen]);

  // Instant live search matches
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.department.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <>
      {/* Top Royal Announcement Bar */}
      <div
        style={{
          backgroundColor: "var(--burgundy-dark)",
          color: "#FAF5EB",
          padding: "0.62rem 1.2rem",
          fontSize: "0.82rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sans)",
          borderBottom: "1px solid rgba(185, 154, 91, 0.3)",
          position: "relative",
          zIndex: 110,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1360px",
            margin: "0 auto",
            fontWeight: 500
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <Sparkles size={14} color="var(--muted-gold-light)" />
            <span>Complimentary White-Glove Royal Delivery On Orders Over $500</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem"
            }}
            className="top-bar-links"
          >
            <span style={{ color: "var(--muted-gold-light)" }}>
              ✦ Code: <strong>ROYAL10</strong> for 10% Off Inaugural Orders
            </span>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              style={{
                color: "#FAF5EB",
                fontSize: "0.8rem",
                textDecoration: "underline",
                letterSpacing: "0.05em",
                opacity: 0.9,
                cursor: "pointer"
              }}
            >
              Atelier Size Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Header with Logo, Mega Menu, & Actions */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "var(--theme-bg-header)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: isScrolled
            ? "1px solid rgba(185, 154, 91, 0.35)"
            : "1px solid rgba(185, 154, 91, 0.2)",
          boxShadow: isScrolled
            ? "0 4px 20px rgba(41, 38, 38, 0.08)"
            : "0 2px 10px rgba(41, 38, 38, 0.03)",
          transition: "all 0.3s ease"
        }}
      >
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: isScrolled ? "0.6rem 2.2rem" : "0.85rem 2.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.3s ease"
          }}
        >
          {/* TOP-LEFT: Brand Logo - Horizontal Layout on Same Line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              flexShrink: 0
            }}
            onClick={navigateToHome}
            className="brand-logo-container"
          >
            {/* White circle background in dark theme for high-contrast prestige presentation */}
            <div
              className="navbar-logo-circle"
              style={{
                width: isScrolled ? "56px" : "66px",
                height: isScrolled ? "56px" : "66px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme === "dark" ? "#FFFFFF" : "transparent",
                boxShadow: theme === "dark"
                  ? "0 4px 18px rgba(255, 255, 255, 0.35), 0 0 14px rgba(185, 154, 91, 0.55)"
                  : "none",
                border: theme === "dark" ? "2px solid rgba(185, 154, 91, 0.75)" : "none",
                transition: "all 0.3s ease",
                flexShrink: 0
              }}
            >
              <img
                src={thugilIcon || "/thugil.png"}
                onError={(e) => {
                  if (e.currentTarget.src !== window.location.origin + "/thugil.png") {
                    e.currentTarget.src = "/thugil.png";
                  }
                }}
                alt="THUGIL"
                style={{
                  height: isScrolled ? (theme === "dark" ? "44px" : "50px") : (theme === "dark" ? "52px" : "60px"),
                  width: isScrolled ? (theme === "dark" ? "44px" : "50px") : (theme === "dark" ? "52px" : "60px"),
                  objectFit: "contain",
                  display: "block",
                  transition: "all 0.3s ease",
                  filter: theme === "dark" ? "none" : "drop-shadow(0 2px 6px rgba(109, 31, 50, 0.22))"
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                lineHeight: 1
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif-display)",
                  fontSize: isScrolled ? "1.95rem" : "2.4rem",
                  fontWeight: 700,
                  color: "var(--theme-heading-color)",
                  letterSpacing: "0.1em",
                  transition: "font-size 0.3s ease"
                }}
              >
                THUGIL
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif-royal)",
                  fontSize: "0.68rem",
                  color: "var(--muted-gold-dark)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "3px",
                  fontWeight: 600
                }}
              >
                Timeless Fabrics
              </span>
            </div>
          </div>

          {/* CENTER: Desktop OUTFITS Mega-Menu & Drape Studio */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.4rem"
            }}
            className="desktop-nav"
          >
            {/* OUTFITS Navigation Dropdown / Mega-Menu Item */}
            <div
              ref={outfitsTriggerRef}
              onMouseEnter={handleMouseEnterOutfits}
              onMouseLeave={handleMouseLeaveOutfits}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                onClick={handleToggleOutfitsClick}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.98rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isOutfitsOpen ? "var(--burgundy)" : "var(--theme-heading-color)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.58rem 1.05rem",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  background: isOutfitsOpen ? "rgba(109, 31, 50, 0.08)" : "transparent",
                  border: isOutfitsOpen ? "1px solid rgba(185, 154, 91, 0.4)" : "1px solid transparent"
                }}
                className="nav-link outfits-nav-trigger"
                aria-expanded={isOutfitsOpen}
                aria-haspopup="true"
              >
                <span>OUTFITS</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: isOutfitsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease"
                  }}
                  color="var(--muted-gold-dark)"
                />
              </button>
            </div>

            {/* Bespoke Studio Button */}
            <button
              type="button"
              onClick={() => setIsFabricStudioOpen(true)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--theme-heading-color)",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                backgroundColor: "rgba(109, 31, 50, 0.06)",
                padding: "0.45rem 1.05rem",
                borderRadius: "24px",
                border: "1px solid rgba(185, 154, 91, 0.45)",
                cursor: "pointer"
              }}
              className="gold-shimmer-btn"
            >
              <Scissors size={15} color="var(--muted-gold-dark)" />
              <span>Drape Studio</span>
            </button>
          </nav>          {/* TOP-RIGHT: Search, Currency, Theme, Wishlist, Cart & Mobile Menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.1rem",
              flexShrink: 0
            }}
          >
            {/* Live Instant Search Bar */}
            <div style={{ position: "relative" }}>
              {isSearchExpanded ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "var(--theme-bg-card)",
                    border: "1px solid var(--muted-gold)",
                    borderRadius: "26px",
                    padding: "0.38rem 0.95rem",
                    boxShadow: "var(--shadow-sm)",
                    animation: "fadeInScale 0.25s ease"
                  }}
                >
                  <Search size={17} color="var(--burgundy)" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search silk, kurtas, lehengas..."
                    autoFocus
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      marginLeft: "0.6rem",
                      fontSize: "0.88rem",
                      color: "var(--theme-body-color)",
                      width: "210px",
                      fontFamily: "var(--font-sans)"
                    }}
                  />
                  <button
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery("");
                    }}
                    style={{
                      padding: "0.2rem",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <X size={15} color="var(--theme-muted-color)" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  aria-label="Search Collection"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--theme-heading-color)",
                    transition: "all 0.2s ease"
                  }}
                  className="icon-hover-btn"
                >
                  <Search size={21} />
                </button>
              )}

              {/* Instant Search Results Dropdown Preview */}
              {isSearchExpanded && searchResults.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "125%",
                    right: 0,
                    width: "320px",
                    backgroundColor: "var(--theme-bg-elevated)",
                    backdropFilter: "blur(16px)",
                    border: "1.5px solid var(--muted-gold)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow-lg)",
                    padding: "0.6rem 0",
                    zIndex: 150,
                    animation: "fadeInScale 0.2s ease"
                  }}
                >
                  <div
                    style={{
                      padding: "0.4rem 1rem",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-serif-royal)",
                      color: "var(--muted-gold-dark)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
                    }}
                  >
                    Matching Masterpieces ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setQuickViewProduct(item);
                        setIsSearchExpanded(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                        padding: "0.55rem 1rem",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(109, 31, 50, 0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "38px",
                          height: "48px",
                          borderRadius: "4px",
                          objectFit: "cover"
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "var(--theme-heading-color)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--theme-muted-color)"
                          }}
                        >
                          {item.department} • {item.subcategory}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "var(--theme-heading-color)"
                        }}
                      >
                        ${item.priceUSD}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div style={{ position: "relative" }} className="currency-selector">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: "var(--theme-heading-color)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "7px",
                  border: "1px solid rgba(185, 154, 91, 0.35)",
                  backgroundColor: "var(--theme-bg-card)"
                }}
              >
                <span>{currency}</span>
                <ChevronDown size={14} color="var(--muted-gold-dark)" />
              </button>

              {isCurrencyDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "120%",
                    right: 0,
                    backgroundColor: "var(--theme-bg-card)",
                    border: "1px solid var(--muted-gold)",
                    borderRadius: "8px",
                    boxShadow: "var(--shadow-lg)",
                    padding: "0.4rem 0",
                    minWidth: "130px",
                    zIndex: 110,
                    animation: "fadeInScale 0.2s ease"
                  }}
                >
                  {Object.entries(CURRENCIES).map(([curKey, curVal]) => (
                    <button
                      key={curKey}
                      onClick={() => {
                        setCurrency(curKey);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.45rem 1rem",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: currency === curKey ? "rgba(109, 31, 50, 0.1)" : "transparent",
                        color: currency === curKey ? "var(--burgundy)" : "var(--theme-body-color)",
                        fontWeight: currency === curKey ? 700 : 400
                      }}
                    >
                      <span>{curVal.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
              title={`Switch to ${theme === "dark" ? "Warm Ivory Light" : "Imperial Velvet Dark"} Mode`}
              style={{
                padding: "0.5rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme === "dark" ? "var(--muted-gold-light)" : "var(--burgundy)",
                border: "1px solid rgba(185, 154, 91, 0.35)",
                backgroundColor:
                  theme === "dark" ? "rgba(213, 186, 130, 0.12)" : "rgba(109, 31, 50, 0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              className="icon-hover-btn"
            >
              {theme === "dark" ? (
                <Sun size={21} color="#D5BA82" />
              ) : (
                <Moon size={21} color="var(--burgundy)" />
              )}
            </button>

            {/* Replay Saree Drape Opening Button */}
            <button
              onClick={triggerDrapeOpening}
              aria-label="Replay Saree Drape Opening"
              title="Experience Saree Drape Opening Animation"
              style={{
                padding: "0.5rem",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted-gold-dark)",
                border: "1px solid rgba(185, 154, 91, 0.35)",
                backgroundColor: "rgba(185, 154, 91, 0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              className="icon-hover-btn"
            >
              <RotateCcw size={18} />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View Saved Items"
              style={{
                position: "relative",
                padding: "0.5rem",
                borderRadius: "50%",
                color: "var(--theme-heading-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              className="icon-hover-btn"
            >
              <Heart
                size={21}
                fill={wishlist.length > 0 ? "var(--muted-gold)" : "none"}
                color="var(--theme-heading-color)"
              />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "1px",
                    right: "1px",
                    backgroundColor: "var(--muted-gold)",
                    color: "#FAF5EB",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    width: "19px",
                    height: "19px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Royal Bag"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.48rem 1.05rem",
                backgroundColor: "var(--burgundy)",
                color: "#FAF5EB",
                borderRadius: "28px",
                boxShadow: "var(--shadow-burgundy)",
                transition: "all 0.3s ease"
              }}
              className="gold-shimmer-btn"
            >
              <ShoppingBag size={18} color="var(--muted-gold-light)" />
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em"
                }}
                className="cart-label"
              >
                Bag
              </span>
              <span
                style={{
                  backgroundColor: "var(--muted-gold)",
                  color: "#FAF5EB",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  padding: "0.14rem 0.48rem",
                  borderRadius: "12px",
                  marginLeft: "0.2rem"
                }}
              >
                {cartTotalItems}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: "none",
                padding: "0.45rem",
                color: "var(--burgundy)"
              }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={27} /> : <Menu size={27} />}
            </button>
          </div>
        </div>

        {/* Desktop Dropdown OUTFITS Mega-Menu Container */}
        <OutfitsMegaMenu
          ref={outfitsMenuRef}
          isOpen={isOutfitsOpen}
          onMouseEnter={handleMouseEnterOutfits}
          onMouseLeave={handleMouseLeaveOutfits}
          onClose={handleCloseOutfits}
        />

        {/* Mobile Slide-down Accordion Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              backgroundColor: "var(--theme-bg-card)",
              borderBottom: "2px solid var(--muted-gold)",
              padding: "1.5rem 1.5rem 2rem",
              maxHeight: "82vh",
              overflowY: "auto",
              animation: "fadeInScale 0.25s ease"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {/* OUTFITS Expandable Accordion */}
              <div
                style={{
                  borderBottom: "1px solid rgba(185, 154, 91, 0.25)",
                  paddingBottom: "0.8rem"
                }}
              >
                <div
                  onClick={() => setIsMobileOutfitsOpen(!isMobileOutfitsOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0",
                    cursor: "pointer"
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.15rem",
                      fontFamily: "var(--font-serif-royal)",
                      color: "var(--theme-heading-color)",
                      fontWeight: 700,
                      letterSpacing: "0.06em"
                    }}
                  >
                    OUTFITS
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isMobileOutfitsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease"
                    }}
                    color="var(--muted-gold)"
                  />
                </div>

                {isMobileOutfitsOpen && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      paddingTop: "0.4rem"
                    }}
                  >
                    {OUTFITS_GROUPS.map((group) => {
                      const isGroupExpanded = mobileExpandedGroup === group.id;
                      return (
                        <div
                          key={group.id}
                          style={{
                            backgroundColor: "rgba(185, 154, 91, 0.05)",
                            borderRadius: "10px",
                            border: "1px solid rgba(185, 154, 91, 0.2)",
                            padding: "0.5rem 0.8rem"
                          }}
                        >
                          <div
                            onClick={() => setMobileExpandedGroup(isGroupExpanded ? null : group.id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer",
                              padding: "0.3rem 0"
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  fontSize: "0.88rem",
                                  fontFamily: "var(--font-serif-royal)",
                                  fontWeight: 700,
                                  color: "var(--theme-heading-color)",
                                  letterSpacing: "0.06em"
                                }}
                              >
                                {group.title}
                              </span>
                              <span
                                style={{
                                  display: "block",
                                  fontSize: "0.68rem",
                                  color: "var(--muted-gold-dark)"
                                }}
                              >
                                {group.tagline}
                              </span>
                            </div>
                            <ChevronDown
                              size={15}
                              style={{
                                transform: isGroupExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s"
                              }}
                              color="var(--muted-gold)"
                            />
                          </div>

                          {isGroupExpanded && (
                            <div
                              style={{
                                paddingTop: "0.5rem",
                                borderTop: "1px solid rgba(185, 154, 91, 0.15)",
                                marginTop: "0.4rem"
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  navigateToCategory(group.deptId, "All");
                                  setIsMobileMenuOpen(false);
                                }}
                                style={{
                                  textAlign: "left",
                                  fontSize: "0.82rem",
                                  color: "var(--burgundy)",
                                  fontWeight: 700,
                                  padding: "0.3rem 0",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  display: "block",
                                  width: "100%"
                                }}
                              >
                                Explore Entire {group.title} →
                              </button>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  gap: "0.4rem",
                                  marginTop: "0.4rem"
                                }}
                              >
                                {group.categories.map((cat) => (
                                  <button
                                    key={cat.name}
                                    type="button"
                                    onClick={() => {
                                      navigateToCategory(group.deptId, cat.sub, cat.occ || "All");
                                      setIsMobileMenuOpen(false);
                                    }}
                                    style={{
                                      textAlign: "left",
                                      fontSize: "0.8rem",
                                      color: "var(--theme-body-color)",
                                      padding: "0.25rem 0.2rem",
                                      background: "none",
                                      border: "none",
                                      cursor: "pointer"
                                    }}
                                  >
                                    • {cat.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bespoke Studio Mobile Link */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsFabricStudioOpen(true);
                }}
                style={{
                  textAlign: "left",
                  fontSize: "1.05rem",
                  fontFamily: "var(--font-serif-display)",
                  color: "var(--burgundy)",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 0"
                }}
              >
                <Scissors size={18} color="var(--muted-gold)" />
                Bespoke Drape Studio
              </button>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .top-bar-links {
            display: none !important;
          }
          .cart-label {
            display: none;
          }
        }
        .nav-link:hover {
          color: var(--burgundy) !important;
        }
        .icon-hover-btn:hover {
          background-color: rgba(185, 154, 91, 0.15);
        }
      `}</style>
    </>
  );
}
