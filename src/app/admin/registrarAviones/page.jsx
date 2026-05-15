"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { peticionesAuth } from "../../../../../api"

const tiposAvion = [
    "Fuselaje estrecho",
    "Fuselaje Amplio",
    "Regional",
    "Turbohélice",
]

const avionesEjemplo = [
    { id: 1, nombre: "Airbus567", tipo: "Fuselaje Estrecho", asientosOcupados: 120, capacidadAsiento: 320 },
    { id: 2, nombre: "Airbus567", tipo: "Fuselaje Estrecho", asientosOcupados: 120, capacidadAsiento: 320 },
    { id: 3, nombre: "Airbus567", tipo: "Fuselaje Estrecho", asientosOcupados: 120, capacidadAsiento: 320 },
]

export default function RegistrarAviones() {
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState("Fuselaje estrecho")
    const [capacidad, setCapacidad] = useState("")
    const [aviones, setAviones] = useState(avionesEjemplo)
    const [nombreAerolinea] = useState("Avianca")

    const router = useRouter()
    const params = useParams()

    const agregar = () => {
        if (!nombre || !tipo || !capacidad) return
        const nuevo = {
            id: Date.now(),
            nombre,
            tipo,
            asientosOcupados: 0,
            capacidadAsiento: Number(capacidad),
        }
        setAviones([...aviones, nuevo])
        setNombre("")
        setCapacidad("")
    }

    const registrar = () => {
        console.log("Registrar aviones:", aviones)
        // peticionesAuth.post(`/aerolineas/${params.id}/aviones`, { aviones }).then(...)
    }

    const cancelar = () => {
        router.back()
    }

    useEffect(() => {
        // peticionesAuth.get(`/aerolineas/${params.id}/aviones`).then((res) => setAviones(res.data))
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

            <div className="max-w-3xl mx-auto px-6 pt-10">
                <h1 className="text-center text-2xl text-gray-800 mb-10">
                    Registrar aviones de aerolínea <strong>{nombreAerolinea}</strong>
                </h1>

                <div className="flex gap-10">
                    {/* Formulario izquierda */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Nombre</label>
                            <input
                                type="text"
                                placeholder="Airbus567"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                            />
                        </div>

                        {/* Tipo */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Tipo</label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none appearance-none cursor-pointer"
                            >
                                {tiposAvion.map((t, i) => (
                                    <option key={i} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        {/* Capacidad asientos */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Capacidad asientos</label>
                            <input
                                type="number"
                                placeholder="145"
                                value={capacidad}
                                onChange={(e) => setCapacidad(e.target.value)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                            />
                        </div>
                    </div>

                    {/* Botones derecha */}
                    <div className="flex flex-col gap-3 justify-start pt-6 w-36 shrink-0">
                        <button
                            onClick={agregar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Agregar
                        </button>
                        <button
                            onClick={registrar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Registrar
                        </button>
                        <button
                            onClick={cancelar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                {/* Tabla de aviones */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mt-8 mb-10">
                    <div className="grid grid-cols-4 bg-slate-500 text-white text-sm px-4 py-2.5">
                        <span>Nombre</span>
                        <span>Tipo</span>
                        <span>Asientos ocupados</span>
                        <span>Capacidad asiento</span>
                    </div>

                    {aviones.map((avion) => (
                        <div
                            key={avion.id}
                            className="grid grid-cols-4 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0"
                        >
                            <span>{avion.nombre}</span>
                            <span>{avion.tipo}</span>
                            <span>{avion.asientosOcupados}</span>
                            <span>{avion.capacidadAsiento}</span>
                        </div>
                    ))}

                    <div className="h-10"></div>
                </div>
            </div>
        </div>
    )
}
