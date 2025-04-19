"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function FormProtocolosAlarma() {
  const [loading, setLoading] = useState(false)

  const handleGenerateReport = () => {
    setLoading(true)
    // Simulación de generación de reporte
    setTimeout(() => {
      setLoading(false)
      alert("Reporte de Protocolos Asignados por Tipo de Alarma generado con éxito")
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protocolos Asignados por Tipo de Alarma</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fecha-corte">Fecha de corte</Label>
          <Input id="fecha-corte" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo-alarma">Tipo de alarma</Label>
          <Select defaultValue="todas">
            <SelectTrigger id="tipo-alarma">
              <SelectValue placeholder="Seleccione tipo de alarma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas</SelectItem>
              <SelectItem value="zona-exclusion">Zona de exclusión</SelectItem>
              <SelectItem value="zona-inclusion">Zona de inclusión</SelectItem>
              <SelectItem value="bateria-baja">Batería baja</SelectItem>
              <SelectItem value="manipulacion">Manipulación</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nivel-prioridad">Nivel de prioridad</Label>
          <Select defaultValue="todos">
            <SelectTrigger id="nivel-prioridad">
              <SelectValue placeholder="Seleccione nivel de prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="baja">Baja</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="critica">Crítica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado">Estado del protocolo</Label>
          <Select defaultValue="todos">
            <SelectTrigger id="estado">
              <SelectValue placeholder="Seleccione estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="inactivo">Inactivo</SelectItem>
              <SelectItem value="revision">En revisión</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Opciones adicionales</Label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="incluir-pasos" />
              <Label htmlFor="incluir-pasos">Incluir pasos detallados</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="incluir-responsables" />
              <Label htmlFor="incluir-responsables">Incluir responsables</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="incluir-tiempos" />
              <Label htmlFor="incluir-tiempos">Incluir tiempos estimados</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="formato">Formato del reporte</Label>
          <Select defaultValue="detallado">
            <SelectTrigger id="formato">
              <SelectValue placeholder="Seleccione formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detallado">Detallado</SelectItem>
              <SelectItem value="resumido">Resumido</SelectItem>
              <SelectItem value="grafico">Gráfico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateReport} className="cursor-pointer">
          {loading ? "Generando..." : "Generar Reporte"}
        </Button>
      </CardFooter>
    </Card>
  )
}
