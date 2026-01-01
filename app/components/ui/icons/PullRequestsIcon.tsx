import React from 'react';

interface PullRequestsIconProps {
  className?: string;
}

export const PullRequestsIcon: React.FC<PullRequestsIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12l4-4m-4 4l4 4M19 12l-4-4m4 4l-4 4" />
    </svg>
  );
};

