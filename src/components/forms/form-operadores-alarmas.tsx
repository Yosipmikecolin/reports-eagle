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

export default function FormOperadoresAlarmas() {
  const [formData, setFormData] = useState({
    nombreOperador: "",
    tipoAlarma: "",
    fechaHora: "",
    resultadoGestion: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    saveReport(
      "Operadores y Alarmas Trabajadas dentro de un Periodo Determinado",
      formData
    );
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Operadores y Alarmas Trabajadas dentro de un Periodo Determinado
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="nombreOperador">Nombre operador</Label>
          <Input
            id="nombreOperador"
            value={formData.nombreOperador}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoAlarma">Tipo de alarma</Label>
          <Input
            id="tipoAlarma"
            value={formData.tipoAlarma}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaHora">Fecha y hora</Label>
          <Input
            id="fechaHora"
            type="datetime-local"
            value={formData.fechaHora}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resultadoGestion">Resultado de la gestión</Label>
          <Input
            id="resultadoGestion"
            value={formData.resultadoGestion}
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
