import { useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { 
  Heart, 
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
  ImagePlus,
  Loader2
} from "lucide-react";
import { MoodboardCard } from "@/app/components/MoodboardCard";
import { PreWeddingItem, PreWeddingCategory } from "@/app/data/preWeddingData";
import { PlanningCard } from "@/app/data/planningData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { compressMultipleFiles } from "@/app/utils/imageCompressor";
import { motion, AnimatePresence } from "motion/react";
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

const categories: { value: PreWeddingCategory; label: string }[] = [
  { value: "all", label: "Todas as Fotos" },
  { value: "natureza", label: "Campos & Montanhas" },
  { value: "floresta", label: "Floresta & Luz" },
  { value: "urbano", label: "Bar, Urbano & Moto" },
  { value: "pb", label: "Preto & Branco" }
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
  const [selectedCategory, setSelectedCategory] = useState<PreWeddingCategory>("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showRoteiroDetails, setShowRoteiroDetails] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    if (onlyFavorites && !likedIds.includes(item.id)) return false;
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const cardPW01 = cards.find((c) => c.id === "pw-01");

  // Handler de processamento em lote com compressão Canvas
  const processFilesBatch = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Por favor, selecione arquivos de imagem válidos (JPG, PNG, WEBP).");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedList = await compressMultipleFiles(validFiles, 1600, 0.82);

      const targetCategory: PreWeddingCategory = selectedCategory === "all" ? "natureza" : selectedCategory;

      const newItems: Omit<PreWeddingItem, "id">[] = compressedList.map((c) => ({
        title: c.title,
        imageUrl: c.imageUrl,
        category: targetCategory,
        notes: {
          description: "Upload direto pela noiva com compressão Retina."
        }
      }));

      if (onAddBatchItems) {
        onAddBatchItems(newItems);
      } else {
        newItems.forEach((item) => onAddItem(item));
        toast.success(`${newItems.length} foto(s) adicionada(s) ao Moodboard!`);
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar as fotos selecionadas.");
    } finally {
      setIsCompressing(false);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      await processFilesBatch(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFilesBatch(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards: Airbnb 20px Cards */}
      <div className="grid grid-cols-1 gap-5">
        {/* CARD-PW-01: Roteiro e Locações */}
        {cardPW01 && (
          <div className="p-6 sm:p-7 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card hover:shadow-airbnb-hover transition-all duration-300 border border-[#ebebeb] dark:border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#ebebeb] dark:border-white/10">
                <span className="text-xs font-semibold text-[#ff385c] tracking-normal uppercase">
                  {cardPW01.code} · PLANEJAMENTO OPERACIONAL DO ENSAIO
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-[14px] bg-[#f7f7f7] dark:bg-[#242426] text-[#222222] dark:text-white border border-[#ebebeb] dark:border-white/10">
                  Rota Confirmada
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white mb-2 tracking-[-0.44px]">
                {cardPW01.title}
              </h2>
              <p className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mb-4 leading-relaxed font-normal">
                {cardPW01.context}
              </p>

              {/* Specs Grid */}
              <div className="space-y-2.5 bg-[#f7f7f7] dark:bg-[#242426] p-4 rounded-[14px] border border-[#ebebeb] dark:border-white/5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock className="size-4 text-[#ff385c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-white font-semibold">Janela Ideal: </strong>
                    <span className="text-[#6a6a6a] dark:text-[#a0a0a0]">Entre 2 e 3 meses (T-90 a T-60 dias) antes do casamento em Rio das Ostras.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-[#ff385c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-white font-semibold">Rota: </strong>
                    <span className="text-[#6a6a6a] dark:text-[#a0a0a0]">Bar Thunder (vibe urbana/intimista) → Costa Azul (orla, pedras e Golden Hour).</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Camera className="size-4 text-[#ff385c] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#222222] dark:text-white font-semibold">Linguagem: </strong>
                    <span className="text-[#6a6a6a] dark:text-[#a0a0a0]">Direção editorial espontânea, afeto genuíno e paleta atemporal.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Critérios de Aceite Toggle */}
            <div className="mt-5 pt-3.5 border-t border-[#ebebeb] dark:border-white/10">
              <button
                type="button"
                onClick={() => setShowRoteiroDetails(!showRoteiroDetails)}
                className="flex items-center justify-between w-full text-xs font-semibold text-[#222222] dark:text-white hover:text-[#ff385c] transition-colors"
              >
                <span>Critérios de Aceite ({cardPW01.criteria.length})</span>
                {showRoteiroDetails ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

              <AnimatePresence>
                {showRoteiroDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-3 space-y-2"
                  >
                    {cardPW01.criteria.map((crit) => {
                      const isChecked = !!checkedCriteria[crit.id];
                      return (
                        <div
                          key={crit.id}
                          onClick={() => onToggleCriterion(crit.id)}
                          className="flex items-center gap-2.5 p-2 rounded-[8px] bg-[#f7f7f7] dark:bg-[#242426] cursor-pointer hover:bg-[#ebebeb] dark:hover:bg-[#2c2c2e] transition-colors text-xs"
                        >
                          <div
                            className={`size-4 rounded flex items-center justify-center border transition-all ${
                              isChecked
                                ? "bg-[#ff385c] border-[#ff385c] text-white"
                                : "border-[#c1c1c1] bg-white dark:bg-[#1c1c1e]"
                            }`}
                          >
                            {isChecked && <Check className="size-3" />}
                          </div>
                          <span className={isChecked ? "line-through text-[#6a6a6a] dark:text-zinc-500" : "text-[#222222] dark:text-zinc-200"}>
                            {crit.text}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* 2. Drag & Drop Dropzone Visual Banner (Airbnb Style) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isCompressing && fileInputRef.current?.click()}
        className={`p-6 sm:p-8 rounded-[20px] border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden group ${
          isDragging
            ? "border-[#ff385c] bg-[#fff0f2] dark:bg-[#2b181c] scale-[1.01] shadow-airbnb-hover"
            : "border-[#ebebeb] dark:border-white/15 bg-white dark:bg-[#1c1c1e] hover:border-[#ff385c]/60 shadow-airbnb-card"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className={`size-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs flex-shrink-0 ${
              isDragging 
                ? "bg-[#ff385c] text-white scale-110" 
                : "bg-[#fff0f2] dark:bg-[#2e191d] text-[#ff385c] group-hover:scale-105"
            }`}>
              {isCompressing ? (
                <Loader2 className="size-6 animate-spin" />
              ) : (
                <UploadCloud className="size-7" />
              )}
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#ff385c] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="size-3.5" />
                <span>Upload Direto com Compressão Automática</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#222222] dark:text-white tracking-[-0.3px]">
                {isCompressing
                  ? "Otimizando imagens em alta definição..."
                  : isDragging
                  ? "Solte as fotos aqui para adicionar!"
                  : "Arraste fotos de inspiração ou clique para escolher da galeria"}
              </h3>
              <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
                Suporte a múltiplos arquivos do celular ou Pinterest · Compressão inteligente Retina em 1600px.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              disabled={isCompressing}
              className="h-9 px-4 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 group-hover:bg-[#ff385c]"
            >
              <ImagePlus className="size-3.5" />
              <span>Escolher Fotos da Galeria</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sticky Category Filter & Actions Bar */}
      <div className="sticky top-[64px] sm:top-[74px] z-30 py-2.5 px-3 sm:px-4 rounded-[16px] sm:rounded-[20px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-md shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Filter Pills (Free horizontal scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          {categories.map(({ value, label }) => {
            const isSelected = selectedCategory === value && !onlyFavorites;
            const count = value === "all" ? items.length : items.filter((i) => i.category === value).length;

            return (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSelectedCategory(value);
                  setOnlyFavorites(false);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex-shrink-0 flex items-center gap-1.5 sm:gap-2 border active:scale-95 ${
                  isSelected
                    ? "bg-[#222222] dark:bg-white text-white dark:text-[#222222] border-[#222222] dark:border-white shadow-sm"
                    : "bg-[#f7f7f7] dark:bg-[#242426] text-[#6a6a6a] dark:text-[#a0a0a0] border-transparent hover:border-[#ebebeb] hover:text-[#222222] dark:hover:text-white"
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-medium ${isSelected ? "bg-white/20 dark:bg-black/10 text-white dark:text-[#222222]" : "text-[#6a6a6a]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 justify-end">
          {/* Favorites Filter Pill */}
          <button
            type="button"
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
              onlyFavorites
                ? "bg-[#ff385c] text-white border-[#ff385c] shadow-sm"
                : "bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white border-[#ebebeb] dark:border-white/10 hover:border-[#222222]"
            }`}
          >
            <Heart className={`size-4 ${onlyFavorites ? "fill-white text-white" : "text-[#ff385c]"}`} />
            <span>Favoritas</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${onlyFavorites ? "bg-white/20 text-white" : "bg-[#f2f2f2] text-[#ff385c]"}`}>
              {likedIds.length}
            </span>
          </button>

          {/* Add Full Dialog Item Button */}
          <button
            type="button"
            onClick={onOpenAddDialog}
            className="h-9 px-3.5 rounded-[8px] bg-[#222222] text-white hover:bg-[#ff385c] text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onResetItems}
            className="size-9 rounded-full bg-[#f2f2f2] dark:bg-[#242426] text-[#6a6a6a] hover:text-[#222222] flex items-center justify-center transition-all shadow-sm active:scale-92"
            title="Restaurar as referências originais"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#1c1c1e] rounded-[24px] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 p-8 max-w-lg mx-auto">
          <div className="size-16 rounded-full bg-[#fff0f3] dark:bg-[#2c1c20] flex items-center justify-center mx-auto mb-4">
            <Heart className="size-8 text-[#ff385c] stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-lg text-[#222222] dark:text-white mb-2 tracking-tight">
            Nenhuma foto favoritada ainda
          </h3>
          <p className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed mb-6 font-normal">
            Toque no coração das fotos do moodboard que mais combinam com a vibe de vocês para montar o roteiro dos sonhos de Camila & Carlos.
          </p>
          <button
            type="button"
            onClick={() => setOnlyFavorites(false)}
            className="h-11 px-6 rounded-[12px] bg-[#222222] hover:bg-[#ff385c] text-white text-sm font-semibold transition-all shadow-sm active:scale-95"
          >
            Explorar todas as {items.length} fotos do ensaio
          </button>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 980: 3, 1280: 4 }}>
          <Masonry gutter="1.25rem">
            {/* Upload In-Place da Cliente */}
            {!onlyFavorites && (
              <div 
                onClick={() => !isCompressing && fileInputRef.current?.click()}
                className="group border-2 border-dashed border-[#ff385c]/40 hover:border-[#ff385c] bg-[#fffbfb] dark:bg-[#1e1517] rounded-[20px] p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[320px] shadow-sm hover:shadow-airbnb-hover hover:-translate-y-1 relative"
              >
                <div className="size-14 rounded-full bg-[#ff385c]/10 group-hover:bg-[#ff385c] text-[#ff385c] group-hover:text-white flex items-center justify-center transition-all duration-300 mb-3 shadow-xs">
                  {isCompressing ? (
                    <Loader2 className="size-7 animate-spin" />
                  ) : (
                    <ImagePlus className="size-7" />
                  )}
                </div>
                <h4 className="font-bold text-base text-[#222222] dark:text-white mb-1.5 tracking-tight group-hover:text-[#ff385c] transition-colors">
                  {isCompressing ? "Processando..." : "Subir prints do celular"}
                </h4>
                <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] max-w-[200px] leading-relaxed mb-3">
                  Selecione uma ou mais fotos do Pinterest / Instagram para adicionar à curadoria.
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff385c] uppercase tracking-wider bg-white dark:bg-[#2b1b1e] px-3 py-1 rounded-full border border-[#ff385c]/20 shadow-xs">
                  <Plus className="size-3" />
                  Galeria Múltipla
                </span>
              </div>
            )}

            {/* Photo Cards */}
            {filteredItems.map((item, index) => (
              <MoodboardCard
                key={item.id}
                item={item}
                note={notes[item.id]}
                isPriority={index === 0}
                isAboveFold={index < 4}
                isLiked={likedIds.includes(item.id)}
                onToggleLike={onToggleLike}
                onOpenNotes={onOpenNotes}
                onDelete={onDelete}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}
