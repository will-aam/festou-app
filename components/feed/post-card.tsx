"use client";

import { useState } from "react";
import {
  FireIcon as FireOutline,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
  BookmarkIcon,
  ShareIcon,
  UserMinusIcon,
  HeartIcon as HeartOutline,
  EyeSlashIcon,
  FlagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FireIcon as FireSolid,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import {
  Event,
  getMerchantById,
  formatPrice,
  formatDateShort,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PostCard({
  event,
  avatar,
  likes,
  caption,
  postedAt,
  verified,
  distance = "1.2km",
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
  const [isFestou, setIsFestou] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [animateFire, setAnimateFire] = useState(false);

  const merchant = getMerchantById(event.merchantId);
  const merchantName = merchant?.businessName || "Desconhecido";

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setAnimateFire(true);
      setTimeout(() => setAnimateFire(false), 400);
    }
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-card">
      {/* Header com badge alinhado */}
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px] shadow-sm">
            <img
              src={avatar}
              alt={merchantName}
              className="h-9 w-9 rounded-full border-2 border-background object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
              {merchantName}
              {verified && (
                <CheckBadgeIcon className="h-4 w-4 text-primary shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground mt-0.5">
              <MapPinIcon className="h-3 w-3" />
              {distance} · {postedAt}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowOptions(true)}
          className="tap grid place-items-center rounded-full active:scale-90 transition-all"
          aria-label="Opções"
        >
          <EllipsisHorizontalIcon className="h-6 w-6 text-muted-foreground" />
        </button>
      </header>

      {/* Media */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          {event.isLive && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/90 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur shadow-lg border border-destructive/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />{" "}
              Ao vivo
            </span>
          )}
          <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur border border-white/10 shadow-lg">
            {event.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-xl font-black leading-tight text-white drop-shadow-md">
              {event.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs font-bold text-white/90 drop-shadow-sm">
              <span className="bg-primary/80 px-2 py-0.5 rounded-md">
                {formatPrice(event.price || 0)}
              </span>
              <span>·</span>
              <span>{formatDateShort(event.startsAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar (Removido o compartilhar, mantido Festou) */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="tap grid place-items-center rounded-full transition-transform active:scale-75"
            aria-label="Dar Fogo"
          >
            <div className="relative flex items-center justify-center w-8 h-8">
              {animateFire && (
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              )}
              <div
                className={cn(
                  "transition-all duration-300",
                  liked
                    ? "scale-110 text-primary drop-shadow-[0_0_8px_rgba(255,122,0,0.6)]"
                    : "scale-100 text-foreground",
                )}
              >
                {liked ? (
                  <FireSolid className="h-7 w-7" />
                ) : (
                  <FireOutline className="h-7 w-7 hover:text-primary transition-colors" />
                )}
              </div>
            </div>
          </button>
          <button
            className="tap grid place-items-center rounded-full transition-transform active:scale-90 hover:text-primary"
            aria-label="Comentar"
          >
            <ChatBubbleOvalLeftIcon className="h-7 w-7" />
          </button>
        </div>

        <button
          onClick={() => setIsFestou(!isFestou)}
          className={cn(
            "tap rounded-xl border-2 border-primary px-5 py-1.5 text-xs font-black tracking-wide uppercase transition-all duration-200 active:scale-95",
            isFestou
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-transparent text-primary hover:bg-primary/10",
          )}
        >
          Festou!
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <div className="text-sm font-bold text-foreground">
          {(likes + (liked ? 1 : 0)).toLocaleString("pt-BR")} foguinhos
        </div>
        <p className="mt-1 text-sm leading-snug">
          <span className="font-bold mr-1">{merchantName}</span>
          <span className="text-muted-foreground">{caption}</span>
        </p>
      </div>

      {/* Bottom Sheet (Overlay) */}
      {showOptions && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            onClick={() => setShowOptions(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[101] bg-card rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold">
                <BookmarkIcon className="w-5 h-5" /> Salvar Post
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold">
                <ShareIcon className="w-5 h-5" /> Compartilhar
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold">
                <HeartOutline className="w-5 h-5" /> Adicionar aos favoritos
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold">
                <UserMinusIcon className="w-5 h-5" /> Deixar de seguir
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold">
                <EyeSlashIcon className="w-5 h-5" /> Ocultar
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-xl text-sm font-bold text-destructive">
                <FlagIcon className="w-5 h-5" /> Denunciar
              </button>
              <button
                onClick={() => setShowOptions(false)}
                className="w-full flex items-center justify-center p-4 mt-2 text-muted-foreground"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
