import { lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold sections for faster initial load
const TrustBadgesSection = lazy(() => import("@/components/TrustBadgesSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));

const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<div className="h-24 bg-gray-50" />}>
        <TrustBadgesSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-muted" />}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={<div className="h-96 section-gradient-dark" />}>
        <ReviewsSection />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
