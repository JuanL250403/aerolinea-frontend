"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"

export default function RegistrarVuelo() {
    const [rutas, setRutas] = useState([])
    const [aviones, setAviones] = useState([])
    const [horarios, setHorarios] = useState([])

    const [ruta, setRuta] = useState("")
    const [avion, setAvion] = useState("")
    const [horario, setHorario] = useState("")
    const [duracion, setDuracion] = useState("")

    const [tarifas, setTarifas] = useState({
        lite: 120,
        estandar: 234,
        flexi: 678,
    })

    const cargarDatos = async () => {
        // peticionesAuth.get("/rutas").then((res) => setRutas(res.data))
        // peticionesAuth.get("/aviones").then((res) => setAviones(res.data))
        // peticionesAuth.get("/horarios").then((res) => setHorarios(res.data))

        // Datos de ejemplo
        setRutas(["España, Barcelona - EL Salvador, La libertad", "México, CDMX - El Salvador, San Salvador"])
        setAviones(["Aurbus567 - Avianca", "Boeing737 - Copa Airlines"])
        setHorarios(["12/09/2026 9:30 - 13/09/2026 11:50", "15/09/2026 8:00 - 16/09/2026 10:20"])
    }

    const registrar = () => {
        if (!ruta || !avion || !horario || !duracion) return
        const payload = { ruta, avion, horario, duracion, tarifas }
        console.log(payload)
        // peticionesAuth.post("/vuelos", payload).then(...)
    }

    useEffect(() => {
        cargarDatos()
    }, [])

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
            <div className="max-w-3xl mx-auto px-6 pt-10">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-10">
                    Registrar nuevo vuelo
                </h1>

                <div className="flex gap-12">

                    {/* Formulario izquierda */}
                    <div className="flex-1 flex flex-col gap-5">

                        {/* Ruta */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Ruta</label>
                            <select
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                value={ruta}
                                onChange={(e) => setRuta(e.target.value)}
                            >
                                <option value="">Selecciona una ruta</option>
                                {rutas.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>

                        {/* Avión */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Avión</label>
                            <select
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                value={avion}
                                onChange={(e) => setAvion(e.target.value)}
                            >
                                <option value="">Selecciona un avión</option>
                                {aviones.map((a, i) => (
                                    <option key={i} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>

                        {/* Horario */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Horario</label>
                            <select
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                value={horario}
                                onChange={(e) => setHorario(e.target.value)}
                            >
                                <option value="">Selecciona un horario</option>
                                {horarios.map((h, i) => (
                                    <option key={i} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duración */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Duación (horas)</label>
                            <input
                                type="number"
                                placeholder="12"
                                value={duracion}
                                onChange={(e) => setDuracion(e.target.value)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none"
                            />
                        </div>

                        {/* Botón registrar */}
                        <div className="flex justify-center mt-2">
                            <button
                                onClick={registrar}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-16 py-3 text-sm font-medium cursor-pointer transition-colors"
                            >
                                Registrar
                            </button>
                        </div>
                    </div>

                    {/* Tarifas derecha */}
                    <div className="w-56 shrink-0">
                        <h2 className="text-center font-semibold text-gray-800 mb-4">
                            Definir tarifas
                        </h2>
                        <div className="flex flex-col gap-3">
                            {[
                                { key: "lite", label: "Lite" },
                                { key: "estandar", label: "Estandar" },
                                { key: "flexi", label: "Flexi" },
                            ].map(({ key, label }) => (
                                <div
                                    key={key}
                                    className="bg-slate-600 text-white rounded-lg flex items-center justify-between px-4 py-3"
                                >
                                    <span className="text-sm">{label}</span>
                                    <div className="bg-slate-500 rounded-md px-3 py-1 flex items-center">
                                        <span className="text-sm font-medium">$</span>
                                        <input
                                            type="number"
                                            value={tarifas[key]}
                                            onChange={(e) =>
                                                setTarifas({ ...tarifas, [key]: e.target.value })
                                            }
                                            className="bg-transparent outline-none w-14 text-sm font-medium text-right"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
