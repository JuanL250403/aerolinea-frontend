export function ReservaCard({ reserva, cancelarReserva, modificarReserva, confirmarReserva }) {
    return (
        <div className="border border-gray-300 rounded-2xl p-6 bg-white shadow-sm max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* Datos pasajero + tarifa */}
                <div className="border-r border-gray-300 pr-6">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                        Pasajero
                    </h2>

                    <div className="bg-slate-600 text-white rounded-lg overflow-hidden text-sm">
                        <div className="grid grid-cols-2 px-4 py-3 font-medium bg-slate-600">
                            <span>{reserva.pasajero}</span>
                            <span>{reserva.pasaporte}</span>
                        </div>

                        <div className="px-4 py-3 bg-slate-500">
                            Fecha nacimiento: {new Date(reserva.fechaNacimiento).toLocaleDateString()}
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 text-center mt-6 mb-3">
                        Tarifa elegida
                    </h3>

                    <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between">
                        <span>{reserva.vueloTarifa?.tarifa}</span>
                        <span>$ {reserva.vueloTarifa?.precio}</span>
                    </div>
                </div>

                {/* Información reserva */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 leading-tight">
                        Desde El Salvador, La Libertad hasta España, Madrid
                    </h2>

                    <ul className="space-y-3 text-gray-600">
                        <li> ID: {reserva.id}</li>
                        <li>Número de asiento: {reserva.numeroAsiento}</li>
                        <li>Fecha de vuelo: {new Date(reserva.fechaVuelo).toLocaleDateString()}</li>
                        <li>Estado: {reserva.estado} </li>
                        <li> Puede cancelar: {reserva.vueloTarifa?.cancelacion ? 'si' : 'no'}</li>
                        <li>Modificada: {reserva.vueloTarifa?.cambios ? 'si' : 'no'}</li>
                    </ul>
                </div>

                {reserva.estado === "CONFIRMADA" || reserva.estado === "PENDIENTE" ?

                    < div className="flex flex-col justify-center gap-4 h-full pt-10">

                        {reserva.vueloTarifa?.cancelacion ?
                            <button onClick={() => cancelarReserva(reserva.id)} className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-full">
                                Cancelar
                            </button>
                            :
                            <></>
                        }


                        {reserva.vueloTarifa?.cambios ?

                            <button onClick={() => modificarReserva(reserva.id)} className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full">
                                Modificar
                            </button>
                            :
                            <></>
                        }

                        {reserva.estado !== "CONFIRMADA" ?
                            <button
                                onClick={() => confirmarReserva(reserva.id)}
                                className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-full">
                                Confirmar y pagar
                            </button>
                            :
                            <></>
                        }

                    </div>
                    :
                    <></>
                }
            </div>
        </div >
    )
}