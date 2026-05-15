"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"

const tarifasEjemplo = [
    { tipo: "Lite",     descripcion: "Económica Y Accesible", cancelacion: "No", cambios: "No" },
    { tipo: "Estandar", descripcion: "Económica Y Flexible",  cancelacion: "Sí", cambios: "No" },
    { tipo: "Flexi",    descripcion: "Flexible Y Comoda",     cancelacion: "Sí", cambios: "Sí" },
]

export default function TarifasRegistradas() {
    const [tarifas, setTarifas] = useState(tarifasEjemplo)

    useEffect(() => {
        // peticionesAuth.get("/tarifas").then((res) => setTarifas(res.data))
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
                    Tarifas Registradas
                </h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => {/* router.push("/admin/registrarTarifa") */}}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-3 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar tarifa
                    </button>
                </div>

                {/* Tabla */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-4 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Tipo tarifa</span>
                        <span>Descripción</span>
                        <span>Cancelacion</span>
                        <span>Cambios</span>
                    </div>

                    {/* Filas */}
                    {tarifas.map((tarifa, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-4 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0`}
                        >
                            <span>{tarifa.tipo}</span>
                            <span>{tarifa.descripcion}</span>
                            <span>{tarifa.cancelacion}</span>
                            <span>{tarifa.cambios}</span>
                        </div>
                    ))}

                    {/* Fila vacía extra para imitar el diseño */}
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    )
}
