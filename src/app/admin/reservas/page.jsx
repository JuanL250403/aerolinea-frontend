"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import ReservaCard from "./components/reservaCard"
import { useRouter } from "next/navigation"
import Cargando from "@/app/components/cargando"

export default function ReservasRegistradas() {
    const [reservas, setReservas] = useState()
    const [busqueda, setBusqueda] = useState("")
    const [cargando, setCargando] = useState(true)
    const route = useRouter();

    const buscarReserva = () => {
        if (!busqueda) return
        peticionesAuth.get(`reservas/${busqueda}`).then((res) => setReservas([res.data]))
    }

    const modificarReserva = (id) => {
        route.push(`/admin/reservas/modificar/${id}`)
    }

    const cancelarReserva = async (id) => {

        await peticionesAuth.delete(`/reservas/${id}`)
        cargarDatos()
    }


    const cargarDatos = async () => {
        setCargando(true)
        await peticionesAuth.get("/reservas").then((res) => setReservas(res.data))
        setCargando(false)
    }

    useEffect(() => {
        cargarDatos()
    }, [])

    if (cargando) {
        return (
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Encabezado y buscador */}
            <div className="max-w-3xl mx-auto px-6 pt-8">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-2">
                    Reservas registradas
                </h1>
                <p className="text-center text-sm text-gray-500 mb-4">
                    Buscar por id de reserva
                </p>

                <div className="flex justify-center items-center gap-3 mb-8">
                    <input
                        type="text"
                        placeholder=""
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="rounded-full bg-gray-200 px-5 py-2.5 text-sm outline-none w-64"
                    />
                    <button
                        onClick={() => buscarReserva()}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Buscar
                    </button>
                    <button
                        onClick={() => {
                            setBusqueda('')
                            cargarDatos()
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Limpiar busqueda
                    </button>
                </div>

                {/* Lista de reservas */}
                <div className="flex flex-col gap-4 pb-10">
                    {reservas.map((reserva, index) => (
                        <ReservaCard key={index} reserva={reserva} cancelar={cancelarReserva} modificar={modificarReserva} />
                    ))}
                </div>
            </div>
        </div>
    )
}
