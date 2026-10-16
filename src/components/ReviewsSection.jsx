import React, { useState } from "react";
import { REVIEWS } from "../data/products";
import { Star, Sparkles, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ReviewsSection() {
  const { showToast } = useShop();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [location, setLocation] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName,
      location: location || "Global Patron",
      date: "Just now",
      rating: Number(rating),
      verified: true,
      title: reviewTitle || "Bespoke Perfection",
      text: reviewText,
      productName: "Bespoke THUGIL Commission"
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsFormOpen(false);
    setAuthorName("");
    setLocation("");
    setReviewTitle("");
    setReviewText("");
    showToast("Your review has been submitted to the THUGIL Royal Gazette.");
  };

  return (
    <section
      style={{
        padding: "6rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(185, 154, 91, 0.2)",
        position: "relative"
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.95rem",
              borderRadius: "20px",
              backgroundColor: "rgba(109, 31, 50, 0.06)",
              border: "1px solid rgba(185, 154, 91, 0.3)",
              marginBottom: "1rem"
            }}
          >
            <Sparkles size={14} color="var(--muted-gold)" />
            <span
              style={{
                fontFamily: "var(--font-serif-royal)",
                fontSize: "0.76rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--theme-heading-color)",
                fontWeight: 600
              }}
            >
              Words of the Patrons
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif-display)",
              fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
              color: "var(--theme-heading-color)",
              lineHeight: 1.15,
              marginBottom: "1rem"
            }}
          >
            Cherished Across Generations
          </h2>

          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--theme-body-color)",
              fontFamily: "var(--font-serif-editorial)"
            }}
          >
            Read chronicles from royalty, brides, and collectors worldwide who entrust their most
            sacred milestones to THUGIL handlooms.
          </p>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 1.3rem",
              borderRadius: "24px",
              border: "1.5px solid var(--muted-gold)",
              color: "var(--theme-heading-color)",
              backgroundColor: "transparent",
              fontSize: "0.82rem",
              fontWeight: 600
            }}
          >
            <MessageSquarePlus size={16} color="var(--muted-gold-dark)" />
            <span>{isFormOpen ? "Cancel Submission" : "Share Your Patron Chronicle"}</span>
          </button>
        </div>

        {/* Review Submission Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitReview}
            style={{
              maxWidth: "600px",
              margin: "0 auto 3.5rem",
              backgroundColor: "var(--warm-ivory-light)",
              padding: "2rem",
              borderRadius: "16px",
              border: "1.5px solid var(--muted-gold)",
              boxShadow: "var(--shadow-md)",
              animation: "fadeInScale 0.25s ease"
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-serif-display)",
                color: "var(--burgundy)",
                fontSize: "1.3rem",
                marginBottom: "1.2rem"
              }}
            >
              Write a Chronicle
            </h4>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Princess Aishwarya / Lady Smith"
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--warm-ivory-border)",
                    outline: "none",
                    fontSize: "0.82rem"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                  City & Country
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Paris, France"
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--warm-ivory-border)",
                    outline: "none",
                    fontSize: "0.82rem"
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Title of Chronicle
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. Unsurpassed Silk Quality"
                style={{
                  width: "100%",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid var(--warm-ivory-border)",
                  outline: "none",
                  fontSize: "0.82rem"
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Rating
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[5, 4, 3, 2, 1].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      padding: "0.35rem 0.65rem",
                      borderRadius: "6px",
                      border: rating === num ? "1.5px solid var(--muted-gold)" : "1px solid var(--warm-ivory-border)",
                      backgroundColor: rating === num ? "rgba(185, 154, 91, 0.15)" : "transparent",
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}
                  >
                    <span>{num}</span>
                    <Star size={13} fill="var(--muted-gold)" color="var(--muted-gold)" />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.3rem" }}>
                Chronicle Details *
              </label>
              <textarea
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience draping the silk, the zari reflection, and the reaction at your event..."
                style={{
                  width: "100%",
                  padding: "0.55rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid var(--warm-ivory-border)",
                  outline: "none",
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-sans)"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "var(--burgundy)",
                color: "var(--warm-ivory)",
                padding: "0.75rem 1.6rem",
                borderRadius: "24px",
                fontSize: "0.85rem",
                fontWeight: 600,
                width: "100%"
              }}
              className="gold-shimmer-btn"
            >
              Submit to Royal Gazette
            </button>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1.8rem"
          }}
        >
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: "var(--theme-bg-card)",
                borderRadius: "16px",
                padding: "2rem",
                border: "1px solid rgba(185, 154, 91, 0.3)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                {/* Golden Stars & Verified Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.9rem"
                  }}
                >
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--muted-gold)" color="var(--muted-gold)" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.72rem",
                        color: "#2B6338",
                        fontWeight: 600
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>Verified Patron</span>
                    </span>
                  )}
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-serif-display)",
                    fontSize: "1.2rem",
                    color: "var(--theme-heading-color)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.25
                  }}
                >
                  "{rev.title}"
                </h4>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--theme-body-color)",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                    marginBottom: "1.2rem"
                  }}
                >
                  {rev.text}
                </p>
              </div>

              <div
                style={{
                  paddingTop: "0.9rem",
                  borderTop: "1px solid rgba(185, 154, 91, 0.2)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--theme-heading-color)" }}>
                    {rev.author}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--theme-muted-color)" }}>
                    {rev.location}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted-gold-dark)",
                    fontFamily: "var(--font-serif-royal)",
                    letterSpacing: "0.04em"
                  }}
                >
                  {rev.productName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
