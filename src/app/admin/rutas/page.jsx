"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"
import Cargando from "@/app/components/cargando"

export default function RutasRegistradas() {
    const router = useRouter()
    
    const [rutas, setRutas] = useState([])

    const cargarRutas = async () => {
        await peticionesAuth.get('rutas').then((response) => setRutas(response.data))
    }

    const handlerRegistrarRuta = () => {
        router.push('/admin/registrarRuta')
    }

    useEffect(() => {
        cargarRutas()
    }, [])

    if (rutas.length === 0) {
        return (
            <Cargando/>
        )
    }


    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Rutas Registradas
                </h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => handlerRegistrarRuta()}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-3 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar ruta
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
