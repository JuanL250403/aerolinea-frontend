"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { peticionesAuth } from "../../../../api"
import Cargando from "@/app/components/cargando"

export default function AerolineasRegistradas() {
    const [aerolineas, setAerolineas] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const router = useRouter()

    const cargarAerolineas = async () => {
        await peticionesAuth.get("/aerolineas").then((res) => setAerolineas(res.data))
    }

    useEffect(() => {
        cargarAerolineas()
    }, [])

    if(aerolineas.length === 0){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-6 pt-10">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Aerolíneas registradas
                </h1>

                {/* Barra de acciones */}
                <div className="flex items-end justify-between mb-4">
                    <button
                        onClick={() => router.push("/admin/registrarAerolinea")}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar aerolínea
                    </button>

                </div>

                {/* Tabla */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-3 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Nombre</span>
                        <span>Nacionalidad</span>
                        <span>Acciones</span>
                    </div>

                    {/* Filas */}
                    {aerolineas.map((aerolinea) => (
                        <div
                            key={aerolinea.id}
                            className="grid grid-cols-3 items-center text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0"
                        >
                            <span>{aerolinea.nombre}</span>
                            <span>{aerolinea.nacionalidad}</span>
                            <div>
                                <button
                                    onClick={() => router.push(`/admin/aerolineas/detalles/${aerolinea.id}`)}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-1.5 text-xs font-medium cursor-pointer transition-colors"
                                >
                                    Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
