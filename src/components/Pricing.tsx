"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Calculadora from "./Calculadora"; // importando calculadora.tsx dentro de pricing

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<null | number>(null);

  const tableContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-6 overflow-x-auto"
    >
      <table className="w-full text-sm text-center text-white border">
        <thead className="bg-red-700">
          <tr>
            <th className="py-3 px-4">Largo (in)</th>
            <th className="py-3 px-4">Alto (in)</th>
            <th className="py-3 px-4">Ancho (in)</th>
            <th className="py-3 px-4">Servicio Rapid Mex (5 días)</th>
            <th className="py-3 px-4">Servicio Rapid Mex Express (3 días)</th>
          </tr>
        </thead>
        <tbody className="bg-green-700">
          {[
            { size: 12, normal: 32, express: 45 },
            { size: 14, normal: 38, express: 54 },
            { size: 16, normal: 44, express: 62 },
            { size: 18, normal: 54, express: 76 },
            { size: 20, normal: 58, express: 82 },
            { size: 22, normal: 65, express: 92 },
            { size: 24, normal: 72, express: 101 },
          ].map(({ size, normal, express }, idx) => (
            <tr key={idx} className="border-t border-white">
              <td className="py-3 px-4">{size} in</td>
              <td className="py-3 px-4">{size} in</td>
              <td className="py-3 px-4">{size} in</td>
              <td className="py-3 px-4">${normal.toFixed(2)} USD</td>
              <td className="py-3 px-4">${express.toFixed(2)} USD</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-500 mt-4 text-center">
        *Los precios son aproximados. El costo puede variar dependiendo del peso
        y las dimensiones reales al momento del envío.
      </p>
    </motion.div>
  );
  return (
    <section id="tarifas" className="scroll-mt-48 bg-white py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Título arriba */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900">
            ¿<span className="text-green-700">Cuánto</span>{" "}
            <span className="text-red-700">Cuesta</span>?
          </h2>
        </motion.div>

        {/* Texto explicativo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 max-w-4xl mx-auto text-center"
        >
          <p className="text-xl font-semibold text-gray-800">
            Enviar tus paquetes con{" "}
            <span className="text-red-700 font-bold">RapidMex</span> es{" "}
            <span className="text-green-700 font-bold">
              ¡fácil y económico!
            </span>{" "}
            Evita cálculos complicados y gastos sorpresa.
          </p>
          <p className="text-xl font-semibold text-gray-800">
            Te ofrecemos{" "}
            <span className="text-red-700 font-bold">dos planes de envío</span>.
            ¡Elige el que más te convenga!
          </p>
        </motion.div>

        {/* Tarjetas de precios */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {/* Plan 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 rounded-3xl shadow-md p-6 space-y-4 w-full min-w-[300px] hover:shadow-xl hover:border hover:border-green-500"
          >
            <h3 className="text-sm font-bold text-gray-500">PLAN 1</h3>
            <h4 className="text-xl font-bold text-gray-800">Cajas RapidMex</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-1">
                  ✓
                </span>
                <span>Tu mercancía viaja en nuestras cajas estándar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-1">
                  ✓
                </span>
                <span>Eliges la caja más apta para tu envío.</span>
              </li>
            </ul>
            <button
              onClick={() => setSelectedPlan(selectedPlan === 1 ? null : 1)}
              className="mt-6 bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-3 rounded-xl w-full"
            >
              ELEGIR PLAN
            </button>
            <AnimatePresence>
              {selectedPlan === 1 && tableContent}
            </AnimatePresence>
          </motion.div>

          {/* Plan 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-100 rounded-3xl shadow-md p-6 space-y-4 w-full min-w-[300px] hover:shadow-xl hover:border hover:border-green-500"
          >
            <h3 className="text-sm font-bold text-gray-500">PLAN 2</h3>
            <h4 className="text-xl font-bold text-gray-800">
              RapidMex Your Way
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-1">
                  ✓
                </span>
                <span>Tu mercancía viaja en tu empaque.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-1">
                  ✓
                </span>
                <span>
                  Cobramos basado en peso, dimensiones y tipo de artículo.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs mt-1">
                  ✓
                </span>
                <span>
                  Utiliza nuestro tabulador para cotizar tu envío hoy.
                </span>
              </li>
            </ul>
            <button
              onClick={() => setSelectedPlan(selectedPlan === 2 ? null : 2)}
              className="mt-6 bg-green-700 hover:bg-green-800 text-white text-sm font-bold py-3 rounded-xl w-full"
            >
              ELEGIR PLAN
            </button>
            <AnimatePresence>
              {selectedPlan === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <Calculadora />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Texto adicional centrado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <p className="text-2xl font-bold text-gray-800">
            Te ayudamos a enviar todo lo que necesites desde{" "}
            <span className="font-bold text-green-700">USA</span> a{" "}
            <span className="font-bold text-red-700">México</span>: ya sea que
            quieras mandar paquetes a tus familiares, mercancía para revender,
            muebles, televisores o incluso una mudanza completa. También
            gestionamos el envío de sobres, documentos y tarimas con un servicio{" "}
            <span className="text-green-700 font-semibold">rápido</span>,{" "}
            <span className="text-red-700 font-semibold">claro</span> y{" "}
            <span className="text-green-700 font-semibold">confiable</span>.
          </p>
        </motion.div>

        {/* Sección de íconos scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full pt-20"
        >
          <h3 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            <span className="text-green-700">Artículos</span> que{" "}
            <span className="text-red-700">NO</span> se pueden enviar
          </h3>

          <div className="flex overflow-x-auto space-x-6 px-2">
            {[
              { src: "/img/Asset 8.svg", label: "Bebidas Alcohólicas" },
              { src: "/img/Asset 9.svg", label: "Pieles o cueros exóticos" },
              {
                src: "/img/Asset 10.svg",
                label: "Armas de fuego o accesorios",
              },
              { src: "/img/Asset 11.svg", label: "Balas" },
              { src: "/img/Asset 12.svg", label: "Animales" },
              { src: "/img/Asset 13.svg", label: "Plantas" },
              {
                src: "/img/Asset 14.svg",
                label: "Medicamento restringido o controlado",
              },
              { src: "/img/Asset 15.svg", label: "Pornografía" },
              { src: "/img/Asset 16.svg", label: "Muestras de laboratorio" },
              {
                src: "/img/Asset 17.svg",
                label: "Explosivos o gases comprimidos",
              },
              {
                src: "/img/Asset 18.svg",
                label: "Materiales radioactivos o magnéticos",
              },
              {
                src: "/img/Asset 19.svg",
                label: "Artículos tóxicos, irritables o infecciosos",
              },
              {
                src: "/img/Asset 20.svg",
                label: "Mercancía falsificada o pirateada",
              },
              { src: "/img/Asset 21.svg", label: "Efectivo" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="min-w-[140px] flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-2xl bg-gray-300 flex items-center justify-center hover:bg-red-600 transition">
                  <Image
                    src={item.src}
                    alt={item.label}
                    width={60}
                    height={60}
                  />
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-gray-700">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Nueva sección: Tiempos de entrega */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl p-10 shadow-xl"
        >
          <div className="relative flex justify-center">
            <Image
              src="/img/TiemposEntrega.jpg"
              alt="Tiempos de entrega"
              width={500}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="space-y-4 text-left">
            <h3 className="text-4xl font-extrabold text-gray-900">
              <span className="text-red-700">Tiempos</span> de entrega en{" "}
              <span className="text-green-700">México:</span>
            </h3>
            <p className="text-gray-700">
              RapidMex realiza importaciones de todas las sucursales en USA y
              Canadá a México todos los días. Ya en México, tu paquete empieza a
              viajar con la paquetería nacional el próximo día después de su
              llegada a nuestro centro de distribución en Monterrey.
            </p>
            <p className="text-gray-700">
              De Canadá a México, esto tarda 6 días hábiles. De Estados Unidos a
              México, esto tarda 4 días hábiles. Una vez que tus paquetes se
              entreguen a paquetería nacional, los tiempos de entrega dependen
              de la paquetería.
            </p>
            <p className="text-sm text-gray-500 italic">
              Nosotros trabajamos con las paqueterías más confiables y rápidas
              de México. Nuestras tarifas cubren envíos en México con FedEx,
              Estafeta y fleteros reconocidos como Tres Guerras y Paquete
              Express.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
