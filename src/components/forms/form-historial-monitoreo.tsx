"use client";

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
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormControlData() {
  const [formData, setFormData] = useState({
    numeroFolio: "",
    nDispositivo: "",
    nombre: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    penaSustitutiva: "",
    crs: "",
    fechaInicio: "",
    diasControlados: "",
    fechaTermino: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    saveReport("Historial de monitoreo", formData);
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de monitoreo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="numeroFolio">Número Folio</Label>
          <Input
            id="numeroFolio"
            value={formData.numeroFolio}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nDispositivo">N de dispositivo</Label>
          <Input
            id="nDispositivo"
            value={formData.nDispositivo}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ruc">RUC</Label>
          <Input id="ruc" value={formData.ruc} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rit">RIT</Label>
          <Input id="rit" value={formData.rit} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rol">ROL</Label>
          <Input id="rol" value={formData.rol} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tribunal">Tribunal</Label>
          <Input
            id="tribunal"
            value={formData.tribunal}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="penaSustitutiva">
            Pena sustitutiva o medida a controlar
          </Label>
          <Input
            id="penaSustitutiva"
            value={formData.penaSustitutiva}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="crs">CRS</Label>
          <Input id="crs" value={formData.crs} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaInicio">Fecha inicio de control</Label>
          <Input
            id="fechaInicio"
            type="date"
            value={formData.fechaInicio}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="diasControlados">
            N de días efectivamente controlados
          </Label>
          <Input
            id="diasControlados"
            type="number"
            value={formData.diasControlados}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaTermino">Fecha de término de control</Label>
          <Input
            id="fechaTermino"
            type="date"
            value={formData.fechaTermino}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateReport}>Generar Reporte</Button>
      </CardFooter>
    </Card>
  );
}
