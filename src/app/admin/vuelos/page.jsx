"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"
import VueloCard from "./components/vueloCard"

export default function VuelosRegistrados() {
    const [origenes, setOrigenes] = useState([])
    const [destinos, setDestinos] = useState([])
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")
    const [fechaHoraSalida, setFechaHoraSalida] = useState("")
    const [vuelos, setVuelos] = useState([])

    const router = useRouter()

    const cargarVuelos = async () => {
        await peticionesAuth.get('vuelos')
        .then((response) => setVuelos(response.data))
    }

    const cargarRutas = async () => {
        await peticionesAuth.get("/rutas")
            .then((response) => {
                let ori = []
                let des = []
                response.data.map((ruta) => {
                    if (!ori.includes(ruta.origen)) ori.push(ruta.origen)
                })
                response.data.map((ruta) => {
                    if (!des.includes(ruta.destino)) des.push(ruta.destino)
                })
                setOrigenes(ori)
                setDestinos(des)
            })
    }

    const buscarVuelos = async () => {
        if (!origen || !destino || !fechaHoraSalida) return
        await peticionesAuth.get(`/vuelos?origen=${origen}&destino=${destino}&fechaSalida=${fechaHoraSalida}`)
        .then((response) => setVuelos(response.data))
    }

    useEffect(() => {
        cargarVuelos()
        cargarRutas()
    }, [])

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Encabezado */}
            <div className="max-w-4xl mx-auto px-6 pt-8">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Vuelos Registrados
                </h1>

                {/* Barra de búsqueda */}
                <div className="flex flex-col md:flex-row items-end gap-4 mb-3">

                    {/* Botón registrar */}
                    <button
                        onClick={() => router.push("/admin/nuevoVuelo")}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors"
                    >
                        Registrar vuelo
                    </button>

                    {/* Filtros */}
                    <div className="flex flex-1 gap-3 w-full">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Origen</label>
                            <select
                                className="w-full rounded-lg bg-gray-200 px-3 py-2.5 text-sm outline-none appearance-none cursor-pointer"
                                value={origen}
                                onChange={(e) => setOrigen(e.target.value)}
                            >
                                <option value="">El Salvador</option>
                                {origenes.map((origen, i) => (
                                    <option key={i} value={origen}>{origen}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Destino</label>
                            <select
                                className="w-full rounded-lg bg-gray-200 px-3 py-2.5 text-sm outline-none appearance-none cursor-pointer"
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                            >
                                <option value="">España</option>
                                {destinos.map((d, i) => (
                                    <option key={i} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Fecha y hora de salida</label>
                            <div className="flex items-center rounded-lg bg-gray-200 px-3 py-2.5 gap-2">
                                <input
                                    type="datetime-local"
                                    className="w-full bg-transparent outline-none text-sm"
                                    value={fechaHoraSalida}
                                    onChange={(e) => setFechaHoraSalida(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón buscar */}
                <button
                    onClick={() => buscarVuelos()}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium mb-8 cursor-pointer transition-colors"
                >
                    Buscar
                </button>
                <button
                    onClick={() => cargarVuelos()}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium mb-8 cursor-pointer transition-colors"
                >
                    Borrar filtros
                </button>

                {/* Lista de vuelos */}
                <div className="flex flex-col gap-4">
                    {vuelos.map((vuelo, index) => (
                        <VueloCard vuelo={vuelo} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
