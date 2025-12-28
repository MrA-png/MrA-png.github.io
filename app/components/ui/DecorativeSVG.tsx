import React from 'react';
import Image from 'next/image';

interface DecorativeSVGProps {
  side: 'left' | 'right';
  className?: string;
}

export const DecorativeSVG: React.FC<DecorativeSVGProps> = ({ 
  side, 
  className = '' 
}) => {
  return (
    <Image
      src="/assets/decorative-svg.svg"
      alt="Decorative SVG"
      width={140}
      height={170}
      className={className}
    />
  );
};

