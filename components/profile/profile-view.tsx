"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightStartOnRectangleIcon,
  SparklesIcon,
  TicketIcon,
  StarIcon,
  MicrophoneIcon,
  BanknotesIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { users, merchants } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MerchantDashboard } from "@/components/dashboard/merchant-dashboard";

const currentUser = users[0];
const currentMerchant = merchants[0];

type DevRole = "TOURIST" | "ARTIST" | "MERCHANT";

const menuItems = [
  { icon: HeartIcon, label: "Meus Favoritos", badge: "12" },
  { icon: BellIcon, label: "Notificações", badge: "3" },
  { icon: ShieldCheckIcon, label: "Privacidade e Segurança" },
  { icon: Cog6ToothIcon, label: "Configurações da Conta" },
];

function StatCard({
  icon: Icon,
  value,
  label,
  iconClassName,
  valueClassName,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  label: string;
  iconClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
      <Icon
        className={cn("w-5 h-5 md:w-6 md:h-6 mb-1", iconClassName)}
        aria-hidden="true"
      />
      <p
        className={cn(
          "text-lg md:text-xl font-black text-foreground leading-none",
          valueClassName,
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase text-center leading-tight">
        {label}
      </p>
    </div>
  );
}

export function ProfileView() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [devRole, setDevRole] = useState<DevRole>("TOURIST");

  const effectiveRole = devRole;

  // ARTISTA e COMERCIANTE: mesma etiqueta PRO (laranja)
  const isPro = effectiveRole !== "TOURIST";

  const roleLabel = useMemo(() => {
    return isPro ? "PRO" : "TURISTA";
  }, [isPro]);

  const rolePillClasses = useMemo(() => {
    return isPro
      ? "bg-primary text-primary-foreground"
      : "bg-muted text-foreground";
  }, [isPro]);

  if (showDashboard && effectiveRole === "MERCHANT") {
    return <MerchantDashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="mx-auto w-full max-w-[650px] lg:max-w-[1100px] px-4 pt-20 md:pt-8 space-y-8 pb-24">
      {/* DEV SWITCHER (temporário) */}
      <div className="bg-card border border-border rounded-2xl p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
            Dev: alternar perfil
          </p>
          <p className="text-[11px] font-bold text-muted-foreground">
            (temporário)
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setShowDashboard(false);
              setDevRole("TOURIST");
            }}
            className={cn(
              "tap rounded-xl px-3 py-2 text-xs font-black border transition-all active:scale-[0.98]",
              devRole === "TOURIST"
                ? "bg-foreground text-background border-foreground"
                : "bg-muted/40 text-foreground border-border",
            )}
          >
            Turista
          </button>

          <button
            type="button"
            onClick={() => {
              setShowDashboard(false);
              setDevRole("ARTIST");
            }}
            className={cn(
              "tap rounded-xl px-3 py-2 text-xs font-black border transition-all active:scale-[0.98]",
              devRole === "ARTIST"
                ? "bg-foreground text-background border-foreground"
                : "bg-muted/40 text-foreground border-border",
            )}
          >
            Artista
          </button>

          <button
            type="button"
            onClick={() => {
              setShowDashboard(false);
              setDevRole("MERCHANT");
            }}
            className={cn(
              "tap rounded-xl px-3 py-2 text-xs font-black border transition-all active:scale-[0.98]",
              devRole === "MERCHANT"
                ? "bg-foreground text-background border-foreground"
                : "bg-muted/40 text-foreground border-border",
            )}
          >
            Comerciante
          </button>
        </div>
      </div>

      {/* Título (Desktop) */}
      <div className="hidden lg:block mb-8">
        <h1 className="text-3xl font-black text-foreground">Meu Perfil</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie sua conta e suas preferências
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* ESQUERDA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Identificação */}
          <div className="bg-card border border-border rounded-3xl p-6 flex items-center gap-5 shadow-sm">
            <div className="relative shrink-0">
              {currentUser.avatarUrl ? (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted flex items-center justify-center border-2 border-border">
                  <UserCircleIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}

              {/* Badge */}
              <div
                className={cn(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg border border-background",
                  rolePillClasses,
                )}
              >
                {roleLabel}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-black text-foreground truncate">
                {currentUser.name}
              </h1>
              <p className="text-sm text-muted-foreground truncate">
                {currentUser.email}
              </p>

              {/* Só mostra businessName se for MERCHANT */}
              {effectiveRole === "MERCHANT" && (
                <p className="text-xs font-bold text-primary mt-1 bg-primary/10 w-fit px-2 py-0.5 rounded-md">
                  {currentMerchant.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Métricas */}
          {effectiveRole === "TOURIST" ? (
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                icon={TicketIcon}
                value="23"
                label="Eventos"
                iconClassName="text-secondary"
              />
              <StatCard
                icon={HeartIcon}
                value="12"
                label="Favoritos"
                iconClassName="text-destructive"
              />
              <StatCard
                icon={StarIcon}
                value="4.9"
                label="Avaliação"
                iconClassName="text-primary"
              />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                icon={CalendarDaysIcon}
                value="8"
                label="Eventos"
                iconClassName="text-primary"
              />
              <StatCard
                icon={UsersIcon}
                value="1.2k"
                label="Alcance"
                iconClassName="text-secondary"
              />
              <StatCard
                icon={StarIcon}
                value="4.9"
                label="Nota"
                iconClassName="text-primary"
              />
              <StatCard
                icon={TicketIcon}
                value="320"
                label="Ingressos"
                iconClassName="text-secondary"
              />
              <StatCard
                icon={BanknotesIcon}
                value="R$ 9.4k"
                label="Receita"
                iconClassName="text-secondary"
              />
              <StatCard
                icon={MicrophoneIcon}
                value="3"
                label="Ao vivo"
                iconClassName="text-destructive"
              />
            </div>
          )}
        </div>

        {/* DIREITA */}
        <div className="lg:col-span-7 space-y-6 mt-8 lg:mt-0">
          {/* Conversão / Dashboard */}
          {effectiveRole !== "MERCHANT" ? (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-secondary/10 border border-primary/30 p-1 shadow-lg group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all" />

              <div className="bg-card/60 backdrop-blur-md rounded-[22px] p-5 relative z-10 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shrink-0 shadow-inner">
                  <BuildingStorefrontIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
                    <SparklesIcon className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-black text-primary uppercase tracking-wider">
                      Festou PRO
                    </h3>
                  </div>
                  <p className="font-bold text-foreground text-lg leading-tight mb-1">
                    É dono de bar ou restaurante?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Atraia milhares de turistas, gerencie promoções e aumente
                    suas vendas no Forró Caju.
                  </p>
                </div>
                <button className="tap w-full sm:w-auto px-5 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl shrink-0 transition-all active:scale-95 shadow-[0_4px_14px_oklch(0.72_0.19_49/0.35)]">
                  Anunciar Agora
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDashboard(true)}
              className="tap w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 border border-primary p-5 flex items-center gap-5 shadow-lg group transition-all active:scale-[0.98]"
            >
              <div className="w-14 h-14 rounded-full bg-black/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <BuildingStorefrontIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-black text-white text-lg">
                  Painel do Comerciante
                </p>
                <p className="text-xs font-medium text-white/80 mt-0.5">
                  Gerencie seus eventos e promoções ativas
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </div>
            </button>
          )}

          {/* Menu */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "tap w-full flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors duration-200 active:bg-muted",
                  index !== menuItems.length - 1 && "border-b border-border/50",
                )}
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-foreground" />
                </div>
                <span className="flex-1 text-left text-sm font-semibold text-foreground">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-primary rounded-full text-[10px] font-black text-primary-foreground shadow-sm">
                    {item.badge}
                  </span>
                )}
                <ChevronRightIcon className="w-4 h-4 text-muted-foreground/50" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <button className="tap w-full flex items-center justify-center gap-2 py-4 text-destructive font-bold text-sm bg-destructive/5 hover:bg-destructive/10 border border-destructive/20 rounded-2xl transition-all duration-200 active:scale-[0.98]">
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
            Sair da Conta
          </button>

          {/* Versão */}
          <div className="text-center pt-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Festou v1.0.0
            </p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
              Fomentando a Economia Criativa Local
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
