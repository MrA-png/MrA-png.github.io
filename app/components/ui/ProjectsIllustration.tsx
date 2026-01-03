import React from 'react';

interface ProjectsIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ProjectsIllustration: React.FC<ProjectsIllustrationProps> = ({ 
  className = 'w-full h-full',
  style 
}) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Code brackets */}
      <path
        d="M25 30 L15 50 L25 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M175 30 L185 50 L175 70"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      
      {/* Geometric shapes - representing different projects */}
      {/* Square */}
      <rect
        x="50"
        y="25"
        width="25"
        height="25"
        rx="3"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      
      {/* Circle */}
      <circle
        cx="100"
        cy="37.5"
        r="12"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      
      {/* Triangle */}
      <path
        d="M130 25 L145 50 L115 50 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      
      {/* Hexagon */}
      <path
        d="M165 37.5 L175 30 L185 37.5 L185 52.5 L175 60 L165 52.5 Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.4"
      />
      
      {/* Connecting lines/dots */}
      <circle
        cx="62.5"
        cy="37.5"
        r="2"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle
        cx="100"
        cy="37.5"
        r="2"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle
        cx="130"
        cy="37.5"
        r="2"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <circle
        cx="175"
        cy="45"
        r="2"
        fill="currentColor"
        fillOpacity="0.5"
      />
      
      {/* Bottom layer - folder/file representation */}
      <rect
        x="45"
        y="65"
        width="40"
        height="30"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <rect
        x="50"
        y="70"
        width="30"
        height="3"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="50"
        y="78"
        width="25"
        height="3"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      
      <rect
        x="110"
        y="70"
        width="40"
        height="30"
        rx="2"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <rect
        x="115"
        y="75"
        width="30"
        height="3"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <rect
        x="115"
        y="83"
        width="25"
        height="3"
        rx="1"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
};

