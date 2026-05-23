"use client"

import { PlusIcon } from "@heroicons/react/24/solid"

type Story = {
  id: string
  name: string
  avatar: string
  live?: boolean
  seen?: boolean
}

const stories: Story[] = [
  { id: "me", name: "Seu story", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "s1", name: "Bar do Beco", avatar: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=70", live: true },
  { id: "s2", name: "Praça Artes", avatar: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=200&q=70" },
  { id: "s3", name: "Atelier Barro", avatar: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=200&q=70" },
  { id: "s4", name: "Food Trucks", avatar: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=200&q=70", live: true },
  { id: "s5", name: "Café Lumiar", avatar: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=200&q=70", seen: true },
  { id: "s6", name: "Studio 9", avatar: "https://i.pravatar.cc/100?img=32", seen: true },
]

export function StoryRail() {
  return (
    <div className="no-scrollbar -mx-4 flex gap-3.5 overflow-x-auto px-4 py-1">
      {stories.map((s, i) => {
        const isMe = i === 0
        return (
          <button
            key={s.id}
            className="flex w-16 shrink-0 flex-col items-center gap-1.5 transition-all duration-200 active:scale-95"
          >
            <div className="relative">
              <div
                className={`grid h-16 w-16 place-items-center rounded-full p-[2px] ${
                  s.live
                    ? "bg-gradient-to-tr from-alert via-primary to-secondary"
                    : s.seen
                    ? "bg-muted"
                    : "bg-gradient-to-tr from-primary to-secondary"
                }`}
              >
                <div className="h-full w-full overflow-hidden rounded-full border-[2px] border-background">
                  <img src={s.avatar} alt={s.name} className="h-full w-full object-cover" />
                </div>
              </div>
              {isMe && (
                <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-background bg-primary">
                  <PlusIcon className="h-3 w-3 text-primary-foreground" />
                </span>
              )}
              {s.live && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-alert px-1.5 text-[9px] font-bold uppercase tracking-wide text-alert-foreground ring-2 ring-background">
                  Live
                </span>
              )}
            </div>
            <span className="line-clamp-1 w-full text-center text-[10px] text-muted-foreground">
              {s.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
