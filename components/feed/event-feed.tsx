'use client'

import { events } from '@/lib/mock-data'
import { EventCard } from './event-card'

const distances = ['0.5km', '1.2km', '2.3km', '0.8km', '3.1km', '1.5km', '0.3km', '4.2km']

export function EventFeed() {
  return (
    <div className="px-4 space-y-4">
      {/* Header da seção */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Eventos Próximos</h2>
        <button className="text-sm text-primary font-medium min-h-[44px] px-2 flex items-center">
          Ver todos
        </button>
      </div>

      {/* Feed de cards */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <EventCard 
            key={event.id} 
            event={event} 
            distance={distances[index % distances.length]} 
          />
        ))}
      </div>
    </div>
  )
}
