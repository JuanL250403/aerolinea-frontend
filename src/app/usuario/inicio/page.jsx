"use client"

import { useEffect, useState } from "react"
import { peticionesAuth } from "../../../../api"
import { useRouter } from "next/navigation"
export default function InicioUsuario() {
    const [origenes, setOrigenes] = useState([])
    const [destinos, setDestinos] = useState([])

    const [origen, setOrigen] = useState()
    const [destino, setDestino] = useState()
    const [fechaHoraSalida, setFechaHoraSalida] = useState()

    const router = useRouter()

    const cargarRutas = async () => {
        peticionesAuth.get("/rutas")
            .then((response) => {
                let ori = []
                let des = []
                response.data.map((ruta) => {
                    if (!ori.includes(ruta.origen)) {
                        ori.push(ruta.origen)
                    }
                })

                response.data.map((ruta) => {
                    if (!des.includes(ruta.destino)) {
                        des.push(ruta.destino)
                    }
                })

                setOrigenes(ori)
                setDestinos(des)
            })
    }

    const buscarVuelos = () => {
        if(!origen || !destino || !fechaHoraSalida){
            return
        }
        router.push(`/usuario/vuelos?origen=${origen}&destino=${destino}&fechaHora=${fechaHoraSalida}`)
    }

    useEffect(() => {
        cargarRutas()
    }, [])

    useEffect(() => {
        console.log(origen)
        console.log(destino)
        console.log(fechaHoraSalida)
    }, [origen, destino, fechaHoraSalida])


    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero */}
            <section className="bg-gray-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold leading-tight">
                    Reserva y viaja <br />
                    con nostros
                </h1>
            </section>

            {/* Buscador */}
            <section className="py-16 px-8">
                <h2 className="text-center text-xl font-semibold text-gray-700 mb-10">
                    Busca tu próximo vuelo
                </h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Origen</label>
                        <select className="w-full rounded-xl bg-gray-200 px-4 py-3 outline-none" value={origen} onChange={(e) => setOrigen(e.target.value)}>
                            <option selected>Selecciona el origen</option>
                            {origenes.map((origen, index) => (
                                <option key={index} value={origen}>{origen}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Destino</label>
                        <select className="w-full rounded-xl bg-gray-200 px-4 py-3 outline-none" value={destino} onChange={(e) => setDestino(e.target.value)}>
                            <option selected>Selecciona el destino</option>
                            {destinos.map((destino, index) => (
                                <option key={index} value={destino}>{destino}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Fecha y hora de salida
                        </label>
                        <div className="flex items-center rounded-xl bg-gray-200 px-4 py-3">
                            <input
                                type="datetime-local"
                                className="w-full bg-transparent outline-none"
                                value={fechaHoraSalida}
                                onChange={(e) => setFechaHoraSalida(e.target.value)}
                            />
                            <i className="fa-solid fa-calendar text-gray-700"></i>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="flex justify-center">
                    <button onClick={() => buscarVuelos()} className="bg-slate-900 text-white px-16 py-3 rounded-full w-full md:w-3/4">
                        Buscar vuelos
                    </button>
                </div>
            </section>

            {/* Cards inferiores */}
            <section className="px-8 pb-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-12">
                    {/* Reservas */}
                    <div className="flex justify-center">
                        <div className="bg-slate-600 w-40 h-40 rounded-md flex flex-col items-center justify-center text-white shadow-md">
                            <i className="fa-solid fa-ticket text-6xl mb-4"></i>
                            <span className="text-sm">Tus reservas</span>
                        </div>
                    </div>

                    {/* Queja */}
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                            ¿Ha tenido algún inconveniente?
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Comuníquese con nuestro centro de <br />
                            quejas y estaremos alegres de atenderle
                        </p>
                        <button className="bg-slate-800 text-white px-10 py-2 rounded-full hover:bg-slate-700">
                            Enviar queja
                        </button>
                    </div>

                    {/* Contacto */}
                    <div className="flex justify-center">
                        <div className="bg-sky-700 w-40 h-40 rounded-md flex items-center justify-center text-white shadow-md">
                            <i className="fa-solid fa-envelope text-6xl"></i>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}