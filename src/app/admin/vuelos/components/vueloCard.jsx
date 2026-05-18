export default function VueloCard({vuelo}) {
    return (
        <div
            className="border border-gray-300 rounded-xl p-5 flex gap-6"
        >
            {/* Tarifas */}
            <div className="w-44 shrink-0">
                <h3 className="text-center font-semibold text-gray-700 mb-3 text-sm">
                    Tarifas
                </h3>
                <div className="flex flex-col gap-2">
                    {vuelo.tarifas.map((tarifa, i) => (
                        <div
                            key={i}
                            className="bg-slate-500 text-white rounded-md flex justify-between items-center px-3 py-2 text-sm"
                        >
                            <span>{tarifa.tarifa}</span>
                            <span>${tarifa.precio}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divisor */}
            <div className="w-px bg-gray-200 self-stretch"></div>

            {/* Detalles */}
            <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
                    Desde {vuelo.origen} hasta {vuelo.destino}
                </h2>
                <ul className="flex flex-col gap-1.5 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                        {vuelo.aerolinea}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                        Duración de vuelo: {vuelo.duracion}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                        Avión: {vuelo.avion}
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0"></span>
                        {vuelo.estado}
                    </li>
                </ul>
            </div>
        </div>
    )
}