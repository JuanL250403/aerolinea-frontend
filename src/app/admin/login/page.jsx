"use client"

import { useState } from "react"

export default function InicioSesion() {
    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")

    const handleSubmit = () => {
        if (!email || !contrasena) return
        console.log({ email, contrasena })
    }

    return (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center">
            <div className="bg-white rounded-xl px-10 py-12 w-full max-w-md shadow-lg">

                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-9">
                    Inicio de sesión
                </h1>

                <div className="mb-5">
                    <label className="block text-sm text-gray-500 mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="michael_joe@kmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white transition-colors"
                    />
                </div>

                <div className="mb-9">
                    <label className="block text-sm text-gray-500 mb-1.5">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="••••••"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="w-full border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white transition-colors"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-full py-3 text-sm font-medium transition-colors cursor-pointer"
                >
                    Iniciar sesión
                </button>

            </div>
        </div>
    )
}
