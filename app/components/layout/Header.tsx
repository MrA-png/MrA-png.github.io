'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme, ThemeColor } from '../../contexts/ThemeContext';
import { Logo } from '../ui/Logo';
import { useActiveNav } from '../../hooks/useActiveNav';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { themeColor, setThemeColor, getThemeColor, isDarkMode, toggleDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const bgColor = isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const navHoverColor = isDarkMode ? themeColorValue : themeColorValue;

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Articles & Notes', id: 'articles' },
    { name: 'Contact', id: 'contact' },
  ];

  const sectionIds = navLinks.map(link => link.id);
  const activeSection = useActiveNav(sectionIds);

  // Helper function for smooth scroll
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we're not on home page, navigate to home first
    if (pathname !== '/') {
      router.push(`/#${targetId}`);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
      return;
    }
    
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { id: string; name: string }) => {
    // All links should scroll to section, including articles
    handleSmoothScroll(e, link.id);
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

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
      className="fixed top-0 left-0 right-0 w-full px-4 sm:px-6 md:px-12 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto z-50 backdrop-blur-sm transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Logo */}
      <motion.a
        href="#home"
        onClick={(e) => {
          handleSmoothScroll(e, 'home');
          setIsMobileMenuOpen(false);
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex items-center gap-2 cursor-pointer z-50"
      >
        <Logo />
        <span className="font-semibold text-base sm:text-lg">
          <span style={{ color: textColor }}>MrA</span>
          <span style={{ color: themeColorValue }}>-png</span>
        </span>
      </motion.a>

      {/* Navigation Links - Desktop */}
      <nav className="hidden lg:flex items-center gap-6">
        {navLinks.map((link, index) => {
          const isActive = activeSection === link.id;
          // All links point to sections on home page
          const href = `#${link.id}`;
          
          return (
            <motion.a
              key={link.id}
              href={href}
              onClick={(e) => handleNavClick(e, link)}
              className="transition-colors text-sm cursor-pointer relative"
              style={{ 
                color: isActive ? themeColorValue : textColor,
                fontWeight: isActive ? '600' : '400',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = navHoverColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = textColor;
                }
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: themeColorValue }}
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          );
        })}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 w-full backdrop-blur-sm border-t"
          style={{ 
            backgroundColor: bgColor,
            borderTopColor: hexToRgba(themeColorValue, 0.3)
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const href = `#${link.id}`;
              
              return (
                <a
                  key={link.id}
                  href={href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setIsMobileMenuOpen(false);
                  }}
                  className="transition-colors text-base cursor-pointer py-2"
                  style={{ 
                    color: isActive ? themeColorValue : textColor,
                    fontWeight: isActive ? '600' : '400',
                  }}
                >
                  {link.name}
                </a>
              );
            })}
            
            {/* Color Palette in Mobile Menu */}
            <div className="pt-4 border-t" style={{ borderTopColor: hexToRgba(themeColorValue, 0.2) }}>
              <p className={`text-sm mb-3 ${textColor}`} style={{ opacity: 0.7 }}>Theme Color</p>
              <div className="flex items-center gap-3 flex-wrap">
                {colorPalette.map((item) => (
                  <div
                    key={item.name}
                    className={`w-6 h-6 rounded-full ${item.bgClass} cursor-pointer hover:scale-110 transition-transform ${
                      themeColor === item.color ? `ring-2 ${isDarkMode ? 'ring-white ring-offset-black' : 'ring-black ring-offset-white'} ring-offset-2` : ''
                    }`}
                    title={item.name}
                    onClick={() => {
                      setThemeColor(item.color);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Right Side - Color Palette, Mobile Menu Button & Dark Mode Toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Color Palette - Desktop Only */}
        <div className="hidden md:flex items-center gap-2">
          {colorPalette.map((item) => (
            <div
              key={item.name}
              className={`w-3 h-3 rounded-full ${item.bgClass} cursor-pointer hover:scale-110 transition-transform ${
                themeColor === item.color ? `ring-2 ${isDarkMode ? 'ring-white ring-offset-black' : 'ring-black ring-offset-white'} ring-offset-2` : ''
              }`}
              title={item.name}
              onClick={() => setThemeColor(item.color)}
            />
          ))}
        </div>

        {/* Mobile Menu Button - di sebelah kiri Dark Mode Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 transition-colors z-50"
          style={{ color: textColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = navHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="transition-colors p-2"
          style={{ color: textColor }}
          onMouseEnter={(e) => e.currentTarget.style.color = navHoverColor}
          onMouseLeave={(e) => e.currentTarget.style.color = textColor}
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

