"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slides = [
    {
      key: "slide-1",
      images: [
        "/img/Banner 1.1.png",
        "/img/Banner 1.2.png",
        "/img/Banner 1.3.png"
      ],
      textAlign: "start",
      heading: "Ahora puedes enviar desde cualquier parte de Estados Unidos a México.",
      paragraph:
        "¡No esperes a una recolección mensual en tu ciudad! Te enviamos una guía para realizar tu envío desde cualquier parte de USA a nuestro centro de distribución en Texas, y nosotros nos encargamos del resto para que tu paquete llegue sin complicaciones a México."
    },
    {
      key: "slide-2",
      images: [
        "/img/Banner 2.1.png",
        "/img/Banner 2.2.png",
        "/img/Banner 2.3.png"
      ],
      textAlign: "end",
      heading: "¿Necesitas enviar algo a México?",
      paragraph: "Nosotros te ayudamos con envíos seguros y rápidos."
    },
    {
      key: "slide-3",
      images: [
        "/img/Banner 3.1.png",
        "/img/Banner 3.2.png",
        "/img/Banner 3.3.png"
      ],
      textAlign: "start",
      heading: "¡Somos la mejor opción para tus envíos a México!",
      paragraph: "No importa si es un paquete pequeño o una carga más grande, lo llevamos con rapidez y seguridad."
    }
  ];

  return (
    <section id="Hero" className="w-full relative">
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            activeSlide === index && (
              <motion.div
                key={slide.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[720px] md:h-[800px] lg:h-[860px]"
              >
                {slide.images.map((src, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.2 }}
                    className="absolute inset-0 z-[10]"
                  >
                    <Image
                      src={src}
                      alt={`Banner capa ${idx + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover"
                    />
                  </motion.div>
                ))}

                <div
                  className={`absolute inset-0 flex items-center ${slide.textAlign === "end" ? "justify-end" : "justify-start"} px-4 sm:px-6 md:px-8 lg:px-24 z-30`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-white ${slide.textAlign === "end" ? "text-end" : "text-start"}`}
                  >
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight"
                    >
                      {slide.heading}
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                    >
                      {slide.paragraph}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
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
        {slides.map((_, index) => (
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
