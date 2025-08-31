import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 50) { // Very low threshold to appear soon
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 z-[9999] p-6 rounded-2xl bg-gradient-to-br from-yellow-400/90 via-red-500/90 to-purple-600/90 border-4 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Large Arrow Icon */}
          <div className="relative z-10">
            <svg
              className="w-12 h-12 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/50 via-red-500/50 to-purple-500/50 blur-xl scale-110 opacity-75"></div>
          
          {/* Text Label */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <span className="text-white text-sm font-bold bg-black/70 px-3 py-1 rounded-full">
              TOP
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
