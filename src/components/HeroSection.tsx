import { motion } from "framer-motion";
import Quiz from "./Quiz";
import heroImage from "@/assets/hero-colorado-home.png";
import logo from "@/assets/14er-logo.png";
import { Shield, CheckCircle } from "lucide-react";
const HeroSection = () => {
  return <section id="hero" className="relative bg-hero overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Beautiful Colorado home with modern kitchen remodel and mountain backdrop" className="w-full h-full object-cover" fetchPriority="high" loading="eager" decoding="async" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 lg:py-10">
        {/* Logo - centered and larger */}
        <motion.div className="flex justify-center mb-0 lg:mb-2" initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5
      }}>
          <img src={logo} alt="14er Renovations" className="h-16 sm:h-24 lg:h-36 w-auto object-contain" />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-12">
          {/* Left column - Headline */}
          <motion.div className="lg:w-1/2 xl:w-[55%]" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <div className="space-y-6 sm:space-y-7 lg:space-y-8">
              {/* Breaking Badge - separate with more margin */}
              <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-red-600 text-white text-xs sm:text-sm font-bold uppercase px-2 py-1 rounded">
                  🚨 BREAKING
                </span>
              </div>
              
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-extrabold text-white leading-tight hero-text-shadow">
                Transform your kitchen, bathroom, or any space into something you'll love. Fill out the form below to claim your{" "}
                <span className="text-highlight">$2,000 discount</span>{" "}
                and schedule your free consultation.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-lg leading-relaxed hero-text-shadow mt-2">
                Transform your kitchen, bathroom, or any space into something you'll love. Fill out the form below to claim your <span className="font-semibold text-highlight">$2,000 discount</span> and schedule your free consultation.
              </p>

              
            </div>
          </motion.div>

          {/* Right column - Quiz */}
          <motion.div className="lg:w-1/2 xl:w-[45%] flex flex-col items-center lg:items-end gap-4" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <Quiz />
            
            {/* Trust Strip - Below Quiz */}
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
    </section>;
};
export default HeroSection;