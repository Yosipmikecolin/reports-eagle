"use client";

import { useEffect, useState } from "react";
import { generateBitacoraEventoPdf, generateEmpty } from "@/reports";

export default function Page() {
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [noReportFound, setNoReportFound] = useState(false);

  useEffect(() => {
    const reportString = localStorage.getItem("h1");

    if (reportString) {
      try {
        const report = JSON.parse(reportString);
        generatePDF(report);
      } catch (error) {
        console.error("Error al parsear el reporte:", error);
        setNoReportFound(true);
      }
    } else {
      setNoReportFound(true);
    }
  }, []);

  const downloadPDF = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = async (report: any) => {
    try {
      const url = await generateBitacoraEventoPdf(
        report.carrier,
        report.data,
        "Bitácora de evento"
      );

      const fileName = `Bitácora_evento_${report.carrier?.folio || "N/A"}.pdf`;

      if (url) {
        downloadPDF(url, fileName);
        setReportDownloaded(true);
      } else {
        setNoReportFound(true);
      }
    } catch (error) {
      console.error("Error generando el PDF:", error);
      setNoReportFound(true);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "white" }}>
      {reportDownloaded ? (
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          📄 Reporte descargado exitosamente.
        </p>
      ) : noReportFound ? (
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#999",
          }}
        >
          🚫 No se encontró ningún reporte disponible.
        </p>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Generando Reporte...
        </p>
      )}
    </div>
  );
}
