"use client";
import { useEffect, useState } from "react";
import Modal from "../utils/Modal";
import { useSearchParams } from "next/navigation";

export default function Ubicacion() {
    const [estado, setEstado] = useState("");
    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const vieneDeQr = searchParams.get("from") === "qr"

    const obtenerUbicacion = () => {
        if (!navigator.geolocation) {
            setEstado("La geolocalización no es compatible con este navegador");
            return;
        }
        setEstado("Obteniendo ubicación...")

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
                setEstado("Listo!")
                setOpen(false);
            },
            () => {
                setEstado("No se pudo obtener la ubicación")
            }
        );
    };

    useEffect(() => {
        if (vieneDeQr) {
            setOpen(true);
        }
    }, [vieneDeQr]);

    if (!vieneDeQr) return null;

    return (
        <div className="text-center flex">
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold">
                        Registro de Ubicación
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Para continuar, necesitamos acceder a su ubicación actual con fines de registro.
                        Esta información será utilizada únicamente para los propósitos establecidos.
                    </p>
                    <button onClick={obtenerUbicacion} className="bg-green-600 hover:bg-green-700 p-3 mt-5 rounded-4xl text-white ">
                        Aceptar y continuar
                    </button>
                    {estado && (
                        <p className="mt-4 text-sm text-gray-500">
                            {estado}
                        </p>
                    )}
                </div>

            </Modal>

        </div>
    )
}