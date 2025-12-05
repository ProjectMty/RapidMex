"use client"
import React, { useEffect, useState } from "react";
import { Rate } from "@/types/RespuestaApi";
import { Envio } from "@/types/Envio";
import { typePaqueteria } from "@/types/Paqueterias";
interface Paqueteria {
    code: string;
    name: string;
}
interface PropsTabla {
    body: string;
    select: string;
    paqueteria: string;
    listaPaqueterias: Paqueteria[];
}

export default function Tabla({ body, select, paqueteria, listaPaqueterias }: PropsTabla) {
    const [listaOrdenada, setListaOrdenada] = useState<any[]>([])
    const [seleccion, setSeleccion] = useState<any[]>([])
    const [Form, setForm] = useState<Envio | null>(null)

    useEffect(() => {
        localStorage.removeItem("select1");
        localStorage.removeItem("select2");
        const load = () => {
            const saved = localStorage.getItem(body);
            if (saved) setForm(JSON.parse(saved));
        };

        window.addEventListener("localstorage-update", load);
        load();

        return () => {
            window.removeEventListener("localstorage-update", load);
        };
    }, [body]);

    useEffect(() => {
        if (!Form) return;
        console.log("Nueva cotización recibida, recalculando...");
        handleCotizacionEnvia();
    }, [Form])

    // limpieza al  recargar la pagina
    useEffect(() => {
        setListaOrdenada([]);
        setSeleccion([]);
        setForm(null);
    }, [])

    function ordenarPorPrecio(precios: Rate[]): Rate[] {
        return [...precios].sort((a, b) => a.totalPrice - b.totalPrice);
    }

    const handleCotizacionEnvia = async () => {
        setListaOrdenada([]);
        setSeleccion([]);
        try {
            const peticiones = listaPaqueterias.map(async (paq) => {

                const body = {
                    origin: {
                        number: Form?.origin.number,
                        postalCode: Form?.origin.postalCode,
                        type: Form?.origin.type,
                        street: Form?.origin.street,
                        district: Form?.origin.district,
                        city: Form?.origin.city,
                        state: Form?.origin.state,
                        references: Form?.origin.references,
                        name: Form?.origin.name,
                        company: Form?.origin.company,
                        email: Form?.origin.email,
                        phone: Form?.origin.phone,
                        country: Form?.origin.country,
                        phone_code: Form?.origin.phone_code,
                        address_id: Form?.origin.address_id,
                        category: Form?.origin.category
                    },

                    destination: {
                        number: Form?.destination.number,
                        postalCode: Form?.destination.postalCode,
                        type: Form?.destination.type,
                        street: Form?.destination.street,
                        district: Form?.destination.district,
                        city: Form?.destination.city,
                        state: Form?.destination.state,
                        reference: Form?.destination.reference,
                        name: Form?.destination.name,
                        company: Form?.destination.company,
                        email: Form?.destination.email,
                        phone: Form?.destination.phone,
                        country: Form?.destination.country,
                        phone_code: Form?.destination.phone_code,
                        address_id: Form?.destination.address_id,
                        identificationNumber: Form?.destination.identificationNumber,
                        category: Form?.destination.category
                    },

                    packages: Form?.packages.map(pkg => ({
                        type: pkg.type,
                        content: pkg.content,
                        amount: pkg.amount,
                        name: pkg.name,
                        declaredValue: pkg.declaredValue,
                        lengthUnit: pkg.lengthUnit,
                        weightUnit: pkg.weightUnit,
                        weight: pkg.weight,
                        dimensions: {
                            length: pkg.dimensions.length,
                            width: pkg.dimensions.width,
                            height: pkg.dimensions.height,
                        }
                    })),

                    settings: {
                        currency: Form?.settings.currency,
                    },

                    shipment: {
                        type: Form?.shipment.type,
                        carrier: paq.code === Form?.destination.country ? paq.name : ""
                    },
                };

                const response = await fetch("/api/precios", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                const data = await response.json();
                return data;

            });

            // Esperar todas las cotizaciones
            const resultados = await Promise.all(peticiones);
            const resultadosValidos = resultados
                .filter(r => r.meta === "rate" && Array.isArray(r.data))
                .flatMap(r => r.data);

            console.log("COTIZACIONES FILTRADAS:", resultadosValidos);

            const ordenado = ordenarPorPrecio(resultadosValidos);
            setListaOrdenada(ordenado)
            localStorage.setItem(paqueteria, JSON.stringify(ordenado));


        } catch (error) {
            console.error("Error enviando cotizaciones:", error);
        }
    };

    const handleSelect = async (rate: any[]) => {
        setSeleccion(rate);
        localStorage.setItem(select, JSON.stringify(rate))
    }

    return (
        <div className="relative mt-5 mb-5">
            <h2 className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Cotizaciones Ordenadas</h2>
            <table className="w-full mt-3">
                <thead>
                    <tr className="border">
                        <th className="border">Paquetería</th>
                        <th className="border">Precio base</th>
                        <th className="border">Precio total</th>
                        <th className="border">Duración</th>
                        <th className="border">Servicio</th>
                        <th className="border">Selector</th>

                    </tr>
                </thead>
                <tbody className="border">
                    {listaOrdenada.map((rate, index) => (
                        <tr key={index} className={`border text-center transition duration-100 ${seleccion == rate ? "bg-red-500/80" : "bg-white  hover:bg-red-500/20"}`}>
                            <td className="border py-2">{rate.carrier} </td>
                            <td className="border py-2">{rate.basePrice}  {rate.currency}</td>
                            <td className="border py-2">{rate.totalPrice}  {rate.currency}</td>
                            <td className="border py-2">{rate.deliveryEstimate == "{{value}} días" ? "Indefinido" : rate.deliveryEstimate}</td>
                            <td className="border py-2">{rate.service}</td>
                            <td className={`border py-2 transition duration-150   ${seleccion == rate ? "bg-red-500" : "hover:bg-green-700/50"}`}><button className="w-full h-full" onClick={() => handleSelect(rate)}>Select</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}