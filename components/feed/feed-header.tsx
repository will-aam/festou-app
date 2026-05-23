"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { StoryRail } from "./story-rail";

export function FeedHeader() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pullZoneRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const isDragging = useRef(false);
  const [pullProgress, setPullProgress] = useState(0);

  const PULL_THRESHOLD = 60;

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isExpanded) return;
      touchStartY.current = e.touches[0].clientY;
      touchCurrentY.current = e.touches[0].clientY;
      isDragging.current = true;
    },
    [isExpanded],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current || isExpanded) return;
      touchCurrentY.current = e.touches[0].clientY;
      const delta = touchCurrentY.current - touchStartY.current;
      if (delta > 0) {
        const progress = Math.min(delta / PULL_THRESHOLD, 1);
        setPullProgress(progress);
      } else {
        setPullProgress(0);
      }
    },
    [isExpanded],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (pullProgress >= 0.9) setIsExpanded(true);
    setPullProgress(0);
  }, [pullProgress]);

  return (
    <div className="space-y-0 px-4 pb-2 pt-16 md:pt-8 md:px-0">
      {/* 1. BARRA DE BUSCA (AGORA NO TOPO) */}
      <div className="w-full relative mb-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar eventos, locais, artistas..."
              className="w-full py-3 pl-10 pr-4 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. STORIES (AGORA ABAIXO DA BUSCA) */}
      <div
        ref={pullZoneRef}
        className="w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <StoryRail isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        {/* Indicadores de Pull (Mobile) */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="md:hidden flex items-center gap-2 px-1 py-1 w-full tap active:scale-[0.99] transition-transform"
          >
            <span className="text-[11px] text-muted-foreground/70 font-medium ml-1">
              Ver destaques
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 text-muted-foreground/40"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
