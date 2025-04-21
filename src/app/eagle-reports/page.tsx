"use client";

import { useEffect, useState } from "react";
import {
  generateBitacoraEventoPdf,
  generateCarrier,
  generateEmpty,
  generateH10,
  generateH11,
  generateH12,
  generateH13,
  generateH14,
  generateH15,
  generateH16,
  generateH17,
  generateH18,
  generateH2,
  generateH4,
  generateH5,
  generateH6,
  generateH7,
  generateH8,
  generateH9,
} from "@/reports";

export default function PdfViewerPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [data, setData] = useState<any>(null);

  /*   useEffect(() => {
    const reportString = localStorage.getItem("report-eagle");
    if (reportString) {
      const report = JSON.parse(reportString);
      setType(report.type);
      setData(report.body);
    }
  }, []); */

  /*   useEffect(() => {
    const generate = async () => {
      if (!type || !data) {
        const url = await generateEmpty();
        setPdfUrl(url);
      } else {
        switch (type) {
          case "Bitácora de Evento":
            const url1 = await generateBitacoraEventoPdf(data);
            setPdfUrl(url1);
            break;

          case "Alarmas diarias":
            const url2 = await generateCarrier(data);
            setPdfUrl(url2);
            break;

          case "Activación y Desactivación":
            const url3 = await generateH2(data);
            setPdfUrl(url3);
            break;

          case "Alarmas Recientes":
            const url4 = await generateH4(data);
            setPdfUrl(url4);
            break;

          case "Detalle de Incidencias de Víctimas":
            const url5 = await generateH5(data);
            setPdfUrl(url5);
            break;

          case "Dispositivos en estado de vigencia":
            const url6 = await generateH6(data);
            setPdfUrl(url6);
            break;

          case "Historial de monitoreo":
            const url7 = await generateH7(data);
            setPdfUrl(url7);
            break;

          case "Incumplimientos":
            const url8 = await generateH8(data);
            setPdfUrl(url8);
            break;

          case "Historial de Suspensión de Alarmas":
            const url9 = await generateH9(data);
            setPdfUrl(url9);
            break;

          case "Alarmas Relevantes del Periodo":
            const url10 = await generateH10(data);
            setPdfUrl(url10);
            break;

          case "Desinstalaciones Realizadas":
            const url11 = await generateH11(data);
            setPdfUrl(url11);
            break;

          case "Instalaciones Realizadas":
            const url12 = await generateH12(data);
            setPdfUrl(url12);
            break;

          case "Próximas Instalaciones":
            const url13 = await generateH13(data);
            setPdfUrl(url13);
            break;

          case "Próximas Desinstalaciones":
            const url14 = await generateH14(data);
            setPdfUrl(url14);
            break;

          case "Personas Condenadas y Personas Sujetas a Control que Registraron Alarma":
            const url15 = await generateH15(data);
            setPdfUrl(url15);
            break;

          case "Personas Condenadas, Personas Sujetas a Control con Dispositivo y Alarmas Activas":
            const url16 = await generateH16(data);
            setPdfUrl(url16);
            break;

          case "Víctimas en Estado de Vigencia en el Sistema":
            const url17 = await generateH17(data);
            setPdfUrl(url17);
            break;

          case "Operadores y Alarmas Trabajadas dentro de un Periodo Determinado":
            const url18 = await generateH18(data);
            setPdfUrl(url18);
            break;

          default:
            const url = await generateEmpty();
            setPdfUrl(url);
            break;
        }
      }
    };

    generate();
  }, [type, data]);
 */
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: 20,
            backgroundColor: "white",
            height: "100vh",
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
