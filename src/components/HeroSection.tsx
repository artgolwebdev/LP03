import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      data-scroll-section
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background */}
      <motion.div 
        data-scroll
        data-scroll-speed="-2"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -z-10"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1688550181338-e013f4b72aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMGJvb3RoJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NTY1ODYyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="DJ booth with neon lights"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        data-scroll
        data-scroll-speed="1"
        style={{ opacity }}
        className="text-center px-4 max-w-6xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 leading-tight tracking-tight"
          style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
          <span className="whitespace-nowrap">Your Sound.</span><br />
          <span className="whitespace-nowrap">Your Vibe.</span><br />
          <span className="text-[#00FF85] whitespace-nowrap">Your Night.</span>
        </motion.h1>
        
        {/* Animated subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.p
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [0.98, 1, 0.98]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-sm sm:text-base lg:text-lg font-light text-white/70 tracking-wider uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Experience the future of sound
          </motion.p>
        </motion.div>
        
        {/* Decorative Image Below Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto relative overflow-hidden rounded-full border-2 border-[#00FF85]/30 backdrop-blur-sm">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1572327918400-f1932eded229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMGhhbmRzJTIwdHVybnRhYmxlcyUyMG1peGluZ3xlbnwxfHx8fDE3NTY1ODczMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="DJ hands on turntables"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#00FF85]/20 to-black/40" />
          </div>
          {/* Rotating ring around image */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 mx-auto border border-[#00FF85]/50 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, #00FF85, transparent)"
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl font-medium text-white/90 max-w-2xl mx-auto"
        >
          Minimal. Futuristic. Pure Energy.
        </motion.p>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#00FF85] rounded-full"
          />
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-white/60 font-medium tracking-wider"
          >
            SCROLL
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="w-1 h-2 bg-white/40 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}