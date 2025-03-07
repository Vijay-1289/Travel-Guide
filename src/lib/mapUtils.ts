
import { Destination } from './destinations';

// Function to get user's current location
export const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  });
};

// Function to calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Function to get directions between two points
export const getDirections = (
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): string => {
  // This is a placeholder - in a real app, you'd use a directions API like Google Maps, Mapbox, etc.
  const directUrl = `https://www.google.com/maps/dir/${fromLat},${fromLng}/${toLat},${toLng}`;
  return directUrl;
};

// Function to simulate real-time availability of transportation
export const getTransportAvailability = (
  transportType: string,
  destination: Destination
): { status: 'high' | 'medium' | 'low'; text: string } => {
  // This is a simulation - in a real app, you'd fetch real-time data from a transport API
  const transport = destination.transport.find(t => t.type === transportType);
  
  if (!transport) {
    return { status: 'low', text: 'Not available' };
  }
  
  const status = transport.availabilityStatus || 'medium';
  
  let text = '';
  switch (status) {
    case 'high':
      text = 'Highly available - many options';
      break;
    case 'medium':
      text = 'Moderately available - limited options';
      break;
    case 'low':
      text = 'Low availability - book in advance';
      break;
    default:
      text = 'Unknown availability';
  }
  
  return { status, text };
};

// Function to simulate real-time weather data
export const getWeatherData = async (
  lat: number,
  lng: number
): Promise<{
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}> => {
  // This is a simulation - in a real app, you'd fetch real-time data from a weather API
  // For demo purposes, we'll return mock data that looks reasonably realistic
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const conditions = [
    'Sunny',
    'Partly Cloudy',
    'Cloudy',
    'Light Rain',
    'Heavy Rain',
    'Thunderstorm',
    'Foggy',
    'Clear'
  ];
  
  const icons = [
    'sun',
    'cloud-sun',
    'cloud',
    'cloud-drizzle',
    'cloud-rain',
    'cloud-lightning',
    'cloud-fog',
    'moon'
  ];
  
  const randomIndex = Math.floor(Math.random() * conditions.length);
  
  return {
    temperature: Math.floor(Math.random() * 15) + 20, // Random temp between 20-35°C
    condition: conditions[randomIndex],
    humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // Random wind speed between 5-25 km/h
    icon: icons[randomIndex]
  };
};

// Function to simulate crowd levels
export const getCrowdLevel = (): {
  level: 'low' | 'moderate' | 'high' | 'very high';
  percentage: number;
  text: string;
} => {
  // This is a simulation - in a real app, you'd fetch real-time data
  const levels = ['low', 'moderate', 'high', 'very high'] as const;
  const randomIndex = Math.floor(Math.random() * levels.length);
  const level = levels[randomIndex];
  
  let percentage = 0;
  let text = '';
  
  switch (level) {
    case 'low':
      percentage = Math.floor(Math.random() * 25) + 5; // 5-30%
      text = 'Low crowds - great time to visit';
      break;
    case 'moderate':
      percentage = Math.floor(Math.random() * 20) + 30; // 30-50%
      text = 'Moderate crowds - reasonable waiting times';
      break;
    case 'high':
      percentage = Math.floor(Math.random() * 20) + 50; // 50-70%
      text = 'High crowds - expect some waiting';
      break;
    case 'very high':
      percentage = Math.floor(Math.random() * 30) + 70; // 70-100%
      text = 'Very crowded - long waiting times expected';
      break;
  }
  
  return { level, percentage, text };
};

// Function to format time to visit recommendation based on current time
export const getTimeToVisitRecommendation = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 6) {
    return 'Best to visit after sunrise around 6-7 AM for fewer crowds';
  } else if (hour < 10) {
    return 'Morning is a great time to visit with moderate crowds';
  } else if (hour < 12) {
    return 'Late morning currently has moderate to high crowds';
  } else if (hour < 15) {
    return 'Early afternoon typically has the highest crowds';
  } else if (hour < 18) {
    return 'Late afternoon is better as crowds start to reduce';
  } else {
    return 'Evening visits offer a different atmosphere with lower crowds';
  }
};
