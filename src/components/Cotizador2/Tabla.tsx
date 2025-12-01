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
    datosCotiza: Envio | null;
    listaPaqueterias: Paqueteria[];
}

export default function Tabla({ datosCotiza, listaPaqueterias }: PropsTabla) {
    const [cotizaciones, setCotizaciones] = useState<any[]>([]);
    const [listaOrdenada, setListaOrdenada] = useState<any[]>([])

    function ordenarPorPrecio(precios: Rate[]): Rate[] {
        return [...precios].sort((a, b) => a.totalPrice - b.totalPrice);
    }

    const handleCotizacionEnvia = async () => {
        console.log(listaPaqueterias);
        try {
            const peticiones = listaPaqueterias.map(async (paq) => {

                const body = {
                    origin: {
                        number: datosCotiza?.origin.number,
                        postalCode: datosCotiza?.origin.postalCode,
                        type: datosCotiza?.origin.type,
                        street: datosCotiza?.origin.street,
                        district: datosCotiza?.origin.district,
                        city: datosCotiza?.origin.city,
                        state: datosCotiza?.origin.state,
                        references: datosCotiza?.origin.references,
                        name: datosCotiza?.origin.name,
                        company: datosCotiza?.origin.company,
                        email: datosCotiza?.origin.email,
                        phone: datosCotiza?.origin.phone,
                        country: datosCotiza?.origin.country,
                        phone_code: datosCotiza?.origin.phone_code,
                        address_id: datosCotiza?.origin.address_id,
                        category: datosCotiza?.origin.category
                    },

                    destination: {
                        number: datosCotiza?.destination.number,
                        postalCode: datosCotiza?.destination.postalCode,
                        type: datosCotiza?.destination.type,
                        street: datosCotiza?.destination.street,
                        district: datosCotiza?.destination.district,
                        city: datosCotiza?.destination.city,
                        state: datosCotiza?.destination.state,
                        reference: datosCotiza?.destination.reference,
                        name: datosCotiza?.destination.name,
                        company: datosCotiza?.destination.company,
                        email: datosCotiza?.destination.email,
                        phone: datosCotiza?.destination.phone,
                        country: datosCotiza?.destination.country,
                        phone_code: datosCotiza?.destination.phone_code,
                        address_id: datosCotiza?.destination.address_id,
                        identificationNumber: datosCotiza?.destination.identificationNumber,
                        category: datosCotiza?.destination.category
                    },

                    packages: datosCotiza?.packages.map(pkg => ({
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
                        currency: datosCotiza?.settings.currency,
                    },

                    shipment: {
                        type: datosCotiza?.shipment.type,
                        carrier: paq.code === datosCotiza?.destination.country ? paq.name :"" 
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
                console.log("Datos recibidos de la API:", paq.name, data);
                return data;

            });

            // Esperar todas las cotizaciones
            const resultados = await Promise.all(peticiones);

            console.log("RESULTADOS DE TODAS LAS PAQUETERÍAS", resultados);
            const resultadosValidos = resultados
                .filter(r => r.meta === "rate" && Array.isArray(r.data))
                .flatMap(r => r.data);

            console.log("COTIZACIONES FILTRADAS:", resultadosValidos);

            setCotizaciones(resultadosValidos);
            const ordenado = ordenarPorPrecio(resultadosValidos);
            setListaOrdenada(ordenado)

        } catch (error) {
            console.error("Error enviando cotizaciones:", error);
        }
    };

    useEffect(() => {
        if (!datosCotiza) return;

        console.log("Nueva cotización recibida, recalculando...");
        handleCotizacionEnvia();

    }, [datosCotiza])

        useEffect(() => {
        console.log("LISTA ORDENADA", listaOrdenada);

    }, [listaOrdenada])

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
                        <th className="border">Selector</th>

                    </tr>
                </thead>
                <tbody className="border">
                    {listaOrdenada.map((rate, index) => (
                        <tr key={index} className="border text-center hover:bg-red-500 transition duration-100">
                            <td className="border py-2">{rate.carrier} </td>
                            <td className="border py-2">{rate.basePrice}  {rate.currency}</td>
                            <td className="border py-2">{rate.totalPrice}  {rate.currency}</td>
                            <td className="border py-2">{rate.deliveryEstimate == "{{value}} días" ?  "2-3 dias"  : rate.deliveryEstimate}</td>
                            <td className="border py-2"><button className="text-black hover:text-white hover:bg-green-700">Select</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}