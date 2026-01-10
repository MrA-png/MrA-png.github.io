'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export const PageLoading: React.FC = () => {
  const pathname = usePathname();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading when pathname changes
    setIsLoading(true);
    setProgress(0);

    // Simulate progress with acceleration
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90;
        }
        // Accelerate progress: faster at start, slower near end
        const increment = prev < 50 ? 15 : 5;
        return Math.min(prev + increment, 90);
      });
    }, 50);

    // Complete loading after page is ready
    const completeTimeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 150);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
        >
          {/* Progress Bar */}
          <motion.div
            className="h-1"
            style={{
              backgroundColor: themeColorValue,
              boxShadow: `0 0 10px ${themeColorValue}, 0 0 20px ${themeColorValue}`,
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

