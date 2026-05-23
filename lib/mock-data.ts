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

// Dados mockados

export const users: User[] = [
  {
    id: "user-1",
    name: "Marina Silva",
    email: "marina@email.com",
    role: "USER",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    phone: "(11) 98765-4321",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Carlos Mendes",
    email: "carlos@cervejaria.com",
    role: "MERCHANT",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    phone: "(11) 91234-5678",
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
    email: "roberto@galeria.com",
    role: "MERCHANT",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    phone: "(11) 99876-5432",
    createdAt: "2024-03-10T16:45:00Z",
  },
];

export const merchants: Merchant[] = [
  {
    id: "merchant-1",
    userId: "user-2",
    businessName: "Cervejaria Artesanal",
    category: "Bar & Cervejaria",
    description:
      "A melhor cerveja artesanal da região com ambiente descontraído e música ao vivo aos finais de semana.",
    logoUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=200&h=200&fit=crop",
    address: "Rua Augusta, 1234 - Consolação, São Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    rating: 4.8,
    totalReviews: 324,
  },
  {
    id: "merchant-2",
    userId: "user-4",
    businessName: "Galeria Arte Urbana",
    category: "Arte & Cultura",
    description:
      "Espaço dedicado à arte contemporânea brasileira com exposições rotativas e workshops.",
    logoUrl:
      "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=200&h=200&fit=crop",
    address: "Av. Paulista, 900 - Bela Vista, São Paulo",
    latitude: -23.5614,
    longitude: -46.6558,
    rating: 4.9,
    totalReviews: 189,
  },
  {
    id: "merchant-3",
    userId: "user-2",
    businessName: "Café & Coworking Hub",
    category: "Café & Trabalho",
    description:
      "Café especial combinado com espaço de coworking. Ideal para freelancers e nômades digitais.",
    logoUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    address: "Rua Oscar Freire, 456 - Jardins, São Paulo",
    latitude: -23.5629,
    longitude: -46.6698,
    rating: 4.7,
    totalReviews: 256,
  },
  {
    id: "merchant-4",
    userId: "user-4",
    businessName: "Food Park Pinheiros",
    category: "Gastronomia",
    description:
      "O melhor da comida de rua reunido em um só lugar. Diversos food trucks e área kids.",
    logoUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop",
    address: "Rua dos Pinheiros, 789 - Pinheiros, São Paulo",
    latitude: -23.5667,
    longitude: -46.6876,
    rating: 4.6,
    totalReviews: 512,
  },
];

