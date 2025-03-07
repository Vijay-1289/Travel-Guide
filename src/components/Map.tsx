
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserLocation, getDirections } from '@/lib/mapUtils';

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  markerTitle: string;
  className?: string;
}

const Map = ({ latitude, longitude, zoom, markerTitle, className }: MapProps) => {
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [userLocationError, setUserLocationError] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // This is a simulation of a map component
    // In a real application, you would use a map library like Google Maps, Mapbox, Leaflet, etc.
    const loadMap = async () => {
      setLoading(true);
      
      try {
        // Simulate delay for map loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Attempt to get user location
        try {
          const position = await getUserLocation();
          setUserLocation(position);
        } catch (error) {
          console.error('Error getting user location:', error);
          setUserLocationError('Could not access your location. Please enable location services.');
        }
        
        setMapReady(true);
      } catch (error) {
        console.error('Error loading map:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMap();
  }, []);

  const handleGetDirections = () => {
    if (!userLocation) return;
    
    const directionsUrl = getDirections(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      latitude,
      longitude
    );
    
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border", className)}>
      {loading ? (
        <div className="bg-secondary flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center">
            <Loader className="h-6 w-6 animate-spin text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      ) : (
        <div className="relative h-[400px]">
          {/* This is a placeholder for an actual map component */}
          <div 
            ref={mapContainerRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=800x400&markers=color:red%7C${latitude},${longitude}&key=AIzaSyC9LDb9h0xPPNZ2WLIV9-Wzr5s2nBUVh6c)`
            }}
          >
            {/* Map Placeholder Overlay */}
            <div className="absolute inset-0 bg-gray-200 opacity-20" />
          </div>
          
          {/* Map Information Overlay */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="glass px-4 py-2 rounded-lg self-start">
              <h3 className="font-medium flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-1" />
                {markerTitle}
              </h3>
            </div>
            
            <div className="flex flex-col space-y-2">
              {userLocationError ? (
                <div className="glass px-4 py-2 rounded-lg text-sm">
                  <p className="text-red-500">{userLocationError}</p>
                </div>
              ) : !userLocation ? (
                <button 
                  className="glass bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                  onClick={() => getUserLocation().then(setUserLocation).catch(err => setUserLocationError(err.message))}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Share my location
                </button>
              ) : (
                <button 
                  className="glass bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors duration-200"
                  onClick={handleGetDirections}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get directions
                </button>
              )}
              
              <div className="glass px-4 py-2 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
                <p className="text-sm">
                  {latitude.toFixed(4)}, {longitude.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
