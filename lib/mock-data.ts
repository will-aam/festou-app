// Tipos para simular a modelagem do banco de dados

export type Role = "ADMIN" | "MERCHANT" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface Merchant {
  id: string;
  userId: string;
  businessName: string;
  category: string;
  description: string;
  logoUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  totalReviews: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  merchantId: string;
  startsAt: string;
  endsAt: string;
  imageUrl: string;
  category: string;
  price?: number;
  isLive?: boolean;
  attendees?: number;
  maxAttendees?: number;
}

export interface Promotion {
  id: string;
  title: string;
  eventId: string;
  active: boolean;
  discountText: string;
  validUntil: string;
  code?: string;
}

export interface UserEvent {
  id: string;
  userId: string;
  eventId: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
  createdAt: string;
}

export interface MerchantMetrics {
  merchantId: string;
  totalViews: number;
  totalClicks: number;
  totalBookings: number;
  weeklyViews: number[];
  weeklyClicks: number[];
}

/// ==================== DADOS MOCKADOS - FORRÓ CAJU 2026 - ARACAJU/SE ====================

export const users: User[] = [
  {
    id: "user-1",
    name: "Marina Silva",
    email: "marina@email.com",
    role: "USER",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    phone: "(79) 98765-4321",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "João Pedro Santos",
    email: "joao@forrocaju.com",
    role: "MERCHANT",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    phone: "(79) 91234-5678",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "user-3",
    name: "Ana Beatriz",
    email: "ana@admin.festou.com",
    role: "ADMIN",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    createdAt: "2023-12-01T08:00:00Z",
  },
  {
    id: "user-4",
    name: "Roberto Almeida",
    email: "roberto@eventos.com",
    role: "MERCHANT",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "(79) 99876-5432",
    createdAt: "2024-03-10T16:45:00Z",
  },
];

export const merchants: Merchant[] = [
  {
    id: "merchant-1",
    userId: "user-2",
    businessName: "Forró Caju",
    category: "Evento Junino / Forró",
    description:
      "O maior festival de forró de Aracaju. Tradição, cultura e muito arrasta-pé!",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZRE6Rt7j79bgzaoNmtyAj-K-vqxrWRuF0Kw&s",
    address: "Orla de Atalaia - Aracaju, SE",
    latitude: -10.9472,
    longitude: -37.0731,
    rating: 4.9,
    totalReviews: 3240,
  },
  {
    id: "merchant-2",
    userId: "user-4",
    businessName: "Forró do Portela",
    category: "Forró & Arraial",
    description:
      "Festa tradicional com pista para 2000 pessoas e camarote premium.",
    logoUrl:
      "https://i.pinimg.com/736x/25/84/5f/25845fcb94374629d17325755a613ebd.jpg",
    address: "Pista de Atalaia - Aracaju, SE",
    latitude: -10.9505,
    longitude: -37.0708,
    rating: 4.7,
    totalReviews: 1876,
  },
];

