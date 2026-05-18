"use client"

import { useRouter } from "next/navigation"

const opciones = [
    { label: "Vuelos", icon: "fa-solid fa-plane", href: "/admin/vuelos" },
    { label: "Aerolíneas", icon: "fa-solid fa-earth-americas", href: "/admin/aerolineas" },
    { label: "Reservas", icon: "fa-solid fa-ticket", href: "/admin/reservas" },
    { label: "Horarios", icon: "fa-solid fa-calendar-days", href: "/admin/horarios" },
    { label: "Rutas", icon: "fa-solid fa-road", href: "/admin/rutas" },
    { label: "Tarifas", icon: "fa-solid fa-road", href: "/admin/tarifas" },
    { label: "Reclamos", icon: "fa-solid fa-envelope", href: "/admin/reclamos" },
]

export default function InicioAdmin() {
    const router = useRouter()

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <main className="max-w-3xl mx-auto px-6 py-10">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8">
                    Gestiones
                </h1>

                {/* Grid de tarjetas principales (2 filas x 3 col) */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {opciones.map((opcion, index) => (
                        <button
                            key={index}
                            onClick={() => router.push(opcion.href)}
                            className="bg-slate-600 hover:bg-slate-700 transition-colors rounded-lg flex flex-col items-center justify-center gap-3 py-8 text-white cursor-pointer"
                        >
                            <i className={`${opcion.icon} text-5xl`}></i>
                            <span className="text-3xl">{opcion.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tarjeta de Estadísticas (ancho completo) */}
                <button
                    onClick={() => router.push("/admin/usuarios")}
                    className="w-full bg-slate-600 hover:bg-slate-700 transition-colors rounded-lg flex flex-col items-center justify-center gap-3 py-8 text-white cursor-pointer"
                >
                    <i className="fa-solid fa-chart-bar text-5xl"></i>
                    <span className="text-3xl">Usuarios</span>
                </button>
                <br/>
                <button
                    onClick={() => router.push("/admin/estadisticas")}
                    className="w-full bg-slate-600 hover:bg-slate-700 transition-colors rounded-lg flex flex-col items-center justify-center gap-3 py-8 text-white cursor-pointer"
                >
                    <i className="fa-solid fa-chart-bar text-5xl"></i>
                    <span className="text-3xl">Estadísticas</span>
                </button>
            </main>
        </div>
    )
}
