import { useState } from "react";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { motion } from "motion/react";
import { MessageSquareQuote, Heart, Trash2, Maximize2 } from "lucide-react";

interface MoodboardCardProps {
  item: PreWeddingItem;
  isLiked: boolean;
  note?: PhotoNoteData;
  onToggleLike: (id: string) => void;
  onOpenNotes: (item: PreWeddingItem) => void;
  onDelete: (id: string) => void;
  onOpenLightbox: (item: PreWeddingItem) => void;
  isPriority?: boolean;
  isAboveFold?: boolean;
}

const categoryAttributions: Record<string, string> = {
  natureza: "Costa Azul · Rio das Ostras",
  floresta: "Luz Natural · Ensaio",
  urbano: "Bar Thunder · Rota",
  pb: "Versa Visual Editorial"
};

export function MoodboardCard({
  item,
  isLiked,
  note,
  onToggleLike,
  onOpenNotes,
  onDelete,
  onOpenLightbox,
  isPriority = false,
  isAboveFold = false
}: MoodboardCardProps) {
  const [imageLoaded, setImageLoaded] = useState(isAboveFold);
  const hasNote = Boolean(note && ((note.tags && note.tags.length > 0) || note.comment));
  const attributionLabel = categoryAttributions[item.category] || "Versa Visual (@v1ncsc)";

  return (
    <motion.article
      initial={isAboveFold ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col bg-surface-container-lowest dark:bg-card rounded-2xl overflow-hidden border border-outline-variant/25 shadow-airbnb-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
        isAboveFold ? "" : "content-visibility-auto"
      }`}
    >
      {/* Visual Container */}
      <div
        className="relative w-full overflow-hidden cursor-pointer bg-surface-container"
        onClick={() => onOpenLightbox(item)}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading={isAboveFold ? undefined : "lazy"}
          decoding={isPriority ? "sync" : "async"}
          {...(isPriority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${
            isAboveFold || imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Tags de Estilo Criadas pela Noiva */}
        {note?.tags && note.tags.length > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-wrap gap-1 max-w-[80%] justify-end pointer-events-none">
            {note.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/90 text-on-primary backdrop-blur-md font-body-md text-[10px] font-semibold shadow-2xs"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/90 text-on-primary font-body-md text-[9px] font-semibold">
                +{note.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Quick Actions Floating Bar */}
        <div 
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Note button */}
          <button
            type="button"
            className={`size-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md active:scale-95 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              hasNote
                ? "bg-primary text-on-primary ring-2 ring-secondary/50"
                : "bg-surface/90 text-on-surface hover:bg-surface-container"
            }`}
            onClick={() => onOpenNotes(item)}
            title={hasNote ? "Ver observações nesta referência" : "Anotar o que você mais gosta nesta foto"}
            aria-label="Anotar observações nesta referência"
          >
            <MessageSquareQuote className="size-3.5" />
          </button>

          {/* Delete custom item if applicable */}
          {item.id.startsWith("custom-") && (
            <button
              type="button"
              className="size-8 rounded-full bg-surface/90 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all backdrop-blur-md active:scale-95 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
              onClick={() => onDelete(item.id)}
              title="Excluir referência personalizada"
              aria-label="Excluir referência personalizada"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editorial Content Info */}
      <div className="p-3 sm:p-3.5 flex flex-col gap-1 bg-surface-container-lowest dark:bg-card">
        <h2 
          className="font-headline-sm text-xs sm:text-sm font-bold text-on-surface line-clamp-2 leading-snug cursor-pointer hover:text-secondary transition-colors"
          onClick={() => onOpenLightbox(item)}
        >
          {item.title}
        </h2>

        {/* Contextual Note preview if present */}
        {hasNote && note?.comment && (
          <p className="text-[11px] sm:text-xs italic text-on-surface-variant line-clamp-1 border-l-2 border-secondary/60 pl-2 my-0.5 bg-surface-container-low/50 dark:bg-surface-container/30 py-0.5 rounded-r-md">
            "{note.comment}"
          </p>
        )}

        <div className="flex items-center justify-between text-on-surface-variant pt-1.5 border-t border-outline-variant/15 mt-1">
          <span className="font-body-md text-[11px] text-secondary font-medium truncate max-w-[170px]">
            {attributionLabel}
          </span>

          <button
            type="button"
            aria-label={isLiked ? "Remover das favoritas" : "Salvar nas favoritas"}
            className={`size-7 rounded-full flex items-center justify-center transition-all active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 ${
              isLiked
                ? "text-red-500 bg-red-50 dark:bg-red-950/40"
                : "text-on-surface-variant hover:text-red-500 hover:bg-surface-container"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(item.id);
            }}
            title={isLiked ? "Remover das favoritas" : "Salvar nas favoritas"}
          >
            <Heart className={`size-3.5 transition-transform ${isLiked ? "fill-red-500 text-red-500 scale-110" : ""}`} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
