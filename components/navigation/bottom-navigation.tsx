"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon as HomeOutline,
  MapIcon as MapOutline,
  CalendarDaysIcon as CalendarOutline,
  UserIcon as UserOutline,
  QrCodeIcon as QrOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  MapIcon as MapSolid,
  CalendarDaysIcon as CalendarSolid,
  UserIcon as UserSolid,
  QrCodeIcon as QrSolid,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Início",
    href: "/",
    iconOutline: HomeOutline,
    iconSolid: HomeSolid,
  },
  {
    label: "Mapa",
    href: "/mapa",
    iconOutline: MapOutline,
    iconSolid: MapSolid,
  },
  {
    label: "Agenda",
    href: "/agenda",
    iconOutline: CalendarOutline,
    iconSolid: CalendarSolid,
  },

  {
    label: "Perfil",
    href: "/perfil",
    iconOutline: UserOutline,
    iconSolid: UserSolid,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* 📱 VERSÃO MOBILE */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.iconSolid : item.iconOutline;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center min-w-16 min-h-11 px-3 py-2 rounded-xl",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all",
                    isActive && "scale-110",
                  )}
                />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 💻 VERSÃO DESKTOP: Sidebar Limpa */}
      <aside className="hidden md:flex fixed left-0 top-0 z-50 h-screen w-[260px] flex-col border-r border-border bg-background px-5 py-8">
        {/* LOGO ATUALIZADA NO DESKTOP */}
        <div className="mb-10 px-2 flex items-center gap-3">
          <Image
            src="/festou.png"
            alt="Logo Festou"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-foreground">
            Fest<span className="text-primary">ou</span>
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.iconSolid : item.iconOutline;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 rounded-xl px-3 py-3.5 transition-all hover:bg-muted/50",
                  isActive
                    ? "font-bold text-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "w-7 h-7 transition-all",
                    isActive ? "text-primary" : "group-hover:scale-110",
                  )}
                />
                <span className="text-[17px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
