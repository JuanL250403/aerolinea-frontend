"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { peticionesAuth } from "../../../../api"

const datosEjemplo = [
    { mes: "Enero",      reservas: 780, cancelaciones: 900 },
    { mes: "Febrero",    reservas: 660, cancelaciones: 180 },
    { mes: "Marzo",      reservas: 600, cancelaciones: 160 },
    { mes: "Abril",      reservas: 510, cancelaciones: 140 },
    { mes: "Mayo",       reservas: 570, cancelaciones: 130 },
    { mes: "Junio",      reservas: 650, cancelaciones: 170 },
    { mes: "Julio",      reservas: 490, cancelaciones: 120 },
    { mes: "Agosto",     reservas: 400, cancelaciones: 100 },
    { mes: "Septiembre", reservas: 440, cancelaciones: 110 },
    { mes: "Octubre",    reservas: 510, cancelaciones: 130 },
    { mes: "Novviembre", reservas: 550, cancelaciones: 140 },
]

export default function Estadisticas() {
    const [anio, setAnio] = useState("2026")
    const [datos, setDatos] = useState(datosEjemplo)

    const cargarEstadisticas = () => {
        // peticionesAuth.get(`/estadisticas?anio=${anio}`).then((res) => setDatos(res.data))
        console.log("Cargar estadísticas año:", anio)
    }

    useEffect(() => {
        cargarEstadisticas()
    }, [anio])

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
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <h1 className="text-center text-3xl text-gray-800 mb-6">
                    Estadisticas
                </h1>

                {/* Tarjeta del gráfico */}
                <div className="border border-gray-300 rounded-xl p-6">
                    <h2 className="text-center font-bold text-gray-800 text-lg mb-4">
                        Reservas y cancelaciones
                    </h2>

                    {/* Selector de año */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center rounded-full bg-gray-200 overflow-hidden w-48">
                            <input
                                type="number"
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
                            />
                            <button
                                onClick={cargarEstadisticas}
                                className="bg-slate-900 text-white px-3 py-2 rounded-full m-1 cursor-pointer"
                            >
                                <i className="fa-solid fa-calendar text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Gráfico de barras */}
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart
                            data={datos}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                            barCategoryGap="30%"
                            barGap={2}
                        >
                            <CartesianGrid vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="mes"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#6b7280" }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "#6b7280" }}
                                ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
                                domain={[0, 1000]}
                            />
                            <Bar dataKey="reservas" fill="#94a3b8" radius={[2, 2, 0, 0]} />
                            <Bar dataKey="cancelaciones" fill="#cbd5e1" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
