'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  GithubIcon,
  LinkedInIcon,
  EmailIcon,
} from '../ui/icons';
import { useActiveSection } from '../../hooks/useActiveSection';

export const Footer: React.FC = () => {
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'articles' },
  ];

  const sectionIds = quickLinks.map(link => link.id);
  const activeSection = useActiveSection(sectionIds);

  // Helper function for smooth scroll
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: '#' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: '#' },
    { name: 'Email', icon: EmailIcon, href: '#' },
  ];

  return (
    <footer className={`bg-black ${textColor} py-12`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Border */}
        <div className={`border-t ${borderColor} mb-8`} />
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Brand and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className={textColor}>MrA-</span>
              <span style={{ color: themeColorValue }}>png</span>
            </h3>
            <p className={`${textGrayColor} text-sm leading-relaxed`}>
              Building futuristic web experiences with modern technologies. Let's craft something amazing together.
            </p>
          </motion.div>

          {/* Middle Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className={`font-bold ${textColor} mb-4`}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={index}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleSmoothScroll(e, link.id)}
                      className={`text-sm transition-all cursor-pointer relative inline-block ${
                        isActive ? 'font-semibold' : 'font-normal'
                      }`}
                      style={{
                        color: isActive ? themeColorValue : (isDarkMode ? '#FFFFFF' : '#000000'),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = themeColorValue;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = isDarkMode ? '#FFFFFF' : '#000000';
                        }
                      }}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 right-0 h-0.5"
                          style={{ backgroundColor: themeColorValue }}
                          layoutId="footerActiveIndicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right Column - Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className={`font-bold ${textColor} mb-4`}>Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{
                      borderColor: textColor,
                      color: textColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = themeColorValue;
                      e.currentTarget.style.color = themeColorValue;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = textColor;
                      e.currentTarget.style.color = textColor;
                    }}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className={`border-t ${borderColor} mb-6`} />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className={`${textColor} text-sm`}>
            © 2025 MrA. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

