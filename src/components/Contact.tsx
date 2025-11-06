"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: `Teléfono: ${formData.phone}\nAsunto: ${formData.subject}\n\n${formData.message}`,
      }),
    });

    if (response.ok) {
      alert("¡Correo enviado exitosamente!");
    } else {
      alert("Hubo un error al enviar el correo.");
    }
  };

  return (
    <section id="contacto" className="py-20 px-6 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center text-green-700">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg flex items-center">
            <img
              src="/img/Contacto.jpg"
              alt="Paquetería Contacto"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-red-700 rounded-3xl text-white p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <p>
                ¡Por favor contáctanos! Nuestro equipo te atenderá de forma inmediata.
              </p>
              <p>O visítanos en tu sucursal más cercana:</p>

              <div className="text-sm space-y-2 underline">
                <a href="https://maps.app.goo.gl/DBoXpr1U8KzEZk61A">55-56 Cushman Road St. Catharines, ON L2M 6S9</a>
                <br />
                <a href="https://www.google.com.mx/maps/place/202+Rhode+Island+St,+Buffalo,+NY+14213,+EE.+UU./">202 Rhode Island Buffalo, NY 14213</a>
              </div>
              <div className="text-sm space-y-2 underline">
                <a href="https://www.google.com/maps/place/355+Spencer+Ln+Bldg+1,+San+Antonio,+TX+78201,+USA/">355 Spencer Lane Building 1, San Antonio, Texas 78201</a>
                <br />
                <a href="https://www.google.com.mx/maps/place/2301+Moctezuma+St,+Laredo,+TX+78040,+EE.+UU./">2301 Moctezuma, Laredo, TX 78040</a>
              </div>
                <div className="text-sm space-y-2 underline">
                <a href="https://maps.app.goo.gl/sSk6T6n34YTPWAdUA">28408 sweetgum Rd C1 Magnolia Tx 77354</a>
              
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-6 text-gray-900 space-y-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="border rounded-lg p-3 w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded-lg p-3 w-full"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Asunto"
                  className="border rounded-lg p-3 w-full"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
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
