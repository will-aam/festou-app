"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import { events } from "@/lib/mock-data";

// 📍 LISTA EXPANDIDA: Mais pontos espalhados (soltos) por Aracaju para o mapa parecer vivo
const aracajuCoords = [
  { lat: -10.9472, lng: -37.0731 }, // Centro - Evento 1
  { lat: -10.9827, lng: -37.0535 }, // Orla de Atalaia - Evento 2
  { lat: -10.93, lng: -37.05 }, // 13 de Julho - Evento 3
  { lat: -10.955, lng: -37.06 }, // São José - Evento 4
  { lat: -10.965, lng: -37.045 }, // Jardins - Evento 5
  { lat: -10.92, lng: -37.065 }, // Bairro Industrial - Evento 6
  { lat: -10.995, lng: -37.058 }, // Aruana - Evento 7
  { lat: -10.94, lng: -37.08 }, // Siqueira Campos - Evento 8
  // 🌟 Pontos extras soltos (Festas paralelas/Arraiás de bairro)
  { lat: -10.975, lng: -37.068 }, // Inácio Barbosa
  { lat: -10.912, lng: -37.089 }, // Bugio
  { lat: -10.951, lng: -37.052 }, // Salgado Filho
  { lat: -10.988, lng: -37.049 }, // Coroa do Meio
  { lat: -10.934, lng: -37.042 }, // Treze de Julho Calçadão
  { lat: -10.961, lng: -37.072 }, // Ponto Novo
];

// Componente para mover o mapa suavemente até o ponto escolhido
function ChangeView({
  center,
  zoom = 15,
}: {
  center: [number, number];
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

// Ícone customizado para as festas (Tailwind)
const createCustomPin = (isSelected: boolean, isLive: boolean) => {
  const htmlString = renderToString(
    <div className="relative flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 ${
          isSelected
            ? "bg-primary border-primary-foreground scale-125 z-50"
            : "bg-card border-border scale-100"
        }`}
      >
        {isLive ? (
          <FireIcon
            className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-destructive"}`}
          />
        ) : (
          <MapPinIcon
            className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-foreground"}`}
          />
        )}
      </div>
      <div
        className={`w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent -mt-1 transition-all duration-300 ${isSelected ? "border-t-primary" : "border-t-card"}`}
      />
    </div>,
  );

  return L.divIcon({
    html: htmlString,
    className: "bg-transparent border-none",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });
};

// Ícone customizado para a posição real do usuário (Ponto azul nativo)
const createUserPin = () => {
  const htmlString = renderToString(
    <div className="relative grid place-items-center w-6 h-6">
      <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-xl z-10" />
      <div className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-40 z-0" />
    </div>,
  );
  return L.divIcon({
    html: htmlString,
    className: "bg-transparent border-none",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapInnerProps {
  selectedEventId: string;
  onSelectEvent: (index: number) => void;
  userCoords: [number, number] | null;
}

export default function MapInner({
  selectedEventId,
  onSelectEvent,
  userCoords,
}: MapInnerProps) {
  const selectedIndex = events.findIndex((e) => e.id === selectedEventId);
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;

  // Define o centro: se houver clique no GPS, foca no usuário, senão foca no evento selecionado
  const activeCoord = aracajuCoords[safeIndex % aracajuCoords.length];
  const center: [number, number] = userCoords
    ? userCoords
    : [activeCoord.lat, activeCoord.lng];
  const zoomLevel = userCoords ? 16 : 14;

  return (
    <MapContainer
      center={center}
      zoom={14}
      zoomControl={false}
      className="w-full h-full bg-[#1a1a2e]"
    >
      <ChangeView center={center} zoom={zoomLevel} />

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Marcador da Posição Real do Usuário (se ativo) */}
      {userCoords && <Marker position={userCoords} icon={createUserPin()} />}

      {/* Renderiza todos os pins das festas e pontos soltos */}
      {events.map((event, index) => {
        const coord = aracajuCoords[index % aracajuCoords.length];
        const isSelected = selectedEventId === event.id && !userCoords;

        return (
          <Marker
            key={event.id}
            position={[coord.lat, coord.lng]}
            icon={createCustomPin(isSelected, event.isLive || false)}
            eventHandlers={{
              click: () => onSelectEvent(index),
            }}
          />
        );
      })}
    </MapContainer>
  );
}
