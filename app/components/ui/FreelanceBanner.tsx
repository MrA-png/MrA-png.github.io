'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export const FreelanceBanner: React.FC = () => {
  const { getThemeColor } = useTheme();
  const themeColor = getThemeColor();
  return (
    <div className="flex items-center justify-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex items-center gap-2.5 rounded-full px-3.5 py-2 border transition-colors cursor-pointer"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: '#71717B'
        }}
      >
        {/* Orange Dot with outline */}
        <div className="relative flex items-center justify-center w-3 h-3">
          <div className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
          <div className="relative w-2.5 h-2.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
        </div>
        
        {/* Text */}
        <span className="text-sm font-mono tracking-wide" style={{ color: '#D4D4D8' }}>Available for Freelance</span>
        
        {/* Chevron Icon */}
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: '#71717B' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </div>
  );
};

