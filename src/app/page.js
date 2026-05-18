"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-t-4 border-slate-800 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold text-slate-800">AeroSystem</h1>

          <div className="flex gap-4">
            <button onClick={() => router.push('/auth/login')} className="px-6 py-2 rounded-full border border-slate-800 text-slate-800 hover:bg-slate-100">
              Iniciar sesión
            </button>

            <button onClick={() => router.push('/auth/registro')} className="px-6 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700">
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-600 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Viaja a tu destino <br />
            de forma segura
          </h2>

          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
            Reserva vuelos nacionales e internacionales de manera rápida,
            sencilla y segura desde cualquier lugar.
          </p>

          <button onClick={() => router.push('/auth/login')} className="bg-white text-slate-800 px-10 py-3 rounded-full font-semibold hover:bg-gray-200">
            Iniciar Sesion
          </button>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gray-700 mb-12">
            ¿Por qué viajar con nosotros?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">
                Vuelos seguros
              </h4>
              <p className="text-gray-500">
                Las mejores aerolíneas y destinos para tu comodidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">
                Pago fácil
              </h4>
              <p className="text-gray-500">
                Diferentes métodos de pago para realizar tus reservas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">
                Atención 24/7
              </h4>
              <p className="text-gray-500">
                Soporte y atención para cualquier inconveniente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
