'use client'

import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const categories = [
  { id: 'all', label: 'Todos', active: true },
  { id: 'music', label: 'Música', active: false },
  { id: 'gastro', label: 'Gastronomia', active: false },
  { id: 'art', label: 'Arte', active: false },
  { id: 'party', label: 'Festas', active: false },
  { id: 'fair', label: 'Feiras', active: false },
]

export function FeedHeader() {
  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Barra de busca */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar eventos, locais..."
            className="w-full py-3 pl-10 pr-4 bg-muted rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px]"
          />
        </div>
        <button 
          className="p-3 bg-muted rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-muted/80 transition-all duration-200"
          aria-label="Filtros"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-[36px] transition-all duration-200 ${
              category.active
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  )
}
