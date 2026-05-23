'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ChevronRightIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { users, merchants, getUserById } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { MerchantDashboard } from '@/components/dashboard/merchant-dashboard'

// Usuário logado mockado (comerciante para mostrar dashboard)
const currentUser = users[1] // Carlos - MERCHANT
const currentMerchant = merchants[0] // Cervejaria

const menuItems = [
  { icon: HeartIcon, label: 'Favoritos', badge: '12' },
  { icon: BellIcon, label: 'Notificações', badge: '3' },
  { icon: ShieldCheckIcon, label: 'Privacidade' },
  { icon: Cog6ToothIcon, label: 'Configurações' },
]

export function ProfileView() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard && currentUser.role === 'MERCHANT') {
    return <MerchantDashboard onBack={() => setShowDashboard(false)} />
  }

  return (
    <div className="px-4 space-y-6">
      {/* Header do perfil */}
      <div className="flex items-center gap-4 py-2">
        <div className="relative">
          {currentUser.avatarUrl ? (
            <Image
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              width={72}
              height={72}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-18 h-18 rounded-full bg-muted flex items-center justify-center">
              <UserCircleIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className={cn(
            'absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold',
            currentUser.role === 'MERCHANT' 
              ? 'bg-primary text-primary-foreground' 
              : currentUser.role === 'ADMIN'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-secondary text-secondary-foreground'
          )}>
            {currentUser.role === 'MERCHANT' ? 'PRO' : currentUser.role}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-foreground truncate">
            {currentUser.name}
          </h1>
          <p className="text-sm text-muted-foreground truncate">
            {currentUser.email}
          </p>
          {currentUser.role === 'MERCHANT' && (
            <p className="text-xs text-primary mt-1">
              {currentMerchant.businessName}
            </p>
          )}
        </div>
      </div>

      {/* Dashboard do comerciante (CTA) */}
      {currentUser.role === 'MERCHANT' && (
        <button
          onClick={() => setShowDashboard(true)}
          className="w-full bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <BuildingStorefrontIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-primary-foreground">
              Painel do Comerciante
            </p>
            <p className="text-sm text-primary-foreground/80">
              Gerencie seus eventos e promoções
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-primary-foreground" />
        </button>
      )}

      {/* Estatísticas do usuário */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-foreground">23</p>
          <p className="text-xs text-muted-foreground">Eventos</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-foreground">4.9</p>
          <p className="text-xs text-muted-foreground">Avaliação</p>
        </div>
      </div>

      {/* Menu de opções */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-4 min-h-[56px] hover:bg-muted transition-all duration-200',
              index !== menuItems.length - 1 && 'border-b border-border'
            )}
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-left text-foreground font-medium">
              {item.label}
            </span>
            {item.badge && (
              <span className="px-2 py-0.5 bg-primary rounded-full text-xs font-semibold text-primary-foreground">
                {item.badge}
              </span>
            )}
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Botão de logout */}
      <button className="w-full flex items-center justify-center gap-2 py-4 text-destructive font-medium min-h-[56px] hover:bg-destructive/10 rounded-xl transition-all duration-200">
        <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        Sair da Conta
      </button>

      {/* Versão do app */}
      <p className="text-center text-xs text-muted-foreground pb-4">
        Festou v1.0.0 • Economia Criativa Local
      </p>
    </div>
  )
}
