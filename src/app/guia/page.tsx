
import GenerarGuia from "@/Vista/Cotizador/GeneradorGuia"
import Navbar from "@/Vista/Empleados/Navbar/navbar"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function cotizaPage() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) {
        redirect("/login")
    } else {
        return (
            <main>
                <Navbar />

                <GenerarGuia />
            </main>
        )
    }



}