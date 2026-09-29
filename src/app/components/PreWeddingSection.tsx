import { useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { 
  Heart, 
  Plus, 
  Search, 
  UploadCloud, 
  Loader2,
  X
} from "lucide-react";
import { MoodboardCard } from "@/app/components/MoodboardCard";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { compressMultipleFiles } from "@/app/utils/imageCompressor";
import { toast } from "sonner";

interface PreWeddingSectionProps {
  items: PreWeddingItem[];
  likedIds: string[];
  notes: Record<string, PhotoNoteData>;
  onToggleLike: (id: string) => void;
  onOpenNotes: (item: PreWeddingItem) => void;
  onDelete: (id: string) => void;
  onOpenLightbox: (item: PreWeddingItem) => void;
  onOpenAddDialog: () => void;
  onAddItem: (item: Omit<PreWeddingItem, "id">) => void;
  onAddBatchItems?: (items: Omit<PreWeddingItem, "id">[]) => void;
  onResetItems: () => void;
}

export function PreWeddingSection({
  items,
  likedIds,
  notes,
  onToggleLike,
  onOpenNotes,
  onDelete,
  onOpenLightbox,
  onOpenAddDialog,
  onAddItem,
  onAddBatchItems,
  onResetItems
}: PreWeddingSectionProps) {
  const [activeView, setActiveView] = useState<"all" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    if (activeView === "favorites") {
      if (!likedIds.includes(item.id)) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.notes?.description?.toLowerCase().includes(q);
      const matchTags = item.notes?.tags?.some((t) => t.toLowerCase().includes(q));
      const brideNote = notes[item.id];
      const matchBrideComment = brideNote?.comment?.toLowerCase().includes(q);
      const matchBrideTags = brideNote?.tags?.some((t) => t.toLowerCase().includes(q));

      if (!matchTitle && !matchDesc && !matchTags && !matchBrideComment && !matchBrideTags) {
        return false;
      }
    }

    return true;
  });

  const processFilesBatch = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Selecione arquivos de imagem válidos (JPG, PNG, WEBP).");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedList = await compressMultipleFiles(validFiles, 1600, 0.82);

      const newItems: Omit<PreWeddingItem, "id">[] = compressedList.map((c) => ({
        title: c.title,
        imageUrl: c.imageUrl,
        category: "natureza",
        notes: {
          description: "Foto adicionada via upload de referências."
        }
      }));

      if (onAddBatchItems) {
        onAddBatchItems(newItems);
      } else {
        newItems.forEach((it) => onAddItem(it));
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao comprimir fotos.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* 1. Header do Moodboard: Simples e Direto */}
      <div className="pt-1 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-outline-variant/30">
        <div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Referências
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 mt-0.5">
            Inspirações visuais para o casamento e ensaio de Camila & Carlos. Toque no coração para salvar as favoritas.
          </p>
        </div>

        {/* Ações Rápidas de Adição */}
        <div className="flex items-center gap-2 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                processFilesBatch(e.target.files);
              }
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isCompressing}
            className="h-8 px-3 rounded-lg border border-outline-variant/40 bg-surface hover:bg-surface-container text-on-surface-variant font-body-md text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Upload de fotos do celular ou computador"
          >
            {isCompressing ? (
              <>
                <Loader2 className="size-3.5 animate-spin text-secondary" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <UploadCloud className="size-3.5 text-secondary" />
                <span>Upload</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAddDialog}
            className="h-8 px-3 rounded-lg bg-primary text-on-primary font-body-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-opacity"
          >
            <Plus className="size-3.5" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* 2. Filtros Essenciais: Apenas "Todas" e "Favoritas" */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 bg-surface-container/70 dark:bg-surface-container/40 backdrop-blur-md p-1 rounded-full border border-outline-variant/20 self-start">
          <button
            type="button"
            onClick={() => setActiveView("all")}
            className={`relative px-4 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] transition-colors duration-200 flex items-center gap-1.5 ${
              activeView === "all"
                ? "text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {activeView === "all" && (
              <motion.span
                layoutId="ref-filter-active"
                className="absolute inset-0 bg-primary rounded-full shadow-[0_0_12px_rgba(108,91,77,0.3)] -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">Todas as fotos</span>
            <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
              activeView === "all" ? "bg-surface-container text-on-surface" : "bg-surface-container-high text-on-surface-variant"
            }`}>
              {items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("favorites")}
            className={`relative px-4 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] transition-colors duration-200 flex items-center gap-1.5 ${
              activeView === "favorites"
                ? "text-on-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {activeView === "favorites" && (
              <motion.span
                layoutId="ref-filter-active"
                className="absolute inset-0 bg-primary rounded-full shadow-[0_0_12px_rgba(108,91,77,0.3)] -z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <span>Favoritas</span>
              <Heart className={`size-3 ${likedIds.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
            </span>
            {likedIds.length > 0 && (
              <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                activeView === "favorites" ? "bg-surface-container text-on-surface" : "bg-primary text-on-primary"
              }`}>
                {likedIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Busca Rápida Opcional */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar referências..."
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* 3. Grade Masonry Imediata */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center gap-2">
          <p className="font-headline-sm text-base text-on-surface">
            {activeView === "favorites" ? "Nenhuma foto favoritada ainda" : "Nenhuma foto encontrada"}
          </p>
          <p className="text-xs text-on-surface-variant max-w-sm">
            {activeView === "favorites" 
              ? "Toque no ícone de coração nas fotos que mais gostar para montar sua seleção favorita."
              : "Tente buscar por outro termo ou limpe a busca."}
          </p>
          {activeView === "favorites" ? (
            <button
              type="button"
              onClick={() => setActiveView("all")}
              className="mt-2 text-xs font-semibold text-secondary hover:underline"
            >
              Ver todas as fotos
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs font-semibold text-secondary hover:underline"
            >
              Limpar busca
            </button>
          )}
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 1100: 4 }}>
          <Masonry gutter="12px">
            {filteredItems.map((item, index) => (
              <MoodboardCard
                key={item.id}
                item={item}
                isLiked={likedIds.includes(item.id)}
                note={notes[item.id]}
                onToggleLike={onToggleLike}
                onOpenNotes={onOpenNotes}
                onDelete={onDelete}
                onOpenLightbox={onOpenLightbox}
                isPriority={index < 2}
                isAboveFold={index < 6}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}
