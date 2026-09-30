import { MapPin, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 sm:mt-12 border-t border-outline-variant/20 bg-surface-container-lowest dark:bg-[#111414] py-10 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-on-surface-variant">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-2">
              <img
                src="/brand-assets/vv-icon-teal-1000px.png"
                alt="Versa Visual"
                className="size-5 object-contain rounded-md"
              />
              <span className="text-on-surface font-bold tracking-tight text-sm">
                Versa Visual
              </span>
            </div>
            <span className="text-outline-variant/60">•</span>
            <span className="font-medium">
              Direção Fotográfica de Casamento
            </span>
            <span className="text-outline-variant/60">•</span>
            <a 
              href="https://instagram.com/v1ncsc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-on-surface hover:underline font-bold transition-colors"
            >
              @v1ncsc
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
            <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
              <MapPin className="size-3.5 text-secondary" />
              Rio das Ostras & Costa Azul, RJ
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
              <Database className="size-3.5 text-secondary" />
              Sincronizado Localmente
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-outline-variant/15 text-center text-[11px] text-secondary">
          Planejamento Executivo & Moodboard Editorial · Camila & Carlos · Versa Visual (@v1ncsc)
        </div>
      </div>
    </footer>
  );
}
