"use client";

import Link from "next/link";
import Image from "next/image";
import { BellIcon } from "@heroicons/react/24/outline";

export function FloatingHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 safe-area-top">
      <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-lg">
        <Link href="/" className="flex items-center gap-2">
          {/* A SUA LOGO AQUI */}
          <Image
            src="/festou.png" /* Troque para o nome exato do seu arquivo na pasta public (ex: /logo.png, /icone.svg) */
            alt="Logo Festou"
            width={32}
            height={32}
            className="object-contain"
          />

          {/* O texto festou ao lado da logo (opcional, se a sua logo já tiver o texto, você pode apagar esse <span> inteiro) */}
          <span className="text-xl font-bold text-foreground">
            fest<span className="text-primary">ou</span>
          </span>
        </Link>

        <button
          className="relative p-2 min-w-11 min-h-11 flex items-center justify-center rounded-full hover:bg-muted transition-all duration-200"
          aria-label="Notificações"
        >
          <BellIcon className="w-6 h-6 text-foreground" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
            <span className="text-[8px] text-destructive-foreground font-bold">
              3
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
