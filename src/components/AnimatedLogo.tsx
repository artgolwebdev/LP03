import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  isIntro: boolean;
  onIntroComplete: () => void;
}

export function AnimatedLogo({ isIntro, onIntroComplete }: AnimatedLogoProps) {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    if (isIntro) {
      const timer = setTimeout(() => {
        onIntroComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isIntro, onIntroComplete]);

  return (
    <motion.div
      initial={isIntro ? { scale: 1 } : { scale: 0.3 }}
      animate={isIntro ? { scale: 1 } : { scale: 0.3 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`${
        isIntro 
          ? "fixed inset-0 flex items-center justify-center z-50" 
          : "fixed top-4 left-4 z-50"
      }`}
    >
      <motion.svg
        width={isIntro ? "200" : "60"}
        height={isIntro ? "200" : "60"}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* DJ Logo - Stylized turntable */}
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#00FF85"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="50"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="8"
          fill="#00FF85"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        <motion.line
          x1="100"
          y1="20"
          x2="100"
          y2="40"
          stroke="#FFFFFF"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        <motion.text
          x="100"
          y="210"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="16"
          fontWeight="bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isIntro ? 1 : 0, y: isIntro ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          VIBES
        </motion.text>
      </motion.svg>
    </motion.div>
  );
}