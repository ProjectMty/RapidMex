"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { UbicacionBodega } from "@/data/Bodegas";
import { mapDireccionToBodega } from "../utils/DireccionToBodega";
import type { U_bodega } from "@/types/U_Bodega";
import type { Direccion } from "@/types/Direccion";

interface PropsDirecion {
    index: number;
    bodega: string;
    autoFill: boolean;
    type: string;
    onSubmit: (data: U_bodega) => void;
}

export default function Direccion({ index, bodega, autoFill, type, onSubmit }: PropsDirecion) {
    const countries = [
        { code: "US", name: "USA", image: "/bandera-usa.png" },
        { code: "MX", name: "México", image: "/bandera-mexico.png" },
        { code: "CA", name: "Canadá", image: "/canada-bandera.png" },
    ];

    type Pais = {
        code: string;
        name: string;
        image: string;
    };

    type SelectedType = {
        origen: Pais;
        destino: Pais;
    };

    const [errorForm, setErrorForm] = useState({
        cpOrigen: false,
        cpDestino: false
    });

    const [selected, setSelected] = useState<SelectedType>({
        origen: countries[0],
        destino: countries[0],
    });

    const [open, setOpen] = useState({
        openO1: false,
        openD1: false,

    })

    const [colonia, setColonia] = useState<string[]>([]);
    const [coloniaSeleccionada, setColoniaSeleccionada] = useState("");

    const validarCP = async () => {

        try {
            const origen = selected.origen;
            const codigo = formBodega.codigoP;

            const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(origen.code)}/${encodeURIComponent(codigo)}`;

            const response = await fetch(url, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setErrorForm((prev) => ({ ...prev, cpOrigen: false }))
                setColonia(data[0].suburbs);
                const bodegaTransformada = mapDireccionToBodega(data[0]);
                setFormBodega((prev) => ({
                    ...prev,
                    ...bodegaTransformada,
                    pais: origen.code
                }));

            } else {
                setErrorForm((prev) => ({ ...prev, cpOrigen: true }))
            }

        } catch (error) {
            console.error("Error validando el cp de origen:", error);
            setErrorForm((prev) => ({ ...prev, cpOrigen: true }))
            setFormBodega({
                name: "",
                pais: "",
                estado1: "",
                municipio: "",
                colonia: "",
                calle: "",
                numCalle: "",
                codigoP: "",
                referencia: "",
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formBodega);
        setFormBodega({
            name: "",
            pais: "",
            estado1: "",
            municipio: "",
            colonia: "",
            calle: "",
            numCalle: "",
            codigoP: "",
            referencia: "",
        })
    };

    const bodegaSeleccionada = UbicacionBodega.find((b) => b.name === bodega) || null;
    const [formBodega, setFormBodega] = useState<U_bodega>({
        name: "",
        pais: "",
        estado1: "",
        municipio: "",
        colonia: "",
        calle: "",
        numCalle: "",
        codigoP: "",
        referencia: "",
    });


    useEffect(() => {
        if (!autoFill) return;
        if (!bodegaSeleccionada) return;

        setFormBodega(bodegaSeleccionada);
        setColoniaSeleccionada(bodegaSeleccionada.colonia || "");
        if (bodegaSeleccionada.colonia) {
            setColonia([bodegaSeleccionada.colonia]);
        }
        const countryFound = countries.find((c) => c.code === bodegaSeleccionada.pais);
        if (countryFound) {
            setSelected((prev) => ({
                ...prev,
                origen: countryFound,
            }));
        }

    }, [autoFill, bodegaSeleccionada]);

    useEffect(() => {
        if (autoFill) return;

        setFormBodega({
            name: "",
            pais: "",
            estado1: "",
            municipio: "",
            colonia: "",
            calle: "",
            numCalle: "",
            codigoP: "",
            referencia: "",
        });

        setColonia([]);
        setColoniaSeleccionada("");

        setSelected({
            origen: countries[0],
            destino: countries[0],
        });
        setErrorForm({
            cpOrigen: false,
            cpDestino: false,
        });
    }, [autoFill]);

    useEffect(() => {
        if (!autoFill) return;
        onSubmit(formBodega)

    }, [formBodega])





    const handleSelectColonia = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const colonia = event.target.value;
        setColoniaSeleccionada(colonia);
        setFormBodega(prev => ({
            ...prev,
            colonia: colonia,
        }));
    };
    return (
        <form onSubmit={handleSubmit} className="gap-4 relative">

            {/* ORIGEN */}
            <div className="md:grid  md:grid-cols-2 gap-4 mb-4">
                <label className="font-semibold mt-3 md:col-span-2 text-[20px] text-red-700">{type} {index}</label>


                {autoFill ? (
                    <div className="relative flex  my-1">
                        <div className="relative">
                            {/* SELECT visible */}
                            <button
                                type="button"
                                className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                            >
                                <img src={selected.origen.image} className="w-10 h-6 object-cover" />
                                <IoIosArrowDown className="w-[50px] opacity-0" />
                            </button>


                        </div>
                        <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpOrigen === true ? "block" : "hidden"}`} />
                        <input
                            type="text"
                            name="cpOrigen"
                            value={formBodega.codigoP}
                            readOnly
                            placeholder="Zip"
                            className={`border rounded-r-lg p-3 w-full ${errorForm.cpOrigen === true ? "border-red-600" : "border-green-800"}`}
                        />
                    </div>
                ) : (

                    <div className="relative flex  my-1">
                        <div className="relative">
                            {/* SELECT visible */}
                            <button
                                type="button"
                                onClick={() => setOpen((prev) => ({ ...prev, openO1: !open.openO1 }))}
                                className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                            >
                                <img src={selected.origen.image} className="w-10 h-6 object-cover" />
                                <IoIosArrowDown className="w-[50px]" />
                            </button>

                            {/* OPCIONES */}
                            {open.openO1 && (
                                <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                                    {countries.map((c) => (
                                        <div
                                            key={c.code}
                                            onClick={() => {
                                                setSelected((prev) => ({ ...prev, origen: c }));
                                                setOpen((prev) => ({ ...prev, openO1: false }));

                                                setFormBodega((prev) => ({
                                                    ...prev,
                                                    pais: c.code
                                                }));
                                            }}
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                                            <img src={c.image} className="w-6 h-4 object-cover" />
                                            <span>{c.code}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpOrigen === true ? "block" : "hidden"}`} />
                        <input
                            type="text"
                            name="cpOrigen"
                            value={formBodega.codigoP}
                            onChange={(e) => setFormBodega((prev) => ({ ...prev, codigoP: e.target.value }))}
                            onBlur={validarCP}
                            placeholder="Zip"
                            className={`border rounded-r-lg p-3 w-full ${errorForm.cpOrigen === true ? "border-red-600" : "border-green-800"}`}
                        />
                    </div>

                )}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="Pais"
                        value={formBodega.pais}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, pais: e.target.value })
                        }
                        readOnly={true}
                        placeholder="Country"
                        className={`border rounded-lg p-3 w-full`}
                    />
                </div>
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="Estado"
                        value={formBodega.estado1}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, estado1: e.target.value })
                        }
                        readOnly={true}
                        placeholder="State"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="municipio"
                        value={formBodega.municipio}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, municipio: e.target.value })
                        }
                        readOnly={true}
                        placeholder="City"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>

                <div
                    className={`relative flex my-1 col-span-2 ${formBodega.pais === "MX" ? "block" : "opacity-20 pointer-events-none"
                        }`}
                >
                    <select value={coloniaSeleccionada || ""} onChange={handleSelectColonia} className="border rounded-lg p-3 w-full" >
                        {(!coloniaSeleccionada || coloniaSeleccionada === "") && (
                            <option value="">Selecciona colonia</option>
                        )}

                        {colonia.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                </div>



                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="calle"
                        value={formBodega.calle}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, calle: e.target.value })
                        }
                        readOnly={autoFill}
                        placeholder="Street"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="numCalle"
                        value={formBodega.numCalle}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, numCalle: e.target.value })
                        }
                        readOnly={autoFill}
                        placeholder="# Number"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>
                <div className="relative flex  my-1 col-span-2">
                    <textarea
                        rows={3}

                        name="referencia"
                        value={formBodega.referencia}
                        onChange={(e) =>
                            !autoFill && setFormBodega({ ...formBodega, referencia: e.target.value })
                        }
                        readOnly={autoFill}
                        placeholder="Reference"
                        className={`border rounded-lg p-3 w-full resize-none`}
                    />
                </div>
            </div>
            <button type="submit"
                disabled={autoFill}
                className={` relative p-2 transform duration-200 text-white rounded w-full
            ${autoFill ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"}`}>
                Enviar
            </button>

        </form>
    )
}