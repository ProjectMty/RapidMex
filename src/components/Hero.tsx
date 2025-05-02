"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 2;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <section
      id="hero"
      className="pt-[88px] bg-white py-16 px-6 lg:px-12 w-full relative"
    >
      <div className="relative w-full overflow-hidden min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full min-h-[600px] px-6 py-12 bg-cover bg-center"
              style={{ backgroundImage: "url('/img/banner.png')" }}
            >
              {/* Texto Slide 1 */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-10"
              >
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-white">
                  <span className="text-slate-900">Envío de paquetería </span>
                  <span className="text-white">desde tu ciudad en </span>
                  <span className="text-slate-900">Estados Unidos </span>
                  <span className="text-white">a cualquier parte de </span>
                  <span className="text-slate-900">México!</span>
                </h1>
              </motion.div>
            </motion.div>
          )}

          {activeSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full min-h-[600px] px-6 py-12 bg-gradient-to-br from-green-600 to-green-300"
            >
              {/* Texto Slide 2 */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="text-3xl lg:text-5xl font-extrabold text-white">
                  RapidMex es la mejor opción para tus envíos a México.
                </h2>
                <p className="text-lg text-black leading-relaxed max-w-xl">
                  Somos un servicio de paquetería internacional con más de 14
                  años, brindando soluciones en Canadá, Estados Unidos y México.
                </p>
              </motion.div>

              {/* Imagen Slide 2 */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <Image
                  src="/img/Wooden-Box.png"
                  alt="Caja de envío"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flechas de navegación */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-gray-300 hover:bg-gray-400 rounded-full p-3 transition"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1L1 5l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-gray-300 hover:bg-gray-400 rounded-full p-3 transition"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9l4-4-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSlide === index ? "bg-black scale-110" : "bg-gray-300"
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
