'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeColor = 'grey' | 'orange' | 'green' | 'blue' | 'red' | 'purple';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  getThemeColor: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<ThemeColor, string> = {
  grey: '#71717B',
  orange: '#F97316',
  green: '#10B981',
  blue: '#3B82F6',
  red: '#EF4444',
  purple: '#A855F7',
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<ThemeColor>('grey');

  const getThemeColor = () => {
    return themeColors[themeColor];
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, getThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

