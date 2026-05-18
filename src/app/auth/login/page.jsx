"use client"

import { useState } from "react"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function InicioSesion() {

    const { data: session } = useSession()

    const router = useRouter()
    const [usuario, setUsuario] = useState("")
    const [contrasenia, setContrasenia] = useState("")

    const handleSubmit = async () => {

        const res = await signIn('credentials', { username: usuario, password: contrasenia, redirect: false })

        if (res.status === 200) {
            if (session?.user?.rol === 'ROLE_ADMINISTRADOR') {
                router.push('/admin/inicio')
                showToast.success('Sesion inciada')
            } else {
                router.push('/usuario/inicio')
            }
        } else if (res.status === 401) {
            showToast.error("Credenciales invalidas")
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="bg-white rounded-xl px-10 py-12 w-full max-w-md shadow-lg">

                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Inicio de sesión
                </h1>

                <span className="text-sm pb-10">¿No posees una cuneta? <a onClick={() => router.push("/auth/registro")} className="underline cursor-pointer">registrate</a></span>

                <div className="mb-5">
                    <label className="block text-sm text-gray-500 mb-1.5">
                        Usuario
                    </label>
                    <input
                        type="email"
                        placeholder="JuanP"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
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
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        className="w-full border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white transition-colors"
                    />
                </div>

                <div className="flex justify-between gap-2">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-full py-3 text-sm font-medium transition-colors cursor-pointer"
                    >
                        Inicio
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-full py-3 text-sm font-medium transition-colors cursor-pointer"
                    >
                        Iniciar sesión
                    </button>
                </div>

            </div>
        </div>
    )
}
