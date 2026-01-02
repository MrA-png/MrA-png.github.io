import React from 'react';

interface ExternalLinkIconProps {
  className?: string;
}

export const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({ 
  className = 'w-4 h-4 inline-block ml-2'
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12H4V4H8V2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V8H12V12Z"
        fill="currentColor"
      />
      <path
        d="M10 2V4H12.59L5.29 11.29L6.71 12.71L14 5.41V8H16V2H10Z"
        fill="currentColor"
      />
    </svg>
  );
};

