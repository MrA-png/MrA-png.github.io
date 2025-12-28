'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme, ThemeColor } from '../../contexts/ThemeContext';
import { Logo } from '../ui/Logo';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  const { themeColor, setThemeColor, getThemeColor } = useTheme();
  const themeColorValue = getThemeColor();

  const navLinks = [
    'Home',
    'About',
    'Articles & Notes',
    'Experience',
    'Projects',
    'Contact',
  ];

  const colorPalette: { color: ThemeColor; bgClass: string; name: string }[] = [
    { color: 'grey', bgClass: 'bg-gray-500', name: 'grey' },
    { color: 'orange', bgClass: 'bg-orange-500', name: 'orange' },
    { color: 'green', bgClass: 'bg-green-500', name: 'green' },
    { color: 'blue', bgClass: 'bg-blue-500', name: 'blue' },
    { color: 'red', bgClass: 'bg-red-500', name: 'red' },
    { color: 'purple', bgClass: 'bg-purple-500', name: 'purple' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 w-full px-6 md:px-12 py-4 flex items-center justify-between max-w-7xl mx-auto z-50 bg-black/80 backdrop-blur-sm"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <Logo />
        <span className="font-semibold text-lg">
          <span className="text-white">MrA</span>
          <span style={{ color: themeColorValue }}>-png</span>
        </span>
      </motion.div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6">
        {navLinks.map((link, index) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className="transition-colors text-sm"
            style={{ 
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = themeColorValue)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {link}
          </motion.a>
        ))}
      </nav>

      {/* Right Side - Color Palette & Dark Mode Toggle */}
      <div className="flex items-center gap-4">
        {/* Color Palette */}
        <div className="hidden md:flex items-center gap-2">
          {colorPalette.map((item) => (
            <div
              key={item.name}
              className={`w-3 h-3 rounded-full ${item.bgClass} cursor-pointer hover:scale-110 transition-transform ${
                themeColor === item.color ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
              }`}
              title={item.name}
              onClick={() => setThemeColor(item.color)}
            />
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="text-white transition-colors p-2"
          style={{ color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.color = themeColorValue}
          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
          aria-label="Toggle dark mode"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </motion.header>
  );
};

