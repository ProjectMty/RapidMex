import InformacionEnvios from "@/Vista/Detalles/Informacion"
import Navbar from "@/Vista/Empleados/Navbar/navbar"


export default async function detallesPage() {
    return (

        <main>
            <Navbar />
            <InformacionEnvios />
        </main>

    )
}