'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
}) => {
  const { isDarkMode, getThemeColor } = useTheme();
  const themeColor = getThemeColor();
  const baseStyles = 'px-8 py-3.5 rounded-lg font-medium transition-all duration-200 text-base';
  
  const getButtonStyles = () => {
    if (variant === 'primary') {
      return isDarkMode 
        ? 'text-white'
        : 'text-white';
    } else {
      return isDarkMode
        ? 'bg-transparent text-white border hover:bg-white/10'
        : 'bg-transparent text-black border hover:bg-black/10';
    }
  };
  
  const getButtonStyle = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: themeColor,
        color: '#FFFFFF',
      };
    } else {
      return {
        borderColor: themeColor,
        color: isDarkMode ? '#FFFFFF' : '#000000',
      };
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${getButtonStyles()} ${className}`}
      style={getButtonStyle()}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          // Slightly lighter on hover
          const r = parseInt(themeColor.slice(1, 3), 16);
          const g = parseInt(themeColor.slice(3, 5), 16);
          const b = parseInt(themeColor.slice(5, 7), 16);
          e.currentTarget.style.backgroundColor = `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = themeColor;
        }
      }}
    >
      {children}
    </motion.button>
  );
};

