"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { pasos, PasoItem } from "../data/comoFuncionaData";

export default function ComoFunciona() {
  return (
    <section className="relative bg-white py-20 px-6 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Imagen decorativa 3D lado izquierdo */}
        <div className="relative flex justify-center">
          <Image
            src="/img/Conveyor-Belt.png"
            alt="Cinta transportadora"
            width={400}
            height={300}
            className="rounded-3xl object-contain"
          />
        </div>

        {/* Título */}
        <div className="mb-10 lg:mb-0">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            ¿<span className="text-red-700">Cómo</span> funciona?
          </h2>
        </div>
      </div>

      {/* Pasos del proceso */}
      <div className="relative mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {pasos.map((step: PasoItem, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ backgroundColor: "#15803d" }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="group bg-white shadow-md p-6 rounded-3xl flex items-start gap-4 relative z-10 hover:cursor-pointer"
          >
            <div className="min-w-[48px] h-[48px] rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <Image
                src={`/img/${step.icon}`}
                alt={`Paso ${index + 1}`}
                width={28}
                height={28}
              />
            </div>
            <p className="text-sm text-gray-800 font-medium leading-snug group-hover:text-white transition-colors duration-300">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Línea curva opcional */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Aquí puedes poner un SVG decorativo si quieres */}
      </div>
    </section>
  );
}
