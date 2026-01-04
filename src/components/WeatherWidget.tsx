import React, { useState, useEffect } from 'react';
import { WeatherIcon } from './icons/WeatherIcon';
import { MapPin, Loader2 } from 'lucide-react';

type WeatherCondition = 'sunny' | 'cloudy' | 'partly-cloudy' | 'rainy';

interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  description: string;
}

const getWeatherCondition = (weatherCode: number): { condition: WeatherCondition; description: string } => {
  // WMO Weather interpretation codes
  if (weatherCode === 0) return { condition: 'sunny', description: 'Ciel dégagé' };
  if (weatherCode === 1) return { condition: 'sunny', description: 'Principalement dégagé' };
  if (weatherCode === 2) return { condition: 'partly-cloudy', description: 'Partiellement nuageux' };
  if (weatherCode === 3) return { condition: 'cloudy', description: 'Couvert' };
  if (weatherCode >= 45 && weatherCode <= 48) return { condition: 'cloudy', description: 'Brouillard' };
  if (weatherCode >= 51 && weatherCode <= 55) return { condition: 'rainy', description: 'Bruine' };
  if (weatherCode >= 56 && weatherCode <= 57) return { condition: 'rainy', description: 'Bruine verglaçante' };
  if (weatherCode >= 61 && weatherCode <= 65) return { condition: 'rainy', description: 'Pluie' };
  if (weatherCode >= 66 && weatherCode <= 67) return { condition: 'rainy', description: 'Pluie verglaçante' };
  if (weatherCode >= 71 && weatherCode <= 77) return { condition: 'cloudy', description: 'Neige' };
  if (weatherCode >= 80 && weatherCode <= 82) return { condition: 'rainy', description: 'Averses' };
  if (weatherCode >= 85 && weatherCode <= 86) return { condition: 'cloudy', description: 'Averses de neige' };
  if (weatherCode >= 95 && weatherCode <= 99) return { condition: 'rainy', description: 'Orage' };
  return { condition: 'partly-cloudy', description: 'Variable' };
};

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Nice coordinates: 43.7102° N, 7.2620° E
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=43.7102&longitude=7.2620&current=temperature_2m,weather_code&timezone=Europe%2FParis'
        );
        
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        const { condition, description } = getWeatherCondition(data.current.weather_code);
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition,
          description,
        });
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(true);
        // Fallback to default values
        setWeather({
          temperature: 14,
          condition: 'partly-cloudy',
          description: 'Données indisponibles',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-xl card-shadow p-4 flex items-center justify-center min-h-[76px]">
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl card-shadow p-4 flex items-center gap-4">
      <WeatherIcon condition={weather?.condition || 'partly-cloudy'} className="w-12 h-12" />
      <div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="w-3 h-3" />
          <span>Nice</span>
          {error && <span className="text-xs text-destructive ml-1">(hors ligne)</span>}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{weather?.temperature}°C</span>
          <span className="text-sm text-muted-foreground">{weather?.description}</span>
        </div>
      </div>
    </div>
  );
};
