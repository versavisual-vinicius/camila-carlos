import { useState } from "react";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { motion } from "motion/react";
import { MessageSquareQuote, Bookmark, Heart, Trash2 } from "lucide-react";

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

const categoryTags: Record<string, string> = {
  natureza: "#Campos",
  floresta: "#LuzNatural",
  urbano: "#Urbano",
  pb: "#PretoEBranco"
};

const categoryAttributions: Record<string, string> = {
  natureza: "Costa Azul · Rio das Ostras",
  floresta: "Luz Suave · Ensaio",
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

  const tagLabel = categoryTags[item.category] || "#Referência";
  const attributionLabel = categoryAttributions[item.category] || "Versa Visual (@v1ncsc)";

  return (
    <motion.article
      initial={isAboveFold ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 shadow-xs hover:shadow-md transition-all duration-300 ${
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
          {...(isPriority ? ({ fetchPriority: "high" } as Record<string, string>) : {})}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 ${
            isAboveFold || imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-body-md text-[11px] font-medium shadow-2xs border border-outline-variant/30">
            {tagLabel}
          </span>
        </div>

        {/* Quick Actions Floating Bar */}
        <div 
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Note button */}
          <button
            type="button"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md active:scale-95 shadow-xs ${
              hasNote
                ? "bg-primary text-on-primary ring-1 ring-secondary"
                : "bg-surface/90 text-on-surface hover:bg-surface-container-highest"
            }`}
            onClick={() => onOpenNotes(item)}
            title={hasNote ? "Ver/Editar anotação da noiva" : "Adicionar anotação de estilo"}
          >
            <MessageSquareQuote className="size-3.5" />
          </button>

          {/* Delete custom item if applicable */}
          {item.id.startsWith("custom-") && (
            <button
              type="button"
              className="w-8 h-8 rounded-full bg-surface/90 text-error hover:bg-error-container/40 flex items-center justify-center transition-all backdrop-blur-md active:scale-95 shadow-xs"
              onClick={() => onDelete(item.id)}
              title="Excluir referência personalizada"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editorial Content Info */}
      <div className="p-3 flex flex-col gap-1 bg-surface-container-low">
        <h2 
          className="font-headline-sm text-title-sm text-on-surface line-clamp-2 leading-snug cursor-pointer hover:text-secondary transition-colors"
          onClick={() => onOpenLightbox(item)}
        >
          {item.title}
        </h2>

        {/* Contextual Note preview if present */}
        {hasNote && note?.comment && (
          <p className="text-xs italic text-on-surface-variant line-clamp-1 border-l-2 border-secondary/50 pl-1.5 my-0.5">
            "{note.comment}"
          </p>
        )}

        <div className="flex items-center justify-between text-on-surface-variant pt-1 border-t border-outline-variant/20 mt-1">
          <span className="font-body-md text-xs text-secondary truncate max-w-[180px]">
            {attributionLabel}
          </span>

          <button
            type="button"
            aria-label="Favoritar"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              isLiked
                ? "text-primary bg-secondary-container"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(item.id);
            }}
            title={isLiked ? "Remover dos favoritos" : "Salvar na seleção editorial"}
          >
            {isLiked ? (
              <Bookmark className="size-4 fill-primary text-primary" />
            ) : (
              <Bookmark className="size-4" />
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
