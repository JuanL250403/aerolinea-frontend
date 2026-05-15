"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"

// Datos de ejemplo - reemplazar con datos reales de la API
const vuelosEjemplo = [
    {
        id: 1,
        origen: "El Salvador, La Libertad",
        destino: "España, Madrid",
        aerolinea: "Nombre de aerolínea",
        duracion: "10 horas",
        avion: "Airbus A320",
        estado: "Programado",
        tarifas: [
            { nombre: "Lite", precio: 120 },
            { nombre: "Estandar", precio: 240 },
            { nombre: "Flexi", precio: 510 },
        ],
    },
    {
        id: 2,
        origen: "El Salvador, La Libertad",
        destino: "España, Madrid",
        aerolinea: "Nombre de aerolínea",
        duracion: "10 horas",
        avion: "Airbus A320",
        estado: "Programado",
        tarifas: [
            { nombre: "Lite", precio: 120 },
            { nombre: "Estandar", precio: 240 },
            { nombre: "Flexi", precio: 510 },
        ],
    },
]

export default function VuelosRegistrados() {
    const [origenes, setOrigenes] = useState([])
    const [destinos, setDestinos] = useState([])
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")
    const [fechaHoraSalida, setFechaHoraSalida] = useState("")
    const [vuelos, setVuelos] = useState(vuelosEjemplo)

    const router = useRouter()

    const cargarRutas = async () => {
        peticionesAuth.get("/rutas")
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

    const buscarVuelos = () => {
        if (!origen || !destino || !fechaHoraSalida) return
        // peticionesAuth.get(`/vuelos?origen=${origen}&destino=${destino}&fechaHora=${fechaHoraSalida}`)
        //     .then((response) => setVuelos(response.data))
    }

    useEffect(() => {
        cargarRutas()
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
                                {origenes.map((o, i) => (
                                    <option key={i} value={o}>{o}</option>
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
                    onClick={buscarVuelos}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium mb-8 cursor-pointer transition-colors"
                >
                    Buscar
                </button>

                {/* Lista de vuelos */}
                <div className="flex flex-col gap-4">
                    {vuelos.map((vuelo) => (
                        <div
                            key={vuelo.id}
                            className="border border-gray-300 rounded-xl p-5 flex gap-6"
                        >
                            {/* Tarifas */}
                            <div className="w-44 shrink-0">
                                <h3 className="text-center font-semibold text-gray-700 mb-3 text-sm">
                                    Tarifas
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {vuelo.tarifas.map((tarifa, i) => (
                                        <div
                                            key={i}
                                            className="bg-slate-500 text-white rounded-md flex justify-between items-center px-3 py-2 text-sm"
                                        >
                                            <span>{tarifa.nombre}</span>
                                            <span>${tarifa.precio}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Divisor */}
                            <div className="w-px bg-gray-200 self-stretch"></div>

                            {/* Detalles */}
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
                                    Desde {vuelo.origen} hasta {vuelo.destino}
                                </h2>
                                <ul className="flex flex-col gap-1.5 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                        {vuelo.aerolinea}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                        Duración de vuelo: {vuelo.duracion}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                        Avión: {vuelo.avion}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                        {vuelo.estado}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
