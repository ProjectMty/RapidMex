"use client";

import { motion } from "framer-motion";

export default function MessageBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white py-12 px-6 lg:px-24"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed text-gray-800">
          <span className="text-red-700 font-bold">
            No envíes tu mercancía o tus artículos personales con cualquier
            transportista,
          </span>{" "}
          ni esperes a los viajes una vez por mes.{" "}
          <span className="text-green-700 font-bold">
            Elige un servicio profesional, confiable, rápido, seguro, y
            económico.
          </span>{" "}
          Nuestros costos son mejores que cualquier otro servicio de paquetería
          a México.
        </p>
      </div>
    </motion.div>
  );
}
