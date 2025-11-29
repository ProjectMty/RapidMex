"use client";

import { useEffect, useState } from "react";
interface PropsPaqueteria {
    pais: string;
    Seleccion: (data: string) => void;
}

export default function Paqueteria({ pais, Seleccion }: PropsPaqueteria) {
    type Paqueteria = {
        id: number;
        name: string;
        country_code: string;
        "track_url": string;
        "logo": string;
        "box_weight_limit": number;
        "pallet_weight_limit": number;
        "pickup_sameday": number;
        "pickup_start_time": number;
        "pickup_end_time": number;
        "pickup_span_time": number;
        "pickup_sameday_limit_time": number;
    };

    const [paqueterias, setPaqueterias] = useState<Paqueteria[]>([]);
    const [paqueteriaSeleccionada,  setPaqueteriaSeleccionada] = useState("")

    // CHECAR API SI ENVIA  DATOS PERO NO LEE EL ARREGLO SALE VACIO
    useEffect(() => {
        const BuscarPaqueterias = async () => {
            try {
                const url = `/api/paqueteria?code=${pais}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();

                let lista = [];

                if (Array.isArray(data)) {
                    lista = data;
                } else if (Array.isArray(data.data)) {
                    lista = data.data;
                } else if (Array.isArray(data.carriers)) {
                    lista = data.carriers;
                }

                setPaqueterias(lista);
            } catch (error) {
                console.error("Error al obtener paqueterías", error);
            }
        };

         if (pais) BuscarPaqueterias();
    }, [pais]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setPaqueteriaSeleccionada(selected)
        Seleccion(selected);
    };

    return (
        <div className="relative">
            <select name="" id="" className="w-full border p-2 rounded-[10px]"
            value={paqueteriaSeleccionada}
            onChange={handleSelect}
            >
                <option value="">Selecciona una paqueteria</option>
                {paqueterias.map((paq) => (
                    <option key={paq.id} value={paq.name}>{paq.name} </option>
                ))}
            </select>
        </div>
    )
}