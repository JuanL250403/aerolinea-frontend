'use client'
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { peticionesAuth } from "../../../../api";
import { showToast } from "nextjs-toast-notify";

export default function RealizarPago() {
    const searchParams = useSearchParams();
    const route = useRouter();

    const reservaId = searchParams.get('reserva')
    const [metodos, setMetodos] = useState([]);
    const [metodo, setMetodo] = useState(1);
    const [reserva, setReserva] = useState()

    const cargarReserva = async () => {

        await peticionesAuth.get(`reservas/${reservaId}`)
            .then((response) => {
                setReserva(response.data)
                console.log(response.data)
            })
    }

    useEffect(() => {
        cargarMetodos()
        cargarReserva()
    }, [])

    const cargarMetodos = async () => {
        await peticionesAuth.get('pagos/metodos')
            .then((response) => setMetodos(response.data))
    }

    const handlerConfirmar = async () => {
        await peticionesAuth.post('pagos', { metodoPagoId: metodo, reservaId })
            .then((response) => {
                showToast.success("Se ha registrad su pago")

                route.push("/usuario/reservas")
            })
    }

    return (
        <div className="min-h-screen w-full bg-white px-6 py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-14">
                    Confirme su reserva
                </h1>

                <div className="space-y-8">
                    {/* Método de pago */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Método de pago
                        </label>
                        <select className="w-full bg-gray-300 rounded-xl px-4 py-4 outline-none" onChange={(e) => setMetodo(Number(e.currentTarget.value))}>
                            {metodos.map((metodo, index) => (
                                <option key={index} value={metodo.id}>{metodo.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {metodo === 1 ?
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Número de tarjeta
                                </label>
                                <input
                                    type="text"
                                    placeholder="ABC123456"
                                    className="w-full bg-gray-300 rounded-xl px-4 py-4 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Fecha vencimiento
                                </label>
                                <div className="flex items-center bg-gray-300 rounded-xl px-4 py-4">
                                    <input
                                        type="text"
                                        placeholder="12/03/2026"
                                        className="w-full bg-transparent outline-none"
                                    />
                                    <i className="fa-solid fa-calendar text-gray-700"></i>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">CVS</label>
                                <input
                                    type="text"
                                    placeholder="345"
                                    className="w-full bg-gray-300 rounded-xl px-4 py-4 outline-none"
                                />
                            </div>
                        </div>
                        :
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">
                                    Número de cuenta
                                </label>
                                <input
                                    type="text"
                                    placeholder="ABC123456"
                                    className="w-full bg-gray-300 rounded-xl px-4 py-4 outline-none"
                                />
                            </div>

                        </div>
                    }
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Nombre del titular
                        </label>
                        <input
                            type="text"
                            className="w-full bg-gray-300 rounded-xl px-4 py-4 outline-none"
                        />
                    </div>
                    {/* Monto */}
                    <div className="bg-slate-600 text-white rounded-lg px-6 py-5 flex justify-between text-2xl font-semibold">
                        <span>Monto</span>
                        <span>${reserva?.vueloTarifa?.precio}</span>
                    </div>

                    {/* Botón */}
                    <div className="flex justify-between">
                        <button onClick={() => handlerConfirmar()} className="bg-slate-900 text-white px-12 py-3 rounded-full">
                            Confirmar y pagar
                        </button>
                        <button onClick={() => handlerConfirmar()} className="bg-slate-900 text-white px-12 py-3 rounded-full">
                            Ver mis reservas
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}