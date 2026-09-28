import { MapPin, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#121212] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6a6a6a] dark:text-[#a0a0a0]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[#222222] dark:text-white font-bold tracking-tight">
              Versa Visual
            </span>
            <span className="text-[#ebebeb] dark:text-white/20">|</span>
            <span className="text-[#6a6a6a] dark:text-[#a0a0a0]">
              Direção Fotográfica & Documental de Casamentos
            </span>
            <span className="text-[#ebebeb] dark:text-white/20">|</span>
            <a 
              href="https://instagram.com/v1ncsc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#ff385c] hover:underline font-semibold"
            >
              @v1ncsc
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-[#6a6a6a] dark:text-[#a0a0a0]">
              <MapPin className="size-3.5 text-[#ff385c]" />
              Rio das Ostras · RJ
            </span>
            <span className="flex items-center gap-1.5 text-[#6a6a6a] dark:text-[#a0a0a0]">
              <Database className="size-3.5 text-[#ff385c]" />
              Sincronizado Localmente
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#ebebeb] dark:border-white/5 text-center text-xs text-[#6a6a6a] dark:text-[#a0a0a0]">
          Planejamento Executivo · Camila & Carlos · Acervo Exclusivo Versa Visual
        </div>
      </div>
    </footer>
  );
}
