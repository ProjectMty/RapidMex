"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 2;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section id="Hero" className="w-full relative">
      <div className="relative w-full overflow-hidden">

        <AnimatePresence mode="wait">
          {activeSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              {/* Imagen escritorio HOMBRE */}
              <div className="hidden md:block w-full relative aspect-[2/1]">
                <Image
                  src="/img/bannerf1.png"
                  alt="Banner escritorio hombre"
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="object-cover object-right"
                />
              </div>

              {/* Imagen móvil HOMBRE */}
              <div className="block md:hidden w-full relative h-[360px] sm:h-[420px]">
                <Image
                  src="/img/bannerf1-mobile.webp"
                  alt="Banner móvil hombre"
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Texto encima alineado a la izquierda */}
              <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-24 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-left"
                >
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-extrabold text-green-700 leading-tight"
                  >
                    ¡SOMOS LA MEJOR OPCIÓN PARA TUS ENVÍOS A MÉXICO!
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-red-600 font-medium"
                  >
                    No importa si es un paquete pequeño o una carga más grande, lo llevamos con rapidez y seguridad.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              {/* Imagen escritorio MUJER */}
              <div className="hidden md:block w-full relative aspect-[2/1]">
                <Image
                  src="/img/bannerf2.png"
                  alt="Banner escritorio mujer"
                  layout="fill"
                  objectFit="contain"
                  priority
                  className="object-cover object-left lg:object-center"
                />
              </div>

              {/* Imagen móvil MUJER */}
              <div className="block md:hidden w-full relative h-[360px] sm:h-[420px]">
                <Image
                  src="/img/bannerf2-mobile.webp"
                  alt="Banner móvil mujer"
                  fill
                  priority
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Texto encima alineado a la derecha */}
              <div className="absolute inset-0 flex items-center justify-end px-4 sm:px-6 md:px-8 lg:px-24 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-right"
                >
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-extrabold text-green-700 leading-tight"
                  >
                    ¿Necesitas enviar algo a México?
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-red-600 font-medium"
                  >
                    Nosotros te ayudamos con envíos seguros y rápidos.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-gray-300 hover:bg-gray-400 rounded-full p-3 transition"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-gray-300 hover:bg-gray-400 rounded-full p-3 transition"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10">
            <path d="M1 9l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSlide === index ? "bg-green-700 scale-110" : "bg-gray-300"
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
