"use client"
import Image from "next/image"
import "@/components/Empleados/Guias/Guias.css"
import { useState } from "react";
import type { U_bodega } from "@/Controlador/types/U_Bodega";
import Direccion from "@/components/Cotizador2/Dirreccion";
import { useEffect } from "react";
export default function Guia() {
    type DatosEnviar = {
        index: number;
        bodega: string;
        autoFill: boolean;
        type: string;
        onSubmit: (data: U_bodega) => void;

    };

    const [llevaPaquete, setLlevaPaquete] = useState("");
    const [bodega, setBodega] = useState("");
    const [l, setL] = useState("");
    const [a, setA] = useState("");
    const [h, setH] = useState("");
    const [peso, setPeso] = useState("");
    const [unidadPeso, setUnidadPeso] = useState("lb");
    const [unidadMedida] = useState("in"); // fijo a pulgadas

    const [datosEnviados1, setDatosEnviados1] = useState<DatosEnviar | null>(null);
    const [datosEnviados2, setDatosEnviados2] = useState<DatosEnviar | null>(null);
    const [datosRecibidos1, setDatosRecibidos1] = useState<U_bodega | null>(null);
    const [datosRecibidos2, setDatosRecibidos2] = useState<U_bodega | null>(null);

    const handleFormSubmit1 = (data: U_bodega) => {
        // console.log("Datos recibidos 1:", data);
        setDatosRecibidos1(data);
    };

    const handleFormSubmit2 = (data: U_bodega) => {
        // console.log("Datos recibidos 2:", data);
        setDatosRecibidos2(data);
    };

    useEffect(() => {

        if (llevaPaquete === "no") {
            // CASA A RECOGER
            setDatosEnviados1({
                index: 1,
                bodega: "",
                autoFill: false,
                type: "Origen",
                onSubmit: handleFormSubmit1
            });
            // BODEGA A LLEVAR
            setDatosEnviados2({
                index: 1,
                bodega: "",
                autoFill: false,
                type: "Destino",
                onSubmit: handleFormSubmit2
            });
        }

        if (llevaPaquete === "si") {
            // CASA A RECOGER
            setDatosEnviados1({
                index: 1,
                bodega: bodega,
                autoFill: true,
                type: "Origen",
                onSubmit: handleFormSubmit1
            });
            // BODEGA A LLEVAR
            setDatosEnviados2({
                index: 1,
                bodega: "",
                autoFill: false,
                type: "Destino",
                onSubmit: handleFormSubmit2
            });
        }



    }, [llevaPaquete, bodega])


    return (
        <section className="section-cotiza">
            <p className="titulo-cotiza">COTIZA TU PAQUETE</p>
            <div className="contenedor-cotiza">

                <div className="mb-4">
                    <label className="label-cotiza">
                        ¿El cliente lleva su paquete a la bodega?
                    </label>
                    <select
                        value={llevaPaquete}
                        onChange={(e) => setLlevaPaquete(e.target.value)}
                        className="select-cotiza"
                    >
                        <option value="">Seleccionar</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="label-cotiza">Seleccionar bodega</label>
                    <select
                        value={bodega}
                        onChange={(e) => setBodega(e.target.value)}
                        className="select-cotiza"
                    >
                        <option value="">Seleccionar</option>
                        <option value="monterrey">Monterrey</option>
                        <option value="san-antonio">San Antonio</option>
                        <option value="houston">Houston</option>
                        <option value="buffalo">Buffalo</option>
                        <option value="st-catherins">St. Catherins (Canadá)</option>
                    </select>
                </div>
                <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="number" placeholder="Largo" value={l} onChange={(e) => setL(e.target.value)} className="input-cotiza" />
                    <input type="number" placeholder="Ancho" value={a} onChange={(e) => setA(e.target.value)} className="input-cotiza" />
                    <input type="number" placeholder="Alto" value={h} onChange={(e) => setH(e.target.value)} className="input-cotiza" />
                </div>

                {/* Peso */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="number" placeholder="Peso real" value={peso} onChange={(e) => setPeso(e.target.value)} className="input-cotiza" />
                    <select value={unidadPeso} onChange={(e) => setUnidadPeso(e.target.value)} className="input-cotiza">
                        <option value="lb">Libras (lb)</option>
                        <option value="kg">Kilogramos (kg)</option>
                    </select>
                </div>

                <div className="grid lg:grid-cols-2 gap-4">
                    {datosEnviados1 && (
                        <div  className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados1.index} bodega={datosEnviados1.bodega} autoFill={datosEnviados1.autoFill} type={datosEnviados1.type} onSubmit={datosEnviados1.onSubmit} />
                        </div>
                    )}
                    {datosEnviados2 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados2.index} bodega={datosEnviados2.bodega} autoFill={datosEnviados2.autoFill} type={datosEnviados2.type} onSubmit={datosEnviados2.onSubmit} />
                        </div>
                    )}
                </div>

                {/* Botón Calcular */}
                <div className="mt-6  text-center">
                    <button
                        // onClick={calcularCostos}
                        className="bg-red-600 text-white py-2 px-6 mx-10 rounded-lg hover:bg-red-700 transition"
                    >
                        Calcular Total
                    </button>
                      <button
                        // onClick={calcularCostos}
                        className="bg-red-600 text-white py-2 px-6 mx-10 rounded-lg hover:bg-red-700 transition"
                    >
                        Descargar guia
                    </button>
                </div>
            </div>
        </section>
    )
}