"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import LightRays from "@/components/LightRays";

// Optimized wave clip path component for better mobile performance
function WaveClipPath({ progress, isMobile, children }: { progress: number; isMobile: boolean; children: React.ReactNode }) {
  const clipPath = useMemo(() => {
    const baseY = 100 - progress;
    const wavePoints = [];
    
    // Use fewer points on mobile for better performance (every 2% vs 1%)
    const pointInterval = isMobile ? 2 : 1;
    
    // Generate smooth wave points
    for (let x = 0; x <= 100; x += pointInterval) {
      // Use multiple sine waves with different frequencies for organic feel
      const wave1 = Math.sin(progress * 0.07 + x * 0.15) * 10;
      const wave2 = Math.sin(progress * 0.05 + x * 0.12) * 4;
      const wave3 = Math.sin(progress * 0.03 + x * 0.08) * 2;
      
      // Combine waves for smooth, organic effect
      const waveOffset = wave1 + wave2 + wave3;
      const y = Math.max(0, baseY + waveOffset);
      wavePoints.push(`${x}% ${y}%`);
    }
    
    // Complete the polygon
    wavePoints.push('100% 100%');
    wavePoints.push('0% 100%');
    
    return `polygon(${wavePoints.join(', ')})`;
  }, [progress, isMobile]);

  return (
    <div
      style={{
        clipPath,
        transition: 'clip-path 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}

export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'zoomIn' | 'zoomOut'>('loading');
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [targetScale, setTargetScale] = useState(0.12);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Initializing systems...");

  useEffect(() => {
    // Detect mobile vs desktop
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Calculate target position and scale for Topbar logo
    const calculateTargetPosition = () => {
      const isMobileDevice = window.innerWidth < 768;
      
      // Topbar logo sizes (approximate computed sizes):
      // Mobile: text-2xl ~ 1.5rem = ~24px
      // Tablet: md:text-3xl ~ 1.875rem = ~30px  
      // Desktop: lg:text-4xl ~ 2.25rem = ~36px
      // Loading screen logo sizes:
      // Mobile: text-8xl ~ 6rem = ~96px
      // Tablet: md:text-[12rem] = 192px
      // Desktop: lg:text-[16rem] = 256px
      
      // Calculate scale ratio to match Topbar logo size exactly
      // Using more accurate calculations based on actual rendered sizes
      let scaleRatio;
      if (isMobileDevice) {
        // Mobile: text-2xl ≈ 1.5rem ≈ 24px, text-8xl ≈ 6rem ≈ 96px
        scaleRatio = 24 / 96; // ~0.25
        // Mobile: logo is on the left with px-3 = 12px, pt-3 = 12px (top padding)
        // Match desktop offset ratio for consistent alignment
        const logoY = 12 + 46; // Top padding + same offset as desktop for consistency
        setTargetPosition({ 
          x: -window.innerWidth / 2 + 12, 
          y: -window.innerHeight / 2 + logoY
        });
      } else {
        const isLargeScreen = window.innerWidth >= 1024;
        // Desktop sizes: text-4xl ≈ 2.25rem ≈ 36px, text-[16rem] = 256px
        // Tablet: text-3xl ≈ 1.875rem ≈ 30px, text-[12rem] = 192px
        scaleRatio = isLargeScreen ? 36 / 256 : 30 / 192; // ~0.14 (lg) or ~0.156 (md)
        
        // Desktop: logo is at md:left-[18%] md:-translate-x-1/2 (centered at 18%)
        // Topbar has md:pt-6 = 1.5rem = 24px
        const logoCenterX = window.innerWidth * 0.18; // 18% from left edge
        // Position to match Topbar logo exactly - very slight adjustment down
        const logoY = 24 + 46; // Top padding + offset to align properly
        setTargetPosition({ 
          x: -window.innerWidth / 2 + logoCenterX, 
          y: -window.innerHeight / 2 + logoY 
        });
      }
      
      setTargetScale(scaleRatio);
    };

    calculateTargetPosition();
    window.addEventListener('resize', calculateTargetPosition);
    return () => window.removeEventListener('resize', calculateTargetPosition);
  }, []);

  useEffect(() => {
    // Deployment-style loading messages - fewer messages with constant timing
    const loadingMessages = [
      { threshold: 0, message: "Initializing systems..." },
      { threshold: 20, message: "Building assets..." },
      { threshold: 40, message: "Optimizing performance..." },
      { threshold: 60, message: "Deploying application..." },
      { threshold: 80, message: "Finalizing setup..." },
    ];

    const startTime = Date.now();
    let animationFrame: number;
    let animationComplete = false;
    let lastUpdateTime = 0;
    
    // Animation duration for all devices
    const animationDuration = 6000; // 6 seconds
    
    // Calculate constant time per message (equal duration for each)
    const messageInterval = animationDuration / loadingMessages.length; // Equal time for each message
    let currentMessageIndex = 0;
    
    // Throttle updates on mobile for better performance (every ~16ms = ~60fps, vs every frame)
    const throttleInterval = isMobile ? 16 : 0; // 16ms = ~60fps

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const t = Math.min(elapsed / animationDuration, 1); // Normalized time (0 to 1)
      
      if (t < 1) {
        // Update message based on constant timing (not progress-based)
        const expectedIndex = Math.floor(elapsed / messageInterval);
        if (expectedIndex < loadingMessages.length && expectedIndex !== currentMessageIndex) {
          currentMessageIndex = expectedIndex;
          setLoadingMessage(loadingMessages[currentMessageIndex].message);
        }
        
        // Throttle updates on mobile
        if (!isMobile || (now - lastUpdateTime) >= throttleInterval) {
          // Ease-in-out cubic for smooth animation
          const eased = t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
          
          const calculatedProgress = eased * 100;
          setProgress(calculatedProgress);
          
          lastUpdateTime = now;
        }
        
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // Ensure we reach exactly 100%
        setProgress(100);
        animationComplete = true;
        
        // Start zoom-in phase
        setAnimationPhase('zoomIn');
        
        // After zoom-in, start zoom-out transition
        setTimeout(() => {
          setAnimationPhase('zoomOut');
          
          // After zoom-out completes, hide loader
          setTimeout(() => {
            setIsLoading(false);
          }, 800); // Duration of zoom-out animation
        }, 500); // Duration of zoom-in animation
      }
    };

    // Start the time-based animation
    animationFrame = requestAnimationFrame(updateProgress);

    // Fallback safety: ensure it completes even if something goes wrong
    const maxTimeout = setTimeout(() => {
      if (!animationComplete) {
        cancelAnimationFrame(animationFrame);
        setProgress(100);
        setAnimationPhase('zoomIn');
        setTimeout(() => {
          setAnimationPhase('zoomOut');
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }, 500);
      }
    }, animationDuration + 500);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(maxTimeout);
    };
  }, [isMobile]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 w-full h-full flex items-center justify-center z-[100]"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #0F0F0F 25%, #111111 50%, #0F0F0F 75%, #0A0A0A 100%)',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Light Rays Background Effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>

          {/* Loading Content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center gap-8"
            animate={{
              scale: animationPhase === 'zoomIn' ? 1.4 : animationPhase === 'zoomOut' 
                ? (isMobile ? 0 : targetScale) 
                : 1,
              x: animationPhase === 'zoomOut' && !isMobile ? targetPosition.x : 0,
              y: animationPhase === 'zoomOut' && !isMobile ? targetPosition.y : 0,
              opacity: animationPhase === 'zoomOut' && isMobile ? 0 : 1,
            }}
            transition={{
              duration: animationPhase === 'zoomIn' ? 0.5 : animationPhase === 'zoomOut' 
                ? (isMobile ? 0.6 : 0.8) 
                : 0,
              ease: animationPhase === 'zoomIn' ? [0.34, 1.56, 0.64, 1] : animationPhase === 'zoomOut' 
                ? [0.4, 0, 0.2, 1]
                : 'linear',
            }}
            style={{
              transformOrigin: 'center center',
            }}
          >
             {/* Simple "manu" Logo - Big size, fills from bottom to top */}
             <div className="relative">
               {/* Base grey text */}
               <div
                 className="font-bold text-8xl md:text-[12rem] lg:text-[16rem] lowercase text-gray-500 relative"
                 style={{ 
                   fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif', 
                   fontWeight: 700, 
                   letterSpacing: '-0.02em',
                   lineHeight: '1',
                 }}
               >
                 manu
               </div>
               
               {/* White text that fills from bottom to top with wavy effect */}
               <div
                 className="absolute inset-0 font-bold text-8xl md:text-[12rem] lg:text-[16rem] lowercase text-white overflow-hidden"
                 style={{ 
                   fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif', 
                   fontWeight: 700, 
                   letterSpacing: '-0.02em',
                   lineHeight: '1',
                 }}
               >
                 <WaveClipPath progress={progress} isMobile={isMobile}>
                   manu
                 </WaveClipPath>
               </div>
             </div>

            {/* Percentage Counter and Loading Message */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: animationPhase === 'zoomOut' ? 0 : 1,
                  scale: animationPhase === 'zoomOut' ? 0 : 1,
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-white tabular-nums"
                style={{
                  fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                {Math.round(progress)}%
              </motion.div>
              
              {/* Loading Message */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: animationPhase === 'zoomOut' ? 0 : 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm md:text-base text-gray-400 tracking-wider uppercase"
                  style={{
                    fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
                    letterSpacing: '0.15em',
                    fontSize: '0.75rem',
                  }}
                >
                  {loadingMessage}
                </motion.p>
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

