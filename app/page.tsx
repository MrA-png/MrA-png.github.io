'use client';

import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <HeroSection />
    </div>
  );
}
