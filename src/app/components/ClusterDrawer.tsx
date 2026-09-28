import { useState } from "react";
import { 
  X, 
  Share2, 
  Sparkles, 
  Clock, 
  Compass, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  FileText
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from "@/app/components/ui/drawer";
import { toast } from "sonner";

export interface ClusterDetailData {
  id: string;
  name: string;
  categoryTag: string;
  itemCount: number;
  statusBadge: "Prioritário" | "Aprovado" | "Em Produção" | "Em Alinhamento";
  description: string;
  coverImage: string;
  collaborators: { name: string; role: string; avatar: string }[];
  specifications: { label: string; value: string }[];
  editorialDirection: string;
  curatedPhotos: {
    url: string;
    caption: string;
    aspect?: "square" | "portrait" | "landscape";
  }[];
}

interface ClusterDrawerProps {
  cluster: ClusterDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenLightbox?: (photoUrl: string, caption: string) => void;
}

export function ClusterDrawer({
  cluster,
  isOpen,
  onClose,
  onOpenLightbox
}: ClusterDrawerProps) {
  if (!cluster) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(`Link do cluster "${cluster.name}" copiado!`, {
      description: "Pronto para compartilhar via WhatsApp com o atelier e assessoria."
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh] sm:max-h-[85vh] bg-surface text-on-surface border-outline-variant/30 rounded-t-2xl sm:rounded-t-3xl overflow-hidden focus:outline-none flex flex-col">
        {/* Sticky Header */}
        <div className="border-b border-outline-variant/20 px-4 sm:px-6 py-4 flex items-center justify-between bg-surface/95 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <div className="min-w-0">
              <span className="font-body-md text-xs text-secondary font-medium block leading-tight">
                {cluster.categoryTag} · {cluster.itemCount} referências
              </span>
              <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold truncate leading-snug">
                {cluster.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container border border-outline-variant/30 text-on-surface">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {cluster.statusBadge}
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
              title="Copiar link do cluster"
            >
              <Share2 className="size-4" />
            </button>

            <DrawerClose asChild>
              <button
                type="button"
                className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                title="Fechar"
              >
                <X className="size-4" />
              </button>
            </DrawerClose>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 space-y-6">
          {/* Status Badge on Mobile */}
          <div className="sm:hidden flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-surface-container border border-outline-variant/30 text-on-surface">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Status: {cluster.statusBadge}
            </span>
          </div>

          {/* Editorial Direction Lead */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
              <Sparkles className="size-3.5" />
              <span>Direcionamento Editorial Versa Visual</span>
            </div>
            <p className="font-body-md text-xs sm:text-sm text-on-surface/90 leading-relaxed">
              {cluster.editorialDirection}
            </p>
          </div>

          {/* Mini Curated High-Res Gallery */}
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-headline-sm text-sm sm:text-base text-on-surface font-semibold">
                Galeria Curada de Referências
              </h3>
              <span className="font-body-md text-xs text-on-surface-variant">
                {cluster.curatedPhotos.length} fotos em alta resolução
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cluster.curatedPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (onOpenLightbox) {
                      onOpenLightbox(photo.url, photo.caption);
                    }
                  }}
                  className="group relative rounded-xl overflow-hidden bg-surface-container aspect-square cursor-pointer border border-outline-variant/20 hover:border-outline-variant/50 transition-all shadow-xs"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                    <p className="font-body-md text-[11px] text-white leading-tight line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="size-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications & Alignment Notes */}
          <div className="p-4 rounded-xl bg-surface-container/60 border border-outline-variant/20 space-y-3">
            <h3 className="font-headline-sm text-xs sm:text-sm text-on-surface font-semibold flex items-center gap-1.5">
              <FileText className="size-3.5 text-secondary" />
              <span>Ficha Técnica & Alinhamento Prático</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cluster.specifications.map((spec, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
                  <span className="font-body-md text-[11px] text-secondary font-medium block">
                    {spec.label}
                  </span>
                  <span className="font-body-md text-xs text-on-surface leading-snug mt-0.5 block">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Collaborator Team */}
          <div className="pt-2 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-body-md text-[11px] text-secondary block">
                Colaboradores Ativos no Atelier
              </span>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {cluster.collaborators.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-surface-container px-2 py-1 rounded-full text-xs border border-outline-variant/20">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-on-surface font-medium text-[11px]">{c.name}</span>
                    <span className="text-on-surface-variant text-[10px]">({c.role})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
              >
                <Share2 className="size-3.5" />
                <span>Enviar para Fornecedor</span>
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
