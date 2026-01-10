'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const usePageLoading = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading when pathname changes
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90;
        }
        // Accelerate progress
        const increment = prev < 50 ? 15 : 5;
        return Math.min(prev + increment, 90);
      });
    }, 50);

    // Complete loading
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

  return { isLoading, progress };
};

