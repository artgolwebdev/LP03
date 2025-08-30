import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatedLogo } from "./components/AnimatedLogo";
import { HeroSection } from "./components/HeroSection";
import { StorySection } from "./components/StorySection";
import { ServicesSection } from "./components/ServicesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { SectionDivider } from "./components/SectionDivider";
import { Toaster } from "./components/ui/sonner";
import { SmoothScrollProvider } from "./components/SmoothScrollContext";
import { SectionNavigation } from "./components/SectionNavigation";
import { Logo } from "./components/Logo";
import { storyData, sectionNames, sectionDividers } from "./constants";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntro, setIsIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setIsIntro(true);
  };

  const handleIntroComplete = () => {
    setIsIntro(false);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  // Prevent scroll during loading and intro
  useEffect(() => {
    if (isLoading || isIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading, isIntro]);



  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />

      {/* Intro Background */}
      <AnimatePresence>
        {isIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-black z-40"
          />
        )}
      </AnimatePresence>

      {/* Animated Logo */}
      {isIntro && <AnimatedLogo isIntro={isIntro} onIntroComplete={handleIntroComplete} />}

      {/* Fixed Navbar Logo */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-4 left-4 z-50"
          >
            <Logo />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <SmoothScrollProvider>
            <motion.main
              data-scroll-container
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
            {/* Hero Section */}
            <HeroSection />

            {/* Story Sections */}
            {storyData.map((section, index) => (
              <StorySection
                key={section.title}
                title={section.title}
                backgroundImage={section.backgroundImage}
                index={index}
              />
            ))}

            {/* Section Divider */}
            <SectionDivider 
              imageUrl={sectionDividers[0].imageUrl}
              alt={sectionDividers[0].alt}
            />

            {/* Services Section */}
            <ServicesSection />

            {/* Section Divider */}
            <SectionDivider 
              imageUrl={sectionDividers[1].imageUrl}
              alt={sectionDividers[1].alt}
            />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Section Divider */}
            <SectionDivider 
              imageUrl={sectionDividers[2].imageUrl}
              alt={sectionDividers[2].alt}
            />

            {/* Contact Section */}
            <ContactSection />
            </motion.main>
            
            {/* Section Navigation */}
            <SectionNavigation sections={sectionNames} />
          </SmoothScrollProvider>
        )}
      </AnimatePresence>

      {/* Custom CSS for smooth scrolling */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: #00FF85;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 133, 0.8);
        }
      `}</style>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}