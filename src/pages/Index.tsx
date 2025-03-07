
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedDestinations from '@/components/FeaturedDestinations';

const Index = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <FeaturedDestinations />
      </div>
    </div>
  );
};

export default Index;
