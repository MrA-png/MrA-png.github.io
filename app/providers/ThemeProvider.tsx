'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider as ThemeProviderContext } from '../contexts/ThemeContext';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ThemeProviderContext>{children}</ThemeProviderContext>;
};

