"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  MapPinIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FireIcon, MapPinIcon as LocateIcon } from "@heroicons/react/24/solid";
import {
  events,
  getMerchantById,
  formatPrice,
  formatDateShort,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const MapReal = dynamic(() => import("./map-inner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground font-medium">
      Carregando mapa interativo...
    </div>
  ),
});

export function MapView() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [loadingGPS, setLoadingGPS] = useState(false);

  const selectedEvent = events[carouselIndex];

  const handlePrevious = () => {
    setUserCoords(null);
    const newIndex = carouselIndex > 0 ? carouselIndex - 1 : events.length - 1;
    setCarouselIndex(newIndex);
  };

  const handleNext = () => {
    setUserCoords(null);
    const newIndex = carouselIndex < events.length - 1 ? carouselIndex + 1 : 0;
    setCarouselIndex(newIndex);
  };

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setLoadingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords([position.coords.latitude, position.coords.longitude]);
        setLoadingGPS(false);
      },
      (error) => {
        console.error("Erro ao obter localização", error);
        alert(
          "Não foi possível acessar sua localização. Verifique as permissões.",
        );
        setLoadingGPS(false);
      },
      { enableHighAccuracy: true },
    );
  };

  return (
    <div className="fixed inset-0 top-16 bottom-20 z-0">
      <MapReal
        selectedEventId={selectedEvent.id}
        userCoords={userCoords}
        onSelectEvent={(index) => {
          setUserCoords(null);
          setCarouselIndex(index);
        }}
      />

      <div className="absolute bottom-4 left-0 right-0 px-4 z-[400] flex flex-col gap-3 items-center">
        {/* 🗺️ BOTÃO DE LOCALIZAÇÃO GPS REAL */}
        <button
          onClick={handleLocateUser}
          disabled={loadingGPS}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl self-end mr-2 transition-all duration-300 hover:scale-105 active:scale-95 border-2",
            userCoords
              ? "bg-primary border-primary text-primary-foreground shadow-primary/50"
              : "bg-card/95 backdrop-blur-md border-primary text-primary shadow-primary/30",
            loadingGPS && "opacity-80",
          )}
          aria-label="Centralizar na minha localização"
        >
          {!userCoords && !loadingGPS && (
            <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"></span>
          )}
          <LocateIcon
            className={cn(
              "w-7 h-7 relative z-10",
              loadingGPS && "animate-spin",
            )}
          />
        </button>

        {/* Card de eventos */}
        <div className="w-full max-w-[450px]">
          <EventMapCard event={selectedEvent} />
        </div>

        {/* 🎮 CONTROLES DE NAVEGAÇÃO */}
        <div className="flex items-center justify-between w-full max-w-[450px] px-1 mt-1">
          <button
            onClick={handlePrevious}
            className="tap w-10 h-10 bg-card/95 backdrop-blur-md rounded-full flex items-center justify-center border border-border shadow-lg transition-all active:scale-90"
            aria-label="Evento anterior"
          >
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>

          {/* Indicadores - Agora Ocultos no Desktop (md:hidden) */}
          <div className="flex justify-center gap-1.5 md:hidden">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setUserCoords(null);
                  setCarouselIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === carouselIndex && !userCoords
                    ? "bg-primary w-6"
                    : "bg-card border border-border",
                )}
                aria-label={`Ir para evento ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="tap w-10 h-10 bg-card/95 backdrop-blur-md rounded-full flex items-center justify-center border border-border shadow-lg transition-all active:scale-90"
            aria-label="Próximo evento"
          >
            <ChevronRightIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EventMapCard({ event }: { event: (typeof events)[0] }) {
  const merchant = getMerchantById(event.merchantId);

  return (
    <div className="bg-card/95 backdrop-blur-xl rounded-2xl border border-border overflow-hidden shadow-2xl">
      <div className="flex gap-3 p-3">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="96px"
          />
          {event.isLive && (
            <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-destructive rounded text-[10px] font-bold text-destructive-foreground flex items-center gap-0.5">
              <FireIcon className="w-2.5 h-2.5 animate-pulse" />
              LIVE
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
              {event.title}
            </h3>
            {merchant && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate font-medium">
                {merchant.businessName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col gap-1 text-[11px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5 text-primary" />
                {formatDateShort(event.startsAt)}
              </span>
              <span className="flex items-center gap-1">
                <MapPinIcon className="w-3.5 h-3.5 text-primary" />
                Aracaju, SE
              </span>
            </div>
            <span
              className={cn(
                "text-[15px] font-black tracking-tight",
                event.price === 0 ? "text-secondary" : "text-foreground",
              )}
            >
              {formatPrice(event.price || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <button className="tap w-full py-2.5 bg-primary text-primary-foreground font-bold rounded-xl text-sm shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]">
          Garantir Ingresso
        </button>
      </div>
    </div>
  );
}
