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
import { getRequest } from "@/api/request";



export default function FormDatosJudiciales() {
  const initialForm = {
    folio: "",
    nombre: "",
    ruc: "",
    rit: "",
    rol: "",
    tribunal: "",
    nDispositivo: "",
    penaSustitutiva: "",
    crs: "",
    fechaSuspension: "",
    motivoSuspension: "",
  };

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

  const handlePortadorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = portadores.find((p) => p.id === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        folio: selected.folio,
        nombre: selected.nombre,
        tribunal:selected.tribunal,
        run: selected.run,
        ruc: selected.ruc,
        rit: selected.rit,
        rol: selected.rol,
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
    // Si estaba editando ese, limpiar
    if (editIndex === index) {
      setEditIndex(null);
      setFormData(initialForm);
    }
  };

  const handleGenerateReport = () => {
    localStorage.setItem("h9", JSON.stringify(formDataList));
    toast.success("Reporte generado");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Formulario */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Historial de Suspensión de Alarmas</CardTitle>
            <Link href="/alarm-suspension-history" target="_blank">
              <Link2 />
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="portador">Seleccionar portador</Label>
            <select
              id="portador"
              onChange={handlePortadorChange}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "folio", label: "Número Folio" },
              { id: "nombre", label: "Nombre" },
              { id: "ruc", label: "RUC" },
              { id: "rit", label: "RIT" },
              { id: "rol", label: "ROL" },
              { id: "tribunal", label: "Tribunal" },
              { id: "nDispositivo", label: "N de dipositivo" },
              { id: "crs", label: "CRS" },
              { id: "penaSustitutiva", label: "Pena sustitutiva o medida a controlar" },
              { id: "fechaSuspension", label: "Resultado de la gestión" },
              { id: "motivoSuspension", label: "Nombre de usuario" },
            ].map(({ id, label }) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  type={id === "fechaSuspension" ? "datetime-local" : "text"}
                  readOnly={[
                    "folio",
                    "nombre",
                    "run",
                    "ruc",
                    "rit",
                    "rol",
                  ].includes(id)} // <- aquí
                />
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col md:flex-row gap-4">
          <Button onClick={handleAddRegistro} variant={"outline"}>
            {editIndex !== null ? "Guardar edición" : "Agregar registro"}
          </Button>
          <Button
            onClick={handleGenerateReport}
            disabled={!formDataList.length}
          >
            Generar Reporte
          </Button>
        </CardFooter>
      </Card>

      {/* Lista de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros agregados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formDataList.length === 0 ? (
            <p className="text-sm text-gray-500">No hay registros aún.</p>
          ) : (
            formDataList.map((data, index) => (
              <div
                key={index}
                className="border rounded p-3 space-y-1 relative group"
              >
                <p className="font-semibold">{data.nombre}</p>
                <p className="text-sm text-gray-600">
                  Folio: {data.folio} | RUN: {data.run}
                </p>
                <div className="flex gap-2 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
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
