import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

export function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");

  const loadingTexts = [
    "Loading beats...",
    "Syncing the vibe...", 
    "Setting up the stage...",
    "Almost ready..."
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
          return 100;
        }
        // Slower progress at start, faster in middle, slower at end for realistic feel
        const increment = prev < 20 ? 1 : prev < 80 ? 3 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // Change loading text every 800ms
    const textInterval = setInterval(() => {
      setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Background patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 opacity-5"
              style={{
                background: `
                  linear-gradient(45deg, transparent 30%, #00FF85 31%, #00FF85 33%, transparent 34%),
                  linear-gradient(-45deg, transparent 30%, #FFFFFF 31%, #FFFFFF 33%, transparent 34%)
                `,
                backgroundSize: "60px 60px"
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-4">
            {/* Main logo animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12"
            >
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                {/* Outer spinning ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="#00FF85"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10 5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Middle ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="60"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5 10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="40"
                  stroke="#00FF85"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Center dot */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="#00FF85"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                
                {/* Needle */}
                <motion.line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="40"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.svg>
            </motion.div>

            {/* Loading text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {loadingText}
              </h2>
            </motion.div>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#00FF85] to-white rounded-full"
                />
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white/60 text-sm mt-2 text-center"
              >
                {progress}%
              </motion.p>
            </div>

            {/* Floating dots animation */}
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 bg-[#00FF85] rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}