'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  GithubIcon,
  LinkedInIcon,
  EmailIcon,
} from '../ui/icons';
import { useActiveNav } from '../../hooks/useActiveNav';

export const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { getThemeColor, isDarkMode } = useTheme();
  const themeColorValue = getThemeColor();
  
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const textGrayColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Articles & Notes', id: 'articles' },
    { name: 'Contact', id: 'contact' },
  ];

  const sectionIds = quickLinks.map(link => link.id);
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { id: string; name: string }) => {
    // All links should scroll to section, including articles
    handleSmoothScroll(e, link.id);
  };

  const socialLinks = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/MrA-png' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: 'https://www.linkedin.com/in/azhrul-azim-ripai' },
    { name: 'Email', icon: EmailIcon, href: 'mailto:work.azhrul@gmail.com' },
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
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link, index) => {
                const isActive = activeSection === link.id;
                // All links point to sections on home page
                const href = `#${link.id}`;
                
                return (
                  <li key={index}>
                    <a
                      href={href}
                      onClick={(e) => handleLinkClick(e, link)}
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
                const isExternalLink = social.href !== '#' && !social.href.startsWith('mailto:');
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noopener noreferrer" : undefined}
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

