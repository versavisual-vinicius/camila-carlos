/**
 * Utilitário de compressão de imagens em tempo real no cliente via Canvas HTML5.
 * Reduz fotos de 10-25MB de iPhones/câmeras para ~120-180KB preservando excelente nitidez em telas Retina.
 */

export function formatTitleFromFilename(fileName: string): string {
  // Remove extensão
  const base = fileName.replace(/\.[^/.]+$/, "");
  // Substitui hífens, underlines e múltiplos espaços
  const words = base
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "Nova Referência";

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function compressImageFile(
  file: File,
  maxDimension: number = 1600,
  quality: number = 0.82
): Promise<{ title: string; imageUrl: string }> {
  return new Promise((resolve, reject) => {
    // Valida se é imagem
    if (!file.type.startsWith("image/")) {
      return reject(new Error(`O arquivo "${file.name}" não é uma imagem válida.`));
    }

    const reader = new FileReader();

    reader.onerror = () => reject(new Error(`Erro ao ler o arquivo "${file.name}".`));

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => reject(new Error(`Erro ao processar imagem "${file.name}".`));

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calcula proporção proporcional
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Não foi possível inicializar o contexto 2D do Canvas."));
        }

        // Configura interpolação de alta qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Preenche fundo branco (útil se PNG tiver transparência)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Renderiza a imagem comprimida
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

        resolve({
          title: formatTitleFromFilename(file.name),
          imageUrl: compressedDataUrl
        });
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

export async function compressMultipleFiles(
  files: FileList | File[],
  maxDimension: number = 1600,
  quality: number = 0.82
): Promise<{ title: string; imageUrl: string }[]> {
  const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
  if (fileArray.length === 0) return [];

  const promises = fileArray.map((file) => compressImageFile(file, maxDimension, quality));
  return Promise.all(promises);
}
