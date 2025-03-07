
import React from 'react';
import { Calendar, Tag, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocalEventsProps {
  events: Array<{
    name: string;
    date: string;
    type: string;
  }> | null;
  className?: string;
}

const LocalEvents = ({ events, className }: LocalEventsProps) => {
  if (!events || events.length === 0) {
    return (
      <div className={cn("space-y-2", className)}>
        <h3 className="text-lg font-medium">Local Events</h3>
        <div className="flex items-center space-x-2 text-muted-foreground py-8 justify-center">
          <Info className="h-5 w-5" />
          <span>No upcoming events found</span>
        </div>
      </div>
    );
  }

  // Group events by type
  const groupedEvents: Record<string, typeof events> = {};
  events.forEach(event => {
    if (!groupedEvents[event.type]) {
      groupedEvents[event.type] = [];
    }
    groupedEvents[event.type].push(event);
  });
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Local Events</h3>
      
      {Object.entries(groupedEvents).map(([type, typeEvents], index) => (
        <div key={index} className="space-y-3">
          <h4 className="capitalize text-sm font-medium text-muted-foreground">{type} Events</h4>
          
          <div className="space-y-2">
            {typeEvents.map((event, eventIndex) => (
              <div 
                key={eventIndex}
                className="glass-card p-3 transition-all duration-300 hover:translate-y-[-2px]"
              >
                <div className="flex justify-between items-start">
                  <h5 className="font-medium">{event.name}</h5>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground capitalize">{event.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <p className="text-xs text-muted-foreground">
        Event schedule may change. Check with local organizers for confirmation.
      </p>
    </div>
  );
};

export default LocalEvents;
