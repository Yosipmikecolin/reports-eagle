// reports/bitacoraEvento.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const generateBitacoraEventoPdf = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  const title = "Bitácora de evento";
  const maxTitleWidth = 495;

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  if (titleWidth > maxTitleWidth) {
    const splitIndex = Math.floor(title.length / 2);
    const firstLine = truncateText(
      title.slice(0, splitIndex),
      maxTitleWidth,
      titleFontSize
    );
    const secondLine = truncateText(
      title.slice(splitIndex),
      maxTitleWidth,
      titleFontSize
    );

    page.drawText(firstLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 30;

    page.drawText(secondLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 20;
  } else {
    page.drawText(title, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 50;
  }

  const headers = [
    "Número Folio",
    "Nombre",
    "RUC",
    "RIT",
    "ROL",
    "Fecha de evento",
    "Nombre alerta",
  ];

  const values = [
    data.folio || "-",
    data.nombre || "-",
    data.ruc || "-",
    data.rit || "-",
    data.rol || "-",
    data.fechaEvento || "-",
    data.nombreAlerta || "-",
  ];

  const startX = 50;
  const colWidths = [200, 300];
  const rowHeight = 30;

  // Dibujar filas de datos
  for (let i = 0; i < headers.length; i++) {
    const rowY = y - i * rowHeight;

    // Columna: Campo
    page.drawRectangle({
      x: startX,
      y: rowY,
      width: colWidths[0],
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    const truncatedLabel = truncateText(
      headers[i],
      colWidths[0] - 10,
      textFontSize
    );
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: rowY + 8,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Columna: Valor
    page.drawRectangle({
      x: startX + colWidths[0],
      y: rowY,
      width: colWidths[1],
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    const truncatedValue = truncateText(
      values[i],
      colWidths[1] - 10,
      textFontSize
    );
    page.drawText(truncatedValue, {
      x: startX + colWidths[0] + 5,
      y: rowY + 8,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateCarrier = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4
  const { height, width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Alarmas diarias", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
  ];

  fields.forEach(({ label, key }) => {
    const value = data[key] || "-";

    // Dibujar fondo tipo celda
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Texto etiqueta
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Texto valor
    page.drawText(value, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH2 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Activación / Desactivación de Medida", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Fecha activación", key: "fechaActivacion" },
    { label: "Fecha desactivación", key: "fechaDesactivacion" },
    { label: "Motivo activación", key: "motivoActivacion" },
    { label: "Motivo desactivación", key: "motivoDesactivacion" },
  ];

  fields.forEach(({ label, key }) => {
    const value = data[key] || "-";

    // Celda de etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Celda de valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Texto etiqueta
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Texto valor
    page.drawText(value, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH4 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Alarmas Recientes", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "CRS", key: "crs" },
    { label: "Fecha alarma", key: "fechaAlarma" },
    { label: "Nombre usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  fields.forEach(({ label, key }) => {
    const value = data[key] || "-";

    // Celda de etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Celda de valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Texto etiqueta
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Texto valor
    page.drawText(value, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH5 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Detalle de Incidencias de Víctimas", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre persona sujeta a control", key: "nombrePersona" },
    { label: "Nombre víctima", key: "nombreVictima" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha de incidencia", key: "fechaIncidencia" },
    { label: "Tipo de incidencia", key: "tipoIncidencia" },
    { label: "Nombre usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  fields.forEach(({ label, key }) => {
    const value = data[key] || "-";

    // Celda de etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Celda de valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Texto etiqueta
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Texto valor
    page.drawText(value, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH6 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Control por Dispositivo", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días efectivamente controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Draw label cell
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Draw value cell
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Label text
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH7 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Historial de monitoreo", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días efectivamente controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH8 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Incumplimientos", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Tipo de incumplimiento", key: "tipoIncumplimiento" },
    { label: "Fecha y hora de alarma", key: "fechaHoraAlarma" },
    {
      label: "Fecha y hora generación de incumplimiento",
      key: "fechaHoraGeneracion",
    },
    {
      label:
        "Fecha y hora del envío del incumplimiento registrado en el sistema",
      key: "fechaHoraEnvio",
    },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH9 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Historial de Suspensión de Alarmas", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha de suspensión de la alarma", key: "fechaSuspension" },
    { label: "Motivo de la suspensión de la alarma", key: "motivoSuspension" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH10 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Alarmas Relevantes del Periodo", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Región", key: "region" },
    { label: "Fecha de la alarma", key: "fechaAlarma" },
    { label: "Nombre Usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH11 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Desinstalaciones Realizadas", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    { label: "Fecha de desactivación", key: "fechaDesactivacion" },
    { label: "Fecha de desinstalación", key: "fechaDesinstalacion" },
    { label: "Motivo de desinstalación", key: "motivoDesinstalacion" },
    { label: "CLM", key: "clm" },
    { label: "Técnico de la empresa", key: "tecnicoEmpresa" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Celdas
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Textos
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH12 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Instalaciones Realizadas", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    { label: "Fecha Activación", key: "fechaActivacion" },
    { label: "Fecha Instalación", key: "fechaInstalacion" },
    { label: "CLM", key: "clm" },
    { label: "Técnico de la empresa", key: "tecnicoEmpresa" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Celdas
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Textos
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH13 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Próximas Instalaciones", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    {
      label: "Fecha y hora instalación programada",
      key: "fechaHoraInstalacion",
    },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Celdas
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Textos
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH14 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  page.drawText("Próximas Desinstalaciones", {
    x: 50,
    y,
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  y -= 50;

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    {
      label: "Fecha y hora desinstalación programada",
      key: "fechaHoraDesinstalacion",
    },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Celdas
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Textos
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH15 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  // Título
  const drawTitle = (text: string, fontSize: number) => {
    const maxWidth = 500;
    let size = fontSize;

    while (font.widthOfTextAtSize(text, size) > maxWidth && size > 10) {
      size -= 1;
    }

    if (font.widthOfTextAtSize(text, size) <= maxWidth) {
      page.drawText(text, {
        x: 50,
        y,
        size,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });
      return y - 50;
    } else {
      const midpoint = Math.floor(text.length / 2);
      const breakIndex =
        text.indexOf(" ", midpoint) !== -1
          ? text.indexOf(" ", midpoint)
          : midpoint;
      const line1 = text.slice(0, breakIndex).trim();
      const line2 = text.slice(breakIndex).trim();

      page.drawText(line1, {
        x: 50,
        y,
        size: size,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });
      page.drawText(line2, {
        x: 50,
        y: y - 25,
        size: size,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });

      return y - 65;
    }
  };

  y = drawTitle(
    "Personas Condenadas y Personas Sujetas a Control que Registraron Alarma",
    titleFontSize
  );

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Cuadro del label
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Cuadro del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Texto del label
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH16 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  const title =
    "Personas Condenadas, Personas Sujetas a Control con Dispositivo y Alarmas Activas";
  const maxTitleWidth = 495;

  const truncateTitle = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  if (titleWidth > maxTitleWidth) {
    const splitIndex = Math.floor(title.length / 2);
    const firstLine = truncateTitle(
      title.slice(0, splitIndex),
      maxTitleWidth,
      titleFontSize
    );
    const secondLine = truncateTitle(
      title.slice(splitIndex),
      maxTitleWidth,
      titleFontSize
    );

    page.drawText(firstLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 30;

    page.drawText(secondLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 20;
  } else {
    page.drawText(title, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 50;
  }

  // Espacio adicional entre el título y la tabla
  y -= 20; // Ajusta este valor si necesitas más o menos espacio

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH17 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  const title = "Víctimas en Estado de Vigencia en el Sistema";
  const maxTitleWidth = 495;

  const truncateTitle = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  if (titleWidth > maxTitleWidth) {
    const splitIndex = Math.floor(title.length / 2);
    const firstLine = truncateTitle(
      title.slice(0, splitIndex),
      maxTitleWidth,
      titleFontSize
    );
    const secondLine = truncateTitle(
      title.slice(splitIndex),
      maxTitleWidth,
      titleFontSize
    );

    page.drawText(firstLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 30;

    page.drawText(secondLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 20;
  } else {
    page.drawText(title, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 50;
  }

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre Víctima", key: "nombreVictima" },
    { label: "RUN VÍCTIMA", key: "runVictima" },
    {
      label: "Nombre persona condena / persona sujeta a control",
      key: "nombrePersonaCondena",
    },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días efectivamente controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Draw label cell
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Draw value cell
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Label text
    const truncatedLabel = truncateText(label, labelWidth - 10, textFontSize);
    page.drawText(truncatedLabel, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    const truncatedValue = truncateText(value, valueWidth - 10, textFontSize);
    page.drawText(truncatedValue, {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH18 = async (data: any) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleFontSize = 24;
  const textFontSize = 12;
  let y = height - 80;

  const title =
    "Operadores y Alarmas Trabajadas dentro de un Periodo Determinado";
  const maxTitleWidth = 495;

  const truncateTitle = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  const titleWidth = font.widthOfTextAtSize(title, titleFontSize);
  if (titleWidth > maxTitleWidth) {
    const splitIndex = Math.floor(title.length / 2);
    const firstLine = truncateTitle(
      title.slice(0, splitIndex),
      maxTitleWidth,
      titleFontSize
    );
    const secondLine = truncateTitle(
      title.slice(splitIndex),
      maxTitleWidth,
      titleFontSize
    );

    page.drawText(firstLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 30;

    page.drawText(secondLine, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 20;
  } else {
    page.drawText(title, {
      x: 50,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 50;
  }

  // Espacio adicional entre el título y la tabla
  y -= 20; // Ajusta el valor si necesitas más espacio

  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = 50;
  const margin = 5; // Márgenes dentro de las celdas para evitar que el texto quede pegado

  const fields: { label: string; key: keyof typeof data }[] = [
    { label: "Nombre operador", key: "nombreOperador" },
    { label: "Tipo de alarma", key: "tipoAlarma" },
    { label: "Fecha y hora", key: "fechaHora" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  const truncateText = (text: string, maxWidth: number, size: number) => {
    let truncated = text;
    while (font.widthOfTextAtSize(truncated, size) > maxWidth) {
      if (truncated.length <= 1) return "...";
      truncated = truncated.slice(0, -1);
    }
    return truncated !== text ? truncated + "..." : truncated;
  };

  fields.forEach(({ label, key }) => {
    const rawValue = data[key] || "-";
    const value = String(rawValue);

    // Dibuja la celda de la etiqueta
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja la celda del valor
    page.drawRectangle({
      x: startX + labelWidth,
      y: y - 8,
      width: valueWidth,
      height: rowHeight,
      color: rgb(1, 1, 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Dibuja el texto de la etiqueta
    const truncatedLabel = truncateText(
      label,
      labelWidth - 2 * margin,
      textFontSize
    );
    page.drawText(truncatedLabel, {
      x: startX + margin,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Dibuja el texto del valor
    const truncatedValue = truncateText(
      value,
      valueWidth - 2 * margin,
      textFontSize
    );
    page.drawText(truncatedValue, {
      x: startX + labelWidth + margin,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateEmpty = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const title = "No se ha generado un reporte aún";
  const titleFontSize = 30;
  const textWidth = font.widthOfTextAtSize(title, titleFontSize);

  page.drawText(title, {
    x: (595 - textWidth) / 2, // centrado horizontal
    y: height / 2, // centrado vertical
    size: titleFontSize,
    font,
    color: rgb(0.2, 0.2, 0.6),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};
