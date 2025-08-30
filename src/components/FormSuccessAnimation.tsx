import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { Check, Music, Zap, Star } from "lucide-react";

interface FormSuccessAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function FormSuccessAnimation({ isVisible, onComplete }: FormSuccessAnimationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4000); // Auto-dismiss after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const successText = "MESSAGE SENT!";
  const letters = successText.split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onComplete}
        >
          {/* Background Pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, #00FF85 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, #00FF85 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)
              `
            }}
          />

          {/* Vinyl Record Animation */}
          <motion.div
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: 1, rotate: 720, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-80 h-80 rounded-full border-4 border-[#00FF85]/30"
            style={{
              background: `
                radial-gradient(circle at center, 
                  transparent 60px,
                  #333 61px,
                  #333 65px,
                  transparent 66px,
                  transparent 80px,
                  #333 81px,
                  #333 85px,
                  transparent 86px,
                  transparent 100px,
                  #333 101px,
                  #333 105px,
                  transparent 106px
                )
              `
            }}
          >
            {/* Center hole */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black rounded-full border-2 border-[#00FF85]" />
            
            {/* Rotating arm */}
            <motion.div
              initial={{ rotate: -45 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-4 right-4 w-32 h-1 bg-[#00FF85] origin-left rounded-full"
              style={{ transformOrigin: "0% 50%" }}
            />
          </motion.div>

          {/* Continuous Vinyl Rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full"
          >
            {/* Record lines */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="absolute border border-white/20 rounded-full"
                style={{
                  width: `${280 - i * 30}px`,
                  height: `${280 - i * 30}px`,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            ))}
          </motion.div>

          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#00FF85] rounded-full flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-black" strokeWidth={3} />
          </motion.div>

          {/* Main Success Text */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-20 text-center"
          >
            <div className="overflow-hidden">
              <h2 
                className="text-4xl sm:text-6xl font-black text-white mb-4"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
              >
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + index * 0.05,
                      ease: "easeOut"
                    }}
                    className="inline-block"
                    style={{
                      textShadow: "0 0 20px rgba(0, 255, 133, 0.6)"
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="text-lg text-white/80"
            >
              Your message is on its way to the studio!
            </motion.p>
          </motion.div>

          {/* Floating Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                scale: 0, 
                x: 0, 
                y: 0,
                opacity: 0 
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos(i * 30 * (Math.PI / 180)) * (200 + Math.random() * 100),
                y: Math.sin(i * 30 * (Math.PI / 180)) * (200 + Math.random() * 100),
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: 1.5 + Math.random() * 0.5,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {i % 4 === 0 && <Music className="w-6 h-6 text-[#00FF85]" />}
              {i % 4 === 1 && <Zap className="w-6 h-6 text-white" />}
              {i % 4 === 2 && <Star className="w-6 h-6 text-[#00FF85]" />}
              {i % 4 === 3 && (
                <div className="w-3 h-3 bg-white rounded-full" />
              )}
            </motion.div>
          ))}

          {/* Sound Wave Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`wave-${i}`}
              initial={{ 
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 800,
                y: (Math.random() - 0.5) * 600,
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 1.5 + Math.random(),
                delay: 0.5 + Math.random() * 2,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: i % 2 === 0 ? "#00FF85" : "#FFFFFF",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#00FF85" : "#FFFFFF"}`
                }}
              />
            </motion.div>
          ))}

          {/* Pulsing Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 3, 5],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 2,
                delay: 1 + i * 0.3,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#00FF85] rounded-full w-20 h-20"
            />
          ))}

          {/* Corner Decorations */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-8 left-8 w-16 h-16 border-2 border-[#00FF85]/50 rounded-lg"
          />
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{ duration: 2, delay: 0.7 }}
            className="absolute top-8 right-8 w-16 h-16 border-2 border-white/50 rounded-full"
          />
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 2, delay: 0.9 }}
            className="absolute bottom-8 left-8 w-16 h-16 border-2 border-[#00FF85]/50 rounded-full"
          />
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: -360 }}
            transition={{ duration: 2, delay: 1.1 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-2 border-white/50 rounded-lg"
          />

          {/* Click to dismiss hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
          >
            Click anywhere to continue
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}