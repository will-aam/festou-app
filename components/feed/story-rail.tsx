"use client";

import { useState } from "react";
import {
  PlusIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

type Story = {
  id: string;
  name: string;
  avatar: string;
  live?: boolean;
  seen?: boolean;
};

// Dados mockados focados no HackAiá
const stories: Story[] = [
  { id: "me", name: "Seu story", avatar: "https://i.pravatar.cc/100?img=12" },
  {
    id: "s1",
    name: "Forró Caju",
    avatar: "https://i.pravatar.cc/100?img=33",
    live: true,
  },
  {
    id: "s2",
    name: "Bar do Beco",
    avatar:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=70",
    live: true,
  },
  {
    id: "s3",
    name: "Vila do Forró",
    avatar:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "s4",
    name: "Gonzagão",
    avatar:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "s5",
    name: "Comidas",
    avatar:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=200&q=70",
  },
  { id: "s6", name: "Quadrilhas", avatar: "https://i.pravatar.cc/100?img=15" },
];

export function StoryRail() {
  // Estado que controla se o Rail está recolhido (false) ou expandido (true)
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`w-full pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 transition-all duration-300 ${
        isExpanded ? "overflow-x-auto no-scrollbar" : "overflow-hidden"
      }`}
    >
      <div className="flex items-start gap-4 w-max">
        {/* 1. SEU STORY (Sempre visível) */}
        <button className="tap flex flex-col items-center gap-1.5 transition-transform active:scale-95 w-[68px] shrink-0">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary">
              <div className="h-full w-full overflow-hidden rounded-full border-[2.5px] border-background">
                <img
                  src={stories[0].avatar}
                  alt={stories[0].name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-primary">
              <PlusIcon className="h-3 w-3 text-primary-foreground" />
            </span>
          </div>
          <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-foreground/90">
            {stories[0].name}
          </span>
        </button>
        {/* 2. SETA DE EXPANDIR (Visível apenas quando recolhido) */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="tap flex flex-col items-center gap-1.5 w-[68px] shrink-0 active:scale-95 group"
            aria-label="Expandir destaques"
          >
            {/* Removemos o border-dashed, border-2 e bg-card. Deixamos transparente. */}
            <div className="grid h-16 w-16 place-items-center bg-transparent">
              {/* Ícone maior (w-8 h-8), animando sozinho (animate-pulse) e deslizando no hover */}
              <ChevronRightIcon className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1.5 animate-pulse" />
            </div>
            <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-muted-foreground/60 group-hover:text-primary transition-colors">
              Ver mais
            </span>
          </button>
        )}

        {/* 3. LISTA RECOLHÍVEL (Aparece deslizando para a direita) */}
        <div
          className={`flex items-start gap-4 transition-all duration-500 ease-in-out ${
            isExpanded
              ? "max-w-[1500px] opacity-100"
              : "max-w-0 opacity-0 overflow-hidden"
          }`}
        >
          {stories.slice(1).map((s) => (
            <button
              key={s.id}
              className="tap flex flex-col items-center gap-1.5 transition-transform active:scale-95 w-[68px] shrink-0"
            >
              <div className="relative">
                <div
                  className={`grid h-16 w-16 place-items-center rounded-full p-[2px] ${
                    s.live
                      ? "bg-gradient-to-tr from-destructive via-primary to-secondary"
                      : s.seen
                        ? "bg-muted"
                        : "bg-gradient-to-tr from-primary to-secondary"
                  }`}
                >
                  <div className="h-full w-full overflow-hidden rounded-full border-[2.5px] border-background">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {s.live && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wide text-destructive-foreground ring-2 ring-background">
                    Live
                  </span>
                )}
              </div>
              <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-foreground/90">
                {s.name}
              </span>
            </button>
          ))}

          {/* 4. SETA DE RECOLHER (Aparece no final da lista quando expandido) */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="tap flex flex-col items-center gap-1.5 w-[68px] shrink-0 active:scale-95 group transition-all"
              aria-label="Recolher destaques"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full border border-border bg-card shadow-sm hover:bg-muted transition-all">
                <ChevronLeftIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-muted-foreground">
                Recolher
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
