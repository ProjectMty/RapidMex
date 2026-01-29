"use client"
import { useEffect, useState } from "react";
import { DatosCotizacion } from "@/Controlador/types/DatosPaquete";
import { buscarPaqueterias } from "@/Controlador/Cotizador/busquedaPaqueterias";
import { Rate } from "@/Controlador/types/RespuestaApi";
import { U_bodega } from "@/Controlador/types/U_Bodega";
import { costoEnvia } from "@/Controlador/types/CalcularCosto";
import { Guia, InfoGuia } from "@/Controlador/types/Guia";

interface propsTabla {
    datos: DatosCotizacion | null;
    origen: U_bodega | null;
    destino: U_bodega | null;
    auto: boolean; // <- si es verdadero no se muestra la tabla y se selecciona la paqueteria en automatico
    onSubmit: (data: costoEnvia) => void;
    onInfo: (Info: InfoGuia) => void;
    onGuia: (guia: Guia) => void;
}
export default function TablaPaqueterias({ datos, origen, destino, onSubmit, auto, onInfo, onGuia }: propsTabla) {

    const [lista1, setLista1] = useState<Rate[] | null>(null)
    const [lista2, setLista2] = useState<Rate[] | null>(null)
    const [lista3, setLista3] = useState<Rate[] | null>(null)
    const [guia, setGuia] = useState<Guia | null>(null);
    const [seleccion1, setSeleccion1] = useState<Rate | null>(null)
    const [seleccion2, setSeleccion2] = useState<Rate | null>(null)
    const [seleccion3, setSeleccion3] = useState<Rate | null>(null)
    const [costo, setCosto] = useState<costoEnvia>({
        costoE1: 0,
        costoE2: 0,
        costoE3: 0
    })
    const [infoGuia, setInfoGuia] = useState<InfoGuia>({
        paqueteria: "",
        servicio: "",
    })

    useEffect(() => {
        getLista();
    }, [datos, origen, destino])

    useEffect(() => {
        setCosto(prev => ({
            ...prev,
            costoE1: seleccion1?.totalPrice ?? 0,
            costoE2: seleccion2?.totalPrice ?? 0,
            costoE3: seleccion3?.totalPrice ?? 0,
        }))
        setInfoGuia(prev => ({
            ...prev,
            paqueteria: seleccion1?.carrier ?? '',
            servicio: seleccion1?.service ?? ''
        }))
        setGuia(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                shipment: {
                    ...prev?.shipment,
                    carrier: seleccion1?.carrier ?? '',
                    service: seleccion1?.service ?? ''
                },
                settings: {
                    ...prev.settings,
                    printFormat: "PDF",
                    printSize: "STOCK_4X6",
                    comments: ""
                }
            }

        })
    }, [seleccion1, seleccion2, seleccion3])

    useEffect(() => {
        onSubmit(costo);
        onInfo(infoGuia);
        if (guia) {
            onGuia(guia)
        }

    }, [costo])

    const getLista = async () => {
        if (!origen || !destino || !datos) {
            return;
        }
        const lista = await buscarPaqueterias(datos, origen, destino);
        console.log("lista de paqueterias", lista);
        setLista1(lista.paq1)
        setLista2(lista.paq2)
        setLista3(lista.paq3)

        if (auto) {
            setSeleccion1(lista.paq1?.[0] ?? null)
            setSeleccion2(lista.paq2?.[0] ?? null)
            setSeleccion3(lista.paq3?.[0] ?? null)
        }
        setGuia(lista.guia1)
    }



    return (
        <div className="relative mt-5 mb-5 ">
            {!auto && (
                <div>
                    {lista1 && (
                        <div>
                            <h2 className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Paqueterias Primer tramo</h2>
                            <table className="w-full mt-3">
                                <thead>
                                    <tr className="border">
                                        <th className="border">Paquetería</th>
                                        <th className="border">Precio</th>
                                        <th className="border">Duración</th>
                                        <th className="border">Servicio</th>
                                        <th className="border">Selector</th>

                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {lista1.map((rate, index) => (
                                        <tr key={index} className={`border text-center transition duration-100 ${seleccion1 == rate ? "bg-red-500/80" : "bg-white  hover:bg-red-500/20"}`}>
                                            <td className="border py-2">{rate.carrier} </td>
                                            <td className="border py-2">{rate.totalPrice}  {rate.currency}</td>
                                            <td className="border py-2">{rate.deliveryEstimate == "{{value}} días" ? "Indefinido" : rate.deliveryEstimate}</td>
                                            <td className="border py-2">{rate.service}</td>
                                            <td className={`border py-2 transition duration-150   ${seleccion1 == rate ? "bg-red-500" : "hover:bg-green-700/50"}`}><button className="w-full h-full" onClick={() => setSeleccion1(rate)}>Select</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {lista2 && (
                        <div>
                            <h2 className=" font-semibold my-4 text-[30px] text-green-700 text-center">Paqueterias Segundo tramo</h2>
                            <table className="w-full mt-3">
                                <thead>
                                    <tr className="border">
                                        <th className="border">Paquetería</th>
                                        <th className="border">Precio</th>
                                        <th className="border">Duración</th>
                                        <th className="border">Servicio</th>
                                        <th className="border">Selector</th>

                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {lista2.map((rate, index) => (
                                        <tr key={index} className={`border text-center transition duration-100 ${seleccion2 == rate ? "bg-red-500/80" : "bg-white  hover:bg-red-500/20"}`}>
                                            <td className="border py-2">{rate.carrier} </td>
                                            <td className="border py-2">{rate.totalPrice}  {rate.currency}</td>
                                            <td className="border py-2">{rate.deliveryEstimate == "{{value}} días" ? "Indefinido" : rate.deliveryEstimate}</td>
                                            <td className="border py-2">{rate.service}</td>
                                            <td className={`border py-2 transition duration-150   ${seleccion2 == rate ? "bg-red-500" : "hover:bg-green-700/50"}`}><button className="w-full h-full" onClick={() => setSeleccion2(rate)}>Select</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {lista3 && (
                        <div>
                            <h2 className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Paqueterias Tercer tramo</h2>
                            <table className="w-full mt-3">
                                <thead>
                                    <tr className="border">
                                        <th className="border">Paquetería</th>
                                        <th className="border">Precio</th>
                                        <th className="border">Duración</th>
                                        <th className="border">Servicio</th>
                                        <th className="border">Selector</th>

                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {lista3.map((rate, index) => (
                                        <tr key={index} className={`border text-center transition duration-100 ${seleccion3 == rate ? "bg-red-500/80" : "bg-white  hover:bg-red-500/20"}`}>
                                            <td className="border py-2">{rate.carrier} </td>
                                            <td className="border py-2">{rate.totalPrice}  {rate.currency}</td>
                                            <td className="border py-2">{rate.deliveryEstimate == "{{value}} días" ? "Indefinido" : rate.deliveryEstimate}</td>
                                            <td className="border py-2">{rate.service}</td>
                                            <td className={`border py-2 transition duration-150   ${seleccion3 == rate ? "bg-red-500" : "hover:bg-green-700/50"}`}><button className="w-full h-full" onClick={() => setSeleccion3(rate)}>Select</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}