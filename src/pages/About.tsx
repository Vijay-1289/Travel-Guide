
import React from 'react';
import { Globe, Users, Map, Award, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About TravelGuide</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Helping travelers discover India's most beautiful destinations with real-time information and personalized recommendations.
          </p>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-10">
            At TravelGuide, we're passionate about making travel in India more accessible, informed, and enjoyable. 
            Our mission is to connect travelers with authentic experiences by providing reliable, real-time information 
            about destinations across India.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center p-6 bg-muted/40 rounded-lg">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Cultural Preservation</h3>
              <p className="text-center text-muted-foreground">
                We're dedicated to promoting sustainable tourism that preserves India's cultural heritage and natural beauty.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-muted/40 rounded-lg">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Supporting Local Communities</h3>
              <p className="text-center text-muted-foreground">
                We highlight local businesses and experiences that benefit the communities you visit.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              TravelGuide began in 2023 when a group of travel enthusiasts recognized the need for better 
              travel information in India. Despite being home to some of the world's most incredible 
              destinations, we found that tourists often struggled to find reliable, up-to-date information.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founders had experienced the challenges firsthand – from outdated opening hours to 
              unexpected closures and transportation difficulties. They set out to create a platform 
              that would solve these problems using real-time data and local expertise.
            </p>
            <p className="text-muted-foreground">
              Today, TravelGuide has grown into a trusted resource for both domestic and international 
              tourists exploring India. Our team combines technology with deep local knowledge to 
              ensure you have the best possible travel experience.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80" 
              alt="Team planning travel routes"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Aanya Sharma",
                role: "Founder & CEO",
                bio: "Travel enthusiast with 15+ years exploring India's hidden gems.",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              },
              {
                name: "Vikram Patel",
                role: "Head of Content",
                bio: "Former travel journalist with a passion for storytelling and authentic experiences.",
                image: "https://images.unsplash.com/photo-1556157382-97eda2f9296e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              },
              {
                name: "Priya Nair",
                role: "Lead Developer",
                bio: "Tech expert focused on creating intuitive travel tools and real-time data integration.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
              },
              {
                name: "Raj Singh",
                role: "Local Partnerships",
                bio: "Builds relationships with local businesses and communities across India.",
                image: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Awards and Recognition */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Awards & Recognition</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Best Travel App 2023</h3>
            <p className="text-muted-foreground">India Tourism Developers Association</p>
          </div>
          
          <div className="p-6">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Excellence in Travel Innovation</h3>
            <p className="text-muted-foreground">Digital Travel Summit 2023</p>
          </div>
          
          <div className="p-6">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Cultural Preservation Award</h3>
            <p className="text-muted-foreground">Heritage Conservation Society</p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on the Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're planning your first trip to India or your fiftieth, we're here to help you discover the extraordinary.
        </p>
        <Button size="lg" className="rounded-full">
          Explore Destinations
        </Button>
      </div>
    </div>
  );
};

export default About;
