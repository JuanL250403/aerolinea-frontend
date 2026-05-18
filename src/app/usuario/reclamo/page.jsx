'use client'

import { useState } from "react"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"

export default function Reclamo() {
    const [descripcion, setDescripcion] = useState()

    const enviarReclamo = async () => {
        await peticionesAuth.post('reclamos', { descripcion })
            .then((response) => showToast.success('Reclamo enviado'))
    }

    return (
        <div className="min-h-screen w-full bg-white px-6 py-10">
            <div className="max-w-4xl mx-auto ">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-20">
                    Realizar reclamo
                </h1>

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Descripción
                        </label>

                        <textarea
                            rows={8}
                            onChange={(e) => setDescripcion(e.currentTarget.value)}
                            className="w-full bg-gray-300 rounded-2xl px-4 py-4 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button onClick={() => enviarReclamo()} className="bg-slate-900 text-white px-14 py-3 rounded-full">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}