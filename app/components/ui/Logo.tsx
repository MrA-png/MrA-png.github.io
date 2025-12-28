'use client';

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const Logo: React.FC = () => {
  const { getThemeColor } = useTheme();
  const themeColor = getThemeColor();

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="header-logo-mask" fill="white">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z"/>
      </mask>
      <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill={themeColor} fillOpacity="0.1"/>
      <path d="M8 0V1H32V0V-1H8V0ZM40 8H39V32H40H41V8H40ZM32 40V39H8V40V41H32V40ZM0 32H1V8H0H-1V32H0ZM8 40V39C4.13401 39 1 35.866 1 32H0H-1C-1 36.9706 3.02944 41 8 41V40ZM40 32H39C39 35.866 35.866 39 32 39V40V41C36.9706 41 41 36.9706 41 32H40ZM32 0V1C35.866 1 39 4.13401 39 8H40H41C41 3.02944 36.9706 -1 32 -1V0ZM8 0V-1C3.02944 -1 -1 3.02944 -1 8H0H1C1 4.13401 4.13401 1 8 1V0Z" fill={themeColor} fillOpacity="0.5" mask="url(#header-logo-mask)"/>
      <path d="M12 25L18 19L12 13" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 27H28" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

