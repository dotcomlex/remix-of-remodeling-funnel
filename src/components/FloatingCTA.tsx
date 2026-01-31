import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50"
        >
          <Link to="/qualify">
            <Button
              variant="cta"
              size="lg"
              className="w-full sm:w-auto shadow-premium text-sm sm:text-base font-semibold px-6 py-4 h-auto"
            >
              Claim $2,000 Discount
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
