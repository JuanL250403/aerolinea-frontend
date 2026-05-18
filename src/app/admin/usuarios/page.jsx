"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"
import { useRouter } from "next/navigation"
import Cargando from "@/app/components/cargando"

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const router = useRouter()

    const handlerCambiarEstado = async (id) => {
        await peticionesAuth.put(`usuarios/estado/${id}`).then((response) => showToast.success("Estado de usuario actualizado"))

        await cargarUsuarios()
    }

    const handlerModificarUsaurio = async (id) => {
        router.push(`/admin/usuarios/modificar/${id}`)
    }

    const cargarUsuarios = async () => {
        await peticionesAuth.get('usuarios').then((response) => setUsuarios(response.data))
    }

    const handlerRegistrarUsuario = () => {
        router.push('/admin/registro')
    }
    useEffect(() => {
        cargarUsuarios()
    }, [])

    if(usuarios.length === 0){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white px-6 py-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-semibold text-center text-gray-700 mb-6">
                    Usuarios registrados
                </h1>

                <div className="flex justify-center mb-12">
                    <button
                    onClick={() => handlerRegistrarUsuario()}
                    className="bg-slate-900 text-white px-10 py-3 rounded-full font-medium">
                        Registrar usuario
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-300">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-500 text-white">
                                <th className="px-4 py-3">Nombre</th>
                                <th className="px-4 py-3">Correo</th>
                                <th className="px-4 py-3">Usuario</th>
                                <th className="px-4 py-3">Rol</th>
                                <th className="px-4 py-3">Estado</th>
                                <th className="px-4 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-700">
                            {usuarios.map((usuario, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="px-4 py-4">{usuario.nombre}</td>
                                    <td className="px-4 py-4">{usuario.correo}</td>
                                    <td className="px-4 py-4">{usuario.usuario}</td>
                                    <td className="px-4 py-4">{usuario.rol}</td>
                                    <td className="px-4 py-4">{usuario.activo ? "activo" : "inactivo"}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => handlerModificarUsaurio(usuario.id)} className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm">
                                                Modificar
                                            </button>

                                            <button onClick={() => handlerCambiarEstado(usuario.id)} className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm">
                                                {usuario.activo ? "Desactivar" : "Activar"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}