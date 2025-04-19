"use client";

import { useEffect, useState } from "react";
import { generateEmpty, generateH18 } from "@/reports";

export default function Page() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const reportString = localStorage.getItem("h18");
    if (reportString) {
      const report = JSON.parse(reportString);
      generatePDF(report);
    } else {
      generateNoFound();
    }
  }, []);

  const generatePDF = async (data: any) => {
    const url = await generateH18(data);
    setPdfUrl(url);
  };

  const generateNoFound = async () => {
    const url = await generateEmpty();
    setPdfUrl(url);
  };

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
