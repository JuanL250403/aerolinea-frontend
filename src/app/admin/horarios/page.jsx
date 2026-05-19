"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"
import Cargando from "@/app/components/cargando"
export default function TarifasRegistradas() {
    const route = useRouter()

    const [horarios, setHorarios] = useState([])

    const cargarHorarios = async () => {

        await peticionesAuth.get('horarios')
            .then((response) => setHorarios(response.data))

    }

    const handlerRegistrarHorario = () => {
        route.push('/admin/registrarHorario')
    }

    useEffect(() => {
        cargarHorarios()
    }, [])

    if(horarios.length === 0){
        return(
            <Cargando/>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white">

            {/* Contenido */}
            <div className="max-w-3xl mx-auto px-6 pt-12">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                    Horarios Registrados
                </h1>

                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => handlerRegistrarHorario()}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 py-3 text-sm font-medium cursor-pointer transition-colors"
                    >
                        Registrar horario
                    </button>
                </div>

                {/* Tabla */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Encabezado */}
                    <div className="grid grid-cols-3 bg-slate-600 text-white text-sm px-4 py-2.5">
                        <span>Fecha y hora de Salida</span>
                        <span>Fecha y hora de Llegada</span>
                        <span>Duracion de vuelo</span>
                    </div>

                    {/* Filas */}
                    {horarios.map((horario, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-3 text-sm px-4 py-3 text-gray-700 border-b border-gray-200 last:border-b-0`}
                        >
                            <span>{new Date(horario.fechaHoraSalida).toLocaleString()}</span>
                            <span>{new Date(horario.fechaHoraLlegada).toLocaleString()}</span>
                            <span>{horario.duracion}</span>
                        </div>
                    ))}

                    {/* Fila vacía extra para imitar el diseño */}
                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    )
}
