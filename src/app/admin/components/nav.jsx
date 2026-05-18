'use client'

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function Nav() {
    const router = useRouter()

    return (
        <header className="w-full bg-slate-800 text-white shadow-md cursor-pointer">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <h1 onClick={() => router.push('/admin/inicio')} className="text-xl font-semibold">
                    AeroSV
                </h1>

                <ul className="flex items-center gap-6">

                    <li>
                        <button onClick={() => signOut({callbackUrl: '/'})} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}