import { ChefHat, Droplets, Home, Maximize, Hammer } from "lucide-react";
import serviceDriveway from "@/assets/service-driveway.jpg";
import servicePatio from "@/assets/service-patio.jpg";
import serviceWalkway from "@/assets/service-walkway.jpg";
import serviceRetainingWall from "@/assets/service-retaining-wall.jpg";
import serviceCustom from "@/assets/service-custom.jpg";

const services = [
  {
    image: serviceDriveway,
    title: "Kitchens",
    tagline: "The heart of your home",
    icon: ChefHat,
  },
  {
    image: servicePatio,
    title: "Bathrooms",
    tagline: "Your private retreat",
    icon: Droplets,
  },
  {
    image: serviceWalkway,
    title: "Basements",
    tagline: "Unlock hidden potential",
    icon: Home,
  },
  {
    image: serviceRetainingWall,
    title: "Home Additions",
    tagline: "Expand your space",
    icon: Maximize,
  },
  {
    image: serviceCustom,
    title: "Custom Projects",
    tagline: "Your vision, our expertise",
    icon: Hammer,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-2">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Expert <span className="text-primary">Remodeling Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <div 
              key={index} 
              className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="aspect-[4/5] relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5" />
                  <h3 className="text-sm sm:text-lg font-bold text-white">{service.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{service.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mt-3 sm:mt-4">
          {services.slice(3).map((service, index) => (
            <div 
              key={index + 3} 
              className="group relative rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="aspect-[4/5] relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-center">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1.5" />
                  <h3 className="text-sm sm:text-lg font-bold text-white">{service.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{service.tagline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-muted-foreground mt-6 text-sm sm:text-base">
          From kitchen refreshes to whole-home renovations — no matter the project, we've got you covered.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
