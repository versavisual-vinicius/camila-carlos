import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { PreWeddingItem, PreWeddingCategory } from "@/app/data/preWeddingData";
import { 
  X, 
  UploadCloud, 
  Camera, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Search, 
  Loader2,
  Check,
  Plus
} from "lucide-react";
import { compressImageFile } from "@/app/utils/imageCompressor";
import { toast } from "sonner";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<PreWeddingItem, "id">) => void;
}

const availableFolders = [
  { value: "natureza", label: "Cenário & Local" },
  { value: "floresta", label: "Luz Natural" },
  { value: "urbano", label: "Urbano" },
  { value: "pb", label: "Preto & Branco" },
  { value: "vestido", label: "Vestido & Véu" },
  { value: "flores", label: "Flores & Decoração" },
  { value: "papelaria", label: "Papelaria" },
  { value: "beleza", label: "Beleza & Make" }
];

const availableVendors = [
  "Espaço Lux — Rio das Ostras (Local)",
  "Versa Visual — Vinicius Cunha (@v1ncsc) (Foto)"
];

export function AddItemDialog({ isOpen, onClose, onAdd }: AddItemDialogProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [category, setCategory] = useState<string>("natureza");
  const [vendorSearch, setVendorSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [showVendorSuggestions, setShowVendorSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressImageFile(file, 1600, 0.82);
      setImageUrl(compressed.imageUrl);
      if (!title) {
        setTitle(compressed.title);
      }
      toast.success("Foto pronta em alta resolução!");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar imagem.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleImportLink = () => {
    if (!linkUrl.trim()) return;
    setImageUrl(linkUrl.trim());
    if (!title) {
      setTitle("Inspiração Importada");
    }
    toast.success("Link carregado como referência!");
  };

  const handleAddTag = () => {
    const trimmed = newTagInput.trim().replace(/^#/, "");
    if (!trimmed) return;
    if (selectedTags.includes(trimmed)) {
      toast.info("Essa tag já foi adicionada.");
      return;
    }
    setSelectedTags((prev) => [...prev, trimmed]);
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      toast.error("Por favor, informe a foto e um título para a referência.");
      return;
    }

    // Map folder to PreWeddingCategory
    let cat: PreWeddingCategory = "natureza";
    if (category === "floresta" || category === "urbano" || category === "pb") {
      cat = category;
    }

    onAdd({
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category: cat,
      notes: {
        description: description.trim() || undefined,
        tags: selectedTags.length > 0 ? selectedTags : undefined,
        location: vendorSearch.trim() || undefined
      }
    });

    toast.success("Nova referência adicionada ao moodboard!");
    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setImageUrl("");
    setLinkUrl("");
    setCategory("natureza");
    setVendorSearch("");
    setSelectedTags([]);
    setNewTagInput("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[620px] max-h-[92vh] overflow-y-auto bg-surface text-on-surface border border-outline-variant/40 rounded-2xl p-0 shadow-lg">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 px-5 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-on-surface-variant hover:text-on-surface font-label-md text-xs uppercase tracking-wider transition-colors"
          >
            Fechar
          </button>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
            Moodboard de Referências
          </span>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={!title.trim() || !imageUrl.trim() || isCompressing}
            className="bg-primary text-on-primary font-label-md text-xs px-4 py-1.5 rounded-lg transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs font-semibold"
          >
            Salvar
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Header Title & Subtitle */}
          <div>
            <h2 className="font-headline-md text-2xl text-on-surface tracking-tight">
              Nova Referência
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-1">
              Adicione fotos e inspirações visuais que você ama para o seu casamento e ensaio.
            </p>
          </div>

          {/* Visual Dropzone */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low border border-outline-variant/40 transition-all duration-300">
            {!imageUrl ? (
              <div 
                className="p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-surface-container transition-colors min-h-[180px]"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  {isCompressing ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <UploadCloud className="size-6" />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-title-sm text-sm text-on-surface font-medium">
                    {isCompressing ? "Processando imagem..." : "Arraste a foto ou toque para selecionar"}
                  </span>
                  <span className="text-[11px] text-on-surface-variant mt-0.5">
                    JPG, PNG ou WEBP em alta resolução
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-medium flex items-center gap-1">
                    <ImageIcon className="size-3" /> Galeria
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-medium flex items-center gap-1">
                    <Camera className="size-3" /> Câmera
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-56 overflow-hidden rounded-xl bg-black">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-3.5">
                  <span className="font-label-sm text-[11px] text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded">
                    Visual Selecionado
                  </span>
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="w-7 h-7 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white active:scale-95 transition-all shadow-sm"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Import link input */}
          <div className="bg-surface-container-lowest p-2.5 rounded-xl border border-outline-variant/30 flex items-center gap-2 shadow-xs">
            <LinkIcon className="size-4 text-secondary ml-1" />
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Colar link de foto (Instagram, Pinterest, Web)"
              className="w-full bg-transparent text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleImportLink}
              disabled={!linkUrl.trim()}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-medium px-3 py-1.5 rounded transition-colors disabled:opacity-40"
            >
              Importar
            </button>
          </div>

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-3.5">
            {/* Title */}
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
              <label className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-semibold">
                Título ou Descrição Curta *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Véu delicado com renda floral, abraço na praia..."
                className="bg-transparent font-title-sm text-sm text-on-surface focus:outline-none placeholder:text-secondary/60 w-full"
              />
            </div>

            {/* Pasta de Destino (sem Cluster) */}
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
              <label className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-semibold">
                Pasta de Destino
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent font-title-sm text-xs text-on-surface focus:outline-none cursor-pointer pr-4"
              >
                {availableFolders.map((f) => (
                  <option key={f.value} value={f.value} className="bg-surface text-on-surface">
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Local ou Fornecedor Associado (Opcional) */}
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs relative">
              <label className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-semibold">
                Local ou Fornecedor Associado (Opcional)
              </label>
              <div className="flex items-center gap-2">
                <Search className="size-3.5 text-secondary" />
                <input
                  type="text"
                  value={vendorSearch}
                  onFocus={() => setShowVendorSuggestions(true)}
                  onChange={(e) => setVendorSearch(e.target.value)}
                  placeholder="Ex: Espaço Lux, Versa Visual..."
                  className="w-full bg-transparent text-xs text-on-surface placeholder:text-secondary/60 focus:outline-none"
                />
              </div>

              {showVendorSuggestions && (
                <div className="mt-2 pt-2 border-t border-outline-variant/20 flex flex-col gap-1">
                  {availableVendors.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setVendorSearch(v);
                        setShowVendorSuggestions(false);
                      }}
                      className="text-left text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container px-2 py-1 rounded transition-colors flex items-center justify-between"
                    >
                      <span>{v}</span>
                      <Check className="size-3 text-secondary opacity-0 hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tags de Estilo Criadas pela Noiva (Sem Pré-Tags) */}
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-semibold">
                  Tags de Estilo (Criadas por você · Opcional)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Digite uma tag (ex: pôr do sol, abraço, buquê...) e clique em Adicionar"
                  className="flex-1 bg-surface text-xs text-on-surface placeholder:text-on-surface-variant/50 px-3 py-1.5 rounded-lg border border-outline-variant/30 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!newTagInput.trim()}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface rounded-lg flex items-center gap-1 disabled:opacity-40 transition-colors"
                >
                  <Plus className="size-3 text-secondary" />
                  <span>Adicionar</span>
                </button>
              </div>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-on-primary shadow-xs"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:opacity-75 rounded-full"
                        title="Remover tag"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Anotação Pessoal da Noiva */}
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
              <label className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-semibold">
                O que você mais gosta nesta referência
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte o que chamou sua atenção (estilo do vestido, luz natural, atmosfera de romance...)"
                rows={2}
                className="w-full bg-transparent text-xs text-on-surface placeholder:text-secondary/60 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}