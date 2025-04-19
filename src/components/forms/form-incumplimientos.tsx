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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveReport } from "@/functions";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormIncumplimientos() {
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
    tipoIncumplimiento: "",
    fechaHoraAlarma: "",
    fechaHoraGeneracion: "",
    fechaHoraEnvio: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleGenerateReport = () => {
    saveReport("Incumplimientos", formData);
    localStorage.setItem("h8", JSON.stringify(formData));
    toast.success("Reporte generado");
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Incumplimientos</CardTitle>
          <Link href="/breach" target="_blank">
            <Link2 />
          </Link>
        </div>
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
          <Label htmlFor="tipoIncumplimiento">Tipo de incumplimiento</Label>
          <Input
            id="tipoIncumplimiento"
            value={formData.tipoIncumplimiento}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHoraAlarma">Fecha y hora de alarma</Label>
          <Input
            id="fechaHoraAlarma"
            type="datetime-local"
            value={formData.fechaHoraAlarma}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHoraGeneracion">
            Fecha y hora generación de incumplimiento
          </Label>
          <Input
            id="fechaHoraGeneracion"
            type="datetime-local"
            value={formData.fechaHoraGeneracion}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHoraEnvio">
            Fecha y hora del envío del incumplimiento
          </Label>
          <Input
            id="fechaHoraEnvio"
            type="datetime-local"
            value={formData.fechaHoraEnvio}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateReport} className="cursor-pointer">Generar Reporte</Button>
      </CardFooter>
    </Card>
  );
}
