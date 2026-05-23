import { FeedHeader } from "@/components/feed/feed-header";
import { EventFeed } from "@/components/feed/event-feed";
import {
  FireIcon,
  HashtagIcon,
  MusicalNoteIcon,
  MapPinIcon,
  UserGroupIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";

const trendingItems = [
  {
    id: 1,
    title: "Palco Gerson Filho",
    subtitle: "3.2k confirmados",
    tag: "#forrocaju",
    Icon: FireIcon,
  },
  {
    id: 2,
    title: "Vila do Forró",
    subtitle: "Comidas típicas",
    tag: "#comidatipica",
    Icon: SparklesIcon,
  },
  {
    id: 3,
    title: "Palco Luiz Gonzaga",
    subtitle: "Shows principais",
    tag: "#luizgonzaga",
    Icon: MusicalNoteIcon,
  },
  {
    id: 4,
    title: "Quadrilha Século XX",
    subtitle: "Apresentação às 20h",
    tag: "#quadrilhas",
    Icon: UserGroupIcon,
  },
  {
    id: 5,
    title: "Mercado Central",
    subtitle: "Artesanato e Cultura",
    tag: "#aracajucultura",
    Icon: MapPinIcon,
  },
  {
    id: 6,
    title: "Arena Gonzagão",
    subtitle: "Concurso regional",
    tag: "#gonzagao",
    Icon: HashtagIcon,
  },
  {
    id: 7,
    title: "Orla da Atalaia",
    subtitle: "Passaporte Junino ativo",
    tag: "#passaportejunino",
    Icon: ArrowTrendingUpIcon,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-275 justify-center gap-8 px-4 md:px-6 lg:px-8">
      {/* COLUNA CENTRAL: O Feed ampliado no computador */}
      <div className="flex-1 w-full max-w-[650px] pb-20 pt-4 md:pb-8 md:pt-8 min-h-screen">
        <FeedHeader />
        <EventFeed />
      </div>

      {/* COLUNA DIREITA: Exclusiva da Home Page */}
      <aside className="hidden lg:block w-[320px] shrink-0 pt-8 pb-8">
        <div className="sticky top-8 space-y-6">
          {/* Painel Em Alta (Sem Emojis, 7 Itens com Ícones Nativos) */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-foreground font-bold text-lg">
              <ArrowTrendingUpIcon className="w-5 h-5 text-primary" />
              <h3>Em Alta no Forró Caju</h3>
            </div>

            <div className="space-y-2">
              {trendingItems.map((item) => {
                const TrendIcon = item.Icon;
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <TrendIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.subtitle}
                      </p>
                      <span className="text-[11px] text-primary block mt-0.5 font-medium">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner B2B Monetização */}
          <div className="rounded-2xl bg-gradient-to-tr from-primary/10 to-secondary/10 border border-primary/20 p-5 shadow-sm">
            <h4 className="font-bold text-foreground">
              É dono de um estabelecimento?
            </h4>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Destaque seu negócio para milhares de turistas.
            </p>
            <button className="w-full py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl active:scale-95 transition-all">
              Anunciar Agora
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
