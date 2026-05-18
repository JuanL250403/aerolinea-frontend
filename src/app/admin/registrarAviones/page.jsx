"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { peticionesAuth } from "../../../../api"
import { showToast } from "nextjs-toast-notify"

export default function RegistrarAviones() {
    const [nombre, setNombre] = useState("")
    const [tipoAvionId, setTipoAvionId] = useState(1)
    const [tipoAvion, setTipoAvion] = useState()
    const [cargando, setCargando] = useState(true)
    const [capacidadAsientos, setCapacidadAsientos] = useState([])

    const [aviones, setAviones] = useState([])
    const [aerolinea, setAerolinea] = useState()

    const router = useRouter()
    const searchParams = useSearchParams()
    const aerolineaId = searchParams.get('aerolinea')

    const agregar = () => {
        if (!nombre || !tipoAvionId || !capacidadAsientos) return
        const nuevo = {
            nombre,
            tipoAvionId,
            tipoAvion,
            capacidadAsientos
        }
        setAviones([...aviones, nuevo])
        setNombre("")
        setTipoAvionId(1)
        setCapacidadAsientos(0)
    }

    const cargarDatos = async () => {
        setCargando(true)
        await peticionesAuth.get(`aerolineas/${aerolineaId}`).then((response) => setAerolinea(response.data))
        setCargando(false)
    }

    const handlerTipoAvion = (e) => {
        setTipoAvion(e.target[e.target.value].text)
        setTipoAvionId(Number(e.target.value))
    }

    const registrar = async () => {
        const avionesRegistro = aviones.map((a) => {
            return {
                capacidadAsientos: a.capacidadAsientos,
                nombre: a.nombre,
                aerolineaId: aerolineaId,
                tipoAvionId: a.tipoAvionId
            }
        })

        await peticionesAuth.post(`aviones`,  avionesRegistro ).then((response) => showToast.success('Aviones registrados'))
    }

    const cancelar = () => {
        router.back()
    }

    useEffect(() => {
        cargarDatos()
        // peticionesAuth.get(`/aerolineas/${params.id}/aviones`).then((res) => setAviones(res.data))
    }, [])

    if (cargando) {
        return (
            <div className="min-h-screen w-full bg-white">
                <h1 className="text-center text-2xl text-gray-800 mb-10">
                    Cargando aerolinea
                </h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            <div className="max-w-3xl mx-auto px-6 pt-10">
                <h1 className="text-center text-2xl text-gray-800 mb-10">
                    Registrar aviones de aerolínea <strong>{aerolinea.nombre}</strong>
                </h1>

                <div className="flex gap-10">
                    {/* Formulario izquierda */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Nombre */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Nombre</label>
                            <input
                                type="text"
                                placeholder="Airbus567"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                            />
                        </div>

                        {/* Tipo */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Tipo</label>
                            <select
                                value={tipoAvionId}
                                onChange={(e) => handlerTipoAvion(e)}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none appearance-none cursor-pointer"
                            >
                                <option value="1">Boeing 737</option>
                                <option value="2">Airbus A320</option>
                                <option value="3">Boeing 777</option>
                                <option value="4">Embraer 190</option>
                                <option value="5">Boeing 747</option>
                            </select>
                        </div>

                        {/* Capacidad asientos */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1.5">Capacidad asientos</label>
                            <input
                                type="number"
                                placeholder="145"
                                value={capacidadAsientos}
                                onChange={(e) => setCapacidadAsientos(Number(e.target.value))}
                                className="w-full rounded-xl bg-gray-200 px-4 py-3 text-sm text-gray-700 outline-none"
                            />
                        </div>
                    </div>

                    {/* Botones derecha */}
                    <div className="flex flex-col gap-3 justify-start pt-6 w-36 shrink-0">
                        <button
                            onClick={agregar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Agregar
                        </button>
                        <button
                            onClick={registrar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Registrar
                        </button>
                        <button
                            onClick={cancelar}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full py-3 text-sm font-medium cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                {/* Tabla de aviones */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mt-8 mb-10">
                    <div className="grid grid-cols-4 bg-slate-500 text-white text-sm px-4 py-2.5">
                        <span>Nombre</span>
                        <span>Tipo</span>
                        <span>Capacidad asiento</span>
                    </div>


                    {aviones.map((avion, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-4 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0"
                        >
                            <span>{avion.nombre}</span>
                            <span>{avion.tipoAvion}</span>
                            <span>{avion.capacidadAsientos}</span>
                        </div>
                    ))}
                    < div className="h-10"></div>
                </div>
            </div>
        </div >
    )
}
