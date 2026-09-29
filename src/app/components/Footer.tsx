import { MapPin, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-outline-variant/30 bg-surface dark:bg-[#141312] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2">
              <img
                src="/brand-assets/vv-icon-teal-1000px.png"
                alt="Versa Visual"
                className="size-5 object-contain rounded-md"
              />
              <span className="text-on-surface font-semibold tracking-tight text-sm">
                Versa Visual
              </span>
            </div>
            <span className="text-outline-variant">|</span>
            <span>
              Direção Fotográfica de Casamento
            </span>
            <span className="text-outline-variant">|</span>
            <a 
              href="https://instagram.com/v1ncsc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:text-on-surface hover:underline font-semibold"
            >
              @v1ncsc
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <MapPin className="size-3.5 text-secondary" />
              Rio das Ostras · Macaé, RJ
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <Database className="size-3.5 text-secondary" />
              Sincronizado Localmente
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-outline-variant/20 text-center text-[11px] text-on-surface-variant">
          Curadoria Visual & Direção Fotográfica · Camila & Carlos · Versa Visual (@v1ncsc)
        </div>
      </div>
    </footer>
  );
}
