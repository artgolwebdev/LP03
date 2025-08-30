import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SectionDividerProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export function SectionDivider({ imageUrl, alt, className = "" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
      className={`relative h-32 sm:h-40 overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : { scale: 1.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover opacity-30"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Animated Pattern Overlay */}
      <motion.div
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            linear-gradient(45deg, transparent 48%, #00FF85 49%, #00FF85 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, #FFFFFF 49%, #FFFFFF 51%, transparent 52%)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Center Glow Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-24 h-24 bg-[#00FF85]/10 rounded-full blur-xl" />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: "100%",
              opacity: 0 
            }}
            animate={isInView ? { 
              y: "-20%",
              opacity: [0, 1, 0] 
            } : {}}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-[#00FF85] rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}