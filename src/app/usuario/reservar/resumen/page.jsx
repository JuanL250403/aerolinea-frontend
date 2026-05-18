'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../../api"
import Cargando from "@/app/components/cargando"

export default function ResumenReserva() {
    const searchParams = useSearchParams()
    const route = useRouter()

    const reservaId = searchParams.get('reserva')
    const [reserva, setReserva] = useState()
    const [cargando, setCargando] = useState(true)

    const cargarResumen = async () => {
        setCargando(true)
        await peticionesAuth.get(`reservas/${reservaId}`)
            .then((response) => {
                setReserva(response.data)
            })
        setCargando(false)
    }

    useEffect(() => {
        cargarResumen()
    }, [])

    const handlerConfirmar = () => {
        route.push(`/usuario/pago?reserva=${reservaId}`)
    }

    const handlerVerReservas = () => {
        route.push('/usuario/reservas')
    }

    if(cargando){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-16">
                    Resumen de tu reserva
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Pasajero */}
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">
                            Pasajero
                        </h2>

                        <div className="bg-slate-600 text-white rounded-lg overflow-hidden mb-6">
                            <div className="grid grid-cols-2 px-5 py-4 font-medium">
                                <span>{reserva.pasajero}</span>
                                <span>{reserva.pasaporte}</span>
                            </div>

                            <div className="px-5 py-3 bg-slate-500">
                                Fecha nacimiento: {reserva.fechaNacimiento}
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                            Tarifa elegida
                        </h2>

                        <div className="bg-slate-600 text-white rounded-lg px-5 py-4 flex justify-between max-w-sm mx-auto">
                            <span>{reserva.vueloTarifa.tarifa}</span>
                            <span>${reserva.vueloTarifa.precio}</span>
                        </div>
                    </div>

                    {/* Detalles vuelo */}
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                            Desde {reserva.ruta.origen} hasta {reserva.ruta.destino}
                        </h2>

                        <ul className="space-y-4 text-gray-600 text-lg">
                            <li>ID: {reserva.id}</li>
                            <li>Numero de asiento: {reserva.numeroAsiento}</li>
                            <li>Fecha de vuelo: {reserva.fechaVuelo}</li>
                            <li>Puede cancelar: {reserva.vueloTarifa.cancelacion ? 'si' : 'no'}</li>
                            <li>Puede modificar: {reserva.vueloTarifa.cambios ? 'si' : 'no'}</li>
                        </ul>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-14">
                    <button onClick={() => handlerConfirmar()} className="bg-slate-900 text-white px-10 py-3 rounded-full">
                        Confirmar y pagar
                    </button>

                    <button onClick={() => handlerVerReservas()} className="bg-slate-900 text-white px-10 py-3 rounded-full">
                        Ver mis reservas
                    </button>
                </div>
            </div>
        </div>
    )
}