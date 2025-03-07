
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getRandomDestinations, Destination } from '@/lib/destinations';
import { cn } from '@/lib/utils';
import DestinationCard from './DestinationCard';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Simulate API call to get destinations
    setTimeout(() => {
      setDestinations(getRandomDestinations(4));
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.destination-item').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [destinations]);

  return (
    <section id="featured-destinations" className="py-20 bg-white dark:bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">DISCOVER INDIA</span>
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Featured Destinations</h2>
          <p className="text-muted-foreground">
            Explore the most beautiful and historically significant places across India, with real-time information and personalized travel routes.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="rounded-lg bg-secondary animate-pulse h-[400px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <div 
                key={destination.id}
                id={`destination-${destination.id}`} 
                className={cn(
                  "destination-item transition-all duration-700 transform",
                  visibleItems[`destination-${destination.id}`] 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link 
            to="/destinations" 
            className="inline-flex items-center space-x-2 text-primary font-medium hover:text-primary/80 transition-colors duration-200"
          >
            <span>View all destinations</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
