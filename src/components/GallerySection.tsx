import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// New optimized gallery images
import drivewayBrick from "@/assets/gallery-driveway-brick.webp";
import patioBackyard from "@/assets/gallery-patio-backyard.webp";
import drivewayStucco from "@/assets/gallery-driveway-stucco.webp";
import drivewayWinter from "@/assets/gallery-driveway-winter.webp";
import patioEvening from "@/assets/gallery-patio-evening.webp";
import drivewayRanch from "@/assets/gallery-driveway-ranch.webp";
import drivewayFlorida from "@/assets/gallery-driveway-florida.webp";
import crewAction from "@/assets/gallery-crew-action.webp";

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const projects = [
    { image: drivewayBrick, alt: "Cracked driveway transformed to smooth concrete at brick Colorado home", label: "Driveway", location: "Denver, CO" },
    { image: patioBackyard, alt: "Backyard patio with weeds replaced with clean concrete surface", label: "Patio", location: "Littleton, CO" },
    { image: drivewayStucco, alt: "Weathered driveway replaced with fresh concrete at stucco home", label: "Driveway", location: "Boulder, CO" },
    { image: drivewayWinter, alt: "Winter-damaged spalling driveway replaced with new concrete", label: "Driveway", location: "Lakewood, CO" },
    { image: patioEvening, alt: "Worn brick patio transformed to smooth concrete outdoor living space", label: "Patio", location: "Aurora, CO" },
    { image: drivewayRanch, alt: "Stained ranch home driveway replaced with clean concrete", label: "Driveway", location: "Arvada, CO" },
    { image: drivewayFlorida, alt: "Patched uneven driveway replaced with uniform concrete", label: "Driveway", location: "Castle Rock, CO" },
    { image: crewAction, alt: "14er Concrete crew finishing a new patio pour", label: "Our Crew", location: "Colorado" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
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
            Real Colorado <span className="text-primary">Results</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            See what's possible — driveways, patios, walkways, and more
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
            {/* Project Label Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white font-medium text-lg">{projects[currentIndex].label}</p>
              <p className="text-white/70 text-sm">{projects[currentIndex].location}</p>
            </div>
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

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/25 hover:bg-muted-foreground/40 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6 overflow-x-auto pb-2 hide-scrollbar">
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
                width={64}
                height={64}
                loading="lazy"
                decoding="async"
                className="w-16 h-16 sm:w-18 sm:h-18 object-cover"
              />
            </button>
          ))}
        </div>

        {/* Credibility Statement */}
        <p className="text-center text-muted-foreground mt-8 text-sm font-medium">
          From simple refreshes to fully custom designs — we handle it all
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
