"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"

const reservasEjemplo = [
    {
        id: 123,
        pasajero: {
            nombre: "Nombre pasajero",
            pasaporte: "Pasaporte",
            fechaNacimiento: "12/01/2026",
        },
        tarifa: { nombre: "Estandar", precio: 240 },
        origen: "El Salvador, La Libertad",
        destino: "España, Madrid",
        numeroAsiento: 12,
        fechaReserva: "02/01/2026",
        fechaModificacion: "ninguna",
        cancelada: "no",
        modificada: "no",
    },
    {
        id: 124,
        pasajero: {
            nombre: "Nombre pasajero",
            pasaporte: "Pasaporte",
            fechaNacimiento: "15/03/2025",
        },
        tarifa: { nombre: "Lite", precio: 120 },
        origen: "El Salvador, La Libertad",
        destino: "España, Madrid",
        numeroAsiento: 8,
        fechaReserva: "10/02/2026",
        fechaModificacion: "ninguna",
        cancelada: "no",
        modificada: "no",
    },
]

export default function ReservasRegistradas() {
    const [reservas, setReservas] = useState(reservasEjemplo)
    const [busqueda, setBusqueda] = useState("")

    const buscarReserva = () => {
        if (!busqueda) return
        // peticionesAuth.get(`/reservas/${busqueda}`).then((res) => setReservas([res.data]))
        console.log("Buscar reserva id:", busqueda)
    }

    const cancelarReserva = (id) => {
        // peticionesAuth.put(`/reservas/${id}/cancelar`)
        console.log("Cancelar reserva:", id)
    }

    const modificarReserva = (id) => {
        // router.push(`/admin/reservas/${id}/modificar`)
        console.log("Modificar reserva:", id)
    }

    useEffect(() => {
        // peticionesAuth.get("/reservas").then((res) => setReservas(res.data))
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
                        onClick={buscarReserva}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Buscar
                    </button>
                </div>

                {/* Lista de reservas */}
                <div className="flex flex-col gap-4 pb-10">
                    {reservas.map((reserva) => (
                        <div
                            key={reserva.id}
                            className="border border-gray-300 rounded-xl p-5 flex gap-6"
                        >
                            {/* Columna izquierda: pasajero y tarifa */}
                            <div className="w-48 shrink-0">
                                <h3 className="text-center font-semibold text-gray-700 mb-2 text-sm">
                                    Pasajero
                                </h3>
                                <div className="bg-slate-500 text-white rounded-lg px-3 py-2 mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{reserva.pasajero.nombre}</span>
                                        <span>{reserva.pasajero.pasaporte}</span>
                                    </div>
                                    <div className="text-xs text-slate-200">
                                        Fecha nacimiento: {reserva.pasajero.fechaNacimiento}
                                    </div>
                                </div>

                                <h3 className="text-center font-semibold text-gray-700 mb-2 text-sm">
                                    Tarifa elegida
                                </h3>
                                <div className="bg-slate-500 text-white rounded-lg px-3 py-2 flex justify-between text-sm">
                                    <span>{reserva.tarifa.nombre}</span>
                                    <span>${reserva.tarifa.precio}</span>
                                </div>
                            </div>

                            {/* Divisor */}
                            <div className="w-px bg-gray-200 self-stretch"></div>

                            {/* Columna derecha: detalles */}
                            <div className="flex-1">
                                <h2 className="text-base font-bold text-gray-800 mb-3 text-center">
                                    Desde {reserva.origen} hasta {reserva.destino}
                                </h2>

                                <div className="flex gap-4">
                                    {/* Info */}
                                    <ul className="flex-1 flex flex-col gap-1.5 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            ID: {reserva.id}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            Numero de asiento: {reserva.numeroAsiento}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            Fecha de reserva: {reserva.fechaReserva}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            Fecha modificación: {reserva.fechaModificacion}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            Cancelada: {reserva.cancelada}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                                            Modificada: {reserva.modificada}
                                        </li>
                                    </ul>

                                    {/* Botones */}
                                    <div className="flex flex-col gap-3 justify-center">
                                        <button
                                            onClick={() => cancelarReserva(reserva.id)}
                                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2 text-sm font-medium cursor-pointer transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => modificarReserva(reserva.id)}
                                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2 text-sm font-medium cursor-pointer transition-colors"
                                        >
                                            Modificar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
