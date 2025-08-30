import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <motion.svg
      width="50"
      height="50"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg ${className}`}
    >
      <circle cx="100" cy="100" r="80" stroke="#00FF85" strokeWidth="3" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="8" fill="#00FF85" />
      <line x1="100" y1="20" x2="100" y2="40" stroke="#FFFFFF" strokeWidth="2" />
    </motion.svg>
  );
}
