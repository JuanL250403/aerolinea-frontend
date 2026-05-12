export function ReservaCard() {
    return (
        <div
            className="border border-gray-400 rounded-lg p-6 bg-white shadow-sm"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Datos pasajero */}
                <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Pasajero
                    </h2>

                    <div className="bg-slate-600 text-white rounded-lg overflow-hidden">
                        <div className="grid grid-cols-2 px-4 py-3 text-sm font-medium">
                            <span>Nombre pasajero</span>
                            <span>Pasaporte</span>
                        </div>

                        <div className="px-4 py-3 text-sm bg-slate-500">
                            Fecha nacimiento: 12/01/2026
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-center text-gray-700 mt-6 mb-3">
                        Tarifa elegida
                    </h3>

                    <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between">
                        <span>Estandar</span>
                        <span>$240</span>
                    </div>
                </div>

                {/* Detalles reserva */}
                <div>
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                        Desde El Salvador, La Libertad hasta España, Madrid
                    </h2>

                    <ul className="space-y-3 text-gray-600">
                        <li>⚪ ID: 123</li>
                        <li>⚪ Numero de asiento: 12</li>
                        <li>⚪ Fecha de vuelo: 02/03/2026</li>
                        <li>⚪ Confirmada y pagada: sí</li>
                        <li>⚪ Puede cancelar: sí</li>
                        <li>⚪ Modificada: no</li>
                    </ul>
                </div>

                {/* Botones */}
                <div className="flex flex-col justify-center gap-4 pt-12">
                    <button className="bg-sky-700 text-white px-6 py-2 rounded-full">
                        Cancelar
                    </button>

                    <button className="bg-slate-800 text-white px-6 py-2 rounded-full">
                        Modificar
                    </button>

                    <button className="bg-slate-900 text-white px-6 py-2 rounded-full">
                        Confirmar y pagar
                    </button>
                </div>
            </div>
        </div>
    )
}