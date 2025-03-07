
import React from 'react';
import { cn } from '@/lib/utils';

interface WeatherForecastProps {
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
  className?: string;
}

const WeatherForecast = ({ forecast, className }: WeatherForecastProps) => {
  return (
    <div className={cn("", className)}>
      <h3 className="font-medium mb-3">3-Day Forecast</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="text-center p-2 rounded-lg bg-primary/5">
            <div className="font-medium text-sm">{day.day}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.condition} 
              className="mx-auto w-10 h-10"
            />
            <div className="text-lg font-medium">{day.temp}°C</div>
            <div className="text-xs text-muted-foreground">{day.condition}</div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        Forecast data is updated daily.
      </p>
    </div>
  );
};

export default WeatherForecast;
