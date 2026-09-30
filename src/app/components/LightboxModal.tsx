import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin, Check, MessageSquareQuote } from "lucide-react";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { toast } from "sonner";

interface LightboxModalProps {
  item: PreWeddingItem | null;
  items: PreWeddingItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: PreWeddingItem) => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  note?: PhotoNoteData;
  onSaveNote?: (itemId: string, note: PhotoNoteData) => void;
}

const categoryLabels: Record<string, string> = {
  natureza: "Costa Azul & Praia",
  floresta: "Luz Natural & Natureza",
  urbano: "Bar Thunder & Urbano",
  pb: "Preto & Branco"
};

export function LightboxModal({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
  isLiked,
  onToggleLike,
  note,
  onSaveNote
}: LightboxModalProps) {
  const [commentDraft, setCommentDraft] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (note?.comment) {
      setCommentDraft(note.comment);
    } else {
      setCommentDraft("");
    }
    setIsSaved(false);
  }, [note, item]);

  useEffect(() => {
    if (!isOpen || !item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, item, items]);

  if (!isOpen || !item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const total = items.length;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[total - 1]);
    }
  };

  const handleSaveObservation = () => {
    if (!onSaveNote) return;
    onSaveNote(item.id, {
      tags: note?.tags || [],
      comment: commentDraft.trim(),
      updatedAt: new Date().toISOString()
    });
    setIsSaved(true);
    toast.success("Observação salva!", {
      description: `Referência #${item.id}: "${item.title}"`,
      duration: 2000
    });
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div 
          className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="text-white bg-black/50 border border-white/20 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {total}
            </span>
            <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full hidden md:inline-block backdrop-blur-sm">
              {categoryLabels[item.category] || item.category}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Heart Favorite Control */}
            <button
              type="button"
              className={`size-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md active:scale-90 ${
                isLiked
                  ? "bg-red-500 text-white scale-105"
                  : "bg-surface/90 text-on-surface hover:bg-surface hover:scale-105"
              }`}
              onClick={() => onToggleLike(item.id)}
              title={isLiked ? "Remover dos favoritos" : "Salvar nas favoritas"}
            >
              <Heart className={`size-4.5 ${isLiked ? "fill-white text-white" : "text-on-surface"}`} />
            </button>

            {/* Close Control */}
            <button
              type="button"
              className="size-10 rounded-full bg-surface/90 text-on-surface hover:bg-surface hover:scale-105 active:scale-90 flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md"
              onClick={onClose}
              title="Fechar (Esc)"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Circular Nav - Prev Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-22 md:left-6 top-4 md:top-1/2 md:-translate-y-1/2 z-30 size-10 md:size-12 rounded-full bg-surface/90 hover:bg-surface text-on-surface flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Circular Nav - Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute left-34 md:left-auto md:right-6 top-4 md:top-1/2 md:-translate-y-1/2 z-30 size-10 md:size-12 rounded-full bg-surface/90 hover:bg-surface text-on-surface flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Próxima foto"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Main Content Area */}
        <div
          className="relative w-full max-w-5xl max-h-[calc(100dvh-6rem)] mt-12 overflow-y-auto flex flex-col md:flex-row items-center md:justify-center gap-4 sm:gap-6 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative min-w-0 shrink-0 md:shrink flex items-center justify-center rounded-2xl shadow-2xl bg-black/60 border border-white/10">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[40dvh] md:max-h-[70dvh] max-w-full w-auto object-contain rounded-2xl"
            />
          </div>

          {/* Details Sidebar: Foco na Noiva com Campo Editável */}
          <div className="w-full md:w-84 shrink-0 flex flex-col justify-between bg-surface/95 dark:bg-[#141312]/95 border border-outline-variant/30 p-5 sm:p-6 rounded-2xl backdrop-blur-md text-on-surface md:max-h-[70dvh] md:overflow-y-auto shadow-2xl">
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Sparkles className="size-3.5" />
                  <span>Referência Visual</span>
                </div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface leading-snug tracking-tight">
                  {item.title}
                </h3>
                <span className="inline-block px-2.5 py-0.5 mt-1.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/20 text-xs font-medium">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>

              {/* Tags da Noiva se existirem */}
              {note?.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Campo Central Conforme PRD: "O que você gosta nesta foto?" */}
              <div className="border-t border-outline-variant/20 pt-3 flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <MessageSquareQuote className="size-3.5 text-secondary" />
                  <span>O que você gosta nesta foto?</span>
                </label>
                <textarea
                  value={commentDraft}
                  onChange={(e) => {
                    setCommentDraft(e.target.value);
                    setIsSaved(false);
                  }}
                  placeholder="Escreva com suas próprias palavras o que você gosta nesta foto (a conexão, a luz, o vestido, a pose espontânea...)"
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none leading-relaxed transition-all"
                />

                {onSaveNote && (
                  <button
                    type="button"
                    onClick={handleSaveObservation}
                    className={`self-end px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                      isSaved
                        ? "bg-secondary text-on-secondary"
                        : "bg-primary text-on-primary hover:opacity-90 active:scale-95"
                    }`}
                  >
                    <Check className="size-3.5" />
                    <span>{isSaved ? "Salvo!" : "Salvar"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Signature */}
            <div className="border-t border-outline-variant/20 pt-4 mt-4 flex flex-wrap gap-2 items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1 text-[11px]">
                <MapPin className="size-3 text-secondary" />
                Rio das Ostras · Costa Azul
              </span>
              <span className="text-secondary font-semibold text-[11px]">
                Versa Visual (@v1ncsc)
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
