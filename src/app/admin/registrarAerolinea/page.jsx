"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"

export default function RegistrarAerolinea() {
    const [id, setId] = useState("")
    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const router = useRouter()

    const registrar = () => {
        const payload = { id, nombre, nacionalidad }

        peticionesAuth.post("/aerolineas", payload).then((response) => showToast.success('Aerolinea registrada'))
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-lg mx-auto px-6 pt-16">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-16">
                    Registrar aerolínea
                </h1>

                <div className="flex flex-col gap-5">

                    {/* Nombre aerolínea */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">
                            ID aerolínea
                        </label>
                        <input
                            type="text"
                            placeholder="AL2"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Nombre aerolínea
                        </label>
                        <input
                            type="text"
                            placeholder="Avianca"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>

                    {/* Nacionalidad */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1.5">
                            Nacionalidad
                        </label>
                        <input
                            type="text"
                            placeholder="Costa Rica"
                            value={nacionalidad}
                            onChange={(e) => setNacionalidad(e.target.value)}
                            className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 justify-center mt-2">
                        <button
                            onClick={registrar}
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Registrar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
