"use client"

import { useEffect, useState } from "react";
import { ReservaCard } from "./components/reservaCard";
import { peticionesAuth } from "../../../../api";
import { showToast } from "nextjs-toast-notify";
import { useRouter } from "next/navigation";

export default function Reservas() {
    const route = useRouter()

    const [reservas, setReservas] = useState([])

    const cargarReservas = async () => {
        await peticionesAuth('reservas/usuario')
            .then((response) => setReservas(response.data))
    }

    useEffect(() => {
        cargarReservas()
    }, [])

    const conmfirmarReserva = (id) => {
        route.push(`/usuario/pago?reserva=${id}`)
    }

    const modificarReserva = (id) => {
        route.push(`/usuario/reservas/modificar/${id}`)
    }

    const cancelarReserva = async (id) => {
        await peticionesAuth.delete(`/reservas/${id}`).then(() => showToast.success('Reserva cancelada'))
        await cargarReservas()
    }

    return (
        <div className="min-h-screen bg-white w-full px-6 py-8">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
                Tus reservas
            </h1>

            {reservas.length !== 0 ?
                <div className="space-y-10 max-w-6xl mx-auto">
                    {reservas.map((reserva, index) => (
                        <ReservaCard reserva={reserva} key={index} cancelarReserva={cancelarReserva} modificarReserva={modificarReserva} confirmarReserva={conmfirmarReserva} />
                    ))}
                </div>
                :
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-8">
                    Sin reservas
                </h1>
            }

        </div>
    )
}