import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/app/components/ui/dialog";
import { 
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
  onExportPdf?: () => void;
  isExportingPdf?: boolean;
}

export function ShareFabModal({
  isOpen,
  onClose,
  totalPhotos,
  totalFavorites,
  completedShotCount,
  totalShotCount,
  cerimonialPhone = "5522998877665",
  onExportPdf,
  isExportingPdf = false
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
      <DialogContent className="sm:max-w-[480px] bg-surface text-on-surface border border-outline-variant/30 rounded-3xl shadow-airbnb-card p-6">
        <DialogHeader className="text-left pr-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
            <Sparkles className="size-3.5" />
            <span>Exportação & Compartilhamento</span>
          </div>
          <DialogTitle className="font-headline-sm text-xl font-bold text-on-surface tracking-tight">
            Enviar Resumo para o Cerimonial
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Compartilhe com 1 clique a seleção de referências, Shot List e rotas de Camila & Carlos com fornecedores.
          </DialogDescription>
        </DialogHeader>

        {/* Live Preview Card */}
        <div className="my-2 p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/50 border border-outline-variant/20 space-y-2 text-xs text-on-surface shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 font-bold">
            <span className="flex items-center gap-1.5 text-red-500">
              <Heart className="size-3.5 fill-red-500 text-red-500" />
              {totalFavorites} Favoritas Selecionadas
            </span>
            <span className="flex items-center gap-1 text-on-surface-variant">
              <Users className="size-3.5 text-secondary" />
              {completedShotCount}/{totalShotCount} Shot List
            </span>
          </div>
          <p className="font-body-md text-sm text-on-surface-variant whitespace-pre-line leading-relaxed">
            {summaryText}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          {/* WhatsApp Direct */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <MessageCircle className="size-4" />
            <span>Enviar no WhatsApp do Cerimonial</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              className="h-10 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-secondary" />}
              <span>{copied ? "Copiado!" : "Copiar Texto"}</span>
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="h-10 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Printer className="size-3.5 text-secondary" />
              <span>Imprimir</span>
            </button>
          </div>

          {/* Download Official Resumo do Roteiro PDF */}
          {onExportPdf && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onExportPdf();
              }}
              disabled={isExportingPdf}
              className="w-full h-10 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Download className="size-3.5 text-secondary" />
              <span>{isExportingPdf ? "Gerando..." : "Baixar Resumo do Roteiro (PDF)"}</span>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
