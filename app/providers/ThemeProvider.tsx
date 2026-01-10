'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider as ThemeProviderContext } from '../contexts/ThemeContext';
import { PageLoading } from '../components/ui/PageLoading';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProviderContext>
      <PageLoading />
      {children}
    </ThemeProviderContext>
  );
};

