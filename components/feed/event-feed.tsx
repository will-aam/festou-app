"use client";

import { events } from "@/lib/mock-data";
import { PostCard } from "./post-card";

const distances = [
  "0.5km",
  "1.2km",
  "2.3km",
  "0.8km",
  "3.1km",
  "1.5km",
  "0.3km",
  "4.2km",
];

const postMeta = [
  {
    avatar: "https://i.pravatar.cc/100?img=15",
    likes: 1284,
    caption: "Bora? A festa já tá montada e o forró começa 21h sharp 🎶",
    postedAt: "agora",
    verified: true,
  },
  {
    avatar: "https://i.pravatar.cc/100?img=22",
    likes: 832,
    caption:
      "Domingo de feira com 40+ expositores locais e muita comida típica ✨",
    postedAt: "2h",
    verified: true,
  },
  {
    avatar: "https://i.pravatar.cc/100?img=33",
    likes: 412,
    caption: "Últimos ingressos do lote! Garanta o seu 🔥",
    postedAt: "5h",
    verified: false,
  },
  {
    avatar: "https://i.pravatar.cc/100?img=51",
    likes: 298,
    caption: "Trio pé-de-serra ao vivo hoje! Chega mais 🎤",
    postedAt: "1d",
    verified: true,
  },
];

export function EventFeed() {
  return (
    <div className="px-4 space-y-4">
      <div className="-mx-4 md:mx-0 space-y-6 md:space-y-8 pb-8">
        {events.map((event, index) => {
          const meta = postMeta[index % postMeta.length];
          const dist = distances[index % distances.length];

          return (
            <PostCard
              key={event.id}
              event={event}
              avatar={meta.avatar}
              likes={meta.likes}
              caption={meta.caption}
              postedAt={meta.postedAt}
              verified={meta.verified}
              distance={dist}
            />
          );
        })}
      </div>
    </div>
  );
}
