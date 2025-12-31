import React from 'react';

interface UBSLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UBSLogo: React.FC<UBSLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} aspect-square bg-primary rounded-sm flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="20" width="20" height="60" fill="white" />
          <rect x="40" y="20" width="20" height="60" fill="white" />
          <rect x="70" y="20" width="20" height="60" fill="white" />
          <rect x="10" y="20" width="80" height="15" fill="white" />
          <rect x="10" y="65" width="80" height="15" fill="white" />
        </svg>
      </div>
      <span className={`font-heading font-bold text-foreground ${size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl'}`}>
        UBS
      </span>
    </div>
  );
};
