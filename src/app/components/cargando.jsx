export default function Cargando() {
    return (
        <div className="min-h-screen flex w-full items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
                <p className="text-gray-600 text-lg font-medium">
                    Cargando...
                </p>
            </div>
        </div>
    )
}