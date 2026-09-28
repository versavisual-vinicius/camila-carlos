import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/app/components/ui/dialog";
import { 
  Share2, 
  MessageCircle, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Heart,
  Users
} from "lucide-react";
import { toast } from "sonner";

interface ShareFabModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPhotos: number;
  totalFavorites: number;
  completedShotCount: number;
  totalShotCount: number;
  cerimonialPhone?: string;
}

export function ShareFabModal({
  isOpen,
  onClose,
  totalPhotos,
  totalFavorites,
  completedShotCount,
  totalShotCount,
  cerimonialPhone = "5522998877665"
}: ShareFabModalProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://versavisual.com";

  const summaryText = `💍 Planejamento Camila & Carlos — Versa Visual (@v1ncsc)
📸 Ensaio Pré-Wedding: ${totalFavorites} fotos favoritas selecionadas (de ${totalPhotos} curadas)
📍 Rota: Bar Thunder → Costa Azul (Rio das Ostras)
🏛️ Casamento: Espaço Lux (Cerimônia & Festa Integradas)
📋 Shot List de Protocolo: ${completedShotCount} de ${totalShotCount} fotos confirmadas
🔗 Acesse o roteiro completo atualizado: ${currentUrl}`;

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(summaryText);
    const whatsappUrl = `https://wa.me/${cerimonialPhone}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Abrindo WhatsApp com o resumo consolidado!");
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    toast.success("Resumo copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px] bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white border border-[#ebebeb] dark:border-white/10 rounded-[24px] shadow-airbnb-card p-6">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
            <Sparkles className="size-3.5" />
            <span>Exportação & Compartilhamento</span>
          </div>
          <DialogTitle className="text-xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
            Enviar Resumo para o Cerimonial
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0]">
            Compartilhe com 1 clique a seleção de referências, Shot List e rotas de Camila & Carlos com fornecedores.
          </DialogDescription>
        </DialogHeader>

        {/* Live Preview Card */}
        <div className="my-2 p-4 rounded-[14px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 space-y-2 text-xs text-[#222222] dark:text-white">
          <div className="flex items-center justify-between pb-2 border-b border-[#ebebeb] dark:border-white/10 font-bold">
            <span className="flex items-center gap-1.5 text-[#ff385c]">
              <Heart className="size-3.5 fill-[#ff385c]" />
              {totalFavorites} Favoritas Selecionadas
            </span>
            <span className="flex items-center gap-1 text-[#6a6a6a] dark:text-[#a0a0a0]">
              <Users className="size-3.5" />
              {completedShotCount}/{totalShotCount} Shot List
            </span>
          </div>
          <p className="font-mono text-[11px] text-[#6a6a6a] dark:text-[#a0a0a0] whitespace-pre-line leading-relaxed">
            {summaryText}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full h-11 rounded-[12px] bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
          >
            <MessageCircle className="size-4" />
            <span>Enviar no WhatsApp do Cerimonial</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="h-10 rounded-[10px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white hover:border-[#222222] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-[#ff385c]" />}
              <span>{copied ? "Copiado!" : "Copiar Texto"}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="h-10 rounded-[10px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white hover:border-[#222222] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Printer className="size-3.5 text-[#ff385c]" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
