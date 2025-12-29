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
  const { isDarkMode } = useTheme();
  const baseStyles = 'px-8 py-3.5 rounded-lg font-medium transition-all duration-200 text-base';
  
  const getButtonStyles = () => {
    if (variant === 'primary') {
      return isDarkMode 
        ? 'bg-white text-black hover:bg-gray-100'
        : 'bg-black text-white hover:bg-gray-900';
    } else {
      return isDarkMode
        ? 'bg-transparent text-white border border-white/20 hover:bg-white/10'
        : 'bg-transparent text-black border border-black/20 hover:bg-black/10';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${getButtonStyles()} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
};

