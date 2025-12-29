'use client';

import React from 'react';
import { useTheme } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
        color: isDarkMode ? '#FFFFFF' : '#000000'
      }}
    >
      <Header />
      <HeroSection />
      <AboutSection />
    </div>
  );
}
