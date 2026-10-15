import React, { useEffect, useRef, useState } from "react";
import { useShop } from "../context/ShopContext";
import { Sparkles, ArrowRight, Scissors, ShieldCheck, Award, Flame } from "lucide-react";

export default function HeroSection() {
  const { setIsFabricStudioOpen, setQuickViewProduct, products } = useShop();
  const canvasRef = useRef(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      image: "/images/couture-gown.jpg",
      tag: "Haute Couture 2026",
      title: "The Empress Plissé Gown",
      sub: "Burgundy Silk-Velvet with Warm Ivory Accordion Drape",
      productId: "thugil-w-07"
    },
    {
      image: "/images/kanjivaram-saree.jpg",
      tag: "Heritage Heirloom",
      title: "The Rajkumari Kanjivaram",
      sub: "Pure Mulberry Silk with Muted Gold Korvai Temple Zari",
      productId: "thugil-w-01"
    },
    {
      image: "/images/bridal-lehenga.jpg",
      tag: "Royal Bridal Atelier",
      title: "The Noor-E-Awadh Lehenga",
      sub: "Heavy Velvet Kalis with Antique Zardozi & Organza Veil",
      productId: "thugil-w-06"
    }
  ];

  // Canvas silk particles / shimmering threads animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Silk thread particles
    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: i % 3 === 0 ? "rgba(185, 154, 91, 0.45)" : i % 2 === 0 ? "rgba(213, 186, 130, 0.3)" : "rgba(109, 31, 50, 0.15)",
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle flowing silk wavy curves in background
      ctx.beginPath();
      ctx.moveTo(0, height * 0.6 + Math.sin(time) * 30);
      for (let x = 0; x <= width; x += 30) {
        const y = height * 0.6 + Math.sin(time + x * 0.003) * 40 + Math.cos(time * 0.7 + x * 0.002) * 20;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(185, 154, 91, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second deeper wave
      ctx.beginPath();
      ctx.moveTo(0, height * 0.4 + Math.cos(time * 0.8) * 25);
      for (let x = 0; x <= width; x += 40) {
        const y = height * 0.4 + Math.cos(time * 0.8 + x * 0.004) * 35;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(109, 31, 50, 0.05)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Render floating golden dust particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.phase + time) * 0.3;
        p.y += p.vy;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Slide rotation every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeHeroSlide];

  const handleHeroQuickView = (productId) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        overflow: "hidden",
        borderBottom: "1px solid rgba(185, 154, 91, 0.2)"
      }}
    >
      {/* Background Interactive Silk Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      {/* Decorative Golden Arch Silhouette in Background */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "10%",
          width: "550px",
          height: "750px",
          borderRadius: "300px 300px 0 0",
          border: "1px solid rgba(185, 154, 91, 0.2)",
          background: "radial-gradient(circle at 50% 30%, rgba(213, 186, 130, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "center",
          gap: "4rem",
          paddingTop: "2.5rem",
          paddingBottom: "3.5rem"
        }}
      >
        {/* Left Column: Hero Editorial Typography & CTAs */}
        <div style={{ animation: "fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
          {/* Brand Tagline Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.45rem 1.1rem",
              borderRadius: "30px",
              backgroundColor: "rgba(109, 31, 50, 0.06)",
              border: "1px solid rgba(185, 154, 91, 0.35)",
              marginBottom: "1.5rem"
            }}
          >
            <Sparkles size={14} color="var(--muted-gold-dark)" />
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--theme-heading-color)",
                fontWeight: 600
              }}
              className="hero-badge-text"
            >
              Timeless Fabrics ✦ For Every Generation
            </span>
          </div>

          {/* Main Royal Heading */}
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.3rem)",
              lineHeight: 1.08,
              fontFamily: "var(--font-serif-display)",
              color: "var(--theme-heading-color)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em"
            }}
            className="hero-main-title"
          >
            Draped in Royalty. <br />
            <span
              style={{
                background: "linear-gradient(135deg, #B99A5B 0%, #D5BA82 40%, #93763A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
                fontWeight: 600
              }}
            >
              Woven in Heritage.
            </span>
          </h1>

          {/* Luxury Editorial Subtitle */}
          <p
            style={{
              lineHeight: 1.7,
              color: "var(--theme-body-color)",
              maxWidth: "540px",
              marginBottom: "2.5rem",
              fontFamily: "var(--font-serif-editorial)",
              fontSize: "1.25rem"
            }}
            className="hero-description-text"
          >
            Immerse yourself in authentic Indian masterloom craft. From hand-spun
            <strong> Kanjivaram mulberry silks</strong> dipped in muted gold zari, to architectural
            <strong> French-Indian fusion gowns</strong> engineered for the global runway.
          </p>

          {/* Dual CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              flexWrap: "wrap",
              marginBottom: "3rem"
            }}
          >
            <a
              href="#collections"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.95rem 2.2rem",
                backgroundColor: "var(--burgundy)",
                color: "var(--warm-ivory)",
                borderRadius: "32px",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "var(--shadow-burgundy)",
                transition: "all 0.3s ease"
              }}
              className="gold-shimmer-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight size={17} color="var(--muted-gold-light)" />
            </a>

            <button
              onClick={() => setIsFabricStudioOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.95rem 1.9rem",
                backgroundColor: "transparent",
                color: "var(--theme-heading-color)",
                border: "1.5px solid var(--muted-gold)",
                borderRadius: "32px",
                fontSize: "0.92rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                boxShadow: "var(--shadow-sm)"
              }}
              className="studio-btn"
            >
              <Scissors size={17} color="var(--muted-gold-dark)" />
              <span>Enter Drape Studio</span>
            </button>
          </div>

          {/* Trust Value Pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              paddingTop: "1.8rem",
              borderTop: "1px solid rgba(185, 154, 91, 0.25)",
              maxWidth: "560px"
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--theme-heading-color)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  fontFamily: "var(--font-serif-display)"
                }}
                className="hero-metric-title"
              >
                <Award size={18} color="var(--muted-gold)" />
                <span>100% Pure</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--theme-muted-color)", marginTop: "0.2rem" }} className="hero-metric-sub">
                Silk Mark India Certified
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--theme-heading-color)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  fontFamily: "var(--font-serif-display)"
                }}
                className="hero-metric-title"
              >
                <Flame size={18} color="var(--muted-gold)" />
                <span>196+ Hours</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--theme-muted-color)", marginTop: "0.2rem" }} className="hero-metric-sub">
                Handloom Artisan Weave
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--theme-heading-color)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  fontFamily: "var(--font-serif-display)"
                }}
                className="hero-metric-title"
              >
                <ShieldCheck size={18} color="var(--muted-gold)" />
                <span>Heirloom</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--theme-muted-color)", marginTop: "0.2rem" }} className="hero-metric-sub">
                Lifetime Authenticity
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Editorial Hero Showcase */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {/* Framed Editorial Master Showcase Card */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              borderRadius: "24px 24px 180px 24px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(41, 38, 38, 0.2), 0 0 40px rgba(185, 154, 91, 0.25)",
              border: "3px solid var(--muted-gold)",
              backgroundColor: "var(--charcoal-bg)"
            }}
            className="animate-glow"
          >
            {/* The Image with smooth transition */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "580px",
                overflow: "hidden"
              }}
            >
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  animation: "fadeInScale 0.7s ease forwards"
                }}
              />

              {/* Gradient Scrim for luxury readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(41, 38, 38, 0.2) 50%, rgba(41, 38, 38, 0.92) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* Top Luxury Pill */}
              <div
                style={{
                  position: "absolute",
                  top: "1.2rem",
                  left: "1.2rem",
                  backgroundColor: "rgba(109, 31, 50, 0.88)",
                  backdropFilter: "blur(8px)",
                  color: "var(--warm-ivory)",
                  border: "1px solid var(--muted-gold)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Sparkles size={13} color="var(--muted-gold-light)" />
                <span>{currentSlide.tag}</span>
              </div>

              {/* Bottom Card Editorial Details */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  color: "#FAF5EB"
                }}
              >
                <h3
                  style={{
                    color: "#FAF5EB",
                    fontSize: "1.6rem",
                    marginBottom: "0.3rem",
                    fontFamily: "var(--font-serif-display)"
                  }}
                  className="hero-card-slide-title"
                >
                  {currentSlide.title}
                </h3>
                <p
                  style={{
                    color: "#FAF5EB",
                    fontSize: "1.05rem",
                    marginBottom: "1rem",
                    fontFamily: "var(--font-serif-editorial)"
                  }}
                  className="hero-card-slide-sub"
                >
                  {currentSlide.sub}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <button
                    onClick={() => handleHeroQuickView(currentSlide.productId)}
                    style={{
                      backgroundColor: "var(--muted-gold)",
                      color: "var(--charcoal-bg)",
                      padding: "0.55rem 1.2rem",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      transition: "all 0.2s ease"
                    }}
                    className="gold-shimmer-btn"
                  >
                    <span>View Atelier Piece</span>
                    <ArrowRight size={14} />
                  </button>

                  {/* Carousel Slide Indicators */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroSlide(idx)}
                        style={{
                          width: idx === activeHeroSlide ? "24px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          backgroundColor:
                            idx === activeHeroSlide ? "var(--muted-gold)" : "rgba(255, 255, 255, 0.4)",
                          transition: "all 0.3s ease"
                        }}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Gold Ornamental Stamp */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-25px",
              backgroundColor: "var(--warm-ivory-light)",
              border: "1.5px solid var(--muted-gold)",
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-gold)",
              textAlign: "center",
              zIndex: 3
            }}
            className="animate-float"
          >
            <Sparkles size={16} color="var(--muted-gold-light)" />
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--warm-white-pure)",
                letterSpacing: "0.1em",
                marginTop: "0.1rem"
              }}
            >
              THUGIL
            </span>
            <span
              style={{
                fontSize: "0.55rem",
                color: "var(--muted-gold-light)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 600
              }}
            >
              GENUINE ZARI
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 990px) {
          section .container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        .studio-btn:hover {
          background-color: var(--burgundy) !important;
          color: var(--warm-ivory) !important;
          border-color: var(--burgundy) !important;
        }
      `}</style>
    </section>
  );
}