export const events: Event[] = [
  {
    id: "event-1",
    title: "Forró Caju 2026 - Abertura Oficial",
    description:
      "Grande abertura do Forró Caju 2026 com as melhores atrações do Nordeste. Venha viver o autêntico forró sergipano!",
    latitude: -10.9472,
    longitude: -37.0731,
    merchantId: "merchant-1",
    startsAt: "2026-06-01T20:00:00Z",
    endsAt: "2026-06-02T04:00:00Z",
    imageUrl:
      "https://www.aracaju.se.gov.br/userfiles/noticia_imagens/202405/105886/forrocajubairros_1.jpg",
    category: "Forró",
    price: 50,
    isLive: true,
    attendees: 12450,
    maxAttendees: 20000,
  },
  {
    id: "event-2",
    title: "Noite do Forró das Antigas",
    description:
      "Moreno Show e Élida Emanuela em uma noite especial de forró raiz.",
    latitude: -10.9505,
    longitude: -37.0708,
    merchantId: "merchant-2",
    startsAt: "2025-05-28T20:00:00Z",
    endsAt: "2025-05-29T02:00:00Z",
    imageUrl:
      "https://i.pinimg.com/736x/25/84/5f/25845fcb94374629d17325755a613ebd.jpg",
    category: "Forró",
    price: 40,
    attendees: 1850,
    maxAttendees: 2150,
  },
  {
    id: "event-3",
    title: "Forró Quente",
    description: "Thiago Carvalho, Vitor Fernandez e Fabinho Testado ao vivo.",
    latitude: -10.9472,
    longitude: -37.0731,
    merchantId: "merchant-1",
    startsAt: "2026-06-15T21:00:00Z",
    endsAt: "2026-06-16T03:00:00Z",
    imageUrl:
      "https://img.criativodahora.com.br/2024/04/criativo-661fef2d155c7img-2024-04-17661fef2d155cd.jpg",
    category: "Forró",
    price: 60,
    attendees: 3200,
    maxAttendees: 5000,
  },
  {
    id: "event-4",
    title: "Arraía do Forró",
    description:
      "Eric Land, Henry Freitas e Flaguim Moral - Uma das noites mais esperadas!",
    latitude: -10.9505,
    longitude: -37.0708,
    merchantId: "merchant-2",
    startsAt: "2026-06-03T22:00:00Z",
    endsAt: "2026-06-04T04:00:00Z",
    imageUrl:
      "https://i.pinimg.com/736x/5d/d5/d5/5dd5d55556fce943ee0d60ef6ba65c3a.jpg",
    category: "Forró",
    price: 70,
    attendees: 4200,
    maxAttendees: 6000,
  },
  {
    id: "event-5",
    title: "Piseiro Fest com Tarcísio do Acordeon",
    description: "A maior festa de piseiro do Nordeste com o rei do acordeon.",
    latitude: -10.9472,
    longitude: -37.0731,
    merchantId: "merchant-1",
    startsAt: "2026-06-20T23:00:00Z",
    endsAt: "2026-06-21T05:00:00Z",
    imageUrl:
      "https://i0.wp.com/moraesdesigner.com.br/wp-content/uploads/2023/11/11.37-FORRO-NO-I.jpg?fit=1080%2C1350&ssl=1",
    category: "Piseiro",
    price: 80,
    attendees: 2800,
    maxAttendees: 4000,
  },
  {
    id: "event-6",
    title: "Vem Pro Forró - Tarcísio do Acordeon & Mano Walter",
    description: "Super duplo no Pátio de Eventos.",
    latitude: -10.9472,
    longitude: -37.0731,
    merchantId: "merchant-1",
    startsAt: "2026-07-30T22:00:00Z",
    endsAt: "2026-07-31T04:00:00Z",
    imageUrl:
      "https://img.criativodahora.com.br/2023/12/criativo-658cf5f9889f5MjgvMTIvMjAyMyAwMWgxMw==.jpg",
    category: "Forró",
    price: 90,
    attendees: 5200,
    maxAttendees: 8000,
  },
];

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Early Bird Forró Caju",
    eventId: "event-1",
    active: true,
    discountText: "30% de desconto até 15/05",
    validUntil: "2026-05-15T23:59:00Z",
    code: "CAJU30",
  },
  {
    id: "promo-2",
    title: "Ingresso Solidário",
    eventId: "event-2",
    active: true,
    discountText: "1kg de alimento não perecível",
    validUntil: "2025-05-28T23:59:00Z",
  },
];

export const userEvents: UserEvent[] = [
  {
    id: "ue-1",
    userId: "user-1",
    eventId: "event-1",
    status: "CONFIRMED",
    createdAt: "2025-05-20T10:00:00Z",
  },
  {
    id: "ue-2",
    userId: "user-1",
    eventId: "event-4",
    status: "PENDING",
    createdAt: "2025-05-22T14:30:00Z",
  },
];

export const merchantMetrics: MerchantMetrics[] = [
  {
    merchantId: "merchant-1",
    totalViews: 89500,
    totalClicks: 23400,
    totalBookings: 12450,
    weeklyViews: [8200, 12400, 18900, 24500, 31200],
    weeklyClicks: [2100, 3400, 5200, 6800, 8900],
  },
];

// Funções auxiliares (mantidas)
export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getEventsByMerchant(merchantId: string): Event[] {
  return events.filter((e) => e.merchantId === merchantId);
}

export function getMerchantById(id: string): Merchant | undefined {
  return merchants.find((m) => m.id === id);
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getPromotionsByEvent(eventId: string): Promotion[] {
  return promotions.filter((p) => p.eventId === eventId);
}

export function getUserEvents(
  userId: string,
): (UserEvent & { event: Event })[] {
  return userEvents
    .filter((ue) => ue.userId === userId)
    .map((ue) => ({
      ...ue,
      event: events.find((e) => e.id === ue.eventId)!,
    }))
    .filter((ue) => ue.event);
}

export function getMetricsByMerchant(
  merchantId: string,
): MerchantMetrics | undefined {
  return merchantMetrics.find((m) => m.merchantId === merchantId);
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

export function formatPrice(price: number): string {
  if (price === 0) return "Grátis";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}
