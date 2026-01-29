
import GenerarGuia from "@/Vista/Cotizador/GeneradorGuia"
import Navbar from "@/Vista/Empleados/Navbar/navbar"

export default async function cotizaPage() {
    return (

        <main>
            <Navbar />
            <GenerarGuia />
        </main>

    )
}