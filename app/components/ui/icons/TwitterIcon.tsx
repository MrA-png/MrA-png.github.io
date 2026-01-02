import React from 'react';

interface TwitterIconProps {
  className?: string;
}

export const TwitterIcon: React.FC<TwitterIconProps> = ({ 
  className = 'w-5 h-5'
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 4.5L4.5 15.5M4.5 4.5L15.5 15.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

