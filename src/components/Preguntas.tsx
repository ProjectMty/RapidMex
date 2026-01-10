"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question:
      "¿Mi familia o cliente en México tendrá que pagar algo al recibir su paquete?",
    answer:
      "No. El servicio se paga en sucursal en USA o Canadá antes de que el paquete se envíe a México. Tu familiar o cliente no pagará nada al recibir en México.",
  },
  {
    question: "¿Cuentan con un servicio de envío más rápido?",
    answer:
      "¡Sí! RapidMex es un servicio express de USA a México en el cual entregamos el 3.er día hábil. Cotiza tu envío express en cualquier sucursal o por WhatsApp con un asesor en tu región.",
  },
  {
    question: "¿Puedo enviar maletas o mochilas?",
    answer:
      "No. Toda la mercancía debe empacarse en cajas de cartón. Nuestras sucursales cuentan con las cajas de los tamaños adecuados para envíos.",
  },
  {
    question: "¿Las cajas se abren antes de ser entregadas?",
    answer:
      "Sí. Nosotros revisamos el contenido de las cajas antes de que se cierren en nuestras sucursales en USA y Canadá. Tenemos el derecho de revisar el contenido en cualquier punto de nuestro proceso logístico. También podemos abrir cajas si vemos que están derramando líquido, mal empacadas, o a solicitud de cualquier autoridad de cualquier país.",
  },
  {
    question: "¿Puedo importar vehículos o motos?",
    answer:
      "No. RapidMex no maneja la importación de vehículos, lanchas o motocicletas a México.",
  },
  {
    question: "¿Puedo importar tarimas o mayor volumen?",
    answer:
      "¡Sí! RapidMex maneja importaciones comerciales para entrega en marketplaces como Amazon, Mercado Libre o a un tercero. Cotiza tu envío comercial en cualquier sucursal o por WhatsApp con un asesor en tu región.",
  },
  {
    question: "¿Mi mercancía está asegurada?",
    answer:
      "¡Sí! Tu mercancía viaja con un seguro que cubre el 100% del valor declarado contra robo, extravío o daño. Nosotros te reembolsaremos el total del valor declarado si tu paquete no llega a su destino final en México.",
  },
];

export default function Preguntas() {
  const [openIndex, setOpenIndex] = useState<null | number>(0);

  return (
    <section id="preguntas" className="bg-white py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-gray-900">
          <span className="text-green-700">Preguntas</span>{" "}
          <span className="text-red-700">frecuentes</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-gray-100 shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-800 font-medium text-base"
                >
                  {faq.question}
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4 text-sm text-gray-700"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
