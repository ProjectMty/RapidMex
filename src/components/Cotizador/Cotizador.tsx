"use client";

import { useState } from "react";
import PDFButton from "./PDFButton";


interface DetallesCotizacion {
  llevaPaquete: string;
  bodega: string;
  l: string;
  a: string;
  h: string;
  unidadMedida: string;
  peso: string;
  unidadPeso: string;
  costoe1Final: number;
  costoe2Final: number;
  costoe3Final: number;
  resultado: number;
  moneda: string;
}

export default function Cotizador() {
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

  // 📌 Cálculo
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

    // fórmulas
    const COSTOVLB = Math.ceil(((pesoComparado * 0.8) / (1 - 0.5)) + 5);

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
    setDetalles({
      llevaPaquete,
      bodega,
      l,
      a,
      h,
      unidadMedida,
      peso,
      unidadPeso,
      costoe1Final: COSTOE1final,
      costoe2Final: COSTOE2final,
      costoe3Final: COSTOE3final,
      resultado: Math.ceil(totalUSD),
      moneda,
    });
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Cotizador Interno RapidMex
        </h1>

        {/* Campos del formulario */}
        {/* Lleva paquete */}
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

        {/* Bodega */}
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

        {/* COSTOE1 */}
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
          </div>
        )}

        {/* COSTOE2 */}
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
          </div>
        )}

        {/* COSTOE3 */}
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
          </div>
        )}

        {/* Botón Calcular */}
        <div className="mt-6 text-center">
          <button onClick={calcularCostos} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
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
              <select value={moneda} onChange={(e) => setMoneda(e.target.value)} className="border rounded-lg p-2 w-full">
                <option value="USD">USD - Dólar estadounidense</option>
                <option value="MXN">MXN - Peso mexicano</option>
                <option value="CAD">CAD - Dólar canadiense</option>
              </select>
            </div>

            <div className="mt-4">
              <PDFButton datos={detalles} fileName="cotizacion.pdf" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
