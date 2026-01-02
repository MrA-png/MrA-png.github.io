import React from 'react';

interface ArrowRightIconProps {
  className?: string;
}

export const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ 
  className = 'w-4 h-4 inline-block ml-1'
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

