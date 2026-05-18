"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"

export default function RegistrarVuelo() {
    const [rutas, setRutas] = useState([])
    const [aviones, setAviones] = useState([])
    const [horarios, setHorarios] = useState([])

    const [ruta, setRuta] = useState(1)
    const [avion, setAvion] = useState(1)
    const [horario, setHorario] = useState(1)
    const [duracion, setDuracion] = useState("")

    const [tarifas, setTarifas] = useState([])

    const [vueloTarifas, setVuelosTarifa] = useState([])

    const cargarDatos = async () => {
        await peticionesAuth.get("/rutas").then((res) => setRutas(res.data))
        await peticionesAuth.get("/aviones").then((res) => setAviones(res.data))
        await peticionesAuth.get("/horarios").then((res) => setHorarios(res.data))

        await cargarTarifas()
    }

    const cargarTarifas = async () => {
        await peticionesAuth.get('/tarifas').then((response) => {
            setTarifas(response.data)

            const vTarifas = response.data.map((t) => {
                return { tarifaId: t.id, precio: 0 }
            })

            setVuelosTarifa(vTarifas);
        })
    }

    const handlerCambioPrecio = (tarifaId, precio) => {
        const vTarifasNuevas = vueloTarifas.map(v => {
            if (v.tarifaId == tarifaId) {
                v.precio = precio
                return v
            } else {
                return v
            }
        })

        setVuelosTarifa(vTarifasNuevas)
    }

    const registrar = async () => {

        const payload = { rutaId: ruta, avionId: avion, horarioId: horario, duracion, tarifas: vueloTarifas }
        await peticionesAuth.post("/vuelos", payload)
            .then((response) => showToast.success('Vuelo registrado'))
    }

    useEffect(() => {
        cargarDatos()
    }, [])

    useEffect(() => {
        console.log({ ruta, avion, horario, duracion, vueloTarifas })
    }, [ruta])

    return (
        <div className="min-h-screen w-full bg-white">

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
                                onChange={(e) => setRuta(Number(e.target.value))}
                            >
                                <option value="">Selecciona una ruta</option>
                                {rutas.map((r, i) => (
                                    <option key={i} value={r.id}>{r.origen} - {r.destino}</option>
                                ))}
                            </select>
                        </div>

                        {/* Avión */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Avión</label>
                            <select
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                value={avion}
                                onChange={(e) => setAvion(Number(e.target.value))}
                            >
                                <option value="">Selecciona un avión</option>
                                {aviones.map((a, i) => (
                                    <option key={i} value={a.id}>{a.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Horario */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Horario</label>
                            <select
                                value={horario}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm outline-none appearance-none cursor-pointer"
                                onChange={(e) => setHorario(Number(e.target.value))}
                            >
                                <option value="">Selecciona un horario</option>
                                {horarios.map((h, i) => (
                                    <option key={i} value={h.id}>{new Date(h.fechaHoraSalida).toLocaleString()} - {new Date(h.fechaHoraLlegada).toLocaleString() }</option>
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
                                onChange={(e) => setDuracion(Number(e.target.value))}
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
                            {tarifas.map((tarifa, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-600 text-white rounded-lg flex items-center justify-between px-4 py-3"
                                >
                                    <span className="text-sm">{tarifa?.nombre}</span>
                                    <div className="bg-slate-500 rounded-md px-3 py-1 flex items-center">
                                        <span className="text-sm font-medium">$</span>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            onChange={(e) =>
                                                handlerCambioPrecio(tarifa.id, Number(e.target.value))
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
