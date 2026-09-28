import { useState } from "react";
import { Heart, Trash2, Maximize2, Sparkles, MessageSquareQuote, Tag } from "lucide-react";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { motion } from "motion/react";

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

const categoryLabels: Record<string, string> = {
  natureza: "Campos & Montanhas",
  floresta: "Floresta & Luz",
  urbano: "Bar, Urbano & Moto",
  pb: "Preto & Branco"
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
  const hasNote = note && ((note.tags && note.tags.length > 0) || note.comment);

  return (
    <motion.div
      initial={isAboveFold ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-[20px] overflow-hidden transition-all duration-300 bg-white dark:bg-[#1c1c1e] shadow-airbnb-card hover:shadow-airbnb-hover hover:-translate-y-1 flex flex-col"
    >
      {/* Listing Photography Hero: Fills top with generous aspect ratio & rounded corners */}
      <div 
        className="relative overflow-hidden cursor-pointer bg-[#f7f7f7] dark:bg-[#242426]"
        onClick={() => onOpenLightbox(item)}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading={isAboveFold ? undefined : "lazy"}
          decoding={isPriority ? "sync" : "async"}
          {...(isPriority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
            isAboveFold || imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Floating Heart / Wishlist Button (Airbnb Circular 50% Top-Right Control) */}
        <div 
          className="absolute top-3 right-3 z-10 flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Note Button */}
          <button
            type="button"
            className={`size-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md active:scale-90 ${
              hasNote
                ? "bg-[#222222] text-white ring-2 ring-[#ff385c]"
                : "bg-white/90 dark:bg-black/60 text-[#222222] dark:text-white hover:bg-white"
            }`}
            onClick={() => onOpenNotes(item)}
            title={hasNote ? "Ver/Editar anotação" : "Anotar intenção da foto"}
          >
            <MessageSquareQuote className={`size-4 ${hasNote ? "text-[#ff385c]" : ""}`} />
          </button>

          {/* Quick Favorite Button */}
          <button
            type="button"
            className={`size-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md active:scale-90 ${
              isLiked
                ? "bg-[#ff385c] text-white shadow-md scale-105"
                : "bg-white/90 dark:bg-black/60 text-[#222222] dark:text-white hover:bg-white hover:scale-105"
            }`}
            onClick={() => onToggleLike(item.id)}
            title={isLiked ? "Remover dos favoritos" : "Salvar nas favoritas"}
          >
            <Heart 
              className={`size-4 transition-transform ${
                isLiked ? "fill-white text-white scale-110" : "text-[#222222] dark:text-white hover:text-[#ff385c]"
              }`} 
            />
          </button>
        </div>

        {/* Floating ID & Bride Note Pill (Top-Left) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1 pointer-events-none">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-[14px] bg-white/90 dark:bg-black/75 text-[#222222] dark:text-white backdrop-blur-md shadow-sm">
            #{item.id}
          </span>

          {/* Tag Pill if Bride Added Intention */}
          {hasNote && note.tags && note.tags.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-[12px] bg-[#ff385c] text-white shadow-sm flex items-center gap-1">
              <Tag className="size-2.5" />
              <span>{note.tags[0]}</span>
            </span>
          )}
        </div>

        {/* Subtle Bottom Hover Gradient & Quick Controls */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between text-white">
          <span className="flex items-center gap-1 text-[11px] font-medium tracking-tight">
            <Maximize2 className="size-3.5" />
            Expandir foto
          </span>

          <button
            type="button"
            className="size-7 rounded-full flex items-center justify-center bg-white/90 text-[#222222] hover:bg-[#c13515] hover:text-white transition-all shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            title="Excluir referência"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Card Info: Warm Airbnb Listing Typography */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 
              onClick={() => onOpenLightbox(item)}
              className="font-semibold text-base leading-snug cursor-pointer text-[#222222] dark:text-white group-hover:text-[#ff385c] dark:group-hover:text-[#ff385c] transition-colors line-clamp-1"
            >
              {item.title}
            </h3>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-[14px] bg-[#f2f2f2] dark:bg-[#2b2b2b] text-[#222222] dark:text-white flex-shrink-0">
              {categoryLabels[item.category] || item.category}
            </span>
          </div>

          {/* Bride Comment Highlight (if present) or Description */}
          {hasNote && note?.comment ? (
            <div className="mt-1 p-2 rounded-[8px] bg-[#fff5f6] dark:bg-[#281b1e] border border-[#ff385c]/20">
              <p className="text-xs text-[#222222] dark:text-white italic line-clamp-2">
                "{note.comment}"
              </p>
            </div>
          ) : item.notes?.description ? (
            <p className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0] line-clamp-2 leading-relaxed font-normal">
              {item.notes.description}
            </p>
          ) : null}
        </div>

        {/* Card Footer: Airbnb Two-Layer Action Bar */}
        <div className="mt-3 pt-3 border-t border-[#ebebeb] dark:border-white/10 flex items-center justify-between text-xs text-[#6a6a6a] dark:text-[#a0a0a0]">
          {/* Anotar Button */}
          <button
            type="button"
            onClick={() => onOpenNotes(item)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-[8px] transition-colors ${
              hasNote 
                ? "bg-[#ff385c]/10 text-[#ff385c]" 
                : "text-[#6a6a6a] hover:text-[#222222] hover:bg-[#f2f2f2]"
            }`}
          >
            <MessageSquareQuote className="size-3.5 text-[#ff385c]" />
            <span>{hasNote ? "Ver Nota" : "Anotar"}</span>
          </button>

          {/* Favoritar Button */}
          <button
            type="button"
            onClick={() => onToggleLike(item.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              isLiked ? "text-[#ff385c] font-bold" : "text-[#222222] dark:text-white hover:text-[#ff385c]"
            }`}
          >
            <Heart className={`size-3.5 ${isLiked ? "fill-[#ff385c] text-[#ff385c]" : ""}`} />
            <span>{isLiked ? "Favoritada" : "Favoritar"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
