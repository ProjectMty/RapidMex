"use client";

import React, { useEffect, useState } from "react";
import PDFButton from "./PDFButton";
import { DetallesCotizacion } from "@/types/DetallesCotizacion";
import Swal from 'sweetalert2'
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


export default function Cotizador() {
  // 📌 Lugares de envio
  const countries = [
    { code: "US", name: "USA", image: "/bandera-usa.png" },
    { code: "MX", name: "México", image: "/bandera-mexico.png" },
  ];
  const bodegas = [
    { name: "st-catherins", pais: "Canadá", estado: "", municipio: "St. Catherines", colonia: "", calle: "", numCalle: "", codigoP: "", referencia: "" },
    { name: "buffalo", pais: "USA", estado: "", municipio: "", colonia: "", calle: "", numCalle: "", codigoP: "", referencia: "" },
    { name: "san-antonio", pais: "USA", estado: "", municipio: "", colonia: "", calle: "", numCalle: "", codigoP: "", referencia: "" },
    { name: "houston", pais: "USA", estado: "", municipio: "", colonia: "", calle: "", numCalle: "", codigoP: "", referencia: "" },

  ];
  interface Direccion {
    additional_info?: {
      street?: string | null;
    };
    coordinates?: {
      latitude?: string;
      longitude?: string;
    };
    country?: {
      name?: string;
      code?: string;
    };
    info?: {
      stat?: string;
      stat_8digit?: string;
      time_zone?: string;
      utc?: string;
    };
    locality?: string;
    regions?: {
      region_1?: string;
      region_2?: string;
      region_3?: string;
      region_4?: string;
    };
    state?: {
      name?: string;
      iso_code?: string;
    };
    suburbs?: string[];
    zip_code?: string;
  }

  type Pais = {
    code: string;
    name: string;
    image: string;
  };

  type U_bodega = {
    name: string;
    pais: string;
    estado: string;
    municipio: string;
    colonia: string;
    calle: string;
    numCalle: string;
    codigoP: string;
    referencia: string;

  };
  type SelectedType = {
    [key: `origen${number}`]: Pais;
    [key: `destino${number}`]: Pais;
  };

  type cpType = {
    [key: `origen${number}`]: string;
    [key: `destino${number}`]: string;
  };

  type DirType = {
    [key: `origen${number}`]: Direccion[] | null;
    [key: `destino${number}`]: Direccion[] | null;
  };

  const [errorForm, setErrorForm] = useState({
    cpOrigen1: false,
    cpDestino1: false,
    cpOrigen2: false,
    cpDestino2: false,
    cpOrigen3: false,
    cpDestino3: false,
  });

  const [selected, setSelected] = useState<SelectedType>({
    origen1: countries[0],
    destino1: countries[0],
    origen2: countries[0],
    destino2: countries[0],
    origen3: countries[0],
    destino3: countries[0],
  });

  const [open, setOpen] = useState({
    openO1: false,
    openD1: false,
    openO2: false,
    openD2: false,
    openO3: false,
    openD3: false,

  })

  const [cp, setCp] = useState<cpType>({
    origen1: "",
    destino1: "",
    origen2: "",
    destino2: "",
    origen3: "",
    destino3: "",
  })

  const [direccion, setDireccion] = useState<DirType>({
    origen1: null,
    destino1: null,
    origen2: null,
    destino2: null,
    origen3: null,
    destino3: null,

  });
  const validarCPorigen = async (index: number) => {
    try {
      const origen = selected[`origen${index}`];
      const codigo = cp[`origen${index}`];

      const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(origen.code)}/${encodeURIComponent(codigo)}`;

      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setDireccion(prev => {
        const updated = { ...prev, [`origen${index}`]: data };
        // console.log("direccion actualizada:", updated);
        return updated;
      });

      if (Array.isArray(data) && data.length > 0) {
        setErrorForm((prev) => ({ ...prev, [`cpOrigen${index}`]: false }))
      } else {
        setErrorForm((prev) => ({ ...prev, [`cpOrigen${index}`]: true }))
      }

    } catch (error) {
      console.error("Error validando el cp de origen:", error);
      setErrorForm((prev) => ({ ...prev, [`cpOrigen${index}`]: true }))
    }
  };
  const validarCPdestino = async (index: number) => {
    try {
      const destino = selected[`destino${index}`];
      const codigo = cp[`destino${index}`];
      const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(destino.code)}/${encodeURIComponent(codigo)}`;
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      setDireccion(prev => {
        const updated = { ...prev, [`destino${index}`]: data };
        // console.log("direccion actualizada:", updated);
        return updated;
      });
      if (Array.isArray(data) && data.length > 0) {
        setErrorForm((prev) => ({ ...prev, [`cpDestino${index}`]: false }))

      } else {
        setErrorForm((prev) => ({ ...prev, [`cpDestino${index}`]: true }))
      }


    } catch (error) {
      console.error("Error validando el cp de destino:", error);
      setErrorForm((prev) => ({ ...prev, [`cpDestino${index}`]: true }))
    }
  };



  // 📌 Estados principales
  const [llevaPaquete, setLlevaPaquete] = useState("");
  const [bodega, setBodega] = useState("");
  const [l, setL] = useState("");
  const [a, setA] = useState("");
  const [h, setH] = useState("");
  const [peso, setPeso] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("lb");
  const [unidadMedida] = useState("in"); // fijo a pulgadas


  // 📌 Costos extra
  const [costoe1, setCostoe1] = useState("");
  const [monedaCostoe1, setMonedaCostoe1] = useState("USD");
  const [costoe2, setCostoe2] = useState("");
  const [monedaCostoe2, setMonedaCostoe2] = useState("USD");
  const [costoe3, setCostoe3] = useState("");
  const [monedaCostoe3, setMonedaCostoe3] = useState("USD");

  // 📌 Resultado
  const [moneda, setMoneda] = useState("USD");
  const [resultadoUSD, setResultadoUSD] = useState<number | null>(null);
  const [detalles, setDetalles] = useState<DetallesCotizacion | null>(null);


  // 📌 Tipos de cambio
  const mxnToUsd = 18;
  const cadToUsd = 0.74;

  const convertirUSD = (valor: number, monedaOrigen: string): number => {
    if (!valor) return 0;
    switch (monedaOrigen) {
      case "USD":
        return valor;
      case "MXN":
        return valor / mxnToUsd;
      case "CAD":
        return valor * cadToUsd;
      default:
        return valor;
    }
  };

  // 📌 Cálculo principal
  const calcularCostos = () => {
    const L = Number(l) || 0;
    const A = Number(a) || 0;
    const H = Number(h) || 0;
    const pesoNum = Number(peso) || 0;

    if (!L || !A || !H || !pesoNum) {
      alert("Por favor ingresa Largo, Ancho, Alto y Peso.");
      return;
    }

    // medidas en pulgadas
    const L_in = unidadMedida === "cm" ? L / 2.54 : L;
    const A_in = unidadMedida === "cm" ? A / 2.54 : A;
    const H_in = unidadMedida === "cm" ? H / 2.54 : H;

    // peso volumétrico
    const paso1 = Math.ceil((L_in * A_in * H_in) / 139);
    const pesoReal = unidadPeso === "kg" ? pesoNum * 2.20462 : pesoNum;
    const pesoComparado = Math.max(pesoReal, paso1);

    // fórmula principal
    const COSTOVLB = Math.ceil(((pesoComparado * 0.8) / (1 - 0.5)) + 5);

    // volumen en m³
    const L_cm = unidadMedida === "cm" ? L : L * 2.54;
    const A_cm = unidadMedida === "cm" ? A : A * 2.54;
    const H_cm = unidadMedida === "cm" ? H : H * 2.54;
    const volumenM3 = (L_cm * A_cm * H_cm) / 1_000_000;
    const COSTOM3 = volumenM3 * 15;
    const COSTOM31_CAD = (volumenM3 * 133) / (1 - 0.4);
    const COSTOM31 = COSTOM31_CAD * cadToUsd;

    // costos extra (+10%)
    const COSTOE1final = convertirUSD(Number(costoe1) || 0, monedaCostoe1) / (1 - 0.1);
    const COSTOE2final = convertirUSD(Number(costoe2) || 0, monedaCostoe2) / (1 - 0.1);
    const COSTOE3final = convertirUSD(Number(costoe3) || 0, monedaCostoe3) / (1 - 0.1);

    let totalUSD = 0;

    // selección por bodega
    switch (bodega) {
      case "san-antonio":
        totalUSD =
          llevaPaquete === "si"
            ? COSTOVLB + COSTOM3 + COSTOE2final
            : COSTOE1final + COSTOE2final + COSTOVLB + COSTOM3;
        break;

      case "houston":
      case "buffalo":
        totalUSD = COSTOE1final + COSTOVLB + COSTOM3 + COSTOE2final;
        break;

      case "st-catherins":
        totalUSD =
          llevaPaquete === "si"
            ? COSTOVLB + COSTOM3 + COSTOM31 + COSTOE2final + COSTOE3final
            : COSTOE1final + COSTOVLB + COSTOM3 + COSTOM31 + COSTOE2final + COSTOE3final;
        break;

      default:
        alert("Selecciona una bodega.");
        return;
    }

    setResultadoUSD(Math.ceil(totalUSD));

    // ✅ Convertimos peso a número para cumplir con el tipo

    setDetalles({
      llevaPaquete,
      bodega,
      l,
      a,
      h,
      unidadMedida,
      peso: Number(peso),
      unidadPeso,
      costoe1Final: COSTOE1final,
      costoe2Final: COSTOE2final,
      costoe3Final: COSTOE3final,
      resultado: Math.ceil(totalUSD),
      moneda,
      origen1: direccion.origen1?.[0] ?? null,
      destino1: direccion.destino1?.[0] ?? null,
      origen2: direccion.origen2?.[0] ?? null,
      destino2: direccion.destino2?.[0] ?? null,
      origen3: direccion.origen3?.[0] ?? null,
      destino3: direccion.destino3?.[0] ?? null
    });
  };

  // 📌 Conversión de moneda y formato
  const getResultadoConvertido = () => {
    if (resultadoUSD === null) return null;
    if (moneda === "USD") return resultadoUSD;
    if (moneda === "MXN") return Math.ceil(resultadoUSD * mxnToUsd);
    if (moneda === "CAD") return Math.ceil(resultadoUSD / cadToUsd);
    return resultadoUSD;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: moneda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const resultadoConvertido = getResultadoConvertido();


  // 📌 Renderizado

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Cotizador Interno RapidMex
        </h1>

        {/* Campos principales */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">
            ¿El cliente lleva su paquete a la bodega?
          </label>
          <select
            value={llevaPaquete}
            onChange={(e) => setLlevaPaquete(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Seleccionar</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-2">Seleccionar bodega</label>
          <select
            value={bodega}
            onChange={(e) => setBodega(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Seleccionar</option>
            <option value="san-antonio">San Antonio</option>
            <option value="houston">Houston</option>
            <option value="buffalo">Buffalo</option>
            <option value="st-catherins">St. Catherins (Canadá)</option>
          </select>
        </div>

        {/* Medidas */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input type="number" placeholder="Largo" value={l} onChange={(e) => setL(e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Ancho" value={a} onChange={(e) => setA(e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Alto" value={h} onChange={(e) => setH(e.target.value)} className="border rounded-lg p-2 w-full" />
        </div>

        {/* Peso */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="number" placeholder="Peso real" value={peso} onChange={(e) => setPeso(e.target.value)} className="border rounded-lg p-2 w-full" />
          <select value={unidadPeso} onChange={(e) => setUnidadPeso(e.target.value)} className="border rounded-lg p-2 w-full">
            <option value="lb">Libras (lb)</option>
            <option value="kg">Kilogramos (kg)</option>
          </select>
        </div>


        {/* COSTOE1 / COSTOE2 / COSTOE3 */}
        {(bodega === "houston" ||
          bodega === "buffalo" ||
          (bodega === "san-antonio" && llevaPaquete === "no") ||
          (bodega === "st-catherins" && llevaPaquete === "no")) && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">COSTOE1</label>
              <div className="flex gap-2 items-center">
                <input type="number" placeholder="COSTOE1" value={costoe1} onChange={(e) => setCostoe1(e.target.value)} className="border rounded-lg p-2 w-full" />
                <select value={monedaCostoe1} onChange={(e) => setMonedaCostoe1(e.target.value)} className="border rounded-lg p-2">
                  <option value="USD">USD</option>
                  <option value="MXN">MXN (1 USD = 18 MXN)</option>
                  <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="block font-semibold mt-3 col-span-2 text-[40px]">Origen</label>
                <div className="relative flex  my-1">
                  <div className="relative">
                    {/* SELECT visible */}
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, openO1: !open.openO1 }))}
                      className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                    >
                      <img src={selected.origen1.image} className="w-10 h-6 object-cover" />
                      <IoIosArrowDown className="w-[50px]" />
                    </button>

                    {/* OPCIONES */}
                    {open.openO1 && (
                      <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelected((prev) => ({ ...prev, origen1: c }));
                              setOpen((prev) => ({ ...prev, openO1: false }));
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <img src={c.image} className="w-6 h-4 object-cover" />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpOrigen1 === true ? "block" : "hidden"}`} />
                  <input
                    type="number"
                    name="cpOrigen"
                    value={cp.origen1}
                    onChange={(e) => setCp((prev) => ({ ...prev, origen1: e.target.value }))}
                    onBlur={() => validarCPorigen(1)}
                    placeholder="Zip Origen"
                    className={`border rounded-r-lg p-3 w-full ${errorForm.cpOrigen1 === true ? "border-red-600" : "border-green-800"}`}
                  />


                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="cpOrigen"

                    placeholder="Country"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="Estado"

                    placeholder="State"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="municipio"

                    placeholder="City"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <label className="block font-medium mt-3 col-span-2">Colonia</label>
                <div className="relative flex  my-1 col-span-2">

                  <select className="border rounded-lg p-3 w-full ">
                    <option value="lb">colonia 1</option>
                    <option value="kg">colonia 2</option>
                  </select>
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="calle"

                    placeholder="Street"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="numCalle"

                    placeholder="# Number"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                       <div className="relative flex  my-1 col-span-2">
                  <input
                    type="text"
                    name="referencia"

                    placeholder="Reference"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
              </div>



              {/* DESTINO */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <label className="block font-semibold mt-3 col-span-2 text-[40px]">Destino</label>
                  <div className="relative flex  my-1">
                    <div className="relative">
                      {/* SELECT visible */}
                      <button
                        type="button"
                        onClick={() => setOpen((prev) => ({ ...prev, openD1: !open.openD1 }))}
                        className="rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                      >
                        <img src={selected.destino1.image} className="w-10 h-6 object-cover" />
                        <IoIosArrowDown className="w-[50px]" />
                      </button>

                      {/* OPCIONES */}
                      {open.openD1 && (
                        <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                          {countries.map((c) => (
                            <div
                              key={c.code}
                              onClick={() => {
                                setSelected((prev) => ({ ...prev, destino1: c }));
                                setOpen((prev) => ({ ...prev, openD1: false }));
                              }}
                              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img src={c.image} className="w-6 h-4 object-cover" />
                              <span>{c.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpDestino1 === true ? "block" : "hidden"}`} />
                    <input
                      type="number"
                      name="cpOrigen"
                      value={cp.destino1}
                      onChange={(e) => setCp((prev) => ({ ...prev, destino1: e.target.value }))}
                      onBlur={() => validarCPdestino(1)}
                      placeholder="Zip Destino"
                      className={`border rounded-r-lg p-3 w-full ${errorForm.cpDestino1 === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>
   <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="cpOrigen"

                    placeholder="Country"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="Estado"

                    placeholder="State"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="municipio"

                    placeholder="City"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <label className="block font-medium mt-3 col-span-2">Colonia</label>
                <div className="relative flex  my-1 col-span-2">

                  <select className="border rounded-lg p-3 w-full ">
                    <option value="lb">colonia 1</option>
                    <option value="kg">colonia 2</option>
                  </select>
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="calle"

                    placeholder="Street"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                <div className="relative flex  my-1">
                  <input
                    type="text"
                    name="numCalle"

                    placeholder="# Number"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                       <div className="relative flex  my-1 col-span-2">
                  <input
                    type="text"
                    name="referencia"

                    placeholder="Reference"
                    className={`border rounded-lg p-3 w-full `}
                  />
                </div>
                </div>
             
            </div>
          )}

        {(bodega === "san-antonio" || bodega === "houston" || bodega === "buffalo" || bodega === "st-catherins") && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">COSTOE2</label>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="COSTOE2" value={costoe2} onChange={(e) => setCostoe2(e.target.value)} className="border rounded-lg p-2 w-full" />
              <select value={monedaCostoe2} onChange={(e) => setMonedaCostoe2(e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <div className="relative flex  my-3">
                  <div className="relative">
                    {/* SELECT visible */}
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, openO2: !open.openO2 }))}
                      className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                    >
                      <img src={selected.origen2.image} className="w-10 h-6 object-cover" />
                      <IoIosArrowDown className="w-[50px]" />
                    </button>

                    {/* OPCIONES */}
                    {open.openO2 && (
                      <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelected((prev) => ({ ...prev, origen2: c }));
                              setOpen((prev) => ({ ...prev, openO2: false }));
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <img src={c.image} className="w-6 h-4 object-cover" />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpOrigen2 === true ? "block" : "hidden"}`} />
                  <input
                    type="number"
                    name="cpOrigen"
                    value={cp.origen2}
                    onChange={(e) => setCp((prev) => ({ ...prev, origen2: e.target.value }))}
                    onBlur={() => validarCPorigen(2)}
                    placeholder="Zip Origen"
                    className={`border rounded-r-lg p-3 w-full ${errorForm.cpOrigen2 === true ? "border-red-600" : "border-green-800"}`}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="relative flex  my-3">
                  <div className="relative">
                    {/* SELECT visible */}
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, openD2: !open.openD2 }))}
                      className="rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                    >
                      <img src={selected.destino2.image} className="w-10 h-6 object-cover" />
                      <IoIosArrowDown className="w-[50px]" />
                    </button>

                    {/* OPCIONES */}
                    {open.openD2 && (
                      <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelected((prev) => ({ ...prev, destino2: c }));
                              setOpen((prev) => ({ ...prev, openD2: false }));
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img src={c.image} className="w-6 h-4 object-cover" />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpDestino2 === true ? "block" : "hidden"}`} />
                  <input
                    type="number"
                    name="cpOrigen"
                    value={cp.destino2}
                    onChange={(e) => setCp((prev) => ({ ...prev, destino2: e.target.value }))}
                    onBlur={() => validarCPdestino(2)}
                    placeholder="Zip Destino"
                    className={`border rounded-r-lg p-3 w-full ${errorForm.cpDestino2 === true ? "border-red-600" : "border-green-800"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {bodega === "st-catherins" && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">COSTOE3</label>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="COSTOE3" value={costoe3} onChange={(e) => setCostoe3(e.target.value)} className="border rounded-lg p-2 w-full" />
              <select value={monedaCostoe3} onChange={(e) => setMonedaCostoe3(e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <div className="relative flex  my-3">
                  <div className="relative">
                    {/* SELECT visible */}
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, openO3: !open.openO3 }))}
                      className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                    >
                      <img src={selected.origen3.image} className="w-10 h-6 object-cover" />
                      <IoIosArrowDown className="w-[50px]" />
                    </button>

                    {/* OPCIONES */}
                    {open.openO3 && (
                      <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelected((prev) => ({ ...prev, origen3: c }));
                              setOpen((prev) => ({ ...prev, openO3: false }));
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <img src={c.image} className="w-6 h-4 object-cover" />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpOrigen3 === true ? "block" : "hidden"}`} />
                  <input
                    type="number"
                    name="cpOrigen"
                    value={cp.origen3}
                    onChange={(e) => setCp((prev) => ({ ...prev, origen3: e.target.value }))}
                    onBlur={() => validarCPorigen(3)}
                    placeholder="Zip Origen"
                    className={`border rounded-r-lg p-3 w-full ${errorForm.cpOrigen3 === true ? "border-red-600" : "border-green-800"}`}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="relative flex  my-3">
                  <div className="relative">
                    {/* SELECT visible */}
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => ({ ...prev, openD3: !open.openD3 }))}
                      className="rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                    >
                      <img src={selected.destino3.image} className="w-10 h-6 object-cover" />
                      <IoIosArrowDown className="w-[50px]" />
                    </button>

                    {/* OPCIONES */}
                    {open.openD3 && (
                      <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelected((prev) => ({ ...prev, destino3: c }));
                              setOpen((prev) => ({ ...prev, openD3: false }));
                            }}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img src={c.image} className="w-6 h-4 object-cover" />
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpDestino3 === true ? "block" : "hidden"}`} />
                  <input
                    type="number"
                    name="cpOrigen"
                    value={cp.destino3}
                    onChange={(e) => setCp((prev) => ({ ...prev, destino3: e.target.value }))}
                    onBlur={() => validarCPdestino(3)}
                    placeholder="Zip Destino"
                    className={`border rounded-r-lg p-3 w-full ${errorForm.cpDestino3 === true ? "border-red-600" : "border-green-800"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botón Calcular */}
        <div className="mt-6 text-center">
          <button
            onClick={calcularCostos}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            Calcular Total
          </button>
        </div>

        {/* Resultado */}
        {resultadoUSD !== null && (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-green-700">
              Total estimado: {formatCurrency(resultadoConvertido!)}
            </p>

            <div className="mt-4">
              <label className="block font-semibold mb-1">Convertir moneda</label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="USD">USD - Dólar estadounidense</option>
                <option value="MXN">MXN - Peso mexicano</option>
                <option value="CAD">CAD - Dólar canadiense</option>
              </select>
            </div>

            {detalles && (
              <div className="mt-6">
                <PDFButton datos={detalles} fileName="cotizacion.pdf" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
