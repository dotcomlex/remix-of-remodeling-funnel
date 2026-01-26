import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Bathroom renovation images (uploaded)
import bathroomReno1 from "@/assets/gallery-bathroom-1.png";
import bathroomReno2 from "@/assets/gallery-bathroom-2.png";
import bathroomReno3 from "@/assets/gallery-bathroom-3.png";

// Kitchen renovation images (AI generated)
import kitchenReno1 from "@/assets/gallery-kitchen-1.jpg";
import kitchenReno2 from "@/assets/gallery-kitchen-2.jpg";

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { image: bathroomReno1, alt: "Bathroom renovation before and after transformation" },
    { image: bathroomReno2, alt: "Luxury bathroom remodel with blue tile and gold accents" },
    { image: bathroomReno3, alt: "Complete bathroom renovation with modern fixtures" },
    { image: kitchenReno1, alt: "Kitchen renovation before and after with white cabinets" },
    { image: kitchenReno2, alt: "Modern kitchen remodel transformation with island" },
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
            Transformations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Real Colorado <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            See what's possible — kitchens, bathrooms, basements, and more
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
      </div>
    </section>
  );
};

export default GallerySection;
