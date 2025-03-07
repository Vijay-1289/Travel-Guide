
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import { Destination } from '@/lib/destinations';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

const DestinationCard = ({ destination, className }: DestinationCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = destination.imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [destination.imageUrl]);

  return (
    <Link 
      to={`/destination/${destination.id}`}
      className={cn(
        "glass-card overflow-hidden block h-full group",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="w-full relative overflow-hidden aspect-[3/4] rounded-t-lg">
        {/* Image */}
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-all duration-700",
            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md",
            hovered ? "scale-105" : "scale-100"
          )}
          style={{ backgroundImage: `url(${destination.imageUrl})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1 fill-yellow-500" />
          <span className="text-xs font-medium">{destination.averageRating}</span>
        </div>
        
        {/* Location */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-white space-x-1 mb-1">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{destination.location}</span>
          </div>
          <h3 className="text-lg font-medium text-white">{destination.name}</h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {destination.shortDescription}
        </p>
        
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Best time: {destination.bestTimeToVisit}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-secondary px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {destination.reviewCount.toLocaleString()} reviews
          </span>
          <span className="inline-flex items-center text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform duration-200">
            <span>View details</span>
            <ArrowRight className="h-3 w-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
