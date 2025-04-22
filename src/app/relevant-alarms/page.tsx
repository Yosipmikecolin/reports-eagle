"use client";

import { useEffect, useState } from "react";
import { exportToExcel } from "@/reports"; // asegúrate de que exportToExcel está bien exportada

export default function Page() {
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [noReportFound, setNoReportFound] = useState(false);

  useEffect(() => {
    const reportString = localStorage.getItem("h10");

    if (reportString) {
      try {
        const report = JSON.parse(reportString);
        generateExcel(report); // Cambiado de generatePDF a generateExcel
      } catch (error) {
        console.error("Error al parsear el reporte:", error);
        setNoReportFound(true);
      }
    } else {
      setNoReportFound(true);
    }
  }, []);

  const generateExcel = (report: any) => {
    try {
      exportToExcel(report, "alarmas_relevantes_periodo");
      setReportDownloaded(true);
    } catch (error) {
      console.error("Error generando el Excel:", error);
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
          📊 Reporte descargado exitosamente.
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
