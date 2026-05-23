"use client";

import { useState } from "react";
import {
  HeartIcon as HeartOutline,
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon as BookmarkOutline,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  BookmarkIcon as BookmarkSolid,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  Event,
  getMerchantById,
  formatPrice,
  formatDateShort,
} from "@/lib/mock-data";

export function PostCard({
  event,
  avatar,
  likes,
  caption,
  postedAt,
  verified,
  distance = "1.2km", // Recebendo a distância como prop, igual no seu EventCard antigo
}: {
  event: Event;
  avatar: string;
  likes: number;
  caption: string;
  postedAt: string;
  verified?: boolean;
  distance?: string;
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Buscando o nome do comerciante usando a função do seu mock-data
  const merchant = getMerchantById(event.merchantId);
  const merchantName = merchant?.businessName || "Desconhecido";

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card">
      {/* header */}
      <header className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="rounded-full bg-linear-to-tr from-primary to-secondary p-0.5">
            <img
              src={avatar}
              alt={merchantName}
              className="h-9 w-9 rounded-full border-2 border-card object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1 text-sm font-semibold">
              {merchantName}
              {verified && (
                <CheckBadgeIcon className="h-3.5 w-3.5 text-secondary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPinIcon className="h-3 w-3" />
              {distance} · {postedAt}
            </div>
          </div>
        </div>
        <button
          className="tap grid place-items-center rounded-full"
          aria-label="Mais"
        >
          <EllipsisHorizontalIcon className="h-5 w-5 text-muted-foreground" />
        </button>
      </header>

      {/* media */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {/* Usando event.imageUrl do seu mock-data */}
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {event.isLive && (
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              Ao vivo
            </span>
          )}
          <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
            {event.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-base font-bold leading-tight text-white drop-shadow">
              {event.title}
            </h3>
            <div className="mt-0.5 text-[11px] font-medium text-white/80">
              {/* Formatando a data e o preço com as funções do seu mock-data */}
              {formatDateShort(event.startsAt)} ·{" "}
              {formatPrice(event.price || 0)}
            </div>
          </div>
          <button className="tap shrink-0 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black shadow-lg transition-all duration-200 active:scale-95">
            Festou
          </button>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center justify-between px-3 pt-2.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked((v) => !v)}
            className="tap grid place-items-center rounded-full transition-all duration-200 active:scale-90"
            aria-label="Curtir"
          >
            {liked ? (
              <HeartSolid className="h-6 w-6 text-destructive" />
            ) : (
              <HeartOutline className="h-6 w-6" />
            )}
          </button>
          <button
            className="tap grid place-items-center rounded-full"
            aria-label="Comentar"
          >
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="tap grid place-items-center rounded-full"
            aria-label="Compartilhar"
          >
            <PaperAirplaneIcon className="h-6 w-6 -rotate-12" />
          </button>
        </div>
        <button
          onClick={() => setSaved((v) => !v)}
          className="tap grid place-items-center rounded-full transition-all duration-200 active:scale-90"
          aria-label="Salvar"
        >
          {saved ? (
            <BookmarkSolid className="h-6 w-6 text-primary" />
          ) : (
            <BookmarkOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* caption */}
      <div className="px-4 pb-3 pt-1">
        <div className="text-sm font-semibold">
          {(likes + (liked ? 1 : 0)).toLocaleString("pt-BR")} curtidas
        </div>
        <p className="mt-0.5 text-sm leading-snug">
          <span className="font-semibold">{merchantName}</span>{" "}
          <span className="text-foreground/90">{caption}</span>
        </p>
        <div className="mt-1 flex flex-wrap gap-x-1.5 text-xs text-secondary">
          {/* Tags dinâmicas e estáticas mockadas para evitar o erro */}
          <span key="cat">
            #{event.category.toLowerCase().replace(/\s+/g, "")}
          </span>
          <span key="festou">#festou</span>
          <span key="hackaia">#hackaia</span>
        </div>
      </div>
    </article>
  );
}
