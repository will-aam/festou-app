"use client";

type Story = {
  id: string;
  name: string;
  avatar: string;
  live?: boolean;
  seen?: boolean;
};

const stories: Story[] = [
  { id: "me", name: "Seu story", avatar: "https://i.pravatar.cc/100?img=12" },
  {
    id: "s1",
    name: "Forró Caju",
    avatar: "https://i.pravatar.cc/100?img=33",
    live: true,
  },
  {
    id: "s2",
    name: "Bar do Beco",
    avatar:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=70",
    live: true,
  },
  {
    id: "s3",
    name: "Vila do Forró",
    avatar:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "s4",
    name: "Gonzagão",
    avatar:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "s5",
    name: "Comidas",
    avatar:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=200&q=70",
  },
  { id: "s6", name: "Quadrilhas", avatar: "https://i.pravatar.cc/100?img=15" },
];

export function StoryRail() {
  return (
    <div className="w-full">
      <div className="flex items-start gap-3 overflow-x-auto no-scrollbar px-4 md:px-0">
        {stories.map((s, i) => {
          const isMe = i === 0;

          return (
            <button
              key={s.id}
              type="button"
              className="tap flex w-[64px] shrink-0 flex-col items-center gap-1.5 transition-all active:scale-95"
            >
              <div className="relative">
                {/* container externo (anel) */}
                <div
                  className={[
                    "grid h-14 w-14 place-items-center rounded-full",
                    isMe
                      ? "" // "Seu story" SEM anel/borda externa
                      : "p-[2px] bg-gradient-to-tr from-primary to-secondary",
                  ].join(" ")}
                >
                  {/* avatar */}
                  <div
                    className={[
                      "h-full w-full overflow-hidden rounded-full",
                      isMe ? "" : "border-[2px] border-background",
                    ].join(" ")}
                  >
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Live só pros outros */}
                {!isMe && s.live && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-1.5 py-[0.5px] text-[8px] font-bold uppercase tracking-wide text-destructive-foreground ring-[1.5px] ring-background">
                    Live
                  </span>
                )}
              </div>

              <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-foreground/80">
                {isMe ? "" : s.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
