import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSmoothScroll } from './SmoothScrollContext';

interface SectionNavigationProps {
  sections: string[];
}

export function SectionNavigation({ sections }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState(0);
  const { locomotiveScroll } = useSmoothScroll();

  useEffect(() => {
    if (!locomotiveScroll) return;

    const handleScroll = () => {
      const scrollY = locomotiveScroll.scroll.y;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollY / windowHeight);
      setActiveSection(Math.max(0, Math.min(currentSection, sections.length - 1)));
    };

    locomotiveScroll.on('scroll', handleScroll);
    return () => {
      locomotiveScroll.off('scroll', handleScroll);
    };
  }, [locomotiveScroll, sections.length]);

  const scrollToSection = (index: number) => {
    if (locomotiveScroll) {
      const targetY = index * window.innerHeight;
      locomotiveScroll.scrollTo(targetY, {
        duration: 1.2,
        easing: [0.25, 0.1, 0.25, 1],
      });
    }
  };

  return (
    <>
      {/* Mobile Navigation - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        {/* Main navigation container */}
        <div className="relative">
          <div className="flex space-x-2 bg-black/30 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/20 shadow-2xl">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(index)}
                className={`group relative transition-all duration-300 px-3 py-2 rounded-xl ${
                  activeSection === index 
                    ? 'text-[#00FF85] bg-[#00FF85]/10' 
                    : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active section indicator */}
                {activeSection === index && (
                  <motion.div
                    layoutId="activeSectionMobile"
                    className="absolute inset-0 bg-[#00FF85]/20 rounded-xl border border-[#00FF85]/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Section name */}
                <span className="relative z-10 text-xs font-semibold tracking-wider">
                  {section}
                </span>
                
                {/* Glow effect for active section */}
                {activeSection === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-[#00FF85]/20 blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Enhanced progress bar */}
          <motion.div
            className="mt-4 w-40 h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#00FF85] via-[#00FF85]/90 to-[#00FF85]/70 rounded-full shadow-lg"
              style={{
                width: `${((activeSection + 1) / sections.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
          
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            className="mt-2 text-center"
          >
            <span className="text-xs text-white/40 font-medium tracking-wider">
              Swipe or tap to navigate
            </span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
