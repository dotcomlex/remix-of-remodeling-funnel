import { motion } from "framer-motion";
import Quiz from "./Quiz";
import heroImage from "@/assets/hero-colorado.jpg";
import logo from "@/assets/14er-logo.png";

import { Shield, CheckCircle, Clock, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen bg-hero overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful Colorado home with new concrete driveway and mountain backdrop"
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
          <img 
            src={logo} 
            alt="14er Renovations" 
            className="h-24 sm:h-28 lg:h-36 w-auto object-contain"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
          {/* Left column - Headline */}
          <motion.div 
            className="lg:w-1/2 xl:w-[55%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-3 lg:space-y-4">
              {/* Breaking Badge - separate with more margin */}
              <div className="mb-3 sm:mb-4">
                <span className="inline-block bg-red-600 text-white text-xs sm:text-sm font-bold uppercase px-2 py-1 rounded animate-pulse">
                  🚨 BREAKING
                </span>
              </div>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white leading-tight hero-text-shadow">
                Colorado homeowners can now get{" "}
                <span className="text-highlight">$2,000 OFF</span>{" "}
                any concrete project through our Winter Upgrade Program!
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-lg leading-relaxed hero-text-shadow mb-4 sm:mb-5">
                Trusted by Colorado homeowners for driveways, patios, walkways, and more. Book your FREE estimate and claim the <span className="font-semibold text-highlight">$2,000 OFF</span> offer today.
              </p>
              
              {/* Trust Strip - Single Line */}
              <div className="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-5 pt-3 text-white/80 text-xs sm:text-sm whitespace-nowrap">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  Licensed & Insured
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  1-Year Warranty
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Quiz */}
          <motion.div 
            className="lg:w-1/2 xl:w-[45%] flex flex-col items-center lg:items-end gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Quiz />
            
            {/* Trust badges row */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {/* Urgency badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-highlight/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-highlight/20 animate-pulse-glow">
                <Clock className="w-3.5 h-3.5 text-highlight flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-hero-foreground">Ends Jan 31 · 7 Spots Left</span>
              </div>
              
              {/* Google Rating Badge */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex items-center gap-1">
                  <span className="text-white font-bold text-sm">4.9</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-white/70 text-xs">50+ reviews</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
