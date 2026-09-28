import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { PreWeddingItem, PreWeddingCategory } from "@/app/data/preWeddingData";
import { Upload, Link as LinkIcon, Sparkles } from "lucide-react";
import { compressImageFile } from "@/app/utils/imageCompressor";
import { toast } from "sonner";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<PreWeddingItem, "id">) => void;
}

export function AddItemDialog({ isOpen, onClose, onAdd }: AddItemDialogProps) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState<PreWeddingCategory>("natureza");
  const [description, setDescription] = useState("");
  const [inputMode, setInputMode] = useState<"file" | "url">("file");
  const [isCompressing, setIsCompressing] = useState(false);
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
    } catch (err: any) {
      toast.error(err?.message || "Erro ao processar imagem.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    onAdd({
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      category,
      notes: description.trim() ? { description: description.trim() } : undefined
    });

    handleReset();
  };

  const handleReset = () => {
    setTitle("");
    setImageUrl("");
    setCategory("natureza");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white border border-[#ebebeb] dark:border-white/10 rounded-[20px] shadow-airbnb-card p-6">
        <DialogHeader>
          <div className="flex items-center gap-1.5 text-[#ff385c] text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="size-3.5" />
            <span>Curadoria Camila & Carlos</span>
          </div>
          <DialogTitle className="text-xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
            Adicionar Nova Foto de Referência
          </DialogTitle>
          <DialogDescription className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0]">
            Adicione uma nova foto de inspiração ou pose para o ensaio em Rio das Ostras.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Method selector: Airbnb pill switch */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f7f7f7] dark:bg-[#242426] rounded-full border border-[#ebebeb] dark:border-white/5">
            <button
              type="button"
              onClick={() => setInputMode("file")}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                inputMode === "file"
                  ? "bg-[#222222] text-white shadow-sm"
                  : "text-[#6a6a6a] hover:text-[#222222] dark:hover:text-white"
              }`}
            >
              <Upload className="size-3.5" />
              Upload de Arquivo
            </button>
            <button
              type="button"
              onClick={() => setInputMode("url")}
              className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                inputMode === "url"
                  ? "bg-[#222222] text-white shadow-sm"
                  : "text-[#6a6a6a] hover:text-[#222222] dark:hover:text-white"
              }`}
            >
              <LinkIcon className="size-3.5" />
              Link da Web (URL)
            </button>
          </div>

          {inputMode === "file" ? (
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-[#222222] dark:text-white">
                Selecione a imagem do computador
              </Label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#ebebeb] dark:border-white/15 rounded-[14px] p-6 text-center cursor-pointer hover:border-[#ff385c] transition-colors bg-[#f7f7f7]/60 dark:bg-[#242426]/60"
              >
                {imageUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={imageUrl} alt="Preview" className="h-32 object-contain rounded-[8px] shadow-sm" />
                    <span className="text-xs text-[#ff385c] font-semibold">Trocar arquivo</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#6a6a6a] dark:text-[#a0a0a0]">
                    <Upload className="size-8 text-[#ff385c]" />
                    <span className="text-sm font-semibold text-[#222222] dark:text-white">Clique para escolher uma imagem</span>
                    <span className="text-xs text-[#6a6a6a]">PNG, JPG, WEBP até 10MB</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="image-url" className="text-xs font-semibold text-[#222222] dark:text-white">
                URL da Imagem
              </Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://exemplo.com/foto.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="h-10 text-xs bg-[#f7f7f7] dark:bg-[#242426] border-[#ebebeb] dark:border-white/10 rounded-[8px] focus-visible:ring-[#ff385c]"
                required
              />
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-xs font-semibold text-[#222222] dark:text-white">
              Título da Referência
            </Label>
            <Input
              id="title"
              placeholder="ex: Abraço na orla de Costa Azul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 text-xs bg-[#f7f7f7] dark:bg-[#242426] border-[#ebebeb] dark:border-white/10 rounded-[8px] focus-visible:ring-[#ff385c]"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-xs font-semibold text-[#222222] dark:text-white">
              Atmosfera / Categoria
            </Label>
            <Select value={category} onValueChange={(val) => setCategory(val as PreWeddingCategory)}>
              <SelectTrigger className="h-10 text-xs bg-[#f7f7f7] dark:bg-[#242426] border-[#ebebeb] dark:border-white/10 rounded-[8px] focus:ring-[#ff385c]">
                <SelectValue placeholder="Selecione uma atmosfera" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#1c1c1e] border-[#ebebeb] dark:border-white/10 rounded-[14px]">
                <SelectItem value="natureza">Campos & Montanhas</SelectItem>
                <SelectItem value="floresta">Floresta & Luz</SelectItem>
                <SelectItem value="urbano">Bar, Urbano & Moto</SelectItem>
                <SelectItem value="pb">Preto & Branco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-semibold text-[#222222] dark:text-white">
              Direção Artística & Notas de Luz (opcional)
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva o enquadramento, dinâmica do casal ou iluminação pretendida..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-xs bg-[#f7f7f7] dark:bg-[#242426] border-[#ebebeb] dark:border-white/10 rounded-[8px] focus-visible:ring-[#ff385c] resize-none"
            />
          </div>

          <DialogFooter className="pt-2 gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 px-4 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white hover:border-[#222222] text-xs font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !imageUrl.trim()}
              className="h-10 px-5 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              Salvar Foto
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}