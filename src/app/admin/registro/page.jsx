'use client'

import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"
import { useState } from "react"

export default function RegistrarUsuario() {
    const [usuario, setUsuario] = useState()

    const [rolId, setRolId] = useState()
    const [nombre, setNombre] = useState()
    const [correo, setCorreo] = useState()
    const [contrasenia, setContrasenia] = useState()

    const registrarUsuario = async () => {
        await peticionesAuth.post(`auth/registro`, { usuario, rolId, correo, nombre, contrasenia })
            .then((response) => showToast.success('Usuario registrado'))
    }


    return (
        <div className=" w-full bg-white flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-xl shadow-sm p-10">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-10">
                    Registrar usuario
                </h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Rol de usuario
                        </label>
                        <select
                            value={rolId}
                            onChange={(e) => setRolId(e.target.value)}
                            className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none">
                            <option>Seleccionar rol</option>
                            <option value={1}>ADMINISTRADOR</option>
                            <option value={2}>CLIENTE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            placeholder="Usuario"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            placeholder="Nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setContrasenia(e.target.value)}
                            className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            placeholder="********"
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <button onClick={() => registrarUsuario()} className="bg-slate-900 text-white px-14 py-3 rounded-full">
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}