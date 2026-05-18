export default function ReservaCard({ reserva, cancelar, modificar }) {

    return (
        <div
            className="border border-gray-300 rounded-xl p-5 flex gap-6"
        >
            {/* Columna izquierda: pasajero y tarifa */}
            <div className="w-48 shrink-0">
                <h3 className="text-center font-semibold text-gray-700 mb-2 text-sm">
                    Pasajero
                </h3>
                <div className="bg-slate-500 text-white rounded-lg px-3 py-2 mb-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span>{reserva.pasajero}</span>
                        <span>{reserva.pasaporte}</span>
                    </div>
                    <div className="text-xs text-slate-200">
                        Fecha nacimiento: {reserva.fechaNacimiento}
                    </div>
                </div>

                <h3 className="text-center font-semibold text-gray-700 mb-2 text-sm">
                    Tarifa elegida
                </h3>
                <div className="bg-slate-500 text-white rounded-lg px-3 py-2 flex justify-between text-sm">
                    <span>{reserva.vueloTarifa?.tarifa}</span>
                    <span>${reserva.vueloTarifa?.precio}</span>
                </div>
            </div>

            {/* Divisor */}
            <div className="w-px bg-gray-200 self-stretch"></div>

            {/* Columna derecha: detalles */}
            <div className="flex-1">
                <h2 className="text-base font-bold text-gray-800 mb-3 text-center">
                    Desde {reserva.ruta?.origen} hasta {reserva.ruta?.destino}
                </h2>

                <div className="flex gap-4">
                    {/* Info */}
                    <ul className="flex-1 flex flex-col gap-1.5 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            ID: {reserva.id}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Numero de asiento: {reserva.numeroAsiento}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Fecha de reserva: {new Date(reserva.fechaReserva).toLocaleString()}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Fecha modificación: {reserva.fechaModificacion}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Estado: {reserva.estado}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Cancelable: {reserva.vueloTarifa?.cambios ? "si" : 'no'}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                            Modificable: {reserva.vueloTarifa?.modificada ? 'si' : 'no'}
                        </li>
                    </ul>

                    {
                        reserva.estado === "EXPIRADA" || reserva.estado === "CANCELADA" ?
                            <></>
                            :
                            <div className="flex flex-col gap-3 justify-center">
                                <button
                                    onClick={() => cancelar(reserva.id)}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2 text-sm font-medium cursor-pointer transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => modificar(reserva.id)}
                                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2 text-sm font-medium cursor-pointer transition-colors"
                                >
                                    Modificar
                                </button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}