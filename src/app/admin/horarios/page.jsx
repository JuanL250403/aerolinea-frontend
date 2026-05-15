"use client"

import { useState } from "react"
import { peticionesAuth } from "../../../../api"

export default function RegistrarHorario() {
    const [fechaSalida, setFechaSalida] = useState("")
    const [fechaLlegada, setFechaLlegada] = useState("")

    const registrar = () => {
        if (!fechaSalida || !fechaLlegada) return
        const payload = { fechaSalida, fechaLlegada }
        console.log(payload)
        // peticionesAuth.post("/horarios", payload).then(...)
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
            <div className="max-w-2xl mx-auto px-6 pt-16">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-20">
                    Registrar horario
                </h1>

                {/* Inputs de fecha */}
                <div className="flex gap-6 mb-8">
                    <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Fecha y hora de salida
                        </label>
                        <div className="flex items-center rounded-xl bg-gray-200 px-4 py-2.5 gap-2">
                            <input
                                type="datetime-local"
                                value={fechaSalida}
                                onChange={(e) => setFechaSalida(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                            />
                            <i className="fa-solid fa-calendar text-gray-600 text-sm"></i>
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Fecha y hora de llegada
                        </label>
                        <div className="flex items-center rounded-xl bg-gray-200 px-4 py-2.5 gap-2">
                            <input
                                type="datetime-local"
                                value={fechaLlegada}
                                onChange={(e) => setFechaLlegada(e.target.value)}
                                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                            />
                            <i className="fa-solid fa-calendar text-gray-600 text-sm"></i>
                        </div>
                    </div>
                </div>

                {/* Botón registrar */}
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
    )
}
