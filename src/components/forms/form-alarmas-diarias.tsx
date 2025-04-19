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

export default function FormDatosJudiciales() {
  const [formData, setFormData] = useState({
    folio: "",
    nombre: "",
    run: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    pena: "",
    crs: "",
    comuna: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    saveReport("Alarmas diarias", formData);
    localStorage.setItem("h0", JSON.stringify(formData));
    toast.success("Reporte generado");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Alarmas diarias</CardTitle>
          <Link href="/daily-alarms" target="_blank">
            <Link2 />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "folio", label: "Número Folio" },
            { id: "nombre", label: "Nombre" },
            { id: "run", label: "RUN" },
            { id: "ruc", label: "RUC" },
            { id: "rit", label: "RIT" },
            { id: "rol", label: "ROL" },
            { id: "tribunal", label: "Tribunal" },
            { id: "pena", label: "Pena sustitutiva o medida a controlar" },
            { id: "crs", label: "CRS" },
            { id: "comuna", label: "Comuna" },
          ].map(({ id, label }) => (
            <div className="space-y-2" key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                value={(formData as any)[id]}
                onChange={handleChange}
                type={"text"}
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
