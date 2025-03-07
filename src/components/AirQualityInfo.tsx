
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AirQualityInfoProps {
  airQuality: {
    aqi: number;
    status: string;
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    }
  };
  className?: string;
}

const AirQualityInfo = ({ airQuality, className }: AirQualityInfoProps) => {
  const getAqiColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Unhealthy for Sensitive Groups':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Unhealthy':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Very Unhealthy':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatValue = (value: number) => {
    return Math.round(value * 100) / 100;
  };
  
  return (
    <div className={cn("p-4 rounded-lg", className)}>
      <h3 className="font-medium text-lg mb-2">Air Quality</h3>
      
      <div className="flex items-center space-x-2 mb-4">
        <Badge variant="outline" className={cn("text-sm font-medium", getAqiColor(airQuality.status))}>
          AQI: {airQuality.aqi} - {airQuality.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground">PM2.5</p>
          <p className="font-medium">{formatValue(airQuality.components.pm2_5)} µg/m³</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">PM10</p>
          <p className="font-medium">{formatValue(airQuality.components.pm10)} µg/m³</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Ozone (O₃)</p>
          <p className="font-medium">{formatValue(airQuality.components.o3)} µg/m³</p>
        </div>
        <div className="space-y-1">
          <p className="text-muted-foreground">Nitrogen Dioxide (NO₂)</p>
          <p className="font-medium">{formatValue(airQuality.components.no2)} µg/m³</p>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        Air quality data is measured in real-time and may vary throughout the day.
      </p>
    </div>
  );
};

export default AirQualityInfo;
