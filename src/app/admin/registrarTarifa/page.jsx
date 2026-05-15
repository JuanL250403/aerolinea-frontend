"use client"

import { useState } from "react"
import { peticionesAuth } from "../../../../api"

export default function RegistrarTarifa() {
    const [tipo, setTipo] = useState("")
    const [permiteCambios, setPermiteCambios] = useState(false)
    const [permiteCancelacion, setPermiteCancelacion] = useState(false)
    const [descripcion, setDescripcion] = useState("")

    const registrar = () => {
        if (!tipo || !descripcion) return
        const payload = { tipo, permiteCambios, permiteCancelacion, descripcion }
        console.log(payload)
        // peticionesAuth.post("/tarifas", payload).then(...)
    }

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
            <div className="max-w-lg mx-auto px-6 pt-12">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-12">
                    Registrar tarifa
                </h1>

                <div className="flex flex-col gap-6">

                    {/* Tipo de tarifa */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Tipo de tarifa
                        </label>
                        <input
                            type="text"
                            placeholder="Lite"
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="flex items-center gap-10">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            Permite cambios
                            <input
                                type="checkbox"
                                checked={permiteCambios}
                                onChange={(e) => setPermiteCambios(e.target.checked)}
                                className="w-5 h-5 rounded-full accent-slate-700 cursor-pointer"
                            />
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            Permite cancelación
                            <input
                                type="checkbox"
                                checked={permiteCancelacion}
                                onChange={(e) => setPermiteCancelacion(e.target.checked)}
                                className="w-5 h-5 rounded-full accent-slate-700 cursor-pointer"
                            />
                        </label>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Descripción
                        </label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            rows={4}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none resize-none"
                        />
                    </div>

                    {/* Botón */}
                    <div className="flex justify-center">
                        <button
                            onClick={registrar}
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-16 py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Registrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
