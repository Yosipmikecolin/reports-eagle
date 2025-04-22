// reports/bitacoraEvento.ts
import { PDFDocument, PDFFont, rgb, StandardFonts } from "pdf-lib";

export const generateBitacoraEventoPdf = async (
  data: any[],
  title: string
) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

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

    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const reportFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Fecha de evento", key: "fechaEvento" },
    { label: "Nombre alerta", key: "nombreAlerta" },
    // Agrega aquí los campos que debe tener cada evento en `data`
  ];

  // === Título principal ===
  drawTitle();

  // === Datos del evento (encabezado) ===
  /*   reportFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;

  // === Iterar sobre la lista data (bitácora de eventos) ===
  data.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateCarrier = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const carrierFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Fecha alarma", key: "fechaAlarma" },
    { label: "Nombre usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultado" },
  ];

  // === Título principal ===
  drawTitle();

  // === Datos del carrier (encabezado) ===
  /*   carrierFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;

  // === Iterar sobre la lista data ===
  data.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH2 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const carrierFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Fecha activación", key: "fechaActivacion" },
    { label: "Fecha desactivación", key: "fechaDesactivacion" },
    { label: "Motivo activación", key: "motivoActivacion" },
    { label: "Motivo desactivación", key: "motivoDesactivacion" },
    { label: "CRS", key: "crs" },
  ];

  // === Título principal ===
  drawTitle();

  // === Datos del carrier (encabezado) ===
  /*   carrierFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH4 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const carrierFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
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

  // === Título principal ===
  drawTitle();

  // === Datos del carrier (encabezado) ===
  /*   carrierFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH5 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const carrierFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre persona sujeta a control", key: "nombrePersona" },
    { label: "Nombre víctima", key: "nombreVictima" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha de incidencia", key: "fechaIncidencia" },
    { label: "Tipo de incidencia", key: "tipoIncidencia" },
    { label: "Nombre usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  // === Título principal ===
  drawTitle();

  // === Datos del carrier (encabezado) ===
  /*   carrierFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH6 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  /*   const carrierFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
  ]; */

  const dataFields = [
    { label: "Número Folio", key: "numeroFolio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  // === Título principal ===
  drawTitle();

  // === Datos del carrier (encabezado) ===
  /*   carrierFields.forEach(({ label, key }) => {
    drawField(label, carrier[key]);
  }); */

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH7 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva o medida a controlar", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH8 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "pena" },
    { label: "CRS", key: "crs" },
    { label: "Tipo de incumplimiento", key: "tipoIncumplimiento" },
    { label: "Fecha y hora de alarma", key: "fechaHoraAlarma" },
    {
      label: "Fecha de generación",
      key: "fechaHoraGeneracion",
    },
    {
      label: "Fecha de envío del incumplimiento",
      key: "fechaHoraEnvio",
    },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH9 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
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

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH10 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Región", key: "region" },
    { label: "Fecha de la alarma", key: "fechaAlarma" },
    { label: "Nombre Usuario", key: "nombreUsuario" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH11 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
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

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH12 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    { label: "Fecha Activación", key: "fechaActivacion" },
    { label: "Fecha Instalación", key: "fechaInstalacion" },
    { label: "CLM", key: "clm" },
    { label: "Técnico de la empresa", key: "tecnicoEmpresa" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH13 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    {
      label: "Fecha instalación programada",
      key: "fechaHoraInstalacion",
    },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH14 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUN", key: "run" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Comuna", key: "comuna" },
    {
      label: "Fecha desinstalación",
      key: "fechaHoraDesinstalacion",
    },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH15 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    const maxTitleWidth = pageWidth - margin * 2;
    const words = title.split(" ");
    const lines: string[] = [];
    let currentLine = "";
  
    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = font.widthOfTextAtSize(testLine, titleFontSize);
      if (testWidth <= maxTitleWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  
    if (currentLine) lines.push(currentLine);
  
    lines.forEach(line => {
      const lineWidth = font.widthOfTextAtSize(line, titleFontSize);
      const x = (pageWidth - lineWidth) / 2;
      page.drawText(line, {
        x,
        y,
        size: titleFontSize,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });
      y -= titleFontSize + 10; // espacio entre líneas
    });
  
    y -= 20; // espacio extra debajo del título
  };
  

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;

  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};


export const generateH16 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const wrapText = (
    text: string,
    maxWidth: number,
    font: PDFFont,
    fontSize: number
  ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);

      if (width > maxWidth) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const drawTitle = () => {
    const maxTitleWidth = pageWidth - margin * 2;
    const lines = wrapText(title, maxTitleWidth, font, titleFontSize);

    lines.forEach((line) => {
      const textWidth = font.widthOfTextAtSize(line, titleFontSize);
      const centeredX = (pageWidth - textWidth) / 2;

      page.drawText(line, {
        x: centeredX,
        y,
        size: titleFontSize,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });
      y -= titleFontSize + 6; // Espacio entre líneas
    });

    y -= 20;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

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

    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre", key: "nombre" },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;

  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH17 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const drawTitle = () => {
    page.drawText(title, {
      x: startX,
      y,
      size: titleFontSize,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });
    y -= 50;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    // Label background
    page.drawRectangle({
      x: startX,
      y: y - 8,
      width: labelWidth,
      height: rowHeight,
      color: rgb(0.95, 0.95, 0.95),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Value background
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
    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // Value text
    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Número Folio", key: "folio" },
    { label: "N° de dispositivo", key: "nDispositivo" },
    { label: "Nombre Víctima", key: "nombreVictima" },
    { label: "RUN VÍCTIMA", key: "runVictima" },
    {
      label: "Condeno o sujeta a control",
      key: "nombrePersonaCondena",
    },
    { label: "RUC", key: "ruc" },
    { label: "RIT", key: "rit" },
    { label: "ROL", key: "rol" },
    { label: "Tribunal", key: "tribunal" },
    { label: "Pena sustitutiva/Medida a controlar", key: "penaSustitutiva" },
    { label: "CRS", key: "crs" },
    { label: "Fecha inicio de control", key: "fechaInicio" },
    { label: "N° de días controlados", key: "diasControlados" },
    { label: "Fecha de término de control", key: "fechaTermino" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;
  console.log("data", data);
  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const generateH18 = async (data: any[], title: string) => {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;

  const titleFontSize = 24;
  const textFontSize = 12;
  const rowHeight = 30;
  const labelWidth = 200;
  const valueWidth = 300;
  const startX = margin;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const wrapText = (
    text: string,
    maxWidth: number,
    font: PDFFont,
    fontSize: number
  ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) lines.push(currentLine);
    return lines;
  };

  const drawTitle = () => {
    const maxWidth = pageWidth - 2 * margin;
    const lines = wrapText(title, maxWidth, font, titleFontSize);
    for (const line of lines) {
      page.drawText(line, {
        x: startX,
        y,
        size: titleFontSize,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });
      y -= titleFontSize + 5;
    }
    y -= 20;
  };

  const drawField = (label: string, value: string) => {
    if (y < margin + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

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

    page.drawText(label, {
      x: startX + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(value || "-", {
      x: startX + labelWidth + 5,
      y: y + 5,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
    });

    y -= rowHeight;
  };

  const dataFields = [
    { label: "Nombre operador", key: "nombreOperador" },
    { label: "Tipo de alarma", key: "tipoAlarma" },
    { label: "Fecha y hora", key: "fechaHora" },
    { label: "Resultado de la gestión", key: "resultadoGestion" },
  ];

  // === Título principal ===
  drawTitle();

  y -= 20;

  // === Iterar sobre la lista data ===
  data?.forEach((item, index) => {
    if (y < margin + rowHeight * (dataFields.length + 1)) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }

    page.drawText(`Registro ${index + 1}`, {
      x: startX,
      y,
      size: textFontSize,
      font,
      color: rgb(0.1, 0.1, 0.4),
    });

    y -= rowHeight;

    dataFields.forEach(({ label, key }) => {
      drawField(label, item[key]);
    });

    y -= 10;
  });

  // === Guardar y retornar URL ===
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
