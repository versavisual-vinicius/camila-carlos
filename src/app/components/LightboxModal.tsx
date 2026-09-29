import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from "lucide-react";
import { PreWeddingItem } from "@/app/data/preWeddingData";

interface LightboxModalProps {
  item: PreWeddingItem | null;
  items: PreWeddingItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: PreWeddingItem) => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  natureza: "Campos & Montanhas",
  floresta: "Floresta & Luz",
  urbano: "Bar, Urbano & Moto",
  pb: "Preto & Branco"
};

export function LightboxModal({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
  isLiked,
  onToggleLike
}: LightboxModalProps) {
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
            <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full hidden sm:inline-block backdrop-blur-sm">
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
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-surface/90 hover:bg-surface text-on-surface flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-92 focus:outline-none"
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
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-surface/90 hover:bg-surface text-on-surface flex items-center justify-center transition-all duration-200 shadow-md hover:scale-105 active:scale-92 focus:outline-none"
          aria-label="Próxima foto"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Main Content Area */}
        <div
          className="relative max-w-5xl max-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-6 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative flex items-center justify-center max-h-[72vh] overflow-hidden rounded-[20px] shadow-2xl bg-black/60 border border-white/10">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain rounded-[18px]"
            />
          </div>

          {/* Details Sidebar / Overlay */}
          <div className="w-full md:w-80 flex flex-col justify-between bg-surface/95 dark:bg-[#141312]/95 border border-outline-variant/30 p-6 rounded-2xl backdrop-blur-md text-on-surface max-h-[70vh] overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center gap-1.5 text-secondary text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="size-3.5" />
                <span>Direção Artística</span>
              </div>
              <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-3 leading-snug tracking-tight">
                {item.title}
              </h3>
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-xs font-medium">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>

              {item.notes?.description && (
                <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                  <span className="text-xs uppercase tracking-wider text-secondary font-semibold block">
                    Notas de Cena & Luz
                  </span>
                  <p className="text-xs sm:text-sm text-on-surface/85 leading-relaxed font-normal">
                    {item.notes.description}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-outline-variant/20 pt-4 mt-6 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-secondary" />
                Rio das Ostras (Thunder / Costa Azul)
              </span>
              <span className="text-secondary font-medium">Versa Visual</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
