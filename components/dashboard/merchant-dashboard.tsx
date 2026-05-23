'use client'

import { useState } from 'react'
import { 
  ArrowLeftIcon,
  EyeIcon, 
  CursorArrowRaysIcon, 
  TicketIcon,
  PlusIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { merchants, getMetricsByMerchant, getEventsByMerchant } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface MerchantDashboardProps {
  onBack: () => void
}

const currentMerchant = merchants[0]
const metrics = getMetricsByMerchant(currentMerchant.id)!
const merchantEvents = getEventsByMerchant(currentMerchant.id)

export function MerchantDashboard({ onBack }: MerchantDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'create'>('overview')

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-muted transition-all duration-200"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{currentMerchant.businessName}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={cn(
            'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px]',
            activeTab === 'overview' 
              ? 'bg-card text-foreground shadow-sm' 
              : 'text-muted-foreground'
          )}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={cn(
            'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-h-[44px]',
            activeTab === 'create' 
              ? 'bg-card text-foreground shadow-sm' 
              : 'text-muted-foreground'
          )}
        >
          Criar Promoção
        </button>
      </div>

      {activeTab === 'overview' ? (
        <OverviewTab />
      ) : (
        <CreatePromotionTab />
      )}
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <EyeIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visualizações</p>
                <p className="text-2xl font-bold text-foreground">
                  {metrics.totalViews.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-secondary font-medium">+12.5%</span>
              <p className="text-xs text-muted-foreground">vs. semana anterior</p>
            </div>
          </div>
          {/* Mini gráfico */}
          <div className="flex items-end gap-1 h-12 mt-4">
            {metrics.weeklyViews.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/30 rounded-t transition-all duration-200 hover:bg-primary/50"
                style={{ height: `${(value / Math.max(...metrics.weeklyViews)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
              <span key={day} className="text-[10px] text-muted-foreground">{day}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <CursorArrowRaysIcon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cliques</p>
                <p className="text-xl font-bold text-foreground">
                  {metrics.totalClicks.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <TicketIcon className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reservas</p>
                <p className="text-xl font-bold text-foreground">
                  {metrics.totalBookings.toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eventos ativos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Eventos Ativos</h2>
          <span className="text-sm text-muted-foreground">{merchantEvents.length} eventos</span>
        </div>
        <div className="space-y-2">
          {merchantEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <CalendarDaysIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {event.attendees}/{event.maxAttendees} confirmados
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{event.attendees}</p>
                <p className="text-[10px] text-muted-foreground">inscritos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CreatePromotionTab() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <PlusIcon className="w-5 h-5 text-primary" />
          Nova Promoção
        </h2>

        {/* Formulário mockado */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Título da Promoção
            </label>
            <input
              type="text"
              placeholder="Ex: 2 por 1 em cervejas"
              className="w-full py-3 px-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Descrição do Desconto
            </label>
            <input
              type="text"
              placeholder="Ex: Compre uma cerveja e ganhe outra"
              className="w-full py-3 px-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Evento Vinculado
            </label>
            <select className="w-full py-3 px-4 bg-muted rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] appearance-none">
              <option value="">Selecione um evento</option>
              {merchantEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Código Promocional
              </label>
              <input
                type="text"
                placeholder="PROMO2024"
                className="w-full py-3 px-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Válido até
              </label>
              <input
                type="date"
                className="w-full py-3 px-4 bg-muted rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Imagem de Destaque
            </label>
            <button className="w-full py-6 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/50 transition-all duration-200">
              <PhotoIcon className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Clique para enviar imagem
              </span>
            </button>
          </div>

          <button className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl min-h-[44px] transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]">
            Criar Promoção
          </button>
        </div>
      </div>
    </div>
  )
}
