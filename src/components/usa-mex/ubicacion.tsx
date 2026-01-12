"use client";
import { useEffect } from "react";

import { useSearchParams } from "next/navigation";

export default function Ubicacion() {
    const searchParams = useSearchParams();
    const vieneDeQr = searchParams.get("from") === "qr"

    useEffect(() => {
        if (!vieneDeQr) return;

        const yaEnviado = localStorage.getItem("ubicacion_enviada");
        if (yaEnviado) {
            console.log("la ubicacion ya fue enviada anteriormente")
            return;
        }

        if (!navigator.geolocation) {
            console.log("La geolocalización no es compatible con este navegador");
            return;
        }
        console.log("Obteniendo ubicación...")

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude

                const ahora = new Date();
                const fecha = ahora.toLocaleString("es-MX", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });

                await fetch("/api/location", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        latitud: lat,
                        longitud: lon,
                        fecha,
                    }),
                });
                localStorage.setItem("ubicacion_enviada", "true");
                console.log("Listo!")

            },
            () => {
                console.log("No se pudo obtener la ubicación")
            }
        );

    }, [vieneDeQr]);

    if (!vieneDeQr) return null;

    return (
        <div className="text-center flex">
        </div>
    )
}