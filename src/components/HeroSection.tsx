import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-colorado-home.png";
import logo from "@/assets/14er-logo.png";
import { Shield, CheckCircle, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-hero overflow-hidden">
      {/* Background image with overlay - brightened */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Beautiful Colorado home with modern kitchen remodel and mountain backdrop" 
          className="w-full h-full object-cover brightness-110" 
          fetchPriority="high" 
          loading="eager" 
          decoding="async" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 lg:py-12">
        {/* Logo - centered */}
        <motion.div 
          className="flex justify-center mb-6 lg:mb-8" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="14er Renovations" className="h-20 sm:h-28 lg:h-40 w-auto object-contain" />
        </motion.div>

        {/* Single centered column */}
        <div className="max-w-3xl mx-auto">
          
          {/* Headline and Subheadline - CENTERED */}
          <motion.div 
            className="text-center mb-8" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight hero-text-shadow mb-4">
              This New Winter Upgrade Program Helps Colorado Homeowners Save{" "}
              <span className="text-highlight">$2,000</span> on their remodel
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed hero-text-shadow max-w-2xl mx-auto">
              Only a few spots are left. Fill this quick form to see if you qualify for a FREE consultation and $2,000 off your project!
            </p>
          </motion.div>

          {/* CTA Card - CENTERED */}
          <motion.div 
            className="flex justify-center" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-full max-w-lg">
              <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-6 sm:p-8 w-full border border-primary/20">
                
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                    Check Availability
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Takes less than 30 seconds to complete
                  </p>
                </div>

                <Link to="/qualify">
                  <Button 
                    variant="cta" 
                    size="xl" 
                    className="w-full group"
                  >
                    Check Availability Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">30 seconds</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">100+ qualified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Strip */}
          <motion.div 
            className="flex items-center justify-center gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm mt-6"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              Licensed & Insured
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              1-Year Warranty
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
