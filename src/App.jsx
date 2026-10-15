import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedCollections from "./components/FeaturedCollections";
import NewArrivalsSection from "./components/NewArrivalsSection";
import CategoryPage from "./components/CategoryPage";
import DrapeStudio from "./components/DrapeStudio";
import ArtisanStory from "./components/ArtisanStory";
import LookbookMarquee from "./components/LookbookMarquee";
import ReviewsSection from "./components/ReviewsSection";
import QuickViewModal from "./components/QuickViewModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import SizeGuideModal from "./components/SizeGuideModal";
import OrderConfirmationModal from "./components/OrderConfirmationModal";
import ToastContainer from "./components/ToastContainer";
import SareeDrapeLoader from "./components/SareeDrapeLoader";
import AmbientBackground from "./components/AmbientBackground";
import AITrialRoomModal from "./components/AITrialRoomModal";
import AIAdminDashboardModal from "./components/AIAdminDashboardModal";
import Footer from "./components/Footer";
import { Scissors } from "lucide-react";

function MainContent() {
  const { currentView, setIsFabricStudioOpen } = useShop();

  return (
    <div className="thugil-app" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Saree Dress Opening Loading Animation */}
      <SareeDrapeLoader />

      {/* Ambient Flowing Silk Background Animation */}
      <AmbientBackground />

      {/* Royal Mega Navigation Header */}
      <Navbar />

      {/* Dynamic View: Dedicated Category Page OR Complete Homepage */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {currentView === "category" ? (
          <CategoryPage />
        ) : (
          <>
            <HeroSection />
            <FeaturedCollections />
            <NewArrivalsSection />
            <LookbookMarquee />
            <ArtisanStory />
            <ReviewsSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <DrapeStudio />
      <QuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <SizeGuideModal />
      <OrderConfirmationModal />
      <AITrialRoomModal />
      <AIAdminDashboardModal />
      <ToastContainer />

      {/* Floating Bespoke Studio Trigger */}
      <button
        onClick={() => setIsFabricStudioOpen(true)}
        aria-label="Open Bespoke Drape Studio Customizer"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 80,
          backgroundColor: "var(--burgundy)",
          color: "var(--warm-ivory)",
          border: "1.5px solid var(--muted-gold)",
          borderRadius: "30px",
          padding: "0.75rem 1.35rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          boxShadow: "0 10px 25px rgba(109, 31, 50, 0.4), 0 0 15px rgba(185, 154, 91, 0.4)",
          transition: "all 0.3s ease"
        }}
        className="gold-shimmer-btn animate-float"
      >
        <Scissors size={16} color="var(--muted-gold-light)" />
        <span>Bespoke Studio</span>
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
