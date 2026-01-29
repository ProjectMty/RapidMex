"use client"
import React, { act, useEffect, useState } from "react";
import { buscarDestinatarios, buscarUsuario } from "@/Controlador/Cotizador/buscarUsuarios";
import { useRouter } from "next/navigation";

export default function InformacionEnvios() {
    const [usuario, setUsuario] = useState("");
    const router = useRouter();

    useEffect(() => {
        const userId = async () => {
            try {
                const respuesta = await buscarUsuario();
                if (respuesta.user == null) {
                    alert("no hay sesion iniciada")
                    router.push("/login");
                } else {
                    console.log("user id", respuesta.user.id)
                    setUsuario(respuesta.user.id)

                }
            } catch (error) {
                alert("error al recibir datos en front")
            }
        }
        userId();
    }, []);

    useEffect(() => {

    }, [usuario])


    return (
        <section className="bg-[#127704] h-screen w-screen">
            <div className="h-full px-24 py-6 flex justify-center grid content-center">
            
                <table className="table-auto bg-white rounded-2xl">
                    <thead className="text-[20px] ">
                        <th className="p-5">Número de rastreo</th>
                        <th className="p-5">Estado</th>
                        <th className="p-5">Origen</th>
                        <th className="p-5">Destino</th>
                        <th className="p-5">Paquete</th>
                        <th className="p-5">Costo</th>
                    </thead>
                    <tbody className="text-[15px] font-light bg-[#EEEEEE] ">
                        <tr>
                            <td className="p-5">ejemplo</td>
                            <td className="p-5">ejemplo</td>
                            <td className="p-5">ejemplo</td>
                            <td className="p-5">ejemplo</td>
                            <td className="p-5">ejemplo</td>
                            <td className="p-5">ejemplo</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </section>
    )
}