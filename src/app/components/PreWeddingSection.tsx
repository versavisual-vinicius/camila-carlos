import { useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { 
  Bookmark, 
  Plus, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Camera, 
  Check, 
  ChevronDown, 
  ChevronUp,
  UploadCloud,
  Sparkles,
  Loader2,
  Search,
  Filter
} from "lucide-react";
import { MoodboardCard } from "@/app/components/MoodboardCard";
import { PreWeddingItem, PreWeddingCategory } from "@/app/data/preWeddingData";
import { PlanningCard } from "@/app/data/planningData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { compressMultipleFiles } from "@/app/utils/imageCompressor";
import { toast } from "sonner";

interface PreWeddingSectionProps {
  items: PreWeddingItem[];
  likedIds: string[];
  cards: PlanningCard[];
  checkedCriteria: Record<string, boolean>;
  notes: Record<string, PhotoNoteData>;
  onToggleCriterion: (id: string) => void;
  onToggleLike: (id: string) => void;
  onOpenNotes: (item: PreWeddingItem) => void;
  onDelete: (id: string) => void;
  onOpenLightbox: (item: PreWeddingItem) => void;
  onOpenAddDialog: () => void;
  onAddItem: (item: Omit<PreWeddingItem, "id">) => void;
  onAddBatchItems?: (items: Omit<PreWeddingItem, "id">[]) => void;
  onResetItems: () => void;
}

const filterOptions: { value: PreWeddingCategory | "favorites"; label: string }[] = [
  { value: "all", label: "Tudo" },
  { value: "natureza", label: "Campos & Montanhas" },
  { value: "floresta", label: "Floresta & Luz" },
  { value: "urbano", label: "Bar & Urbano" },
  { value: "pb", label: "Preto & Branco" },
  { value: "favorites", label: "Favoritas" }
];

export function PreWeddingSection({
  items,
  likedIds,
  cards,
  checkedCriteria,
  notes,
  onToggleCriterion,
  onToggleLike,
  onOpenNotes,
  onDelete,
  onOpenLightbox,
  onOpenAddDialog,
  onAddItem,
  onAddBatchItems,
  onResetItems
}: PreWeddingSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<PreWeddingCategory | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRoteiroDetails, setShowRoteiroDetails] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    if (selectedFilter === "favorites") {
      if (!likedIds.includes(item.id)) return false;
    } else if (selectedFilter !== "all") {
      if (item.category !== selectedFilter) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.notes?.description?.toLowerCase().includes(q);
      const matchTags = item.notes?.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }

    return true;
  });

  const cardPW01 = cards.find((c) => c.id === "pw-01");

  // Handler de processamento em lote com compressão Canvas
  const processFilesBatch = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Selecione arquivos de imagem válidos (JPG, PNG, WEBP).");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedList = await compressMultipleFiles(validFiles, 1600, 0.82);

      const targetCategory: PreWeddingCategory = selectedFilter === "favorites" || selectedFilter === "all" 
        ? "natureza" 
        : selectedFilter;

      const newItems: Omit<PreWeddingItem, "id">[] = compressedList.map((c) => ({
        title: c.title,
        imageUrl: c.imageUrl,
        category: targetCategory,
        notes: {
          description: "Foto adicionada via upload rápido de referências."
        }
      }));

      if (onAddBatchItems) {
        onAddBatchItems(newItems);
      } else {
        newItems.forEach((it) => onAddItem(it));
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao comprimir e enviar fotos.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stitch Screen 1: Feed Header & Context Meta */}
      <div className="pt-2 pb-1 flex flex-col gap-1.5 border-b border-outline-variant/30 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-3">
            <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface tracking-tight">
              Todos os elementos
            </h1>
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
              {filteredItems.length} referências
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Upload */}
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
              className="h-9 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs flex items-center gap-1.5 transition-colors border border-outline-variant/30 active:scale-95"
            >
              {isCompressing ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Comprimindo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="size-3.5 text-secondary" />
                  <span>Upload Lote</span>
                </>
              )}
            </button>

            {/* Nova Referência */}
            <button
              type="button"
              onClick={onOpenAddDialog}
              className="h-9 px-3.5 rounded-lg bg-primary text-on-primary font-label-md text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="size-3.5" />
              <span>Nova Referência</span>
            </button>
          </div>
        </div>

        <p className="font-headline-md italic text-sm text-on-surface-variant/90">
          Coleção sensorial de texturas, luzes e memórias do atelier de Camila & Carlos.
        </p>
      </div>

      {/* Roteiro & Critérios Acordeom Compacto */}
      {cardPW01 && (
        <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 shadow-xs">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowRoteiroDetails(!showRoteiroDetails)}>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <div>
                <h3 className="font-headline-sm text-base text-on-surface">
                  Roteiro de Locação: Bar Thunder & Orla da Costa Azul
                </h3>
                <p className="font-body-md text-xs text-on-surface-variant">
                  Rio das Ostras · T-60 dias · Luz suave e pôr do sol dourado
                </p>
              </div>
            </div>
            <button type="button" className="text-on-surface-variant hover:text-on-surface">
              {showRoteiroDetails ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </button>
          </div>

          {showRoteiroDetails && (
            <div className="mt-4 pt-3 border-t border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-label-sm text-[11px] uppercase tracking-wider text-secondary mb-2">Critérios de Direção</h4>
                <div className="space-y-1.5">
                  {cardPW01.criteria.map((cr) => (
                    <label key={cr.id} className="flex items-center gap-2 text-xs text-on-surface cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(checkedCriteria[cr.id])}
                        onChange={() => onToggleCriterion(cr.id)}
                        className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                      />
                      <span>{cr.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-xs text-on-surface-variant space-y-2">
                <p className="leading-relaxed">
                  <strong>Objetivo Editorial:</strong> Evitar poses estáticas ou forçadas. O roteiro se divide entre a energia descontraída com a moto no Bar Thunder e a intimidade orgânica nas falésias e areia da Costa Azul.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onResetItems}
                    className="text-xs text-secondary hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="size-3" />
                    <span>Restaurar 58 referências originais</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search & Horizontal Filter Pills (Cosmos Minimalist Aesthetic) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 py-1 flex items-center gap-2 no-scrollbar">
          {filterOptions.map((f) => {
            const isActive = selectedFilter === f.value;
            const isFav = f.value === "favorites";
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setSelectedFilter(f.value)}
                className={`px-3.5 py-1.5 rounded-full font-label-sm text-[11px] tracking-wider uppercase whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-xs font-semibold"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <span>{f.label}</span>
                {isFav && likedIds.length > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${
                    isActive ? "bg-surface-container text-on-surface" : "bg-primary text-on-primary"
                  }`}>
                    {likedIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar poses, clima, luz..."
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Staggered Masonry Feed (Cosmos / Atelier Style) */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center gap-2">
          <p className="font-headline-sm text-base text-on-surface">Nenhum elemento encontrado</p>
          <p className="text-xs text-on-surface-variant">Tente mudar o filtro ou adicione uma nova foto de inspiração.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter("all");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-semibold text-secondary hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 1100: 4 }}>
          <Masonry gutter="14px">
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
                isPriority={index < 4}
                isAboveFold={index < 8}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}
