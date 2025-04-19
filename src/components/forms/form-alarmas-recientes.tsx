"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { saveReport } from "@/functions";
import toast from "react-hot-toast";

export default function FormAlarmasRecientes() {
  const [formData, setFormData] = useState({
    folio: "",
    nombre: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    crs: "",
    fechaAlarma: "",
    nombreUsuario: "",
    resultadoGestion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    saveReport("Alarmas Recientes", formData);
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulario Alarmas Recientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "folio", label: "Número Folio" },
            { id: "nombre", label: "Nombre" },
            { id: "ruc", label: "RUC" },
            { id: "rit", label: "RIT" },
            { id: "rol", label: "ROL" },
            { id: "tribunal", label: "Tribunal" },
            { id: "crs", label: "CRS" },
            { id: "fechaAlarma", label: "Fecha alarma", type: "date" },
            { id: "nombreUsuario", label: "Nombre usuario" },
            { id: "resultadoGestion", label: "Resultado de la gestión" },
          ].map(({ id, label, type = "text" }) => (
            <div className="space-y-2" key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                value={(formData as any)[id]}
                onChange={handleChange}
                type={type}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateReport}>Generar Reporte</Button>
      </CardFooter>
    </Card>
  );
}
