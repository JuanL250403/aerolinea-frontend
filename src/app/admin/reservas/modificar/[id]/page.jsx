"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../../../api"
import TarifaData from "../components/tarifaData"
import { useRouter, useParams } from "next/navigation"
import { showToast } from "nextjs-toast-notify"

export default function Reservar() {
    const route = useRouter()
    const params = useParams()

    const [vueloTarifa, setVueloTarifa] = useState({})
    const [reserva, setReserva] = useState()
    const [cargando, setCargando] = useState(true)
    const searchParams = useSearchParams()

    const [numeroAsiento, setNumeroAsiento] = useState(0);

    const cargarDatos = async () => {
        setCargando(true)
        await peticionesAuth.get(`reservas/${params.id}`).then(async (response) => {
            setReserva(response.data)
            await peticionesAuth.get(`vuelos/tarifa/${response.data.vueloTarifa.id}`)
                .then(response => {
                    setVueloTarifa(response.data)
                    console.log(response.data)
                })
            setCargando(false)
        })

    }

    useEffect(() => {
        cargarDatos()
    }, [])

    const handleModificar = async () => {

        await peticionesAuth.put(`/reservas/${params.id}`,
            {
                numeroAsiento,
            }
        )
            .then((response) => {
                showToast.success("Reserva modificada")
            })


    }

    if (cargando) {
        return (
            <div className="min-h-screen bg-white w-full px-6 py-10">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-14">
                    Cargando reserva
                </h1>
            </div>
        )
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
                            <div className="w-full  rounded-xl px-4 py-3 text-gray-700">
                                {reserva.pasajero}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Número de pasaporte
                                </label>
                                <div className="w-full  rounded-xl px-4 py-3 text-gray-700">
                                    {reserva.pasaporte}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Fecha de nacimiento
                                </label>
                                <div className="w-full  rounded-xl px-4 py-3 text-gray-700">
                                    {reserva.fechaNacimiento}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-2">
                                Número de asiento (opcional)
                            </label>
                            <input
                                type="number"
                                value={numeroAsiento}
                                onChange={(t) => setNumeroAsiento(Number(t.currentTarget.value))}
                                className="w-full bg-gray-300 rounded-xl px-4 py-3 outline-none"
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={() => handleModificar()}
                                className="bg-slate-900 text-white px-14 py-3 rounded-full"
                            >
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