import React from 'react';

interface ChevronLeftIconProps {
  className?: string;
}

export const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({ 
  className = 'w-6 h-6'
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

