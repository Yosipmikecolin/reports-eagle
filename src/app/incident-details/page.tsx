"use client";

import { useEffect, useState } from "react";
import {  generateH5 } from "@/reports";

export default function Page() {
  const [noReportFound, setNoReportFound] = useState(false);
  const [reportDownloaded, setReportDownloaded] = useState(false);

  useEffect(() => {
    const reportString = localStorage.getItem("h5");

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
    link.click();
  };

  const generatePDF = async (data: any[]) => {
    try {
      const url = await generateH5(data, "Detalle de incidencias de víctimas");
      if (url) {
        const fileName = `incidenciasVíctima.pdf`;
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
