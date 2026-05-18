
import Nav from "./components/nav";

export default function UsuarioLayout({ children }) {

    return (
        <div className="min-h-screen w-full bg-gray-100">
            <Nav />
            <div className="flex w-full min-h-screen">
                <main className="flex w-full bg-gray-100">{children}</main>
            </div>
            {/* Contenido dinámico */}
        </div>
    )
}