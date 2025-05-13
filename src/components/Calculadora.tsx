"use client";

import React, { useState } from "react";

export default function Calculadora() {
  const [tipoEnvio, setTipoEnvio] = useState("");
  const [unidad, setUnidad] = useState("cm"); // "cm" o "in"
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [peso, setPeso] = useState("");
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);

  const preciosPorTipo: Record<string, number> = {
    caja: 25,
    sobre: 10,
    pallet: 100,
  };

  const convertirACm = (valor: string): number => {
    const num = parseFloat(valor) || 0;
    return unidad === "in" ? num * 2.54 : num;
  };

  const calcularPrecio = () => {
    const precioBase = preciosPorTipo[tipoEnvio] || 0;
    const largoCm = convertirACm(largo);
    const anchoCm = convertirACm(ancho);
    const altoCm = convertirACm(alto);
    const pesoVal = parseFloat(peso) || 0;
    let pesoFinal = pesoVal;

    if (tipoEnvio === "sobre") {
      const largoEst = 121.92;
      const anchoEst = 91.44;
      const alturaCm = 1 * 100;
      const volumen = largoEst * anchoEst * alturaCm;
      const pesoVolumetrico = volumen / 5000;
      pesoFinal = Math.max(pesoVal, pesoVolumetrico);
    } else if (tipoEnvio === "pallet" || tipoEnvio === "caja") {
      const volumen = largoCm * anchoCm * altoCm;
      const pesoVolumetrico = volumen / 5000;
      pesoFinal = Math.max(pesoVal, pesoVolumetrico);
    }

    const costoPeso = pesoFinal * 1.5;
    const total = precioBase + costoPeso;
    setPrecioFinal(Number(total.toFixed(2)));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Calculadora de Envíos
      </h2>

      {/* Tipo de envío */}
      <div>
        <label className="block mb-2 font-semibold">Tipo de envío:</label>
        <select
          className="w-full p-2 border rounded"
          value={tipoEnvio}
          onChange={(e) => {
            setTipoEnvio(e.target.value);
            setPrecioFinal(null);
            setLargo("");
            setAncho("");
            setAlto("");
            setPeso("");
          }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="caja">Caja</option>
          <option value="sobre">Sobre</option>
          <option value="pallet">Pallet</option>
        </select>
      </div>

      {/* Unidad de medida para dimensiones */}
      {(tipoEnvio === "caja" || tipoEnvio === "pallet") && (
        <div>
          <label className="block text-sm font-medium">
            Unidad de dimensiones:
          </label>
          <select
            className="w-full p-2 border rounded mb-2"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
          >
            <option value="cm">Centímetros (cm)</option>
            <option value="in">Pulgadas (in)</option>
          </select>
        </div>
      )}

      {/* Campos para Caja o Pallet */}
      {(tipoEnvio === "caja" || tipoEnvio === "pallet") && (
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Largo ({unidad}):
            </label>
            <input
              type="number"
              value={largo}
              onChange={(e) => setLargo(e.target.value)}
              placeholder={unidad === "cm" ? "Ej: 50" : "Ej: 20"}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Ancho ({unidad}):
            </label>
            <input
              type="number"
              value={ancho}
              onChange={(e) => setAncho(e.target.value)}
              placeholder={unidad === "cm" ? "Ej: 40" : "Ej: 16"}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Alto ({unidad}):
            </label>
            <input
              type="number"
              value={alto}
              onChange={(e) => setAlto(e.target.value)}
              placeholder={unidad === "cm" ? "Ej: 30" : "Ej: 12"}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Peso (kg):</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ej: 10"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      )}

      {/* Campos para Sobre */}
      {tipoEnvio === "sobre" && (
        <div>
          <label className="block text-sm font-medium">Peso (kg):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ej: 1.5"
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* Botón calcular */}
      <button
        onClick={calcularPrecio}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Calcular Precio
      </button>

      {/* Resultado */}
      {precioFinal !== null && (
        <div className="text-center mt-4 text-xl font-semibold text-green-700">
          Precio estimado: ${precioFinal} USD
        </div>
      )}
    </div>
  );
}
