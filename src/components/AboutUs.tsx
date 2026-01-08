"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function AboutUs() {
  return (
    <section id="nosotros" className="bg-white py-20 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            ¿Quiénes <span className="text-red-700">somos</span>?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            En <strong className="text-green-700">RapidMex</strong>, somos una
            empresa dedicada a facilitar el envío de paquetes desde{" "}
            <strong>Estados Unidos y Canadá</strong> hacia todo México. Nos
            enfocamos en brindar un servicio rápido, económico y 100% confiable
            para clientes particulares y comerciales.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Con más de 14 años de experiencia en logística, hemos consolidado
            una red eficiente de distribución con puntos de atención en
            múltiples ciudades. Nuestro compromiso es garantizar que tus envíos
            lleguen a su destino <strong>seguros y a tiempo</strong>.
          </p>
        </motion.div>

        {/* Imagen o Ilustración */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/img/TiemposEntrega.jpg"
            alt="Equipo de trabajo RapidMex"
            width={500}
            height={500}
            className="rounded-3xl w-full shadow-xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
