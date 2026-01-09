'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
import { FreelanceBanner } from '../ui/FreelanceBanner';
import { TechStack } from './TechStack';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const HeroSection: React.FC = () => {
  const { isDarkMode, getThemeColor, themeColor } = useTheme();
  const themeColorValue = getThemeColor();
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const textSecondaryColor = isDarkMode ? '#9CA3AF' : '#4B5563';
  
  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Glow color: use theme color if not grey, otherwise use default white
  const glowColor = themeColor === 'grey' 
    ? { r: 255, g: 255, b: 255 } // Default white glow
    : {
        r: parseInt(themeColorValue.slice(1, 3), 16),
        g: parseInt(themeColorValue.slice(3, 5), 16),
        b: parseInt(themeColorValue.slice(5, 7), 16)
      };
  
  const glowStyle = {
    textShadow: `0 0 20px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.5),
                 0 0 40px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.3),
                 0 0 60px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.2)`
  };
  
  // Handle smooth scroll to section
  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Handle Hire Me button click - scroll to contact section
  const handleHireMeClick = () => {
    handleSmoothScroll('contact');
  };

  // Handle View Projects button click - scroll to projects section
  const handleViewProjectsClick = () => {
    handleSmoothScroll('projects');
  };
  
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl mx-auto pt-20 sm:pt-24">
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full flex flex-col items-center"
      >
        <motion.div variants={itemVariants}>
          <FreelanceBanner />
        </motion.div>
      
      {/* Headline */}
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight px-4"
        style={{ color: textColor }}
      >
        <motion.span
          className="block"
          style={glowStyle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Revolutionize Your
        </motion.span>
        <motion.span
          className="block"
          style={glowStyle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Digital Identity
        </motion.span>
      </motion.h1>

      {/* Supporting Paragraph */}
      <motion.p
        variants={itemVariants}
        className="text-center max-w-2xl mb-10 text-base md:text-lg lg:text-xl leading-relaxed px-4"
        style={{ color: textSecondaryColor }}
      >
        Explore my personal portfolio showcasing real-world experience, selected projects, and thoughtfully crafted web and mobile applications.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <Button variant="primary" onClick={handleHireMeClick}>
          Hire Me
        </Button>
        <Button variant="secondary" onClick={handleViewProjectsClick}>
          View Projects
        </Button>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <TechStack />
      </motion.div>
      </motion.div>
    </section>
  );
};

