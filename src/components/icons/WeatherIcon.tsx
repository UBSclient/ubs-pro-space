import React from 'react';

interface WeatherIconProps {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'partly-cloudy';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = '' }) => {
  const icons = {
    sunny: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="5" fill="#FDB813" />
        <g stroke="#FDB813" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    ),
    cloudy: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M18 10a4 4 0 0 0-7.5-2A3 3 0 0 0 4 11a3 3 0 0 0 0 6h14a3 3 0 0 0 0-6z"
          fill="#94A3B8"
          stroke="#64748B"
          strokeWidth="1"
        />
      </svg>
    ),
    rainy: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M18 10a4 4 0 0 0-7.5-2A3 3 0 0 0 4 11a3 3 0 0 0 0 6h14a3 3 0 0 0 0-6z"
          fill="#94A3B8"
          stroke="#64748B"
          strokeWidth="1"
        />
        <g stroke="#3B82F6" strokeWidth="2" strokeLinecap="round">
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="12" y1="19" x2="12" y2="21" />
          <line x1="16" y1="19" x2="16" y2="21" />
        </g>
      </svg>
    ),
    'partly-cloudy': (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="8" cy="8" r="4" fill="#FDB813" />
        <g stroke="#FDB813" strokeWidth="1.5" strokeLinecap="round">
          <line x1="8" y1="1" x2="8" y2="2" />
          <line x1="2" y1="8" x2="3" y2="8" />
          <line x1="3.5" y1="3.5" x2="4.2" y2="4.2" />
        </g>
        <path
          d="M20 12a3 3 0 0 0-5.5-1.5A2.5 2.5 0 0 0 9 13a2.5 2.5 0 0 0 0 5h11a2.5 2.5 0 0 0 0-5z"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1"
        />
      </svg>
    ),
  };

  return icons[condition] || icons.sunny;
};
