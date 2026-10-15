import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import thugilLogo from "../assets/thugil.png";

/**
 * FloatingAITryOnButton
 * Official floating trigger for THUGIL's AI Virtual Trial Room.
 * Uses the authentic thugil.png shuttle logo asset without alteration.
 * Size: 76-88px on desktop (82px), 64-72px on mobile (68px).
 * Clean "AI TRY-ON" label without any free trial text.
 */
export default function FloatingAITryOnButton({ onClick }) {
  const { isAITrialRoomOpen, setIsAITrialRoomOpen } = useShop();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      setIsAITrialRoomOpen(true);
    }
  };

  return (
    <div
      className="floating-ai-tryon-container"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 88
      }}
    >
      {/* Tooltip reading "Try Your Outfit with AI" */}
      <div
        id="ai-tryon-tooltip"
        role="tooltip"
        className={`floating-tryon-tooltip ${showTooltip ? "visible" : ""}`}
        aria-hidden={!showTooltip}
      >
        <span>Try Your Outfit with AI</span>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e);
          }
        }}
        aria-label="Open THUGIL AI Virtual Trial Room - Try Your Outfit with AI"
        aria-describedby="ai-tryon-tooltip"
        aria-haspopup="dialog"
        aria-expanded={isAITrialRoomOpen}
        tabIndex={0}
        className="floating-ai-tryon-btn gold-shimmer-btn animate-float"
      >
        {/* Softly Rounded Luminous Medallion for thugil.png */}
        <div className="thugil-tryon-medallion" aria-hidden="true">
          <img
            src={thugilLogo || "/thugil.png"}
            onError={(e) => {
              if (e.currentTarget.src !== window.location.origin + "/thugil.png") {
                e.currentTarget.src = "/thugil.png";
              }
            }}
            alt="THUGIL AI Try-On"
            className="thugil-tryon-icon-img"
          />
        </div>

        {/* Clean "AI TRY-ON" Label without "(2 Free)" or any trial badge */}
        <div className="thugil-tryon-content">
          <span className="thugil-tryon-label">AI TRY-ON</span>
        </div>
      </button>
    </div>
  );
}
