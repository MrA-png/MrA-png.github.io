'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FreelanceBanner: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-2.5 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
      >
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
        <span className="text-white text-sm font-medium">Available for Freelance</span>
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </div>
  );
};

