"use client";

import React from "react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 px-6 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Título */}
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-green-700">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Imagen */}
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg flex items-center">
            <img
              src="/img/Contacto.jpg"
              alt="Paquetería Contacto"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Formulario */}
          <div className="bg-red-700 rounded-3xl text-white p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <p>
                ¡Por favor contáctanos! Nuestro equipo te atenderá de forma
                inmediata.
              </p>
              <p>O visítanos en tu sucursal más cercana:</p>

              <div className="text-sm space-y-2 underline">
                <a href="https://www.google.com.mx/maps/place/113+Cushman+Rd,+St.+Catharines,+ON+L2M+6S9,+Canadá/@43.1718741,-79.2033974,17z/data=!3m1!4b1!4m6!3m5!1s0x89d3516962629607:0x169fc3bdacc19f4b!8m2!3d43.1718741!4d-79.2008225!16s%2Fg%2F11krymxm11?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D">
                  113-115 Cushman Road St. Catharines, ON L2M 6S9
                </a>
                <br />
                <a href="https://www.google.com.mx/maps/place/202+Rhode+Island+St,+Buffalo,+NY+14213,+EE.+UU./@42.9082595,-78.8953736,17z/data=!3m1!4b1!4m6!3m5!1s0x89d313066807ea21:0x4ccf147973a7a0b2!8m2!3d42.9082595!4d-78.8927987!16s%2Fg%2F11bw4jfpkq?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D">
                  202 Rhode Island Buffalo, NY 14213
                </a>
              </div>
              <div className="text-sm space-y-2 underline">
                <a href="https://www.google.com/maps/place/355+Spencer+Ln+Bldg+1,+San+Antonio,+TX+78201,+USA/@29.4847344,-98.5432825,471m/data=!3m1!1e3!4m6!3m5!1s0x865c5e441970d5ef:0x49d3ed90f3008128!8m2!3d29.4847585!4d-98.543552!16s%2Fg%2F11gnsw5g54?entry=ttu&g_ep=EgoyMDI1MDUxNS4xIKXMDSoASAFQAw%3D%3D">
                  355 Spencer Lane Building 1, San Antonio, Texas 78201
                </a>
                <br />
                <a href="https://www.google.com.mx/maps/place/2301+Moctezuma+St,+Laredo,+TX+78040,+EE.+UU./@27.5096243,-99.5210436,17z/data=!3m1!4b1!4m6!3m5!1s0x8661218bf26a4a39:0x5f5bf5b036f270e6!8m2!3d27.5096196!4d-99.5184633!16s%2Fg%2F11b8v68jb_?entry=ttu&g_ep=EgoyMDI1MDQyNy4xIKXMDSoASAFQAw%3D%3D">
                  2301 Moctezuma, Laredo, TX 78040
                </a>
              </div>
            </div>

            <form className="bg-white rounded-3xl p-6 text-gray-900 space-y-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="border rounded-lg p-3 w-full"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-lg p-3 w-full"
                />
                <input
                  type="text"
                  placeholder="Asunto"
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <textarea
                placeholder="Cotiza"
                rows={4}
                className="border rounded-lg p-3 w-full"
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl w-full"
              >
                Cotización
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
