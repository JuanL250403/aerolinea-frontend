export default function UsuarioLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="border-t-4 border-gray-800 bg-white shadow-sm">
                <div className="flex justify-end gap-10 px-8 py-2 text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                        Rol usuario
                        <i className="fa-solid fa-user-gear"></i>
                    </span>

                    <span className="flex items-center gap-1">
                        Nombre usuario
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </header>

            {/* Contenido dinámico */}
            <main>{children}</main>
        </div>
    )
}