import React from 'react';
import { WeatherIcon } from './icons/WeatherIcon';
import { MapPin } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const weather = {
    temperature: 12,
    condition: 'partly-cloudy' as const,
    city: 'Marseille',
    description: 'Partiellement nuageux',
  };

  return (
    <div className="bg-card rounded-xl card-shadow p-4 flex items-center gap-4">
      <WeatherIcon condition={weather.condition} className="w-12 h-12" />
      <div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="w-3 h-3" />
          <span>{weather.city}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{weather.temperature}°C</span>
          <span className="text-sm text-muted-foreground">{weather.description}</span>
        </div>
      </div>
    </div>
  );
};
