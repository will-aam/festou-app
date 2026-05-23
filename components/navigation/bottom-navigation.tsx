'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon as HomeOutline,
  MapIcon as MapOutline,
  CalendarDaysIcon as CalendarOutline,
  UserIcon as UserOutline,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  MapIcon as MapSolid,
  CalendarDaysIcon as CalendarSolid,
  UserIcon as UserSolid,
} from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

const navItems = [
  {
    label: 'Início',
    href: '/',
    iconOutline: HomeOutline,
    iconSolid: HomeSolid,
  },
  {
    label: 'Mapa',
    href: '/mapa',
    iconOutline: MapOutline,
    iconSolid: MapSolid,
  },
  {
    label: 'Agenda',
    href: '/agenda',
    iconOutline: CalendarOutline,
    iconSolid: CalendarSolid,
  },
  {
    label: 'Perfil',
    href: '/perfil',
    iconOutline: UserOutline,
    iconSolid: UserSolid,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.iconSolid : item.iconOutline

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-3 py-2 rounded-xl transition-all duration-200',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon 
                className={cn(
                  'w-6 h-6 transition-all duration-200',
                  isActive && 'scale-110'
                )} 
              />
              <span className={cn(
                'text-xs mt-1 font-medium transition-all duration-200',
                isActive && 'text-primary'
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
