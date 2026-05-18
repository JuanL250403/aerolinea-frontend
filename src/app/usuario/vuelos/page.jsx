"use client"

import { useEffect, useState } from "react";
import VueloCard from "./components/vueloCard";
import { peticionesAuth } from "../../../../api";
import { useSearchParams, useRouter } from "next/navigation";
import Cargando from "@/app/components/cargando";

export default function Vuelos() {

    const searchParams = useSearchParams()
    const router = useRouter()

    const [origenes, setOrigenes] = useState([])
    const [destinos, setDestinos] = useState([])
    const [vuelos, setVuelos] = useState([])

    const [origen, setOrigen] = useState(searchParams.get('origen'))
    const [destino, setDestino] = useState(searchParams.get('destino'))
    const [fechaHoraSalida, setFechaHoraSalida] = useState(searchParams.get('fechaHora'))

    const obtenerVuelos = async () => {
        await peticionesAuth.get("/vuelos", {
            params: {
                activos: true,
                origen,
                destino,
                fechaSalida: fechaHoraSalida
            }
        })
            .then((response) => setVuelos(response.data))
    }

    const buscarVuelos = async () => {
        if (!origen || !destino || !fechaHoraSalida) {
            return
        }
        router.push(`/usuario/vuelos?activos=true&origen=${origen}&destino=${destino}&fechaHora=${fechaHoraSalida}`)

        await obtenerVuelos()
    }

    const cargarRutas = async () => {
        peticionesAuth.get("/rutas")
            .then((response) => {
                let ori = []
                let des = []
                response.data.map((ruta) => {
                    if (!ori.includes(ruta.origen)) {
                        ori.push(ruta.origen)
                    }
                })

                response.data.map((ruta) => {
                    if (!des.includes(ruta.destino)) {
                        des.push(ruta.destino)
                    }
                })

                setOrigenes(ori)
                setDestinos(des)
            })
    }

    useEffect(() => {
        cargarRutas()
        obtenerVuelos()
    }, [])

    return (
        <div className="min-h-screen w-full bg-white px-6 py-6">
            {/* Título */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-700">
                    Estos son los vuelos que van desde {searchParams.get("origen")} hasta {searchParams.get("destino")}
                </h1>
                <h2 className="text-2xl font-medium text-gray-600 mt-4">
                    Con fecha de salida: {new Date(searchParams.get("fechaHora")).toLocaleDateString()}
                </h2>
            </div>

            {/* Filtros */}
            <section className="max-w-5xl mx-auto mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Origen</label>
                        <select className="w-full rounded-xl bg-gray-200 px-4 py-3 outline-none" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                            {origenes.map((origen, index) => (
                                <option key={index} value={origen}>{origen}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Destino</label>
                        <select className="w-full rounded-xl bg-gray-200 px-4 py-3 outline-none" value={destino} onChange={(e) => setDestino(e.target.value)}>
                            {destinos.map((destino, index) => (
                                <option key={index} value={destino}>{destino}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Fecha y hora de salida
                        </label>
                        <div className="flex items-center rounded-xl bg-gray-200 px-4 py-3">
                            <input
                                type="datetime-local"
                                className="w-full bg-transparent outline-none"
                                value={fechaHoraSalida}
                                onChange={(e) => setFechaHoraSalida(e.target.value)}
                            />
                            <i className="fa-solid fa-calendar text-gray-700"></i>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={() => buscarVuelos()} className="bg-slate-900 text-white px-16 py-3 rounded-full w-full md:w-3/4">
                        Buscar más vuelos
                    </button>
                </div>
            </section>

            {/* Tarjetas de vuelos */}
            <div className="max-w-6xl mx-auto space-y-8">
                {vuelos.map((vuelo, index) => (
                    <VueloCard key={index} vuelo={vuelo} router={router}/>
                ))}
            </div>
        </div>
    )
}