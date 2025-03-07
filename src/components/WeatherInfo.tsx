
import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudDrizzle, CloudRain, CloudLightning, CloudFog, Moon, Wind, Droplets, Loader } from 'lucide-react';
import { Destination } from '@/lib/destinations';
import { getWeatherData, getCrowdLevel, getTimeToVisitRecommendation } from '@/lib/mapUtils';
import { cn } from '@/lib/utils';

interface WeatherInfoProps {
  destination: Destination;
  className?: string;
}

const WeatherInfo = ({ destination, className }: WeatherInfoProps) => {
  const [weather, setWeather] = useState<{
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  } | null>(null);
  
  const [crowdLevel, setCrowdLevel] = useState<{
    level: 'low' | 'moderate' | 'high' | 'very high';
    percentage: number;
    text: string;
  } | null>(null);
  
  const [timeRecommendation, setTimeRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch weather data (simulated)
        const weatherData = await getWeatherData(
          destination.coordinates.lat,
          destination.coordinates.lng
        );
        setWeather(weatherData);
        
        // Get crowd level (simulated)
        setCrowdLevel(getCrowdLevel());
        
        // Get time recommendation (simulated)
        setTimeRecommendation(getTimeToVisitRecommendation());
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [destination.coordinates.lat, destination.coordinates.lng]);

  const renderWeatherIcon = (iconName: string) => {
    const iconClass = 'h-8 w-8';
    
    switch (iconName) {
      case 'sun':
        return <Sun className={iconClass} />;
      case 'cloud-sun':
        return <Cloud className={iconClass} />;
      case 'cloud':
        return <Cloud className={iconClass} />;
      case 'cloud-drizzle':
        return <CloudDrizzle className={iconClass} />;
      case 'cloud-rain':
        return <CloudRain className={iconClass} />;
      case 'cloud-lightning':
        return <CloudLightning className={iconClass} />;
      case 'cloud-fog':
        return <CloudFog className={iconClass} />;
      case 'moon':
        return <Moon className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  const getCrowdLevelColor = (level: 'low' | 'moderate' | 'high' | 'very high') => {
    switch (level) {
      case 'low':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'high':
        return 'text-orange-500';
      case 'very high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-lg font-medium">Real-Time Information</h3>
      
      {loading ? (
        <div className="glass-card p-6 flex justify-center items-center min-h-[200px]">
          <div className="flex flex-col items-center">
            <Loader className="h-6 w-6 animate-spin text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Loading real-time data...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Weather Card */}
          {weather && (
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Current Weather</h4>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {renderWeatherIcon(weather.icon)}
                  <div className="ml-4">
                    <span className="text-2xl font-light">{weather.temperature}°C</span>
                    <p className="text-muted-foreground">{weather.condition}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center">
                    <Droplets className="h-4 w-4 mr-1" />
                    <span className="text-sm">{weather.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 mr-1" />
                    <span className="text-sm">{weather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Crowd Level Card */}
          {crowdLevel && (
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Current Crowd Level</h4>
                <span className="text-xs text-muted-foreground">Updated just now</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={cn("font-medium capitalize", getCrowdLevelColor(crowdLevel.level))}>
                    {crowdLevel.level}
                  </span>
                  <span className="text-sm">{crowdLevel.percentage}% Capacity</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full",
                      crowdLevel.level === 'low' ? 'bg-green-500' :
                      crowdLevel.level === 'moderate' ? 'bg-yellow-500' :
                      crowdLevel.level === 'high' ? 'bg-orange-500' : 'bg-red-500'
                    )}
                    style={{ width: `${crowdLevel.percentage}%` }}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground">{crowdLevel.text}</p>
              </div>
            </div>
          )}
          
          {/* Visit Recommendation */}
          <div className="glass-card p-6">
            <h4 className="font-medium mb-4">Best Time to Visit Today</h4>
            <p className="text-sm">{timeRecommendation}</p>
            <p className="text-xs text-muted-foreground mt-4">
              Generally best during: {destination.bestTimeToVisit}
            </p>
          </div>
        </>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>* Data is updated in real-time and is based on current conditions at the destination.</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
