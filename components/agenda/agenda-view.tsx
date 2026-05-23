'use client'

import Image from 'next/image'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { getUserEvents, formatDate, formatPrice, users } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// Usando o primeiro usuário como usuário logado
const currentUser = users[0]

export function AgendaView() {
  const userEvents = getUserEvents(currentUser.id)

  const confirmedEvents = userEvents.filter(ue => ue.status === 'CONFIRMED')
  const pendingEvents = userEvents.filter(ue => ue.status === 'PENDING')

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Minha Agenda</h1>
        <p className="text-sm text-muted-foreground">
          Seus eventos confirmados e pendentes
        </p>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{confirmedEvents.length}</p>
              <p className="text-xs text-muted-foreground">Confirmados</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <CalendarDaysIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingEvents.length}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de eventos confirmados */}
      {confirmedEvents.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-secondary" />
            Confirmados
          </h2>
          <div className="space-y-3">
            {confirmedEvents.map((ue) => (
              <AgendaEventCard key={ue.id} userEvent={ue} />
            ))}
          </div>
        </section>
      )}

      {/* Lista de eventos pendentes */}
      {pendingEvents.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary" />
            Aguardando Confirmação
          </h2>
          <div className="space-y-3">
            {pendingEvents.map((ue) => (
              <AgendaEventCard key={ue.id} userEvent={ue} isPending />
            ))}
          </div>
        </section>
      )}

      {/* Estado vazio */}
      {userEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <CalendarDaysIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum evento agendado
          </h3>
          <p className="text-sm text-muted-foreground max-w-[240px]">
            Explore o feed e descubra eventos incríveis perto de você!
          </p>
        </div>
      )}
    </div>
  )
}

interface AgendaEventCardProps {
  userEvent: ReturnType<typeof getUserEvents>[0]
  isPending?: boolean
}

function AgendaEventCard({ userEvent, isPending }: AgendaEventCardProps) {
  const { event } = userEvent

  return (
    <div className={cn(
      'bg-card border rounded-xl overflow-hidden transition-all duration-200',
      isPending ? 'border-primary/50' : 'border-border'
    )}>
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                {event.title}
              </h3>
              <span className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0',
                isPending 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary/20 text-secondary'
              )}>
                {isPending ? 'Pendente' : 'Confirmado'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1">
              <CalendarDaysIcon className="w-3.5 h-3.5" />
              {formatDate(event.startsAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex border-t border-border">
        <button className="flex-1 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all duration-200 min-h-[44px]">
          Ver Detalhes
        </button>
        {isPending ? (
          <button className="flex-1 py-3 text-sm font-medium text-primary hover:bg-primary/10 border-l border-border transition-all duration-200 min-h-[44px]">
            Confirmar
          </button>
        ) : (
          <button className="flex-1 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 border-l border-border transition-all duration-200 min-h-[44px] flex items-center justify-center gap-1">
            <XCircleIcon className="w-4 h-4" />
            Cancelar
          </button>
        )}
      </div>
    </div>
  )
}
