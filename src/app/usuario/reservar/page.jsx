"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import TarifaData from "./components/tarifaData"
import { useRouter } from "next/navigation"

export default function Reservar() {
    const route = useRouter()
    const [vueloTarifa, setVueloTarifa] = useState({})
    const searchParams = useSearchParams()
    const vueloTarifaId = searchParams.get("vueloTarifa")

    const [pasajero, setPasajero] = useState("");
    const [pasaporte, setPasaporte] = useState("");
    const [numeroAsiento, setNumeroAsiento] = useState(0);
    const [fechaNacimiento, setfechaNacimiento] = useState("")

    const obtenerVueloTarifa = async () => {
        await peticionesAuth.get(`vuelos/tarifa/${vueloTarifaId}`)
            .then(response => setVueloTarifa(response.data))
    }

    useEffect(() => {
        obtenerVueloTarifa()
    }, [])

    const handleReservar = async () => {

        await peticionesAuth.post('/reservas',
            {
                usuarioId: 1,
                pasajero,
                pasaporte,
                numeroAsiento,
                fechaNacimiento,
                vueloTarifaId
            }
        )
            .then((response) => {
                route.push(`/usuario/reservar/resumen?reserva=${response.data.id}`)
            })


    }


    return (
        <div className="min-h-screen bg-white w-full px-6 py-10">

            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-14">
                    Realizar tu reserva
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Formulario */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-gray-600 mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                placeholder="Pasajero"
                                onChange={(t) => setPasajero(t.currentTarget.value)}
                                className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Número de pasaporte
                                </label>
                                <input
                                    type="text"
                                    placeholder="Pasaporte"
                                    onChange={(t) => setPasaporte(t.currentTarget.value)}
                                    className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Fecha de nacimiento
                                </label>
                                <div className="flex items-center bg-gray-300 rounded-xl px-4 py-3">
                                    <input
                                        type="date"
                                        placeholder="dd/mm/yyyy"
                                        onChange={(t) => setfechaNacimiento(t.currentTarget.value)}
                                        className="w-full bg-transparent outline-none"
                                    />
                                    <i className="fa-solid fa-calendar text-gray-700"></i>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-2">
                                Número de asiento (opcional)
                            </label>
                            <input
                                type="number"
                                onChange={(t) => setNumeroAsiento(Number(t.currentTarget.value))}
                                className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button onClick={() => handleReservar()} className="bg-slate-900 text-white px-14 py-3 rounded-full">
                                Reservar
                            </button>
                        </div>
                    </div>

                    {/* Tarifa elegida */}
                    <TarifaData tarifa={vueloTarifa} />
                </div>
            </div>
        </div>
    )
}