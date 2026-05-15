"use client"

import { useState } from "react"
import { peticionesAuth } from "../../../../api"

export default function RegistrarRuta() {
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")

    const registrar = () => {
        if (!origen || !destino) return
        const payload = { origen, destino }
        console.log(payload)
        // peticionesAuth.post("/rutas", payload).then(...)
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
            <div className="max-w-lg mx-auto px-6 pt-16">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-16">
                    Registrar ruta
                </h1>

                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1.5">Origen</label>
                        <input
                            type="text"
                            placeholder="España"
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1.5">Destino</label>
                        <input
                            type="text"
                            placeholder="El Salvador"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>
                </div>

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
