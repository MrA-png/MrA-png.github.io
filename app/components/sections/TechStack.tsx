'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { DecorativeSVG } from '../ui/DecorativeSVG';

interface TechStackProps {
  technologies?: string[];
}

const defaultTechnologies = [
  'VUE',
  'NEXT',
  'NUXT',
  'REACT',
  'SVELTE',
  'TAILWIND',
  'TYPESCRIPT',
  'JAVASCRIPT'
];

export const TechStack: React.FC<TechStackProps> = ({ 
  technologies = defaultTechnologies 
}) => {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? '#D1D5DB' : '#4B5563';
  const textHoverColor = isDarkMode ? '#FFFFFF' : '#000000';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const titleColor = isDarkMode ? '#9CA3AF' : '#6B7280';
  
  return (
    <div className="relative flex flex-col items-center mt-16 md:mt-20 w-full">
      {/* Decorative SVG - Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-0"
      >
        <DecorativeSVG side="left" className="w-32 h-40 md:w-36 md:h-44 lg:w-40 lg:h-48 scale-x-[-1]" />
      </motion.div>

      {/* Decorative SVG - Right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0"
      >
        <DecorativeSVG side="right" className="w-32 h-40 md:w-36 md:h-44 lg:w-40 lg:h-48" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs md:text-sm font-medium mb-6 tracking-wider uppercase text-center relative z-10 px-4"
        style={{ color: titleColor }}
      >
        POWERING NEXT-GEN SOLUTIONS
      </motion.h2>

      {/* Technology Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 px-4 lg:pl-52 lg:pr-52 relative z-10 w-full max-w-6xl mx-auto">
        {technologies.map((tech, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 md:px-6 py-2.5 md:py-3 rounded-lg border transition-all duration-200 text-sm md:text-base font-medium min-w-fit"
            style={{ 
              borderColor: borderColor,
              color: textColor
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = textHoverColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
          >
            {tech}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

