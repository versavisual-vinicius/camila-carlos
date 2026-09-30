import { PageHeader } from "./PageHeader";
import { useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
  onAddBatchItems
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
    <div className="page-stack">
      {/* 1. Header do Moodboard: Simples, Direto e Refinado */}
      <PageHeader eyebrow="Caderno de Inspirações & Referências" title="Referências Visuais"
        description="Curadoria autoral para o casamento e ensaio de Camila & Carlos. Toque no coração em cada foto para eleger as favoritas da noiva."
      >
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
            className="h-9 px-3.5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container text-on-surface font-body-md text-xs font-semibold flex items-center gap-2 transition-all shadow-xs active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
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
            className="h-9 px-3.5 rounded-xl bg-primary text-on-primary font-body-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Plus className="size-3.5" />
            <span>Adicionar</span>
          </button>
      </PageHeader>

      {/* 2. Filtros Essenciais & Barra de Busca com Tactile Styling */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Pills de Filtro: "Todas as fotos" e "Favoritas" */}
        <div className="inline-flex items-center gap-1 bg-surface-container/60 dark:bg-surface-container/30 p-1 rounded-full border border-outline-variant/20 shadow-2xs self-start">
          <button
            type="button"
            onClick={() => setActiveView("all")}
            className={`relative px-4 py-2 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              activeView === "all"
                ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
            }`}
          >
            <span>Todas as fotos</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-container dark:bg-surface-container-high text-on-surface-variant">
              {items.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView("favorites")}
            className={`relative px-4 py-2 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              activeView === "favorites"
                ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>Favoritas</span>
              <Heart className={`size-3 ${likedIds.length > 0 ? "fill-red-500 text-red-500" : "text-secondary"}`} />
            </span>
            {likedIds.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">
                {likedIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Busca Rápida com Botão de Limpeza */}
        <div className="relative min-w-[220px] sm:w-72">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar referências..."
            className="w-full bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 rounded-xl pl-8.5 pr-8 py-2 text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-secondary hover:text-on-surface rounded-full transition-colors"
              title="Limpar busca"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Grade Masonry Imediata */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest dark:bg-card rounded-3xl border border-outline-variant/25 shadow-airbnb-card flex flex-col items-center gap-3">
          <div className="size-12 rounded-full bg-surface-container flex items-center justify-center text-secondary">
            {activeView === "favorites" ? <Heart className="size-5" /> : <Search className="size-5" />}
          </div>
          <p className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
            {activeView === "favorites" ? "Nenhuma foto favoritada ainda" : "Nenhuma foto encontrada"}
          </p>
          <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
            {activeView === "favorites" 
              ? "Toque no ícone de coração nas fotos do acervo para montar a seleção prioritária da noiva."
              : "Tente buscar por outro termo ou limpe os filtros."}
          </p>
          {activeView === "favorites" ? (
            <button
              type="button"
              onClick={() => setActiveView("all")}
              className="mt-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
            >
              Ver todas as fotos ({items.length})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
            >
              Limpar busca
            </button>
          )}
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 1100: 4 }}>
          <Masonry gutter="16px">
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
