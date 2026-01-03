import React from 'react';

interface ArticlesIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ArticlesIllustration: React.FC<ArticlesIllustrationProps> = ({ 
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
      {/* Book/Document Base */}
      <rect
        x="50"
        y="15"
        width="70"
        height="90"
        rx="4"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      
      {/* Lines inside document (text lines) */}
      <line
        x1="60"
        y1="30"
        x2="110"
        y2="30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="40"
        x2="105"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="50"
        x2="110"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="60"
        x2="100"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="70"
        x2="110"
        y2="70"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="80"
        x2="105"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      
      {/* Second document/page */}
      <rect
        x="80"
        y="25"
        width="70"
        height="90"
        rx="4"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      
      {/* Lines in second document */}
      <line
        x1="90"
        y1="40"
        x2="140"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="50"
        x2="135"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="60"
        x2="140"
        y2="60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="70"
        x2="130"
        y2="70"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="80"
        x2="140"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      <line
        x1="90"
        y1="90"
        x2="135"
        y2="90"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      
      {/* Highlight marker on first document */}
      <rect
        x="60"
        y="48"
        width="50"
        height="8"
        fill="currentColor"
        fillOpacity="0.2"
        rx="2"
      />
      
      {/* Decorative circle (like a bullet point) */}
      <circle
        cx="65"
        cy="35"
        r="3"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
};

