"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CotizacionPDF from "../CotizacionPDF";

export default function Cotizador() {
  const [llevaPaquete, setLlevaPaquete] = useState("");
  const [bodega, setBodega] = useState("");
  const [l, setL] = useState("");
  const [a, setA] = useState("");
  const [h, setH] = useState("");
  const [peso, setPeso] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("lb");
  const [unidadMedida, setUnidadMedida] = useState("in");

  // tipos de cambio
  const [mxnToUsd, setMxnToUsd] = useState<number>(18);
  const [cadToUsd, setCadToUsd] = useState<number>(0.74);

  // COSTOE
  const [costoe1, setCostoe1] = useState("");
  const [monedaCostoe1, setMonedaCostoe1] = useState("USD");

  const [costoe2, setCostoe2] = useState("");
  const [monedaCostoe2, setMonedaCostoe2] = useState("USD");

  const [costoe3, setCostoe3] = useState("");
  const [monedaCostoe3, setMonedaCostoe3] = useState("USD");

  const [moneda, setMoneda] = useState("USD");
  const [resultadoUSD, setResultadoUSD] = useState<number | null>(null);

  // Detalles para PDF
  const [detalles, setDetalles] = useState<any>(null);

  // ------------------ CONVERSIÓN ------------------
  const convertirUSD = (valor: number, monedaOrigen: string, rate: number = 1): number => {
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

  const mostrarConversiones = (valor: string, monedaOrigen: string) => {
    const num = Number(valor) || 0;
    const enUSD = convertirUSD(num, monedaOrigen);
    if (!num) return null;
    return (
      <p className="text-sm text-gray-600 mt-1">
        {enUSD.toFixed(2)} USD | {(enUSD * mxnToUsd).toFixed(2)} MXN |{" "}
        {(enUSD / cadToUsd).toFixed(2)} CAD
      </p>
    );
  };

  // ------------------ CALCULAR ------------------
  const calcularCostos = () => {
    setResultadoUSD(null);

    const L = Number(l) || 0;
    const A = Number(a) || 0;
    const H = Number(h) || 0;
    const pesoNum = Number(peso) || 0;

    if (!L || !A || !H || !pesoNum) {
      alert("Por favor ingresa Largo, Ancho, Alto y Peso.");
      return;
    }

    // convertir medidas
    const L_in = unidadMedida === "cm" ? L / 2.54 : L;
    const A_in = unidadMedida === "cm" ? A / 2.54 : A;
    const H_in = unidadMedida === "cm" ? H / 2.54 : H;

    // peso volumétrico
    const paso1 = Math.ceil((L_in * A_in * H_in) / 139);

    // peso real
    const pesoReal = unidadPeso === "kg" ? pesoNum * 2.20462 : pesoNum;

    // mayor
    const pesoComparado = Math.max(pesoReal, paso1);

    // COSTOVLB
    const COSTOVLB = Math.ceil(((pesoComparado * 0.8) / (1 - 0.5)) + 5);

    // volumen en cm → m3
    const L_cm = unidadMedida === "cm" ? L : L * 2.54;
    const A_cm = unidadMedida === "cm" ? A : A * 2.54;
    const H_cm = unidadMedida === "cm" ? H : H * 2.54;

    const volumenM3 = (L_cm * A_cm * H_cm) / 1_000_000;

    const COSTOM3 = volumenM3 * 15;

    // COSTOM31 en CAD → convertido a USD
    const COSTOM31_CAD = (volumenM3 * 133) / (1 - 0.4);
    const COSTOM31 = COSTOM31_CAD * cadToUsd;

    // COSTOE convertidos a USD y con +10%
    const COSTOE1final = convertirUSD(Number(costoe1) || 0, monedaCostoe1) / (1 - 0.1);
    const COSTOE2final = convertirUSD(Number(costoe2) || 0, monedaCostoe2) / (1 - 0.1);
    const COSTOE3final = convertirUSD(Number(costoe3) || 0, monedaCostoe3) / (1 - 0.1);

    // ------------------ CASOS ------------------
    let totalUSD = 0;

    switch (bodega) {
      case "san-antonio":
      case "houston":
      case "buffalo":
        totalUSD =
          llevaPaquete === "si"
            ? COSTOVLB + COSTOM3 + COSTOE2final
            : COSTOE1final + COSTOVLB + COSTOM3 + COSTOE2final;
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

    const totalFinal = Math.ceil(totalUSD);
    setResultadoUSD(totalFinal);

   setDetalles({
  llevaPaquete: llevaPaquete || "N/A",
  bodega: bodega || "N/A",
  l: l || 0,
  a: a || 0,
  h: h || 0,
  unidadMedida: unidadMedida || "in",
  peso: peso || 0,
  unidadPeso: unidadPeso || "lb",
  costoe1Final: COSTOE1final || null,
  costoe2Final: COSTOE2final || null,
  costoe3Final: COSTOE3final || null,
  resultado: totalFinal || 0,
  moneda: moneda || "USD",
});

  };

  // ------------------ RESULTADO ------------------
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

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Cotizador Interno RapidMex
        </h1>

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

        {/* Unidad medida */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Unidad de medida</label>
          <select
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="in">Pulgadas (in)</option>
            <option value="cm">Centímetros (cm)</option>
          </select>
        </div>

        {/* Medidas */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Largo</label>
            <input
              type="number"
              placeholder="Largo"
              value={l}
              onChange={(e) => setL(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ancho</label>
            <input
              type="number"
              placeholder="Ancho"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alto</label>
            <input
              type="number"
              placeholder="Alto"
              value={h}
              onChange={(e) => setH(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>

        {/* Peso */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Peso real</label>
            <input
              type="number"
              placeholder="Peso real"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Unidad de peso</label>
            <select
              value={unidadPeso}
              onChange={(e) => setUnidadPeso(e.target.value)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="lb">Libras (lb)</option>
              <option value="kg">Kilogramos (kg)</option>
            </select>
          </div>
        </div>

        {/* COSTOE1 */}
        {(bodega === "houston" || bodega === "buffalo" || (bodega === "san-antonio" && llevaPaquete === "no") || (bodega === "st-catherins" && llevaPaquete === "no")) && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">COSTOE1</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="COSTOE1"
                value={costoe1}
                onChange={(e) => setCostoe1(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <select
                value={monedaCostoe1}
                onChange={(e) => setMonedaCostoe1(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            {mostrarConversiones(costoe1, monedaCostoe1)}
          </div>
        )}

        {/* COSTOE2 */}
        {(bodega === "san-antonio" || bodega === "houston" || bodega === "buffalo" || bodega === "st-catherins") && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">COSTOE2</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="COSTOE2"
                value={costoe2}
                onChange={(e) => setCostoe2(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <select
                value={monedaCostoe2}
                onChange={(e) => setMonedaCostoe2(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            {mostrarConversiones(costoe2, monedaCostoe2)}
          </div>
        )}

        {/* COSTOE3 */}
        {bodega === "st-catherins" && (
          <div className="mb-4">
            <label className="block font-semibold mb-1">COSTOE3</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="COSTOE3"
                value={costoe3}
                onChange={(e) => setCostoe3(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
              <select
                value={monedaCostoe3}
                onChange={(e) => setMonedaCostoe3(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            {mostrarConversiones(costoe3, monedaCostoe3)}
          </div>
        )}

        {/* Botón */}
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

            {moneda === "CAD" && (
              <div className="mt-4">
                <label className="block font-semibold mb-1">Valor del CAD en USD</label>
                <input
                  type="number"
                  step="0.01"
                  value={cadToUsd}
                  onChange={(e) => setCadToUsd(Number(e.target.value))}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            )}

            {moneda === "MXN" && (
              <div className="mt-4">
                <label className="block font-semibold mb-1">Valor del MXN por USD</label>
                <input
                  type="number"
                  step="0.01"
                  value={mxnToUsd}
                  onChange={(e) => setMxnToUsd(Number(e.target.value))}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
            )}

            {/* PDF */}
            {detalles && (
              <div className="mt-4">
                <PDFDownloadLink
                  document={<CotizacionPDF datos={detalles} />}
                  fileName="cotizacion.pdf"
                >
                  {({ loading }) => (
                    <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                      {loading ? "Generando PDF..." : "Generar PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
