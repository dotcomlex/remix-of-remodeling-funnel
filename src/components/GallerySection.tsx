import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Gallery images - optimized webp before/after renovation photos
import galleryKitchenModern from "@/assets/gallery-kitchen-modern.webp";
import galleryKitchenNavy from "@/assets/gallery-kitchen-navy.webp";
import galleryKitchenDark from "@/assets/gallery-kitchen-dark.webp";
import galleryKitchenWhite from "@/assets/gallery-kitchen-white.webp";
import galleryBathroomSpa from "@/assets/gallery-bathroom-spa.webp";
import galleryBathModern from "@/assets/gallery-bath-modern.webp";
import galleryBathDouble from "@/assets/gallery-bath-double.webp";
import galleryBathWalnut from "@/assets/gallery-bath-walnut.webp";

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { image: galleryKitchenModern, alt: "Kitchen renovation before and after with modern wood cabinets" },
    { image: galleryKitchenNavy, alt: "Kitchen transformation with navy blue cabinets and marble backsplash" },
    { image: galleryKitchenDark, alt: "Small kitchen remodel with dark modern cabinets" },
    { image: galleryKitchenWhite, alt: "Full kitchen renovation with white shaker cabinets" },
    { image: galleryBathroomSpa, alt: "Bathroom before and after with spa-like marble shower" },
    { image: galleryBathModern, alt: "Bathroom renovation with modern floating vanity and walk-in shower" },
    { image: galleryBathDouble, alt: "Bathroom transformation with double vanity and arched mirrors" },
    { image: galleryBathWalnut, alt: "Bathroom remodel with walnut vanity and LED mirror" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 lg:py-24 section-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Work
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            See What's Possible - <span className="text-primary">Real Home Transformations</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Whether you're dreaming of a new kitchen, spa-like bathroom, or finished basement—we've got you covered.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated aspect-square bg-muted">
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].alt}
              width={800}
              height={800}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/95 backdrop-blur-sm hover:bg-card shadow-lg border-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/95 backdrop-blur-sm hover:bg-card shadow-lg border-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mt-6 overflow-x-auto pb-2 hide-scrollbar">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 bg-muted ${
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={project.image}
                alt={project.alt}
                width={72}
                height={72}
                loading="lazy"
                decoding="async"
                className="w-[72px] h-[72px] sm:w-20 sm:h-20 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Inline CTA - matches hero button style */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <motion.div className="animate-subtle-rock">
            <Link to="/qualify">
              <Button 
                variant="cta" 
                size="xl" 
                className="group shadow-2xl text-lg px-8 py-6 animate-cta-glow"
              >
                Check Availability Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
