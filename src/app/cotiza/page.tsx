"use client"

import Cotiza from "@/components/Empleados/Cotiza/Cotiza"
import Navbar from "@/components/Empleados/Navbar/navbar"
import { main } from "framer-motion/client"

export default function cotizaPage() {
    return (
        <main>
            <Navbar />
            <Cotiza />
        </main>

    )
}