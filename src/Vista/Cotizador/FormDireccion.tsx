"use client"
import type { U_bodega } from "@/Controlador/types/U_Bodega";
import { countries } from "@/Modelo/data/Paises";
import { useState, useEffect } from "react";
import { Pais } from "@/Controlador/types/Pais";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { validarCP } from "@/Controlador/Cotizador/validar.control";

interface PropsDireccion {
    bodega: string;
    type: string;
    onSubmit: (data: U_bodega) => void;
}

export default function FormDireccion({ bodega, type, onSubmit }: PropsDireccion) {
    const [open, setOpen] = useState(false);
    const [direccion, setDireccion] = useState<U_bodega>({
        name: "",
        pais: "US",
        estado1: "",
        municipio: "",
        colonia: "",
        calle: "",
        numCalle: "",
        codigoP: "",
        referencia: "",
    });
    const [colonias, setColonias] = useState<string[]>([]);
    const [coloniaSeleccionada, setColoniaSeleccionada] = useState("");
    const [selected, setSelected] = useState<Pais>(countries[0]);
    const [errorForm, setErrorForm] = useState(false);

    const actualizar = <K extends keyof U_bodega>(
        campo: K,
        valor: U_bodega[K]
    ) => {
        setDireccion(prev => ({
            ...prev, [campo]: valor
        }));
    };

    const handleSelectColonia = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const colonia = event.target.value;
        setColoniaSeleccionada(colonia);
        setDireccion(prev => ({
            ...prev,
            colonia: colonia,
        }));
    };

    const validarCodigoPostal = async () => {
        try {
            const respuesta = await validarCP(direccion.pais, direccion.codigoP);

            if (respuesta.pais != "" && respuesta.estado1 != "" && respuesta.municipio != "") {
                setErrorForm(false)
                setColonias(respuesta.colonias);
                setDireccion((prev) => ({
                    ...prev,
                    pais: respuesta.pais,
                    estado1: respuesta.estado1,
                    municipio: respuesta.municipio,
                    colonia: "",
                    calle: "",
                    numCalle: "",
                    referencia: "",
                }));

            } else {
                setErrorForm(true)
                setDireccion({
                    name: "",
                    pais: selected.code,
                    estado1: "",
                    municipio: "",
                    colonia: "",
                    calle: "",
                    numCalle: "",
                    codigoP: "",
                    referencia: "",
                });
            }
        }
        catch (error) {
            console.error("Error validando el codigo postal", error);
            setErrorForm(true)
            setDireccion({
                name: "",
                pais: selected.code,
                estado1: "",
                municipio: "",
                colonia: "",
                calle: "",
                numCalle: "",
                codigoP: "",
                referencia: "",
            });
        }
    }

    useEffect(() => {
        onSubmit(direccion)
    }, [direccion])

    useEffect(() => {
        setDireccion({
            name: "",
            pais: selected.code,
            estado1: "",
            municipio: "",
            colonia: "",
            calle: "",
            numCalle: "",
            codigoP: "",
            referencia: "",
        });
    }, [selected])

    return (
        <form className="gap-4 relative">

            {/* ORIGEN */}
            <div className="md:grid  md:grid-cols-2 gap-4 mb-4">
                <label className="font-semibold mt-3 md:col-span-2 text-[20px] text-red-700">{type}</label>
                <div className="relative flex  my-1">
                    <div className="relative">
                        {/* SELECT visible */}
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white">
                            <img src={selected.image} className="w-10 h-6 object-cover" />
                            <IoIosArrowDown className="w-[50px]" />
                        </button>

                        {/* OPCIONES */}
                        {open && (
                            <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                                {countries.map((c) => (
                                    <div
                                        key={c.code}
                                        onClick={() => {
                                            setSelected(c);
                                            setOpen(false);

                                            setDireccion((prev) => ({
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

                    {/* ************ CODIGO POSTAL ************ */}
                    <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm === true ? "block" : "hidden"}`} />
                    <input
                        type="text"
                        name="cpOrigen"
                        value={direccion.codigoP}
                        onChange={(e) => actualizar("codigoP", e.target.value)}
                        onBlur={validarCodigoPostal}
                        placeholder="Zip"
                        className={`border rounded-r-lg p-3 w-full ${errorForm === true ? "border-red-600" : "border-green-800"}`}
                    />
                </div>

                {/* ************ PAIS ************ */}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="Pais"
                        value={direccion.pais}
                        onChange={(e) => actualizar("pais", e.target.value)
                        }
                        readOnly={true}
                        placeholder="Country"
                        className={`border rounded-lg p-3 w-full`}
                    />
                </div>

                {/* ************ ESTADO ************ */}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="Estado"
                        value={direccion.estado1}
                        onChange={(e) => actualizar("estado1", e.target.value)}
                        readOnly={true}
                        placeholder="State"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>

                {/* ************ MUNICIPIO ************ */}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="municipio"
                        value={direccion.municipio}
                        onChange={(e) => actualizar("municipio", e.target.value)}
                        readOnly={true}
                        placeholder="City"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>

                {/* ************ COLONIA ************ */}
                <div className={`relative flex my-1 col-span-2 ${direccion.pais === "MX" ? "block" : "opacity-20 pointer-events-none"}`}
                >
                    <select value={coloniaSeleccionada || ""} onChange={handleSelectColonia} className="border rounded-lg p-3 w-full" >
                        {(!coloniaSeleccionada || coloniaSeleccionada === "") && (
                            <option value="">Selecciona colonia</option>
                        )}

                        {colonias.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                </div>

                {/* ************ CALLE ************ */}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="calle"
                        value={direccion.calle}
                        onChange={(e) => actualizar("calle", e.target.value)}
                        placeholder="Street"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>

                {/* ************ NUMERO DE CASA ************ */}
                <div className="relative flex  my-1">
                    <input
                        type="text"
                        name="numCalle"
                        value={direccion.numCalle}
                        onChange={(e) => actualizar("numCalle", e.target.value)}
                        placeholder="# Number"
                        className={`border rounded-lg p-3 w-full `}
                    />
                </div>

                {/* ************ REFERENCIAS ************ */}
                <div className="relative flex  my-1 col-span-2">
                    <textarea
                        rows={3}

                        name="referencia"
                        value={direccion.referencia}
                        onChange={(e) => actualizar("referencia", e.target.value)}
                        placeholder="Reference"
                        className={`border rounded-lg p-3 w-full resize-none`}
                    />
                </div>
            </div>


        </form>
    )
}