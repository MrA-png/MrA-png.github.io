import React from 'react';

interface BookIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BookIcon: React.FC<BookIconProps> = ({ 
  className = 'w-7 h-7',
  style 
}) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="6"
        width="9"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="15"
        y="6"
        width="9"
        height="16"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="13"
        y1="6"
        x2="13"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

