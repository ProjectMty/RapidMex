"use client";
import { useState } from "react";

export default function Calculadora() {
  const [unidad, setUnidad] = useState("cm");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [peso, setPeso] = useState("");
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);
  const [mensajeSobrepeso, setMensajeSobrepeso] = useState<string>("");

  const convertirACm = (valor: string): number => {
    const num = parseFloat(valor) || 0;
    return unidad === "in" ? num * 2.54 : num;
  };

  const calcularPrecio = () => {
    const largoCm = convertirACm(largo);
    const anchoCm = convertirACm(ancho);
    const altoCm = convertirACm(alto);
    const pesoIngresadoKg = parseFloat(peso) || 0;

    const volumenCm3 = largoCm * anchoCm * altoCm;
    const volumenM3 = volumenCm3 / 1000000;
    const pesoMaximoKg = volumenM3 * 140;
    const costoBase = (volumenCm3 / 5000) * 2.5;

    let sobrepesoUSD = 0;
    let mensaje = "";

    if (pesoIngresadoKg > pesoMaximoKg) {
      const excesoKg = pesoIngresadoKg - pesoMaximoKg;
      const excesoLb = excesoKg * 2.20462;
      sobrepesoUSD = Math.ceil(excesoLb); // $1 USD por libra
      mensaje = `⚠ El peso excede el permitido (${pesoMaximoKg.toFixed(2)} kg). Se aplican $${sobrepesoUSD} USD por sobrepeso.`;
    }

    const total = costoBase + sobrepesoUSD;
    setPrecioFinal(Number(total.toFixed(2)));
    setMensajeSobrepeso(mensaje);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Calculadora de Envíos
      </h2>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Largo ({unidad}):</label>
          <input
            type="number"
            value={largo}
            onChange={(e) => setLargo(e.target.value)}
            placeholder={unidad === "cm" ? "Ej: 50" : "Ej: 20"}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ancho ({unidad}):</label>
          <input
            type="number"
            value={ancho}
            onChange={(e) => setAncho(e.target.value)}
            placeholder={unidad === "cm" ? "Ej: 40" : "Ej: 16"}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Alto ({unidad}):</label>
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

      <div>
        <label className="block mt-4 text-sm font-medium">Unidad:</label>
        <select
          className="w-full p-2 border rounded"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
        >
          <option value="cm">Centímetros</option>
          <option value="in">Pulgadas</option>
        </select>
      </div>

      <button
        onClick={calcularPrecio}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Calcular Precio
      </button>

      {precioFinal !== null && (
        <div className="text-center mt-4 text-xl font-semibold text-green-700">
          Precio estimado: ${precioFinal} USD
        </div>
      )}

      {mensajeSobrepeso && (
        <div className="text-center text-red-600 font-medium">
          {mensajeSobrepeso}
        </div>
      )}
    </div>
  );
}

