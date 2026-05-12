"use client"

import { useEffect } from "react";
import { VueloCard } from "./components/reservaCard";
import { peticionesAuth } from "../../../../api";

export default function Reservas() {

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
                Tus reservas
            </h1>

            {/* Buscador */}
            <div className="flex flex-col items-center mb-12">
                <label className="text-gray-600 mb-3">Buscar por id de reserva</label>
                <div className="flex gap-4">
                    <input
                        type="text"
                        className="bg-gray-300 rounded-full px-5 py-2 w-64 outline-none"
                    />
                    <button className="bg-slate-800 text-white px-8 py-2 rounded-full">
                        Buscar
                    </button>
                </div>
            </div>

            {/* Lista reservas */}
            <div className="space-y-10 max-w-6xl mx-auto">
                {[1, 2].map((item, index) => (
                    <VueloCard key={index}/>
                ))}
            </div>
        </div>
    )
}