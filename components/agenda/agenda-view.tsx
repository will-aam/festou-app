"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  QrCodeIcon,
  TicketIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import { getUserEvents, formatPrice, users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Usando o primeiro usuário logado
const currentUser = users[0];

function formatAgendaDate(dateString: string) {
  const date = new Date(dateString);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = date.toLocaleString("pt-BR", { month: "short" }).toUpperCase();
  const hora = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { dia, mes, hora };
}

export function AgendaView() {
  const userEvents = getUserEvents(currentUser.id);
  const confirmedEvents = userEvents.filter((ue) => ue.status === "CONFIRMED");
  const pendingEvents = userEvents.filter((ue) => ue.status === "PENDING");

  return (
    /* ⚡ MÁGICA RECEPTIVA: max-w-[1100px] no desktop para preencher as laterais de forma elegante */
    <div className="mx-auto w-full max-w-[650px] lg:max-w-[1100px] px-4 pt-4 md:pt-8 space-y-8 pb-24">
      {/* HEADER DA AGENDA */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-foreground">Meus Ingressos</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seus acessos e entradas no Forró Caju
        </p>
      </div>

      {/* DASHBOARD RÁPIDO (Mantido compacto para não esticar muito) */}
      <div className="grid grid-cols-2 gap-4 max-w-[650px]">
        <div className="bg-gradient-to-br from-secondary/20 to-card border border-secondary/30 rounded-2xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <TicketIcon className="w-24 h-24 text-secondary" />
          </div>
          <div className="relative z-10 flex flex-col gap-1">
            <CheckCircleIcon className="w-6 h-6 text-secondary mb-1" />
            <p className="text-3xl font-black text-foreground">
              {confirmedEvents.length}
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Garantidos
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
            <ClockIcon className="w-24 h-24 text-foreground" />
          </div>
          <div className="relative z-10 flex flex-col gap-1">
            <CalendarDaysIcon className="w-6 h-6 text-muted-foreground mb-1" />
            <p className="text-3xl font-black text-foreground">
              {pendingEvents.length}
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Aguardando
            </p>
          </div>
        </div>
      </div>

      {/* LISTA DE EVENTOS CONFIRMADOS (GRADE DE 3 NO DESKTOP) */}
      {confirmedEvents.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-secondary" />
              Ingressos Ativos
            </h2>
          </div>

          {/* md:grid-cols-2 e lg:grid-cols-3 fazem a distribuição perfeita em colunas */}
          <div className="space-y-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
            {confirmedEvents.map((ue) => (
              <TicketCard key={ue.id} userEvent={ue} />
            ))}
          </div>
        </section>
      )}

      {/* LISTA DE EVENTOS PENDENTES (GRADE DE 3 NO DESKTOP) */}
      {pendingEvents.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-muted-foreground" />
            Na Fila de Espera
          </h2>

          <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:space-y-0">
            {pendingEvents.map((ue) => (
              <PendingCard key={ue.id} userEvent={ue} />
            ))}
          </div>
        </section>
      )}

      {/* ESTADO VAZIO */}
      {userEvents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-dashed border-border rounded-3xl mt-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
            <TicketIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Sua carteira está vazia
          </h3>
          <p className="text-sm text-muted-foreground max-w-[260px] mx-auto mb-6">
            Explore as barracas e shows do Forró Caju e garanta seu acesso!
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl active:scale-95 transition-all">
            Explorar Eventos
          </button>
        </div>
      )}
    </div>
  );
}

