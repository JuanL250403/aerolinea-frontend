"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { peticionesAuth } from "../../../../api"

const aerolineasEjemplo = [
    { id: 1, nombre: "Avianca", nacionalidad: "Costa Rica" },
    { id: 2, nombre: "Avianca", nacionalidad: "Costa Rica" },
    { id: 3, nombre: "Avianca", nacionalidad: "Costa Rica" },
    { id: 4, nombre: "Avianca", nacionalidad: "Costa Rica" },
    { id: 5, nombre: "Avianca", nacionalidad: "Costa Rica" },
    { id: 6, nombre: "Avianca", nacionalidad: "Costa Rica" },
]

export default function AerolineasRegistradas() {
    const [aerolineas, setAerolineas] = useState(aerolineasEjemplo)
    const [busqueda, setBusqueda] = useState("")
    const router = useRouter()

    const buscarAerolinea = () => {
        if (!busqueda) return
        // peticionesAuth.get(`/aerolineas?nombre=${busqueda}`).then((res) => setAerolineas(res.data))
        console.log("Buscar aerolínea:", busqueda)
    }

    useEffect(() => {
        // peticionesAuth.get("/aerolineas").then((res) => setAerolineas(res.data))
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
            <div className="max-w-3xl mx-auto px-6 pt-10">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Aerolíneas registradas
                </h1>

                {/* Barra de acciones */}
                <div className="flex items-end justify-between mb-4">
                    <button
                        onClick={() => router.push("/admin/aerolineas/registrar")}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar aerolínea
                    </button>

                    <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-gray-600">Buscar aerolínea</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="rounded-full bg-gray-200 px-4 py-2.5 text-sm outline-none w-52"
                            />
                            <button
                                onClick={buscarAerolinea}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
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
                                    onClick={() => router.push(`/admin/aerolineas/${aerolinea.id}`)}
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
