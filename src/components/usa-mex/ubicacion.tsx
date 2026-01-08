"use client";
import { useEffect, useState } from "react";
import Modal from "../utils/Modal";

export default function Ubicacion() {
    const [estado, setEstado] = useState("");
    const [open, setOpen] = useState(false);
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

                setEstado(`Ubicación registrada: ${lat}, ${lon}`);

                await fetch("/api/location", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        latitud: lat,
                        longitud: lon,
                        fecha: new Date().toISOString(),
                    }),
                });
                
            },
            () => {
                setEstado("No se pudo obtener la ubicación")
            }
        );
    };
    useEffect(() => {
        setOpen(true);
    }, []);
    return (
        <div className="text-center flex">
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className="text-center ">
                    <h2>REGISTRO DE UBICACION</h2>
                    <p>Este sitio registrará tu ubicación exacta</p>

                    <button onClick={obtenerUbicacion} className="bg-green-600 hover:bg-green-700 p-3 mt-5 rounded-4xl text-white ">
                        Aceptar y continuar
                    </button>
                    <p>{estado}</p>
                </div>

            </Modal>

        </div>
    )
}