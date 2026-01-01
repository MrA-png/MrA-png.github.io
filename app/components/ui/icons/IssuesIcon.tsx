import React from 'react';

interface IssuesIconProps {
  className?: string;
}

export const IssuesIcon: React.FC<IssuesIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
};

