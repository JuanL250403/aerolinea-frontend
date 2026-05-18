"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { peticionesAuth } from "../../../../../../api"
import Cargando from "@/app/components/cargando"

export default function DetalleAerolinea() {
    const [aerolinea, setAerolinea] = useState()
    const [cargando, setCargando] = useState(true)
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        cargarDatos()
    }, [])

    const cargarDatos = async () => {
        setCargando(true)
        await peticionesAuth.get(`/aerolineas/${params.id}`).then((res) => setAerolinea(res.data))
        setCargando(false)
    }

    if(cargando){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            <div className="max-w-4xl mx-auto px-6 pt-8">
                <h2 className="text-center text-lg text-gray-600 mb-6">Aerolínea</h2>

                {/* Info principal */}
                <div className="flex items-start gap-10 mb-6">

                    {/* Nombre, nacionalidad y botón */}
                    <div className="flex-1 flex flex-col justify-between h-56">
                        <div className="flex flex-col items-start justify-center flex-1">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {aerolinea.nombre}
                            </h1>
                            <p className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                {aerolinea.nacionalidad}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => router.push(`/admin/registrarAviones?aerolinea=${aerolinea.id}`)}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-3 text-sm font-medium cursor-pointer transition-colors"
                            >
                                Registrar aviones
                            </button>
                            <button
                                onClick={() => router.push(`/admin/aerolineas`)}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-3 text-sm font-medium cursor-pointer transition-colors"
                            >
                                Ver aerolineas
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabla de aviones */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-5 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Nombre</span>
                        <span>Tipo</span>
                        <span>Asientos disponibles</span>
                        <span>Capacidad asiento</span>
                        <span>Estado</span>
                    </div>

                    {/* Filas */}
                    {aerolinea.aviones.map((avion) => (
                        <div
                            key={avion.id}
                            className="grid grid-cols-5 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0"
                        >   
                            <span>{avion.nombre}</span>
                            <span>{avion.tipo}</span>
                            <span>{avion.asientosDisponibles}</span>
                            <span>{avion.capacidadAsientos}</span>
                            <span>{avion.estado}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
