"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LightRays from "@/components/LightRays";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 90% (will complete when route loads)
    let progressInterval: NodeJS.Timeout;
    let currentProgress = 0;

    const updateProgress = () => {
      if (currentProgress < 90) {
        const increment = currentProgress < 50 ? 2 : 1;
        currentProgress = Math.min(currentProgress + increment, 90);
        setProgress(currentProgress);
      }
    };

    progressInterval = setInterval(updateProgress, 50);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);
  return (
    <div 
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
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated "manu" Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2
          }}
          className="font-bold text-4xl md:text-6xl lowercase bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
          style={{ 
            fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif', 
            fontWeight: 700, 
            letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(to right, #ffffff, #e5e7eb, #ffffff)'
          }}
        >
          manu
        </motion.div>

        {/* Loading Dots */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.4
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-white"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text with Percentage */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5
            }}
            className="text-sm text-[--muted-foreground] tracking-wide"
            style={{
              fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.1em'
            }}
          >
            LOADING
          </motion.p>
          <motion.p
            key={progress}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg md:text-xl font-bold text-white tabular-nums"
            style={{
              fontFamily: '"Futura Bold", "Futura-Bold", Futura, "Century Gothic", -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
    </div>
  );
}

