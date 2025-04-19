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

export default function FormDetalleIncidencias() {

  // Estado único para todos los campos
  const [formData, setFormData] = useState({
    folio: "",
    nombrePersona: "",
    nombreVictima: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    penaSustitutiva: "",
    crs: "",
    fechaIncidencia: "",
    tipoIncidencia: "",
    nombreUsuario: "",
    resultadoGestion: "",
  });

  // Función para manejar el cambio de cada campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenerateReport = () => {
    saveReport("Detalle de Incidencias de Víctimas", formData);
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalle de Incidencias de Víctimas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Número Folio</Label>
            <Input
              name="folio"
              placeholder="Ej: 123456"
              value={formData.folio}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nombre persona sujeta a control</Label>
            <Input
              name="nombrePersona"
              placeholder="Nombre completo"
              value={formData.nombrePersona}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nombre víctima</Label>
            <Input
              name="nombreVictima"
              placeholder="Nombre completo"
              value={formData.nombreVictima}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>RUC</Label>
            <Input
              name="ruc"
              placeholder="Código RUC"
              value={formData.ruc}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>RIT</Label>
            <Input
              name="rit"
              placeholder="Código RIT"
              value={formData.rit}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>ROL</Label>
            <Input
              name="rol"
              placeholder="Número ROL"
              value={formData.rol}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tribunal</Label>
            <Input
              name="tribunal"
              placeholder="Nombre del tribunal"
              value={formData.tribunal}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Pena sustitutiva o medida a controlar</Label>
            <Input
              name="penaSustitutiva"
              placeholder="Descripción de la pena o medida"
              value={formData.penaSustitutiva}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>CRS</Label>
            <Input
              name="crs"
              placeholder="Centro de Reinserción Social"
              value={formData.crs}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Fecha de incidencia</Label>
            <Input
              name="fechaIncidencia"
              type="date"
              value={formData.fechaIncidencia}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Tipo de incidencia</Label>
            <Input
              name="tipoIncidencia"
              placeholder="Ej: Agresión, Amenaza"
              value={formData.tipoIncidencia}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Nombre usuario</Label>
            <Input
              name="nombreUsuario"
              placeholder="Usuario responsable"
              value={formData.nombreUsuario}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Resultado de la gestión</Label>
            <Input
              name="resultadoGestion"
              placeholder="Resultado de la gestión realizada"
              value={formData.resultadoGestion}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateReport}>Generar Reporte</Button>
      </CardFooter>
    </Card>
  );
}
