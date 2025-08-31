import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface SmoothScrollContextType {
  locomotiveScroll: LocomotiveScroll | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  locomotiveScroll: null,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll with optimized settings for faster, more comfortable scrolling
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
      // Faster, more responsive scrolling (lower lerp = faster)
      lerp: 0.05,
      // Higher multiplier for more responsive feel
      multiplier: 1.2,
      // Enable snap scrolling to sections
      scrollFromAnywhere: true,
      // Snap to sections
      snap: true,
      // Faster snap duration for quicker section transitions
      snapDuration: 0.8,
      // Smoother snap easing
      snapEasing: [0.25, 0.1, 0.25, 1],
      // Optimized smartphone settings
      smartphone: {
        smooth: true,
        lerp: 0.05,
        multiplier: 1.2,
        snap: true,
        snapDuration: 0.8,
      },
      // Optimized tablet settings
      tablet: {
        smooth: true,
        lerp: 0.05,
        multiplier: 1.2,
        snap: true,
        snapDuration: 0.8,
      },
    });

    // Add keyboard navigation with faster transitions
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!locomotiveScrollRef.current) return;
      
      const windowHeight = window.innerHeight;
      const currentScrollY = locomotiveScrollRef.current.scroll.y;
      const currentSection = Math.round(currentScrollY / windowHeight);
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          const nextSection = Math.min(currentSection + 1, Math.floor(document.body.scrollHeight / windowHeight) - 1);
          locomotiveScrollRef.current.scrollTo(nextSection * windowHeight, {
            duration: 0.8,
            easing: [0.25, 0.1, 0.25, 1],
          });
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          const prevSection = Math.max(currentSection - 1, 0);
          locomotiveScrollRef.current.scrollTo(prevSection * windowHeight, {
            duration: 0.8,
            easing: [0.25, 0.1, 0.25, 1],
          });
          break;
        case 'Home':
          e.preventDefault();
          locomotiveScrollRef.current.scrollTo(0, {
            duration: 0.8,
            easing: [0.25, 0.1, 0.25, 1],
          });
          break;
        case 'End':
          e.preventDefault();
          locomotiveScrollRef.current.scrollTo(document.body.scrollHeight - windowHeight, {
            duration: 0.8,
            easing: [0.25, 0.1, 0.25, 1],
          });
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ locomotiveScroll: locomotiveScrollRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