export const events: Event[] = [
  {
    id: "event-1",
    title: "Festival de Jazz ao Vivo",
    description:
      "Uma noite especial com os melhores músicos de jazz da cidade. Entrada gratuita para os primeiros 50 clientes.",
    latitude: -23.5505,
    longitude: -46.6333,
    merchantId: "merchant-1",
    startsAt: "2024-12-20T20:00:00Z",
    endsAt: "2024-12-21T02:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=500&fit=crop",
    category: "Música",
    price: 0,
    isLive: true,
    attendees: 127,
    maxAttendees: 200,
  },
  {
    id: "event-2",
    title: "Exposição: Cores do Brasil",
    description:
      "Mostra coletiva com 15 artistas brasileiros contemporâneos. Vernissage com coquetel de abertura.",
    latitude: -23.5614,
    longitude: -46.6558,
    merchantId: "merchant-2",
    startsAt: "2024-12-18T18:00:00Z",
    endsAt: "2025-01-18T21:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=500&fit=crop",
    category: "Arte",
    price: 25,
    attendees: 89,
    maxAttendees: 150,
  },
  {
    id: "event-3",
    title: "Workshop de Latte Art",
    description:
      "Aprenda técnicas profissionais de latte art com nosso barista campeão. Inclui certificado.",
    latitude: -23.5629,
    longitude: -46.6698,
    merchantId: "merchant-3",
    startsAt: "2024-12-22T14:00:00Z",
    endsAt: "2024-12-22T17:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop",
    category: "Gastronomia",
    price: 150,
    attendees: 8,
    maxAttendees: 12,
  },
  {
    id: "event-4",
    title: "Festival Gastronômico de Inverno",
    description:
      "Edição especial com pratos quentes e confortantes. Mais de 20 food trucks participantes.",
    latitude: -23.5667,
    longitude: -46.6876,
    merchantId: "merchant-4",
    startsAt: "2024-12-23T12:00:00Z",
    endsAt: "2024-12-23T22:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop",
    category: "Gastronomia",
    price: 0,
    isLive: false,
    attendees: 342,
    maxAttendees: 500,
  },
  {
    id: "event-5",
    title: "Noite de Stand-Up Comedy",
    description:
      "Os melhores comediantes de São Paulo em uma noite de muitas risadas. Open bar de chope artesanal.",
    latitude: -23.5505,
    longitude: -46.6333,
    merchantId: "merchant-1",
    startsAt: "2024-12-27T21:00:00Z",
    endsAt: "2024-12-28T01:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=800&h=500&fit=crop",
    category: "Entretenimento",
    price: 80,
    attendees: 65,
    maxAttendees: 100,
  },
  {
    id: "event-6",
    title: "Feira de Artesanato Local",
    description:
      "Apoie artesãos locais! Mais de 50 expositores com produtos únicos e autorais.",
    latitude: -23.5614,
    longitude: -46.6558,
    merchantId: "merchant-2",
    startsAt: "2024-12-28T10:00:00Z",
    endsAt: "2024-12-28T18:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    category: "Feira",
    price: 0,
    attendees: 215,
    maxAttendees: 400,
  },
  {
    id: "event-7",
    title: "Degustação de Cafés Especiais",
    description:
      "Prove cafés de diferentes regiões do Brasil. Inclui explicação sobre métodos de preparo.",
    latitude: -23.5629,
    longitude: -46.6698,
    merchantId: "merchant-3",
    startsAt: "2024-12-29T15:00:00Z",
    endsAt: "2024-12-29T18:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop",
    category: "Gastronomia",
    price: 45,
    attendees: 18,
    maxAttendees: 25,
  },
  {
    id: "event-8",
    title: "Réveillon no Food Park",
    description:
      "Celebre a virada do ano com música ao vivo, comida incrível e fogos de artifício!",
    latitude: -23.5667,
    longitude: -46.6876,
    merchantId: "merchant-4",
    startsAt: "2024-12-31T20:00:00Z",
    endsAt: "2025-01-01T04:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&h=500&fit=crop",
    category: "Festa",
    price: 200,
    isLive: false,
    attendees: 789,
    maxAttendees: 1000,
  },
];

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    title: "2 por 1 em Cervejas Artesanais",
    eventId: "event-1",
    active: true,
    discountText: "Compre uma cerveja e ganhe outra",
    validUntil: "2024-12-20T23:59:00Z",
    code: "JAZZ2X1",
  },
  {
    id: "promo-2",
    title: "50% OFF na entrada",
    eventId: "event-2",
    active: true,
    discountText: "Meia entrada para estudantes",
    validUntil: "2025-01-18T21:00:00Z",
    code: "ARTE50",
  },
  {
    id: "promo-3",
    title: "Café grátis no Workshop",
    eventId: "event-3",
    active: true,
    discountText: "Café ilimitado durante o evento",
    validUntil: "2024-12-22T17:00:00Z",
  },
  {
    id: "promo-4",
    title: "Combo Família",
    eventId: "event-4",
    active: true,
    discountText: "4 pratos pelo preço de 3",
    validUntil: "2024-12-23T22:00:00Z",
    code: "FAMILIA4X3",
  },
  {
    id: "promo-5",
    title: "Early Bird Réveillon",
    eventId: "event-8",
    active: true,
    discountText: "30% OFF comprando antecipado",
    validUntil: "2024-12-25T23:59:00Z",
    code: "REVEILLON30",
  },
];

export const userEvents: UserEvent[] = [
  {
    id: "ue-1",
    userId: "user-1",
    eventId: "event-1",
    status: "CONFIRMED",
    createdAt: "2024-12-15T10:00:00Z",
  },
  {
    id: "ue-2",
    userId: "user-1",
    eventId: "event-3",
    status: "CONFIRMED",
    createdAt: "2024-12-16T14:30:00Z",
  },
  {
    id: "ue-3",
    userId: "user-1",
    eventId: "event-8",
    status: "PENDING",
    createdAt: "2024-12-17T09:15:00Z",
  },
];

export const merchantMetrics: MerchantMetrics[] = [
  {
    merchantId: "merchant-1",
    totalViews: 12547,
    totalClicks: 3821,
    totalBookings: 892,
    weeklyViews: [1200, 1350, 1500, 1800, 2100, 2200, 2397],
    weeklyClicks: [320, 380, 420, 510, 620, 680, 891],
  },
  {
    merchantId: "merchant-2",
    totalViews: 8934,
    totalClicks: 2156,
    totalBookings: 456,
    weeklyViews: [900, 1050, 1200, 1300, 1400, 1484, 1600],
    weeklyClicks: [200, 250, 300, 350, 380, 326, 350],
  },
];

// Funções auxiliares para simular queries

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
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
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
