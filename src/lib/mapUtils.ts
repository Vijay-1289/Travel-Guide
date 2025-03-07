
import { TransportOption } from './destinations';

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
  transportType: string
): { status: 'high' | 'medium' | 'low'; text: string } => {
  // This is a simulation - in a real app, you'd fetch real-time data from a transport API
  
  // Randomly generate availability based on time of day
  const hour = new Date().getHours();
  let status: 'high' | 'medium' | 'low';
  
  if (hour >= 7 && hour <= 10 || hour >= 16 && hour <= 19) {
    // Rush hours - less availability
    status = Math.random() > 0.7 ? 'medium' : 'low';
  } else if (hour >= 23 || hour <= 5) {
    // Late night - low availability
    status = Math.random() > 0.8 ? 'medium' : 'low';
  } else {
    // Normal hours - better availability
    status = Math.random() > 0.6 ? 'high' : 'medium';
  }
  
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
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fetch real weather data from OpenWeatherMap
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=886705b4c1182eb1c69f28eb8c520e20`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Fallback to generated data
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
  }
};

// Function to get crowd level based on time and day
export const getCrowdLevel = (): {
  level: 'low' | 'moderate' | 'high' | 'very high';
  percentage: number;
  text: string;
} => {
  // Get current day and hour
  const day = new Date().getDay(); // 0 is Sunday, 6 is Saturday
  const hour = new Date().getHours();
  
  // Weekend vs. weekday logic
  const isWeekend = day === 0 || day === 6;
  
  let level: 'low' | 'moderate' | 'high' | 'very high';
  let percentage: number;
  
  if (isWeekend) {
    if (hour >= 10 && hour <= 16) {
      // Peak weekend hours
      level = 'very high';
      percentage = Math.floor(Math.random() * 30) + 70; // 70-100%
    } else if ((hour >= 8 && hour < 10) || (hour > 16 && hour <= 18)) {
      // Busy weekend hours
      level = 'high';
      percentage = Math.floor(Math.random() * 20) + 50; // 50-70%
    } else {
      // Off-peak weekend
      level = 'moderate';
      percentage = Math.floor(Math.random() * 20) + 30; // 30-50%
    }
  } else {
    // Weekday
    if (hour >= 11 && hour <= 14) {
      // Lunch hours
      level = 'high';
      percentage = Math.floor(Math.random() * 20) + 50; // 50-70%
    } else if (hour >= 9 && hour <= 17) {
      // Work hours
      level = 'moderate';
      percentage = Math.floor(Math.random() * 20) + 30; // 30-50%
    } else {
      // Early morning or evening
      level = 'low';
      percentage = Math.floor(Math.random() * 25) + 5; // 5-30%
    }
  }
  
  let text = '';
  switch (level) {
    case 'low':
      text = 'Low crowds - great time to visit';
      break;
    case 'moderate':
      text = 'Moderate crowds - reasonable waiting times';
      break;
    case 'high':
      text = 'High crowds - expect some waiting';
      break;
    case 'very high':
      text = 'Very crowded - long waiting times expected';
      break;
  }
  
  return { level, percentage, text };
};

// Function to get time to visit recommendation
export const getTimeToVisitRecommendation = (): string => {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const isWeekend = day === 0 || day === 6;
  
  if (isWeekend) {
    if (hour < 9) {
      return 'Early morning is the best time to visit on weekends to avoid crowds';
    } else if (hour < 11) {
      return 'Morning hours are getting busier, but still a good time to visit';
    } else if (hour < 15) {
      return 'Peak weekend hours - expect significant crowds';
    } else if (hour < 18) {
      return 'Late afternoon is busy but crowds are starting to reduce';
    } else {
      return 'Evening hours are less crowded - good for a more relaxed visit';
    }
  } else {
    // Weekday recommendations
    if (hour < 9) {
      return 'Early morning on weekdays is perfect for a quiet visit';
    } else if (hour < 12) {
      return 'Morning on weekdays has moderate crowds, good time to visit';
    } else if (hour < 14) {
      return 'Lunch hours may be busier with local visitors';
    } else if (hour < 17) {
      return 'Afternoon is a good time for a weekday visit';
    } else {
      return 'Evening visits are recommended for fewer crowds and a different atmosphere';
    }
  }
};
