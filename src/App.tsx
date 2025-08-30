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

  const storyData = [
    {
      title: "BOLD.",
      backgroundImage: "https://images.unsplash.com/photo-1676021944161-89effebfd0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMG5lb258ZW58MXx8fHwxNzU2NTg2MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "ENERGY.",
      backgroundImage: "https://images.unsplash.com/photo-1558258021-971dd2148be5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBlbmVyZ3l8ZW58MXx8fHwxNzU2NTg2MjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "MOMENT.",
      backgroundImage: "https://images.unsplash.com/photo-1604025707953-41752f5793ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcHVycGxlJTIwbGlnaHRzfGVufDF8fHx8MTc1NjU4NjI1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Section names for navigation
  const sectionNames = ["Hero", "Bold", "Energy", "Moment", "Services", "Testimonials", "Contact"];

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
            <motion.svg
              width="50"
              height="50"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <circle cx="100" cy="100" r="80" stroke="#00FF85" strokeWidth="3" fill="none" />
              <circle cx="100" cy="100" r="50" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              <circle cx="100" cy="100" r="8" fill="#00FF85" />
              <line x1="100" y1="20" x2="100" y2="40" stroke="#FFFFFF" strokeWidth="2" />
            </motion.svg>
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
              imageUrl="https://images.unsplash.com/photo-1676021944161-89effebfd0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG5lb24lMjBnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDF8fHx8MTc1NjU4NzMyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Abstract neon patterns"
            />

            {/* Services Section */}
            <ServicesSection />

            {/* Section Divider */}
            <SectionDivider 
              imageUrl="https://images.unsplash.com/photo-1702308632277-ab0ccf044d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFic3RyYWN0JTIwbXVzaWN8ZW58MXx8fHwxNzU2NTg3MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Vinyl records and music equipment"
            />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Section Divider */}
            <SectionDivider 
              imageUrl="https://images.unsplash.com/photo-1721623777765-1381ba32859c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY29uY2VydCUyMHN0YWdlfGVufDF8fHx8MTc1NjU4NzMzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Neon concert stage atmosphere"
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