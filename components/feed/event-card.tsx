'use client'

import Image from 'next/image'
import { MapPinIcon, ClockIcon, UsersIcon, TagIcon } from '@heroicons/react/24/outline'
import { FireIcon } from '@heroicons/react/24/solid'
import { Event, getMerchantById, getPromotionsByEvent, formatPrice, formatDate } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  distance?: string
}

export function EventCard({ event, distance = '1.2km' }: EventCardProps) {
  const merchant = getMerchantById(event.merchantId)
  const promotions = getPromotionsByEvent(event.id)
  const hasPromotion = promotions.length > 0 && promotions.some(p => p.active)

  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border transition-all duration-200 hover:border-primary/50 active:scale-[0.98]">
      {/* Imagem de capa */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Badge de status */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isLive && (
            <span className="flex items-center gap-1 px-2 py-1 bg-destructive rounded-full text-xs font-semibold text-destructive-foreground">
              <FireIcon className="w-3 h-3" />
              Ao vivo
            </span>
          )}
          {hasPromotion && (
            <span className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-xs font-semibold text-secondary-foreground">
              <TagIcon className="w-3 h-3" />
              Promoção
            </span>
          )}
        </div>

        {/* Categoria */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {event.category}
          </span>
        </div>

        {/* Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Header do card */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight line-clamp-2">
              {event.title}
            </h3>
            {merchant && (
              <p className="text-sm text-muted-foreground mt-1 truncate">
                {merchant.businessName}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 text-right">
            <span className={cn(
              'text-lg font-bold',
              event.price === 0 ? 'text-secondary' : 'text-foreground'
            )}>
              {formatPrice(event.price || 0)}
            </span>
          </div>
        </div>

        {/* Informações */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{formatDate(event.startsAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-4 h-4" />
            <span>{distance}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" />
              <span>{event.attendees} confirmados</span>
            </div>
          )}
        </div>

        {/* Promoção ativa */}
        {hasPromotion && (
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-2">
            <p className="text-xs text-secondary font-medium">
              🎉 {promotions[0].discountText}
            </p>
          </div>
        )}

        {/* Botão de ação */}
        <button className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-xl min-h-[44px] transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]">
          Ver Detalhes
        </button>
      </div>
    </article>
  )
}
