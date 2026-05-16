"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"

const rutasEjemplo = [
    { origen: "El Salvador, La Libertad", destino: "España, Madrid" },
    { origen: "El Salvador, La Libertad", destino: "España, Madrid" },
    { origen: "El Salvador, La Libertad", destino: "España, Madrid" },
    { origen: "El Salvador, La Libertad", destino: "España, Madrid" },
]

export default function RutasRegistradas() {
    const [rutas, setRutas] = useState(rutasEjemplo)

    useEffect(() => {
        // peticionesAuth.get("/rutas").then((res) => setRutas(res.data))
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

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Rutas Registradas
                </h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => {/* router.push("/admin/rutas/registrar") */}}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-3 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar tarifa
                    </button>
                </div>

                {/* Tabla */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-2 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Origen</span>
                        <span>Destino</span>
                    </div>

                    {/* Filas */}
                    {rutas.map((ruta, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0"
                        >
                            <span>{ruta.origen}</span>
                            <span>{ruta.destino}</span>
                        </div>
                    ))}

                    {/* Fila vacía extra */}
                    <div className="h-8"></div>
                </div>
            </div>
        </div>
    )
}
