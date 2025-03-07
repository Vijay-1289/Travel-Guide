
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { destinations } from '@/lib/destinations';
import { toast } from '@/components/ui/use-toast';

const Hero = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id: string, name: string, location: string}>>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Simulate image loading and reveal animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Update search results when search query changes
  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const results = destinations
        .filter(dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.location.toLowerCase().includes(query) ||
          dest.tags.some(tag => tag.toLowerCase().includes(query))
        )
        .map(dest => ({
          id: dest.id,
          name: dest.name,
          location: dest.location
        }));
      
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Search logic
    console.log('Searching for:', searchQuery);
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search error",
        description: "Please enter a destination to search",
        variant: "destructive"
      });
      return;
    }

    // If we have exact match, navigate to that destination
    const exactMatch = destinations.find(
      dest => dest.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (exactMatch) {
      navigate(`/destination/${exactMatch.id}`);
      return;
    }
    
    // If we have search results but not exact match, navigate to first result
    if (searchResults.length > 0) {
      navigate(`/destination/${searchResults[0].id}`);
      return;
    }
    
    // No results found
    toast({
      title: "No destinations found",
      description: `We couldn't find any destinations matching "${searchQuery}"`,
      variant: "destructive"
    });
  };

  const handleResultClick = (id: string) => {
    setShowResults(false);
    navigate(`/destination/${id}`);
  };

  return (
    <div className="relative h-screen max-h-[800px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            loaded ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <div className={cn(
          "max-w-3xl transition-all duration-700 delay-300 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}>
          <h1 className="text-white mb-6 leading-tight">
            Discover the World's Most Beautiful Destinations
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore famous tourist attractions with real-time data and personalized travel routes.
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="relative mx-auto max-w-2xl bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-lg transform transition-all duration-300 focus-within:scale-[1.02] focus-within:shadow-xl"
          >
            <div className="flex items-center">
              <div className="flex-grow flex items-center pl-4 relative">
                <Search className="h-5 w-5 text-white/70 mr-2" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full bg-transparent text-white placeholder:text-white/60 text-base py-3 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  onFocus={() => searchResults.length > 0 && setShowResults(true)}
                  aria-label="Search destinations"
                />
                
                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <ul className="max-h-60 overflow-auto py-1">
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <button
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                            onClick={() => handleResultClick(result.id)}
                          >
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <div>
                              <div className="font-medium">{result.name}</div>
                              <div className="text-xs text-muted-foreground">{result.location}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 font-medium transition-colors duration-200"
                aria-label="Search"
              >
                Explore
              </button>
            </div>
          </form>
          
          {/* Popular Searches */}
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2">
            <span className="text-white/70 text-sm">Popular:</span>
            {['Taj Mahal', 'Red Fort', 'Jaipur', 'Kerala'].map((term) => (
              <button
                key={term}
                className="text-white/90 hover:text-white text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors duration-200 flex items-center"
                onClick={() => setSearchQuery(term)}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {term}
              </button>
            ))}
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className={cn(
          "absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-500",
          loaded ? "opacity-70" : "opacity-0"
        )}>
          <a 
            href="#featured-destinations" 
            className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Scroll down"
          >
            <span className="text-xs mb-1">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
