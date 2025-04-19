"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormAlarmasDiarias from "@/components/forms/form-alarmas-diarias";
import FormBitacoraEvento from "@/components/forms/form-bitacora-evento";
import FormActivacionDesactivacion from "@/components/forms/form-activacion-desactivacion";
import FormAlarmasRecientes from "@/components/forms/form-alarmas-recientes";
import FormDetalleIncidencias from "@/components/forms/form-detalle-incidencias";
import FormDispositivosVigencia from "@/components/forms/form-dispositivos-vigencia";
import FormHistorialMonitoreo from "@/components/forms/form-historial-monitoreo";
import FormIncumplimientos from "@/components/forms/form-incumplimientos";
import FormHistorialSuspension from "@/components/forms/form-historial-suspension";
import FormAlarmasRelevantes from "@/components/forms/form-alarmas-relevantes";
import FormDesinstalacionesRealizadas from "@/components/forms/form-desinstalaciones-realizadas";
import FormInstalacionesRealizadas from "@/components/forms/form-instalaciones-realizadas";
import FormProximasInstalaciones from "@/components/forms/form-proximas-instalaciones";
import FormProximasDesinstalaciones from "@/components/forms/form-proximas-desinstalaciones";
import FormPersonasAlarma from "@/components/forms/form-personas-alarma";
import FormPersonasDispositivo from "@/components/forms/form-personas-dispositivo";
import FormVictimasVigencia from "@/components/forms/form-victimas-vigencia";
import FormOperadoresAlarmas from "@/components/forms/form-operadores-alarmas";
import FormProtocolosAlarma from "@/components/forms/form-protocolos-alarma";

export default function Home() {
  const [selectedForm, setSelectedForm] = useState("H3");

  const formOptions = [
    { value: "H1", label: "Bitácora de evento" },
    { value: "H2", label: "Activación y desactivación" },
    { value: "H3", label: "Alarmas diarias" },
    { value: "H4", label: "Alarmas recientes" },
    { value: "H5", label: "Detalle de incidencias de víctimas" },
    { value: "H6", label: "Dispositivos en estado de vigencia" },
    { value: "H7", label: "Historial de monitoreo" },
    { value: "H8", label: "Incumplimientos" },
    { value: "H9", label: "Historial de suspensión de alarmas" },
    { value: "H10", label: "Alarmas Relevantes del periodo" },
    { value: "H11", label: "Desisntalaciones realizadas" },
    { value: "H12", label: "Instalaciones realizadas" },
    { value: "H13", label: "Próximas Instalaciones" },
    { value: "H14", label: "Próximas desinstalaciones" },
    {
      value: "H15",
      label:
        "Personas condenadas y personas sujetas a control que registraron alarma",
    },
    {
      value: "H16",
      label:
        "Personas condenadas, personas sujetas a control con dispositivo y alarmas activas en el sistema",
    },
    { value: "H17", label: "Víctimas en estado de vigencia en el sistema" },
    {
      value: "H18",
      label: "Operadores y alarmas trabajadas dentro de un periodo determinado",
    },
    /*     { value: "H20", label: "Protocolos asignados por tipo de alarma" }, */
  ];

  const renderForm = () => {
    switch (selectedForm) {
      case "H1":
        return <FormBitacoraEvento />;
      case "H2":
        return <FormActivacionDesactivacion />;
    /*   case "H3":
        return <FormAlarmasDiarias />; */
      case "H4":
        return <FormAlarmasRecientes />;
      case "H5":
        return <FormDetalleIncidencias />;
      case "H6":
        return <FormDispositivosVigencia />;
      case "H7":
        return <FormHistorialMonitoreo />;
      case "H8":
        return <FormIncumplimientos />;
      case "H9":
        return <FormHistorialSuspension />;
      case "H10":
        return <FormAlarmasRelevantes />;
      case "H11":
        return <FormDesinstalacionesRealizadas />;
      case "H12":
        return <FormInstalacionesRealizadas />;
      case "H13":
        return <FormProximasInstalaciones />;
      case "H14":
        return <FormProximasDesinstalaciones />;
      case "H15":
        return <FormPersonasAlarma />;
      case "H16":
        return <FormPersonasDispositivo />;
      case "H17":
        return <FormVictimasVigencia />;
      case "H18":
        return <FormOperadoresAlarmas />;
      /*    case "H20":
        return <FormProtocolosAlarma />; */
      default:
        return <FormAlarmasDiarias />;
    }
  };

  return (
    <main className="mx-auto py-8 px-4 w-full h-screen flex justify-center items-center">
      <Card className="w-[600px] max-h-[800px] overflow-auto">
        <CardHeader>
          <CardTitle>Sistema de Reportes</CardTitle>
          <div className="mt-4">
            <Select
              value={selectedForm}
              onValueChange={setSelectedForm}
              defaultValue="H3"
            >
              <SelectTrigger className="w-full md:w-[400px]">
                <SelectValue placeholder="Seleccione un formulario" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>{renderForm()}</CardContent>
      </Card>
      <Toaster />
    </main>
  );
}
