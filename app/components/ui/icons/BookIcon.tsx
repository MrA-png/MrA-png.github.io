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
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 9.3335V28.0002"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.99984 24C3.64622 24 3.30708 23.8595 3.05703 23.6095C2.80698 23.3594 2.6665 23.0203 2.6665 22.6667V5.33333C2.6665 4.97971 2.80698 4.64057 3.05703 4.39052C3.30708 4.14048 3.64622 4 3.99984 4H10.6665C12.081 4 13.4375 4.5619 14.4377 5.5621C15.4379 6.56229 15.9998 7.91885 15.9998 9.33333C15.9998 7.91885 16.5617 6.56229 17.5619 5.5621C18.5621 4.5619 19.9187 4 21.3332 4H27.9998C28.3535 4 28.6926 4.14048 28.9426 4.39052C29.1927 4.64057 29.3332 4.97971 29.3332 5.33333V22.6667C29.3332 23.0203 29.1927 23.3594 28.9426 23.6095C28.6926 23.8595 28.3535 24 27.9998 24H19.9998C18.939 24 17.9216 24.4214 17.1714 25.1716C16.4213 25.9217 15.9998 26.9391 15.9998 28C15.9998 26.9391 15.5784 25.9217 14.8283 25.1716C14.0781 24.4214 13.0607 24 11.9998 24H3.99984Z"
        stroke="currentColor"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

