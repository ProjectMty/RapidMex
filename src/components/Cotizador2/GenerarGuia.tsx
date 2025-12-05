"use client"
import React, { useEffect, useState } from "react";
import { Envio } from "@/types/Envio";
import { Guia } from "@/types/Guia";
export default function GenerarGuia() {
    const [guias, setguias] = useState<Guia[]>([])
    const [selected, setSelected] = useState<any[]>([])
    const [respuesta, setRespuesta] = useState<any[]>([])


    const handleCreacionGuia = async () => {
        const tempGuias: any[] = [];
        const tempSelected: any[] = [];
        for (let i = 1; i <= 3; i++) {
            const Lguia = localStorage.getItem(`body${i}`);
            const Lselect = localStorage.getItem(`select${i}`);

            if (Lguia && Lselect) {
                tempGuias[i - 1] = Lguia ? JSON.parse(Lguia) : null;
                tempSelected[i - 1] = Lselect ? JSON.parse(Lselect) : null;
            }
        }

        try {
            const peticiones = tempGuias.map(async (gui, index) => {
                const selectedCarrier = tempSelected[index];
                const body = {
                    origin: {
                        name: gui.origin.name,
                        company: gui.origin.company,
                        email: gui.origin.email,
                        phone: gui.origin.phone,
                        street: gui.origin.street,
                        number: gui.origin.number,
                        district: gui.origin.district,
                        city: gui.origin.city,
                        state: gui.origin.state,
                        country: gui.origin.country,
                        postalCode: gui.origin.postalCode,
                        references: gui.origin.references,

                    },

                    destination: {
                        name: gui.destination.name,
                        company: gui.destination.company,
                        email: gui.destination.email,
                        phone: gui.destination.phone,
                        street: gui.destination.street,
                        number: gui.destination.number,
                        district: gui.destination.district,
                        city: gui.destination.city,
                        state: gui.destination.state,
                        country: gui.destination.country,
                        postalCode: gui.destination.postalCode,
                        reference: gui.destination.reference,
                    },

                    packages: gui.packages.map((pkg: any) => ({

                        content: pkg.content,
                        amount: pkg.amount,
                        type: pkg.type,
                        dimensions: {
                            length: pkg.dimensions.length,
                            width: pkg.dimensions.width,
                            height: pkg.dimensions.height,
                        },
                        weight: pkg.weight,
                        insurance: 0,
                        declaredValue: pkg.declaredValue,
                        lengthUnit: pkg.lengthUnit,
                        weightUnit: pkg.weightUnit,
                    })),

                    shipment: {
                        type: gui.shipment.type,
                        carrier: selectedCarrier.carrier,
                        service: selectedCarrier.service,
                    },
                    settings: {
                        printFormat: "PDF",
                        printSize: "STOCK_4X6",
                        comments: "comentarios de el envío"
                    }
                };
                const response = await fetch("/api/guia", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });

                const data = await response.json();
                console.log("Datos recibidos de la API GENERAR GUIA:", data);
                return data;

            });

            const resultados = await Promise.all(peticiones);
            console.log("GUIAS CREADAS", resultados);
            setRespuesta(resultados);
        }
        catch (error) {
            console.error("Error enviando cotizaciones:", error);
        }


    }

    return (
        <div>
            <button
                onClick={handleCreacionGuia}
                className="bg-green-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition inline-block">
                Generar Guia
            </button>
            <div>
                {respuesta.map((res, index) => {


                    // ERROR
                    if (res.meta === "error") {
                        return (
                            <div key={index} className="border border-red-400 bg-red-100 p-4 rounded mb-4">
                                <h2 className="text-red-700 font-bold"> Error al generar la guía</h2>
                                <p><strong>Código:</strong> {res.error.code}</p>
                                <p><strong>Descripción:</strong> {res.error.description}</p>
                                <p><strong>Mensaje:</strong> {res.error.message}</p>
                            </div>
                        );
                    }

                    //RESPUESTA EXITOSA
                    const guia = res.data?.[0];
                    if (!guia) return null;

                    return (
                        <div key={index} className="border border-green-400 bg-green-100 p-4 rounded mb-4">
                            <h2 className="text-green-700 font-bold">Guía generada</h2>

                            <p><strong>Carrier:</strong> {guia.carrier}</p>
                            <p><strong>Shipment ID:</strong> {guia.shipmentId}</p>
                            <p><strong>Tracking Number:</strong> {guia.trackingNumber}</p>

                            <p><strong>Etiqueta:</strong></p>
                            <a
                                href={guia.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 underline"
                            >
                                Descargar PDF
                            </a>
                        </div>
                    );
                })
                }



            </div>
        </div >
    )
}