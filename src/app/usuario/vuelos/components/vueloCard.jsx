export default function VueloCard({ vuelo, router }) {
    
    
    const reservar = (vueloTarifa) => {
        router.push(`/usuario/reservar?vueloTarifa=${vueloTarifa}`)
    }
    
    return (
        <div
            className="border border-gray-400 rounded-lg p-6 bg-white shadow-sm"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tarifas */}
                <div>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                        Selecciona una tarifa
                    </h2>
                    <div className="space-y-3">
                        {vuelo.tarifas.map((tarifa, index) => (
                            <div onClick={() => reservar(tarifa.id)} key={index} className="bg-slate-600 text-white px-5 py-4 rounded-lg flex justify-between">
                                <span>{tarifa.tarifa}</span>
                                <span>${tarifa.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Información vuelo */}
                <div>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                        Desde {vuelo.origen} hasta {vuelo.destino}
                    </h2>

                    <ul className="space-y-4 text-gray-600 text-lg">
                        <li>{vuelo.aerolinea}</li>
                        <li>Duración de vuelo: {vuelo.duracion} horas</li>
                        <li>Avión: {vuelo.avion}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}