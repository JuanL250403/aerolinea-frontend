"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"
import Cargando from "@/app/components/cargando"

export default function TarifasRegistradas() {
    const router = useRouter()
    const [tarifas, setTarifas] = useState([])

    const cargarTarifas = async () => {
        await peticionesAuth.get("/tarifas").then((res) => setTarifas(res.data))
    }

    useEffect(() => {
        cargarTarifas()
    }, [])

    if (tarifas.length === 0) {
        return (
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Tarifas Registradas
                </h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => {router.push("/admin/registrarTarifa")}}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-3 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar tarifa
                    </button>
                </div>

                {/* Tabla */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-5 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Tipo tarifa</span>
                        <span>Descripción</span>
                        <span>Cancelacion</span>
                        <span>Cambios</span>
                    </div>

                    {/* Filas */}
                    {tarifas.map((tarifa, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-5 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0`}
                        >
                            <span>{tarifa.nombre}</span>
                            <span>{tarifa.descripcion}</span>
                            <span className="text-center">{tarifa.cancelacion ? 'si' : 'no'}</span>
                            <span className="text-center">{tarifa.cambios ? 'si' : 'no'}</span>
                        </div>
                    ))}

                    {/* Fila vacía extra para imitar el diseño */}
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    )
}
