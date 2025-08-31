import React from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StorySectionProps {
  title: string;
  backgroundImage: string;
  index: number;
  soundcloudTrack?: string;
  trackTitle?: string;
  artist?: string;
  duration?: string;
  trackUrl?: string;
  artistUrl?: string;
}

export function StorySection({ 
  title, 
  backgroundImage, 
  index, 
  soundcloudTrack, 
  trackTitle, 
  artist, 
  duration,
  trackUrl,
  artistUrl
}: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30%" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Letter reveal animation
  const letters = title.split("");

  return (
    <section 
      ref={ref}
      data-scroll-section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Parallax Background */}
      <motion.div 
        data-scroll
        data-scroll-speed="-1"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] -z-10"
      >
        <ImageWithFallback
          src={backgroundImage}
          alt={`Background for ${title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, rgba(0, 255, 133, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)`
          }}
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <div 
          data-scroll
          data-scroll-speed="2"
          className="text-center mb-16"
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-6xl sm:text-8xl lg:text-[12rem] xl:text-[16rem] font-black text-white leading-none tracking-tighter whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
            >
              {letters.map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  initial={{ y: 200, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: letterIndex * 0.1,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                  style={{
                    textShadow: "0 0 30px rgba(0, 255, 133, 0.5)"
                  }}
                >
                  {letter === "." ? (
                    <span className="text-[#00FF85]">.</span>
                  ) : (
                    letter
                  )}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* Accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-[#00FF85] to-transparent mt-8 max-w-md mx-auto"
          />

          {/* Decorative elements below title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center items-center space-x-6 mt-12"
          >
            {/* Left element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border border-[#00FF85]/40 rounded-full relative"
            >
              <div className="absolute inset-2 bg-[#00FF85]/60 rounded-full" />
            </motion.div>

            {/* Center pulse */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-[#00FF85] rounded-full"
            />

            {/* Right element */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border border-white/40 rounded-full relative"
            >
              <div className="absolute inset-1 bg-white/60 rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* SoundCloud Widget - Simplified and Enhanced */}
        <motion.div
          className="max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-all duration-500">
              {/* 3D Glass Effect Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-black/30 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-red-500/10 to-purple-500/10 rounded-3xl"></div>
              
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-purple-500/20 opacity-50 blur-sm"></div>
              
              {/* Content Container */}
              <div className="relative z-10">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 bg-black/30 backdrop-blur-sm">
                  <iframe
                    width="100%"
                    height="200"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={soundcloudTrack}
                    className="rounded-2xl"
                    title={`${trackTitle} by ${artist}`}
                  />
                </div>
                <div className="text-center">
                  <div className="mb-6">
                    <a
                      href={artistUrl}
                      title={artist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 no-underline font-black text-2xl tracking-wider drop-shadow-lg"
                      style={{ fontFamily: "'Orbitron', 'Audiowide', monospace" }}
                    >
                      {artist}
                    </a>
                  </div>
                </div>
              </div>
              
              {/* 3D Edge Highlights */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent rounded-t-3xl"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent rounded-b-3xl"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-red-400/60 to-transparent rounded-l-3xl"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400/60 to-transparent rounded-r-3xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Side elements */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block"
        >
          <div className="w-20 h-1 bg-[#00FF85] mb-4" />
          <p className="text-white/60 text-sm font-medium tracking-widest transform -rotate-90 origin-left">
            {String(index + 1).padStart(2, '0')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}