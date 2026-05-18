"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import SinDatos from "@/app/components/sinDatos"
import Cargando from "@/app/components/cargando"

export default function ReclamosRealizados() {
    const [reclamos, setReclamos] = useState([])
    const [busqueda, setBusqueda] = useState("")

    const buscarReclamo = async () => {
        if (!busqueda) return
        await peticionesAuth.get(`/reclamos?usuario=${busqueda}`).then((res) => setReclamos(res.data))
    }

    const cargarReclamos = async () => {
        await peticionesAuth.get("/reclamos").then((res) => setReclamos(res.data))
    }

    useEffect(() => {
        cargarReclamos()
    }, [])

    if(reclamos.length === 0){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Encabezado y buscador */}
            <div className="max-w-3xl mx-auto px-6 pt-8">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Reclamos realizados
                </h1>
                <p className="text-center text-sm text-gray-500 mb-4">
                    Buscar por usuario
                </p>

                <div className="flex justify-center items-center gap-3 mb-8">
                    <input
                        type="text"
                        placeholder=""
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="rounded-full bg-gray-200 px-5 py-2.5 text-sm outline-none w-64"
                    />
                    <button
                        onClick={buscarReclamo}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Buscar
                    </button>
                </div>

                {/* Lista de reclamos */}
                <div className="flex flex-col gap-4 pb-10">
                    {reclamos.map((reclamo) => (
                        <div
                            key={reclamo.id}
                            className="border border-gray-300 rounded-xl p-6 flex gap-8"
                        >
                            {/* Columna izquierda: fecha */}
                            <div className="w-50 shrink-0">
                                <h3 className="font-semibo text-gray-800 mb-2 text-sm">
                                    Fecha de reclamo
                                </h3>
                                <div className="bg-slate-500 text-white rounded-lg px-4 py-2.5 text-sm">
                                    {new Date(reclamo.fechaReclamo).toLocaleString()}
                                </div>
                            </div>

                            {/* Columna derecha: usuario y descripción */}
                            <div className="flex-1">
                                <h2 className="text-center font-bold text-gray-800 mb-4">
                                    {reclamo.usuario}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {reclamo.descripcion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
