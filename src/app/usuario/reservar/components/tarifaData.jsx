export default function TarifaData({ tarifa }) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Tarifa elegida
            </h2>

            <div className="space-y-3 max-w-sm mx-auto">
                <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between items-center">
                    <span>Tipo de tarifa</span>
                    <span className="bg-slate-300 text-gray-800 px-6 py-1 rounded-xl">
                        {tarifa.tarifa}
                    </span>
                </div>

                <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between items-center">
                    <span>Cambios</span>
                    <span className="bg-slate-300 text-gray-800 px-3 py-1 rounded-xl">
                        {tarifa.cambios ? "permitidos" : "no permitidos"}
                    </span>
                </div>

                <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between items-center">
                    <span>Cancelaciones</span>
                    <span className="bg-slate-300 text-gray-800 px-3 py-1 rounded-xl">
                        {tarifa.cancelacion ? "permitidos" : "no permitidos"}
                    </span>
                </div>

                <div className="bg-slate-600 text-white rounded-lg px-4 py-3 flex justify-between items-center">
                    <span>Monto</span>
                    <span className="bg-slate-300 text-gray-800 px-6 py-1 rounded-xl">
                        {tarifa.precio}
                    </span>
                </div>
            </div>
        </div>
    )
}