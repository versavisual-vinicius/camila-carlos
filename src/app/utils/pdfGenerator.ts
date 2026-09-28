import { jsPDF } from "jspdf";
import { 
  ShotListGroup, 
  SolarTimelineBlock, 
  KeyVendor 
} from "@/app/data/shotListData";

interface DossierData {
  shotListGroups: ShotListGroup[];
  timelineBlocks: SolarTimelineBlock[];
  vendors: KeyVendor[];
  sensitiveAlerts?: string;
  focalPoint?: { name: string; phone: string };
}

/**
 * Utilitário para adicionar rodapé editorial padronizado
 */
function addFooter(doc: jsPDF, pageNum: number, totalPages?: number) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  
  const footerText = "Camila & Carlos · Planejamento Executivo · Versa Visual (@v1ncsc) · Espaço Lux, Rio das Ostras";
  doc.text(footerText, 15, pageHeight - 10);
  
  const pageStr = totalPages ? `Página ${pageNum} de ${totalPages}` : `Página ${pageNum}`;
  doc.text(pageStr, pageWidth - 15, pageHeight - 10, { align: "right" });
}

/**
 * 1. DOSSIÊ EXECUTIVO COMPLETO PARA OS NOIVOS & EQUIPE
 */
export function generateFullDossierPdf(data: DossierData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // Header Banner Superior (Estilo Editorial Versa Visual)
  doc.setFillColor(34, 34, 34); // #222222
  doc.roundedRect(15, y, pageWidth - 30, 26, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 56, 92); // #ff385c Airbnb/Versa Accent
  doc.text("DOSSIÊ EXECUTIVO DE LOGÍSTICA & DIREÇÃO FOTOGRÁFICA", 20, y + 7);

  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("CAMILA & CARLOS — CASAMENTO NO ESPAÇO LUX", 20, y + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text("Rio das Ostras - RJ · Direção Fotográfica: Versa Visual (@v1ncsc) · Pôr do Sol Astronômico: 17:35", 20, y + 21);

  y += 33;

  // 1. Linha do Tempo Solar
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(34, 34, 34);
  doc.text("1. LINHA DO TEMPO SOLAR & BLINDAGEM DE LUZ (RIO DAS OSTRAS)", 15, y);
  
  doc.setDrawColor(235, 235, 235);
  doc.setLineWidth(0.5);
  doc.line(15, y + 2, pageWidth - 15, y + 2);
  y += 7;

  data.timelineBlocks.forEach((block) => {
    // Check page break
    if (y > 265) {
      addFooter(doc, doc.getNumberOfPages());
      doc.addPage();
      y = 18;
    }

    const isGolden = !!block.isGoldenHourLock;

    if (isGolden) {
      doc.setFillColor(255, 245, 246);
      doc.setDrawColor(255, 56, 92);
      doc.setLineWidth(0.6);
      doc.roundedRect(15, y, pageWidth - 30, 15, 2, 2, "FD");
    } else {
      doc.setFillColor(247, 247, 247);
      doc.setDrawColor(235, 235, 235);
      doc.setLineWidth(0.3);
      doc.roundedRect(15, y, pageWidth - 30, 13, 2, 2, "FD");
    }

    // Time range badge
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(isGolden ? 224 : 34, isGolden ? 11 : 34, isGolden ? 65 : 34);
    doc.text(block.timeRange, 19, y + 5);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(34, 34, 34);
    doc.text(block.title, 55, y + 5);

    // Location
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(106, 106, 106);
    doc.text(`Local: ${block.location}`, 55, y + 9.5);

    if (isGolden && block.alertWarning) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(193, 53, 21);
      doc.text(block.alertWarning, 19, y + 13.5);
      y += 18;
    } else {
      y += 16;
    }
  });

  y += 4;

  // 2. Shot List Modular
  if (y > 240) {
    addFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    y = 18;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(34, 34, 34);
  doc.text("2. SHOT LIST PROTOCOLAR MODULAR (EXECUÇÃO PREVISTA: 35 MIN)", 15, y);
  doc.line(15, y + 2, pageWidth - 15, y + 2);
  y += 7;

  data.shotListGroups.forEach((group) => {
    if (y > 255) {
      addFooter(doc, doc.getNumberOfPages());
      doc.addPage();
      y = 18;
    }

    // Group Header
    doc.setFillColor(242, 242, 242);
    doc.rect(15, y, pageWidth - 30, 6, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(34, 34, 34);
    doc.text(group.name, 18, y + 4.2);

    const groupMeta = `${group.estimatedMinutes} min · Fase: ${group.targetPhase}`;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(106, 106, 106);
    doc.text(groupMeta, pageWidth - 18, y + 4.2, { align: "right" });

    y += 8;

    // Items
    group.items.forEach((item) => {
      if (y > 270) {
        addFooter(doc, doc.getNumberOfPages());
        doc.addPage();
        y = 18;
      }

      // Checkbox square
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.4);
      doc.rect(18, y - 2.8, 3.2, 3.2);

      // Title
      doc.setFont("helvetica", item.isMandatory ? "bold" : "normal");
      doc.setFontSize(8);
      doc.setTextColor(34, 34, 34);
      doc.text(item.title, 24, y);

      // Tag
      if (item.priorityBadge) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(255, 56, 92);
        doc.text(`[${item.priorityBadge}]`, 130, y);
      }

      // Names
      if (item.names) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 120);
        doc.text(`Nomes: ${item.names}`, 24, y + 3.8);
        y += 7.5;
      } else {
        y += 5.5;
      }
    });

    y += 2;
  });

  // 3. Fornecedores Chave e Contatos
  if (y > 235) {
    addFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    y = 18;
  } else {
    y += 5;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(34, 34, 34);
  doc.text("3. FORNECEDORES CHAVE & COMUNICAÇÃO DE APOIO", 15, y);
  doc.line(15, y + 2, pageWidth - 15, y + 2);
  y += 7;

  data.vendors.forEach((vendor) => {
    if (y > 265) {
      addFooter(doc, doc.getNumberOfPages());
      doc.addPage();
      y = 18;
    }

    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(235, 235, 235);
    doc.roundedRect(15, y, pageWidth - 30, 10, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 56, 92);
    doc.text(vendor.role.toUpperCase(), 18, y + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(34, 34, 34);
    doc.text(vendor.name, 60, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(106, 106, 106);
    doc.text(`WhatsApp: ${vendor.phone}`, pageWidth - 20, y + 4.5, { align: "right" });

    if (vendor.address) {
      doc.setFontSize(7);
      doc.setTextColor(120, 120, 120);
      doc.text(`Endereço: ${vendor.address}`, 60, y + 8.2);
    }

    y += 12;
  });

  // 4. Ponto Focal & Alertas Sensíveis
  if (y > 240) {
    addFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    y = 18;
  } else {
    y += 4;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(34, 34, 34);
  doc.text("4. PONTO FOCAL & DIRETRIZES SENSÍVEIS", 15, y);
  doc.line(15, y + 2, pageWidth - 15, y + 2);
  y += 7;

  if (data.focalPoint && (data.focalPoint.name || data.focalPoint.phone)) {
    doc.setFillColor(245, 245, 245);
    doc.rect(15, y, pageWidth - 30, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(34, 34, 34);
    doc.text("Guardião(ã) da Shot List / Ponto Focal:", 18, y + 5.5);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.focalPoint.name || "A definir"} — Tel: ${data.focalPoint.phone || "A definir"}`, 72, y + 5.5);
    y += 12;
  }

  if (data.sensitiveAlerts) {
    doc.setFillColor(255, 245, 246);
    doc.setDrawColor(255, 56, 92);
    doc.roundedRect(15, y, pageWidth - 30, 14, 2, 2, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(193, 53, 21);
    doc.text("ALERTAS SENSÍVEIS & RESTRIÇÕES FAMILIARES (CERIMONIAL):", 18, y + 4.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(34, 34, 34);
    const splitAlerts = doc.splitTextToSize(data.sensitiveAlerts, pageWidth - 40);
    doc.text(splitAlerts, 18, y + 9);
    y += 18;
  }

  // Rodapés em todas as páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save("Camila_e_Carlos_Dossie_Executivo_VersaVisual.pdf");
}

/**
 * 2. FICHA RÁPIDA DE ALTAR (CERIMONIAL & PRANCHETA)
 */
export function generateCeremonialAltarPdf(data: {
  shotListGroups: ShotListGroup[];
  focalPoint?: { name: string; phone: string };
  sensitiveAlerts?: string;
}) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 14;

  // Header de Impacto de Prancheta
  doc.setFillColor(224, 11, 65); // #e00b41 Deep Rausch
  doc.roundedRect(15, y, pageWidth - 30, 20, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text("FICHA DE ALTAR · SHOT LIST PROTOCOLAR DO CERIMONIAL", 20, y + 7.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 235, 240);
  doc.text("Casamento Camila & Carlos · Espaço Lux (Rio das Ostras) · Meta: 35 minutos cronometrados", 20, y + 14);

  y += 25;

  // Card de Trava Operacional
  doc.setFillColor(255, 240, 242);
  doc.setDrawColor(255, 56, 92);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, pageWidth - 30, 13, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(193, 53, 21);
  doc.text("REGRA DE OURO DO ALTAR:", 18, y + 4.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(34, 34, 34);
  doc.text("1. Avós e idosos fotografam PRIMEIRO (liberação em 6 min). 2. Manter lista sequencial sem dispersar convidados.", 18, y + 9);

  y += 18;

  // Seção da Lista de Fotos
  let itemCounter = 1;

  data.shotListGroups.forEach((group) => {
    if (y > 260) {
      addFooter(doc, doc.getNumberOfPages());
      doc.addPage();
      y = 15;
    }

    // Header do Grupo
    doc.setFillColor(34, 34, 34);
    doc.rect(15, y, pageWidth - 30, 6, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(group.name.toUpperCase(), 18, y + 4.2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(200, 200, 200);
    doc.text(`Tempo est.: ${group.estimatedMinutes} min`, pageWidth - 18, y + 4.2, { align: "right" });

    y += 8;

    group.items.forEach((item) => {
      if (y > 270) {
        addFooter(doc, doc.getNumberOfPages());
        doc.addPage();
        y = 15;
      }

      // Checkbox grande para caneta de prancheta
      doc.setDrawColor(100, 100, 100);
      doc.setLineWidth(0.5);
      doc.rect(18, y - 3.2, 4, 4);

      // Número
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`#${String(itemCounter).padStart(2, "0")}`, 24, y);

      // Título
      doc.setFont("helvetica", item.isMandatory ? "bold" : "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(34, 34, 34);
      doc.text(item.title, 32, y);

      if (item.priorityBadge) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(6.5);
        doc.setTextColor(224, 11, 65);
        doc.text(`[${item.priorityBadge}]`, 135, y);
      }

      // Nomes a chamar no microfone
      if (item.names) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(60, 60, 60);
        doc.text(`Chamar: ${item.names}`, 32, y + 4.2);
        y += 8.5;
      } else {
        y += 6.5;
      }

      itemCounter++;
    });

    y += 3;
  });

  // Ponto Focal & Observações
  if (y > 250) {
    addFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    y = 15;
  }

  if (data.focalPoint?.name || data.sensitiveAlerts) {
    y += 3;
    doc.setFillColor(247, 247, 247);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(15, y, pageWidth - 30, 16, 2, 2, "FD");

    if (data.focalPoint?.name) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(34, 34, 34);
      doc.text(`Pessoa Focal p/ Ajuda no Altar: ${data.focalPoint.name} (${data.focalPoint.phone || "Sem tel"})`, 18, y + 5);
    }

    if (data.sensitiveAlerts) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7);
      doc.setTextColor(180, 40, 40);
      const alertLine = doc.splitTextToSize(`Obs Sensível: ${data.sensitiveAlerts}`, pageWidth - 40);
      doc.text(alertLine, 18, y + 10);
    }
  }

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save("Camila_e_Carlos_Ficha_Altar_Cerimonial.pdf");
}
