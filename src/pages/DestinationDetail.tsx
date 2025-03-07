
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDestinationById, Destination } from '@/lib/destinations';
import { MapPin, Calendar, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransportOptions from '@/components/TransportOptions';
import Map from '@/components/Map';
import { toast } from '@/components/ui/use-toast';
import { 
  getWeatherData, 
  getAirQualityData, 
  getLocalEvents,
  getCurrencyRates
} from '@/lib/mapUtils';
import AirQualityInfo from '@/components/AirQualityInfo';
import LocalEvents from '@/components/LocalEvents';
import CurrencyExchange from '@/components/CurrencyExchange';
import WeatherForecast from '@/components/WeatherForecast';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [airQuality, setAirQuality] = useState<any>(null);
  const [localEvents, setLocalEvents] = useState<any>(null);
  const [currencyRates, setCurrencyRates] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchDestination = async () => {
      setLoading(true);
      const foundDestination = getDestinationById(id);
      
      if (foundDestination) {
        setDestination(foundDestination);
        setActiveImage(foundDestination.imageUrl);
        
        // Fetch real-time data in parallel
        try {
          const [weatherData, airQualityData, eventsData, currencyData] = await Promise.all([
            getWeatherData(
              foundDestination.coordinates.lat,
              foundDestination.coordinates.lng
            ),
            getAirQualityData(
              foundDestination.coordinates.lat,
              foundDestination.coordinates.lng
            ),
            getLocalEvents(foundDestination.location.split(',')[0].trim()),
            getCurrencyRates()
          ]);
          
          setWeather(weatherData);
          setAirQuality(airQualityData);
          setLocalEvents(eventsData);
          setCurrencyRates(currencyData);
        } catch (error) {
          console.error('Error fetching real-time data:', error);
          toast({
            title: "Data Fetch Warning",
            description: "Some real-time information could not be loaded.",
            variant: "destructive"
          });
        }
        
        setLoading(false);
      } else {
        toast({
          title: "Destination not found",
          description: "We couldn't find the destination you're looking for.",
          variant: "destructive"
        });
        navigate('/');
      }
    };
    
    fetchDestination();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading destination details...</p>
        </div>
      </div>
    );
  }
  
  if (!destination) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 group" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-lg overflow-hidden aspect-video bg-muted">
            <img 
              src={activeImage} 
              alt={destination.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[destination.imageUrl, ...destination.gallery].slice(0, 4).map((image, index) => (
              <div 
                key={index}
                className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeImage === image ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setActiveImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${destination.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span>{destination.location}</span>
            </div>
            <h1 className="text-3xl font-bold">{destination.name}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{destination.averageRating}</span>
            </div>
            <span className="text-muted-foreground">
              ({destination.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
          
          {/* Weather information */}
          {weather && (
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Current Weather</h3>
              <div className="flex items-center">
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
                  alt={weather.condition} 
                  className="mr-2 w-12 h-12"
                />
                <div>
                  <p className="font-medium text-lg">{weather.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">{weather.condition}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind: {weather.windSpeed} km/h</p>
              </div>
              
              {weather.forecast && (
                <WeatherForecast forecast={weather.forecast} className="mt-4" />
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Best time to visit: {destination.bestTimeToVisit}</span>
          </div>
          
          {destination.entryFee && (
            <div className="bg-secondary/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Entry Fee</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Indian Nationals:</span>
                  <p>{destination.entryFee.indian}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Foreign Nationals:</span>
                  <p>{destination.entryFee.foreign}</p>
                </div>
              </div>
            </div>
          )}
          
          {destination.openingHours && (
            <div>
              <h3 className="font-medium mb-1">Opening Hours</h3>
              <p className="text-sm">{destination.openingHours}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            {destination.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-secondary px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <div className="mt-12">
        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="practical">Practical Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{destination.description}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Historical Significance</h2>
                <p className="text-muted-foreground">{destination.historicalSignificance}</p>
              </div>
              
              {localEvents && (
                <div className="mt-8">
                  <LocalEvents events={localEvents} />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="transport" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Transport Options</h2>
            <TransportOptions transport={destination.transport} />
          </TabsContent>
          
          <TabsContent value="nearby" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Nearby Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {destination.nearbyAttractions.map((attraction, index) => (
                <div 
                  key={index}
                  className="border border-border p-4 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="font-medium">{attraction.name}</h3>
                  <p className="text-sm text-muted-foreground">Distance: {attraction.distance}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Location</h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <Map 
                latitude={destination.coordinates.lat}
                longitude={destination.coordinates.lng}
                zoom={10}
                markerTitle={destination.name}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="practical" className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">Practical Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {airQuality && (
                <div className="bg-primary/5 rounded-lg">
                  <AirQualityInfo airQuality={airQuality} />
                </div>
              )}
              
              {currencyRates && (
                <div className="bg-primary/5 rounded-lg">
                  <CurrencyExchange rates={currencyRates} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DestinationDetail;
