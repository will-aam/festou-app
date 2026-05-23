import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { FloatingHeader } from "@/components/navigation/floating-header";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Festou - Descubra Eventos Locais",
  description:
    "Plataforma de descoberta de eventos locais e economia criativa.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-background dark">
      {/* md:pl-[260px] apenas reserva o espaço lateral da navegação no desktop */}
      <body className="font-sans antialiased bg-background text-foreground min-h-screen md:pl-65">
        <FloatingHeader />

        <main className="w-full min-h-screen">{children}</main>

        <BottomNavigation />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
