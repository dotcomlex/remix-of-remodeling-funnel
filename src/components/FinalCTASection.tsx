import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24 cta-gradient text-hero-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
          <Gift className="w-4 h-4" />
          <span>Limited Winter Spots Available</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Winter Upgrade Program:{" "}
          <span className="text-primary">$2,000 Off</span> Any Concrete Installation
        </h2>

        <p className="text-base sm:text-lg lg:text-xl opacity-80 mb-8 max-w-2xl mx-auto">
          Don't wait until spring. Get your driveway, patio, or walkway installed now and save.
        </p>

        <Button variant="cta" size="xl" onClick={scrollToTop} className="group">
          Claim My Free Estimate
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-sm opacity-60 mt-6">
          No obligations • Free on-site estimate • One-year warranty included
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
