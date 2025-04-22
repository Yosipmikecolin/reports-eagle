"use client";

import { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import Link from "next/link";
import { Link2, Trash2, Pencil } from "lucide-react";
import { saveReport } from "@/functions";
import { getRequest } from "@/api/request";

const initialForm = {
  nDispositivo: "",
  nombre: "",
  run: "",
  ruc: "",
  rit: "",
  rol: "",
  numeroFolio: "",
  tribunal: "",
  penaSustitutiva: "",
  crs: "",
  fechaInicio: "",
  diasControlados: "",
  fechaTermino: "",
};

export default function FormControlData() {
  const [formData, setFormData] = useState(initialForm);
  const [formDataList, setFormDataList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [portadores, setPortadores] = useState<
    | {
        id: string;
        nombre: string;
        folio: string;
        run: string;
        ruc: string;
        rit: string;
        rol: string;
        tribunal: string;
      }[]
  >([]);

  const getPortadores = async () => {
    try {
      setLoading(true);
      const result = await getRequest();
      const mapCarrier = result.map((item) => ({
        id: item._id,
        nombre:
          item.carrier.personalData.socialName +
          " " +
          item.carrier.personalData.paternalSurname +
          " " +
          item.carrier.personalData.motherSurname,
        folio: item.folio + "",
        run: item.carrier.personalData.run,
        ruc: item.carrier.cause.ruc,
        rit: item.carrier.cause.rit,
        rol: item.carrier.cause.rol,
        tribunal: item.carrier.cause.court,
      }));

      setPortadores(mapCarrier);
    } catch (error) {
      toast.error("No hay portadores creados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPortadores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCarrierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = portadores.find((p) => p.id === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        numeroFolio: selected.folio,
        nombre: selected.nombre,
        run: selected.run,
        ruc: selected.ruc,
        rit: selected.rit,
        rol: selected.rol,
        tribunal: selected.tribunal,
      }));
    }
  };

  const handleAddRegistro = () => {
    if (editIndex !== null) {
      const updated = [...formDataList];
      updated[editIndex] = formData;
      setFormDataList(updated);
      setEditIndex(null);
      toast.success("Registro editado");
    } else {
      setFormDataList((prev) => [...prev, formData]);
      toast.success("Registro agregado");
    }
    setFormData((prev) => ({
      ...prev,
      tribunal: "",
      pena: "",
      crs: "",
      comuna: "",
    }));
  };

  const handleEdit = (index: number) => {
    setFormData(formDataList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = formDataList.filter((_, i) => i !== index);
    setFormDataList(updated);
    toast.success("Registro eliminado");
    if (editIndex === index) {
      setEditIndex(null);
      setFormData(initialForm);
    }
  };

  const handleGenerateReport = () => {
    saveReport("Dispositivos en estado de vigencia", formDataList);
    localStorage.setItem("h6", JSON.stringify(formDataList));
    toast.success("Reporte generado");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 w-[900px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Dispositivos en estado de vigencia</CardTitle>
            <Link href="/devices-status" target="_blank">
              <Link2 />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="portador">Seleccionar portador</Label>
            <select
              id="portador"
              onChange={handleCarrierChange}
              className="w-full border rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled={loading}>
                {loading ? "Cargando..." : "Selecciona un portador"}
              </option>
              {portadores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {[
            { id: "nDispositivo", label: "N° de dispositivo" },
            { id: "nombre", label: "Nombre" },
            { id: "run", label: "RUN" },
            { id: "ruc", label: "RUC" },
            { id: "rit", label: "RIT" },
            { id: "rol", label: "ROL" },
            { id: "numeroFolio", label: "Número de folio" },
            { id: "tribunal", label: "Tribunal" },
            {
              id: "penaSustitutiva",
              label: "Pena sustitutiva o medida a controlar",
            },
            { id: "crs", label: "CRS" },
            {
              id: "fechaInicio",
              label: "Fecha inicio de control",
              type: "date",
            },
            {
              id: "diasControlados",
              label: "N° de días controlados",
              type: "number",
            },
            {
              id: "fechaTermino",
              label: "Fecha término de control",
              type: "date",
            },
          ].map(({ id, label, type = "text" }) => (
            <div className="space-y-2" key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={
                  ["fechaInicio", "fechaTermino"].includes(id)
                    ? "datetime-local"
                    : "text"
                }
                value={(formData as any)[id]}
                onChange={handleChange}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleAddRegistro} variant={"outline"}>
            {editIndex !== null ? "Guardar edición" : "Agregar registro"}
          </Button>
          <Button onClick={handleGenerateReport}>Generar Reporte</Button>
        </CardFooter>
      </Card>

      {/* Tabla o lista de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formDataList.length === 0 ? (
            <p className="text-sm text-gray-500">No hay registros.</p>
          ) : (
            formDataList.map((data, index) => (
              <div
                key={index}
                className="border rounded-md p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{data.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {data.nDispositivo}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(index)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
