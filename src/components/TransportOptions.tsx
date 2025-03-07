
import React from 'react';
import { Bus, Train, Plane, Car, AlertCircle, Ship } from 'lucide-react';
import { TransportOption } from '@/lib/destinations';
import { getTransportAvailability } from '@/lib/mapUtils';
import { cn } from '@/lib/utils';

interface TransportOptionsProps {
  transport: TransportOption[];
  className?: string;
}

const TransportOptions = ({ transport, className }: TransportOptionsProps) => {
  const renderIcon = (type: string, className: string = 'h-5 w-5') => {
    switch (type) {
      case 'bus':
        return <Bus className={className} />;
      case 'train':
        return <Train className={className} />;
      case 'plane':
        return <Plane className={className} />;
      case 'car':
      case 'taxi':
        return <Car className={className} />;
      case 'metro':
        return <Train className={className} />;
      case 'boat':
        return <Ship className={className} />;
      default:
        return <Car className={className} />;
    }
  };
  
  const getAvailabilityColor = (status: 'high' | 'medium' | 'low') => {
    switch (status) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium mb-4">Transport Options</h3>
      
      {transport.length === 0 ? (
        <div className="flex items-center space-x-2 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <span>No transport information available</span>
        </div>
      ) : (
        <div className="space-y-4">
          {transport.map((option, index) => {
            const availability = getTransportAvailability(option.type);
            
            return (
              <div 
                key={index}
                className="glass-card p-4 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {renderIcon(option.type)}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium capitalize">{option.type}</h4>
                      <div className="flex items-center">
                        <span 
                          className={cn(
                            "inline-block h-2 w-2 rounded-full mr-1",
                            getAvailabilityColor(availability.status)
                          )}
                        />
                        <span className="text-xs text-muted-foreground">
                          {availability.status === 'high' ? 'High' : 
                           availability.status === 'medium' ? 'Medium' : 'Low'} Availability
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Duration:</span> {option.duration}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Cost:</span> {option.cost}
                      </p>
                      {option.frequency && (
                        <p className="text-sm">
                          <span className="text-muted-foreground">Frequency:</span> {option.frequency}
                        </p>
                      )}
                    </div>
                    
                    <p className="mt-2 text-xs text-muted-foreground">{availability.text}</p>
                    
                    <div className="mt-3">
                      <button className="text-xs text-primary font-medium hover:underline">
                        Check schedules
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        <p>* Availability and pricing information are real-time approximations and may vary.</p>
      </div>
    </div>
  );
};

export default TransportOptions;
