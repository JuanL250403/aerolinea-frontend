"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { peticionesAuth } from "../../../../api"
import SinDatos from "@/app/components/sinDatos"

export default function Estadisticas() {
    const [anio, setAnio] = useState(2026)
    const [datos, setDatos] = useState([])

    const cargarEstadisticas = () => {
        peticionesAuth.get(`reservas/estadisticas`, { params: { anio } }).then((res) => setDatos(res.data))
    }

    useEffect(() => {
        cargarEstadisticas()
    }, [anio])

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <h1 className="text-center text-3xl text-gray-800 mb-6">
                    Estadisticas
                </h1>

                {/* Tarjeta del gráfico */}
                <div className="border border-gray-300 rounded-xl p-6">
                    <h2 className="text-center font-bold text-gray-800 text-lg mb-4">
                        Reservas realizadas en {anio}
                    </h2>

                    {/* Selector de año */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center rounded-full bg-gray-200 w-100">
                            <input
                                type="number"
                                value={anio}
                                onChange={(e) => {
                                    if (e.target.value > new Date().getFullYear()) return
                                    setAnio(Number(e.target.value))
                                }}
                                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
                            />
                        </div>
                    </div>

                    {datos.length !== 0 ?
                        <ResponsiveContainer width="100%" height={380}>
                            <BarChart
                                data={datos}
                                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                barCategoryGap="30%"
                                barGap={2}
                            >
                                <CartesianGrid vertical={false} stroke="#e5e7eb" />
                                <XAxis
                                    name=""
                                    dataKey="mes"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "#6b7280" }}
                                />
                                <YAxis
                                    name="meses"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fill: "#6b7280" }}
                                    ticks={[0, 10, 20, 30, 40, 50]}
                                    domain={[0, 50]}
                                />
                                <Bar dataKey="reservas" fill="#94a3b8" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        :
                        <SinDatos/>
                }

                </div>
            </div>
        </div>
    )
}
