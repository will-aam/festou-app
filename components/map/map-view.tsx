'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPinIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { FireIcon } from '@heroicons/react/24/solid'
import { events, getMerchantById, formatPrice, formatDateShort } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// Posições dos pins no mapa (simulando coordenadas)
const pinPositions = [
  { top: '25%', left: '30%' },
  { top: '40%', left: '60%' },
  { top: '55%', left: '25%' },
  { top: '35%', left: '75%' },
  { top: '60%', left: '55%' },
  { top: '20%', left: '50%' },
  { top: '70%', left: '40%' },
  { top: '45%', left: '15%' },
]

export function MapView() {
  const [selectedEvent, setSelectedEvent] = useState(events[0])
  const [carouselIndex, setCarouselIndex] = useState(0)

  const handlePrevious = () => {
    const newIndex = carouselIndex > 0 ? carouselIndex - 1 : events.length - 1
    setCarouselIndex(newIndex)
    setSelectedEvent(events[newIndex])
  }

  const handleNext = () => {
    const newIndex = carouselIndex < events.length - 1 ? carouselIndex + 1 : 0
    setCarouselIndex(newIndex)
    setSelectedEvent(events[newIndex])
  }

  return (
    <div className="fixed inset-0 top-16 bottom-20 z-0">
      {/* Fundo do mapa (mock) */}
      <div 
        className="absolute inset-0 bg-[#1a1a2e]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(42, 157, 143, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(255, 122, 0, 0.08) 0%, transparent 40%),
            linear-gradient(rgba(30, 30, 46, 0.9), rgba(30, 30, 46, 0.95)),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `
        }}
      >
        {/* Linhas de ruas simuladas */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#444" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="55%" stroke="#444" strokeWidth="2" />
          <line x1="20%" y1="0" x2="25%" y2="100%" stroke="#444" strokeWidth="2" />
          <line x1="50%" y1="0" x2="55%" y2="100%" stroke="#444" strokeWidth="2" />
          <line x1="80%" y1="0" x2="75%" y2="100%" stroke="#444" strokeWidth="2" />
          <line x1="0" y1="15%" x2="40%" y2="20%" stroke="#333" strokeWidth="1" />
          <line x1="60%" y1="80%" x2="100%" y2="75%" stroke="#333" strokeWidth="1" />
        </svg>

        {/* Pins dos eventos */}
        {events.map((event, index) => {
          const position = pinPositions[index % pinPositions.length]
          const isSelected = selectedEvent.id === event.id

          return (
            <button
              key={event.id}
              className={cn(
                'absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 z-10',
                isSelected ? 'scale-125 z-20' : 'hover:scale-110'
              )}
              style={{ top: position.top, left: position.left }}
              onClick={() => {
                setSelectedEvent(event)
                setCarouselIndex(index)
              }}
              aria-label={`Ver ${event.title}`}
            >
              {/* Pin customizado */}
              <div className={cn(
                'relative flex flex-col items-center',
              )}>
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-200',
                  isSelected 
                    ? 'bg-primary border-primary-foreground' 
                    : 'bg-card border-border hover:border-primary'
                )}>
                  {event.isLive ? (
                    <FireIcon className={cn(
                      'w-5 h-5',
                      isSelected ? 'text-primary-foreground' : 'text-destructive'
                    )} />
                  ) : (
                    <MapPinIcon className={cn(
                      'w-5 h-5',
                      isSelected ? 'text-primary-foreground' : 'text-foreground'
                    )} />
                  )}
                </div>
                {/* Triângulo do pin */}
                <div className={cn(
                  'w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent -mt-1 transition-all duration-200',
                  isSelected ? 'border-t-primary' : 'border-t-card'
                )} />
              </div>
            </button>
          )
        })}

        {/* Indicador de localização do usuário */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-50" />
          </div>
        </div>
      </div>

      {/* Carousel de eventos na base */}
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className="relative">
          {/* Controles do carousel */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center border border-border shadow-lg transition-all duration-200 hover:bg-card"
            aria-label="Evento anterior"
          >
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center border border-border shadow-lg transition-all duration-200 hover:bg-card"
            aria-label="Próximo evento"
          >
            <ChevronRightIcon className="w-5 h-5 text-foreground" />
          </button>

          {/* Card do evento selecionado */}
          <EventMapCard event={selectedEvent} />
        </div>

        {/* Indicadores do carousel */}
        <div className="flex justify-center gap-1.5 mt-3">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCarouselIndex(index)
                setSelectedEvent(events[index])
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === carouselIndex ? 'bg-primary w-6' : 'bg-muted'
              )}
              aria-label={`Ir para evento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function EventMapCard({ event }: { event: typeof events[0] }) {
  const merchant = getMerchantById(event.merchantId)

  return (
    <div className="bg-card/95 backdrop-blur-lg rounded-2xl border border-border overflow-hidden shadow-2xl">
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="96px"
          />
          {event.isLive && (
            <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-destructive rounded text-[10px] font-bold text-destructive-foreground flex items-center gap-0.5">
              <FireIcon className="w-2.5 h-2.5" />
              LIVE
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
              {event.title}
            </h3>
            {merchant && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {merchant.businessName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                {formatDateShort(event.startsAt)}
              </span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-3.5 h-3.5" />
                1.2km
              </span>
            </div>
            <span className={cn(
              'text-sm font-bold',
              event.price === 0 ? 'text-secondary' : 'text-foreground'
            )}>
              {formatPrice(event.price || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Botão de ação */}
      <div className="px-3 pb-3">
        <button className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm min-h-[44px] transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]">
          Ver Detalhes
        </button>
      </div>
    </div>
  )
}
