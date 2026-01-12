"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
<<<<<<< HEAD:src/Vista/paginaPrincipal/Hero.tsx
import "@/Vista/styles/Hero.css"
=======

>>>>>>> 0aac7b1a0588903af431ff107889641a84e67bef:src/components/Hero.tsx

export default function Hero() {
  // Estado para controlar el slide activo
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  // Funciones para navegar entre slides
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Array de slides con imágenes, texto y alineación
  const slides = [
    {
      id: 0,
      images: ["/img/Banner1.1.png", "/img/Banner1.2.png", "/img/Banner1.3.png"],
      textAlignment: "left", // texto alineado a la izquierda
      title: "¡Ahora puedes enviar desde cualquier parte de Estados Unidos a México!",
      description:
        "¡No esperes a una recolección mensual en tu ciudad! Te enviamos una guía para realizar tu envío desde cualquier parte de USA a nuestro centro de distribución en Texas, y nosotros nos encargamos del resto para que tu paquete llegue sin complicaciones a México.",
    },
    {
      id: 1,
      images: ["/img/Banner2.1.png", "/img/Banner2.2.png"],
      textAlignment: "right", // texto alineado a la derecha
      title: "¿Necesitas enviar algo a México?",
      description:
        "Tenemos el mejor servicio puerta a puerta para que puedas hacer llegar tus paquetes desde Estados Unidos a México de forma segura y rápida.",
    },
    {
      id: 2,
      images: ["/img/Banner3.1.png", "/img/Banner3.2.png"],
      textAlignment: "left",
      title: "Tus compras en USA, directo a tu puerta",
      description:
        "Compra en cualquier tienda en línea de USA y recibe en México sin complicaciones. Nosotros nos encargamos del cruce, envío e impuestos.",
    },
  ];

  return (
    <section id="Hero" className="w-full relative ">
      {/* Contenedor principal del Hero con altura específica y bordes redondeados abajo */}
      <div className="relative h-[500px] md:h-[650px] overflow-hidden rounded-b-[80px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Capas de imagen (pueden ser decorativas o superpuestas) */}
            {slides[activeSlide].images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Slide ${activeSlide} Layer ${index}`}
                fill
                className={`object-cover object-center z-${index + 10}`}
                style={{
                  zIndex: 10 + index,
                  position: "absolute",
                  top: index === 2 ? "20px" : 0, // leve ajuste visual para la última capa
                }}
              />
            ))}

            {/* Contenedor del texto sobre la imagen */}
            <div
              className={`absolute inset-0 flex flex-col justify-center z-50 
                px-[15%] mt-10  
                md:px-[7%] md:w-[95%]
                lg:px-5
                xl:px-[2%]
                2xl:px-[12%]
                3xl:px-[14%]
                ${
                slides[activeSlide].textAlignment === "right"
                  ? "items-end text-right -translate-x-[5%] "
                  : "items-start text-left translate-x-[5%] "
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-[650px] ml-0 md:ml-0" // evita margen izquierdo y limita el ancho del texto
              >
                <h2 className="text-white  font-bold drop-shadow-md 
                text-[20px]
                md:text-[30px] 
                lg:text-[30px]
                xl:text-[40px] ">
                  {slides[activeSlide].title}
                </h2>
                <p className="text-white mt-4 drop-shadow 
                text-[15px]
                sm:text-[17px]
                md:text-[20px]
                lg:text-[20px]">
                  {slides[activeSlide].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botón de slide anterior */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 z-50 shadow-md"
        >
          ←
        </button>

        {/* Botón de slide siguiente */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 z-50 shadow-md"
        >
          →
        </button>
      </div>
    </section>
  );
}
