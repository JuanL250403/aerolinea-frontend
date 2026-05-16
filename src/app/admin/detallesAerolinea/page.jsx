"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { peticionesAuth } from "../../../../../api"

const aerolineaEjemplo = {
    id: 1,
    nombre: "Avianca",
    nacionalidad: "Costa Rica",
    aviones: [
        { id: 1, nombre: "Airbus567", tipo: "Fuselaje Amplio", asientosDisponibles: 120, capacidadAsiento: 320, estado: "En Servicio" },
        { id: 2, nombre: "Airbus567", tipo: "Fuselaje Amplio", asientosDisponibles: 120, capacidadAsiento: 320, estado: "En Servicio" },
        { id: 3, nombre: "Airbus567", tipo: "Fuselaje Amplio", asientosDisponibles: 120, capacidadAsiento: 320, estado: "En Servicio" },
        { id: 4, nombre: "Airbus567", tipo: "Fuselaje Amplio", asientosDisponibles: 120, capacidadAsiento: 320, estado: "En Servicio" },
        { id: 5, nombre: "Airbus567", tipo: "Fuselaje Amplio", asientosDisponibles: 120, capacidadAsiento: 320, estado: "En Servicio" },
    ]
}

export default function DetalleAerolinea() {
    const [aerolinea, setAerolinea] = useState(aerolineaEjemplo)
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        // peticionesAuth.get(`/aerolineas/${params.id}`).then((res) => setAerolinea(res.data))
    }, [])

    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <nav className="flex justify-end items-center gap-6 px-8 py-3 border-b border-gray-200">
                <span className="flex items-center gap-2 text-sm text-gray-600">
                    Rol usuario <i className="fa-solid fa-shield-halved"></i>
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600">
                    Nombre usuario <i className="fa-solid fa-user"></i>
                </span>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-8">
                <h2 className="text-center text-lg text-gray-600 mb-6">Aerolínea</h2>

                {/* Info principal */}
                <div className="flex items-start gap-10 mb-6">

                    {/* Card imagen */}
                    <div className="bg-slate-600 rounded-xl w-48 h-56 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-earth-americas text-white text-7xl"></i>
                    </div>

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
                                onClick={() => router.push(`/admin/aerolineas/${aerolinea.id}/aviones/registrar`)}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-3 text-sm font-medium cursor-pointer transition-colors"
                            >
                                Registrar aviones
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
                            <span>{avion.capacidadAsiento}</span>
                            <span>{avion.estado}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
