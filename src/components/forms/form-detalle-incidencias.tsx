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
import { Link2, Trash2, Pencil, RefreshCcw } from "lucide-react";
import { getRequest } from "@/api/request";

export default function FormDetalleIncidencias() {
  const initialForm = {
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
  };

  const [formData, setFormData] = useState(initialForm);
  const [formDataList, setFormDataList] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
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
  }, [reload]);

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
        nombrePersona: selected.nombre,
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
    localStorage.setItem("h5", JSON.stringify(formDataList));
    toast.success("Reporte generado");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Formulario */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detalle de Incidencias de Víctimas</CardTitle>
            <Link href="/incident-details" target="_blank">
              <Link2 />
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-5">
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
            <Button onClick={() => setReload((prev) => !prev)}>
              <RefreshCcw />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "folio", label: "Número Folio" },
              { id: "nombrePersona", label: "Nombre persona sujeta a control" },
              { id: "ruc", label: "RUC" },
              { id: "rit", label: "RIT" },
              { id: "rol", label: "ROL" },
              { id: "nombreVictima", label: "Nombre víctima" },
              { id: "tribunal", label: "Tribunal" },
              {
                id: "penaSustitutiva",
                label: "Pena sustitutiva o medida a controlar",
              },
              { id: "crs", label: "CRS" },
              {
                id: "fechaIncidencia",
                label: "Fecha de incidencia",
                type: "date",
              },
              { id: "tipoIncidencia", label: "Tipo de incidencia" },
              { id: "nombreUsuario", label: "Nombre usuario" },
              { id: "resultadoGestion", label: "Resultado de la gestión" },
            ].map(({ id, label, type }) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={
                    ["fechaIncidencia"].includes(id) ? "datetime-local" : "text"
                  }
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  readOnly={[
                    "folio",
                    "nombrePersona",
                    "ruc",
                    "rit",
                    "rol",
                  ].includes(id)}
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
                <p className="font-semibold">{data.nombrePersona}</p>
                <p className="text-sm text-gray-600">
                  Folio: {data.folio} | RUC: {data.ruc}
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
