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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveReport } from "@/functions";
import toast from "react-hot-toast";
import Link from "next/link";
import { Link2 } from "lucide-react";

export default function FormActivacionDesactivacion() {
  const [formData, setFormData] = useState({
    folio: "",
    nombre: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    pena: "",
    crs: "",
    fechaActivacion: "",
    fechaDesactivacion: "",
    motivoActivacion: "",
    motivoDesactivacion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    saveReport("Activación y Desactivación", formData);
    localStorage.setItem("h2", JSON.stringify(formData));
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Activación y Desactivación</CardTitle>
          <Link href="/activation-deactivation" target="_blank">
            <Link2 />
          </Link>
        </div>
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
            { id: "pena", label: "Pena sustitutiva o medida a controlar" },
            { id: "crs", label: "CRS" },
            { id: "fechaActivacion", label: "Fecha activación", type: "date" },
            {
              id: "fechaDesactivacion",
              label: "Fecha desactivación",
              type: "date",
            },
            { id: "motivoActivacion", label: "Motivo activación" },
            { id: "motivoDesactivacion", label: "Motivo desactivación" },
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
        <Button onClick={handleGenerateReport} className="cursor-pointer">Generar Reporte</Button>
      </CardFooter>
    </Card>
  );
}
