import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-colorado-home.png";
import logo from "@/assets/14er-logo.png";
import { Shield, CheckCircle, ArrowRight, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="relative bg-hero overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Beautiful Colorado home with modern kitchen remodel and mountain backdrop" 
          className="w-full h-full object-cover" 
          fetchPriority="high" 
          loading="eager" 
          decoding="async" 
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 lg:py-10">
        {/* Logo - centered and larger */}
        <motion.div 
          className="flex justify-center mb-0 lg:mb-2" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="14er Renovations" className="h-16 sm:h-24 lg:h-36 w-auto object-contain" />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          {/* Left column - Headline */}
          <motion.div 
            className="lg:w-1/2 xl:w-[55%]" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 sm:space-y-7 lg:space-y-8">
              {/* Breaking Badge - separate with more margin */}
              <div className="mb-4 sm:mb-5">
                <span className="inline-block bg-red-600 text-white text-xs sm:text-sm font-bold uppercase px-2 py-1 rounded">
                  🚨 BREAKING
                </span>
              </div>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white leading-tight hero-text-shadow">
                New Winter Program Gives Colorado Homeowners{" "}
                <span className="text-highlight">$2,000 OFF</span>{" "}
                Any Remodeling Project—Only 7 Spots Left
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-lg leading-relaxed hero-text-shadow mt-2">
                Transform your kitchen, bathroom, or any space into something you'll love. Take a quick 5-question quiz to see if you qualify for your <span className="font-semibold text-highlight">$2,000 discount</span>.
              </p>
            </div>
          </motion.div>

          {/* Right column - CTA Card */}
          <motion.div 
            className="lg:w-1/2 xl:w-[45%] flex flex-col items-center lg:items-end gap-4" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Main CTA Card */}
            <div className="w-full max-w-md">
              <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-6 sm:p-8 w-full border border-primary/20">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    See If You Qualify
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Answer 5 quick questions to see if you qualify for $2,000 off your remodeling project.
                  </p>
                </div>

                <Link to="/qualify">
                  <Button 
                    variant="cta" 
                    size="xl" 
                    className="w-full group"
                  >
                    Start Qualification Quiz
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 pt-5 border-t border-border/50">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    Takes less than 60 seconds
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    100+ homeowners qualified
                  </span>
                </div>
              </div>
            </div>
            
            {/* Trust Strip - Below CTA */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                1-Year Warranty
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