function TicketCard({
  userEvent,
}: {
  userEvent: ReturnType<typeof getUserEvents>[0];
}) {
  const { event } = userEvent;
  const dateInfo = formatAgendaDate(event.startsAt);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="relative bg-card rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-border flex flex-col justify-between transition-all hover:border-secondary/50 h-full">
      <div>
        {/* Detalhe do Picote do Ingresso */}
        <div className="absolute top-[120px] -left-3 w-6 h-6 bg-background rounded-full border-r border-border z-10" />
        <div className="absolute top-[120px] -right-3 w-6 h-6 bg-background rounded-full border-l border-border z-10" />
        <div className="absolute top-[132px] left-3 right-3 border-t-[2px] border-dashed border-border z-10 opacity-50" />

        {/* Topo do Ingresso */}
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md rounded-xl p-2 flex flex-col items-center justify-center min-w-[50px] border border-border/50 shadow-lg">
            <span className="text-xs font-black text-secondary leading-none">
              {dateInfo.mes}
            </span>
            <span className="text-xl font-black text-foreground leading-none mt-0.5">
              {dateInfo.dia}
            </span>
          </div>

          {event.isLive && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-destructive/90 backdrop-blur-md rounded-lg text-[10px] font-black text-destructive-foreground flex items-center gap-1 shadow-lg">
              <FireIcon className="w-3 h-3 animate-pulse" />
              LIVE
            </div>
          )}
        </div>

        {/* Corpo do Ingresso */}
        <div className="p-5 pt-3">
          <h3 className="font-black text-lg text-foreground leading-tight line-clamp-2 pr-2">
            {event.title}
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                Local
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1 truncate">
                <MapPinIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
                Aracaju, SE
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
                Horário
              </span>
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
                {dateInfo.hora}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider">
              Titular
            </span>
            <span className="text-sm font-bold text-foreground truncate">
              {currentUser.name}
            </span>
          </div>
        </div>
      </div>

      {/* Área do Código QR Interativo na base do card */}
      <div className="bg-muted/30 p-4 border-t border-dashed border-border/50 mt-4">
        {!showQR ? (
          <button
            onClick={() => setShowQR(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-foreground text-background font-bold text-sm rounded-xl active:scale-95 transition-all shadow-md"
          >
            <QrCodeIcon className="w-4 h-4" />
            Ver Código de Acesso
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-2 rounded-xl shadow-xl">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" fill="#ffffff" />
                <path
                  d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M45,10 h10 v10 h-10 z M45,25 h10 v10 h-10 z M10,45 h10 v10 h-10 z M25,45 h10 v10 h-10 z M45,45 h10 v10 h-10 z M65,45 h10 v10 h-10 z M80,45 h10 v10 h-10 z M45,65 h10 v10 h-10 z M65,65 h10 v10 h-10 z M80,65 h10 v10 h-10 z M45,80 h10 v10 h-10 z M65,80 h10 v10 h-10 z M80,80 h10 v10 h-10 z M30,30 h10 v10 h-10 z M55,30 h10 v10 h-10 z M30,55 h10 v10 h-10 z M55,55 h10 v10 h-10 z M30,80 h10 v10 h-10 z"
                  fill="#000000"
                />
              </svg>
            </div>
            <p className="mt-2 text-[10px] font-mono text-muted-foreground">
              ID: FEST-{userEvent.id.toUpperCase()}
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-2 text-xs font-bold text-primary underline underline-offset-4"
            >
              Ocultar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PendingCard({
  userEvent,
}: {
  userEvent: ReturnType<typeof getUserEvents>[0];
}) {
  const { event } = userEvent;
  const dateInfo = formatAgendaDate(event.startsAt);

  return (
    <div className="bg-card border border-border rounded-2xl p-3 flex items-center justify-between gap-4 transition-all hover:border-primary/30 w-full h-full">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Bloco de Data Compacto */}
        <div className="bg-muted rounded-xl flex flex-col items-center justify-center min-w-[54px] h-[54px] shrink-0">
          <span className="text-[9px] font-bold text-muted-foreground uppercase">
            {dateInfo.mes}
          </span>
          <span className="text-base font-black text-foreground leading-none">
            {dateInfo.dia}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-foreground text-sm truncate pr-1">
            {event.title}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-wider">
              Fila
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {formatPrice(event.price || 0)}
            </span>
          </div>
        </div>
      </div>

      <button className="tap w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0 active:scale-90 transition-all text-muted-foreground hover:bg-primary/20 hover:text-primary">
        <ArrowRightCircleIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
