import React from 'react';

interface PaperAirplaneIconProps {
  className?: string;
}

export const PaperAirplaneIcon: React.FC<PaperAirplaneIconProps> = ({ 
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
        d="M18 2L9 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 2L12 18L9 11L2 8L18 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

