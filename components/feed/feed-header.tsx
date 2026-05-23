"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { StoryRail } from "./story-rail";

const categories = [
  { id: "all", label: "Todos", active: true },
  { id: "music", label: "Música", active: false },
  { id: "gastro", label: "Gastronomia", active: false },
  { id: "art", label: "Arte", active: false },
  { id: "party", label: "Festas", active: false },
  { id: "fair", label: "Feiras", active: false },
];

export function FeedHeader() {
  return (
    /* pt-16 adicionado para empurrar o conteúdo para baixo do header fixo no mobile, sumindo no desktop (md:pt-0) */
    <div className="space-y-4 px-4 pb-4 pt-16 md:pt-0 md:px-0">
      {/* 1. Story Rail: Destaques no topo estilo Instagram */}
      <div className="-mx-4 md:mx-0 mt-2">
        <StoryRail />
      </div>

      {/* 2. Barra de busca limpa (Botão de engrenagem/configuração removido) */}
      <div className="w-full relative mt-4">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar eventos, locais, artistas..."
          className="w-full py-3 pl-10 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] transition-all"
        />
      </div>

      {/* 3. Categorias (Filtros Rápidos expansíveis para a direita) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`tap shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[36px] transition-all duration-200 active:scale-95 ${
              category.active
                ? "bg-foreground text-background shadow-md"
                : "bg-card text-muted-foreground border border-border hover:bg-muted"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
