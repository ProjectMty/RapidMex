// src/components/Services.tsx

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "../data/servicesData";

export default function Services() {
  return (
    <section id="servicios" className="bg-white py-20 px-6 lg:px-24 font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-center text-gray-900 mb-12">
          ¡<span className="text-green-700">Ventajas</span> de nuestro{" "}
          <span className="text-red-700">servicio</span>!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl transition-all"
            >
              <div
                className={`w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center ${service.bgColor}`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-800 font-medium text-sm">
                {service.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
