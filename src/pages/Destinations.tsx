
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '@/lib/destinations';
import { MapPin, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Extract all unique tags from destinations
  useEffect(() => {
    const allTags = destinations.flatMap(dest => dest.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();
    setVisibleTags(showAllTags ? uniqueTags : uniqueTags.slice(0, 8));
  }, [showAllTags]);
  
  // Filter destinations based on search query and selected tags
  useEffect(() => {
    let filtered = [...destinations];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        dest => 
          dest.name.toLowerCase().includes(query) || 
          dest.location.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(dest => 
        selectedTags.every(tag => dest.tags.includes(tag))
      );
    }
    
    setFilteredDestinations(filtered);
  }, [searchQuery, selectedTags]);
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Explore Destinations</h1>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search destinations..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="bg-muted/40 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4" />
            <h3 className="font-medium">Filter by Tags</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {visibleTags.map(tag => (
              <label 
                key={tag}
                className="flex items-center space-x-2 bg-background rounded-md px-3 py-1.5 cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <Checkbox 
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <span className="text-sm">{tag}</span>
              </label>
            ))}
          </div>
          
          {visibleTags.length < destinations.flatMap(dest => dest.tags).filter((v, i, a) => a.indexOf(v) === i).length && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-xs"
            >
              {showAllTags ? 'Show less' : 'Show more tags'}
            </Button>
          )}
        </div>
      </div>
      
      {/* Destination Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No destinations found matching your criteria.</p>
          <Button onClick={() => {setSearchQuery(''); setSelectedTags([])}}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <Link 
              key={destination.id}
              to={`/destination/${destination.id}`}
              className="group"
            >
              <div className="bg-background rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 group-hover:translate-y-[-4px]">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-medium mb-1">{destination.name}</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="text-xs">{destination.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{destination.description.substring(0, 100)}...</p>
                  
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {destination.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="text-xs bg-secondary px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {destination.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{destination.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinations;
