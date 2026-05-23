"use client";

import { useState, useRef, useCallback, useEffect } from "react";

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

export function StoryRail({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
}) {
  return (
    <div
      className={`w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
        isExpanded
          ? "max-h-[120px] opacity-100 pt-2 pb-3"
          : "max-h-0 opacity-0 pt-0 pb-0"
      }`}
    >
      <div className="flex items-start gap-3 overflow-x-auto no-scrollbar px-4 md:px-0">
        {stories.map((s, i) => (
          <button
            key={s.id}
            className="tap flex flex-col items-center gap-1.5 transition-all active:scale-95 w-[64px] shrink-0"
            style={{
              transitionDelay: isExpanded ? `${i * 40}ms` : "0ms",
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? "translateY(0)" : "translateY(-12px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "300ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="relative">
              <div
                className={`grid h-14 w-14 place-items-center rounded-full p-[2px] ${
                  i === 0
                    ? "bg-gradient-to-tr from-primary to-secondary"
                    : s.live
                      ? "bg-gradient-to-tr from-destructive via-primary to-secondary"
                      : s.seen
                        ? "bg-muted"
                        : "bg-gradient-to-tr from-primary to-secondary"
                }`}
              >
                <div className="h-full w-full overflow-hidden rounded-full border-[2px] border-background">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {i === 0 && (
                <span className="absolute bottom-0 right-0 grid h-4 w-4 place-items-center rounded-full border-[1.5px] border-background bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-2.5 w-2.5 text-primary-foreground"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
              )}
              {s.live && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-1.5 py-[0.5px] text-[8px] font-bold uppercase tracking-wide text-destructive-foreground ring-[1.5px] ring-background">
                  Live
                </span>
              )}
            </div>
            <span className="line-clamp-1 w-full text-center text-[10px] font-medium text-foreground/80">
              {i === 0 ? "Seu story" : s.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
