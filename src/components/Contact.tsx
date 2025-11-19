"use client";
import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    largo: "",
    ancho: "",
    alto: "",
    peso: "",
    cpOrigen: "",
    cpDestino: ""
  });

  const [errorForm, setErrorForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    largo: "",
    ancho: "",
    alto: "",
    peso: "",
    cpOrigen: "",
    cpDestino: ""
  });

  const [paso, setPaso] = useState(1);


  const siguiente = (e: React.FormEvent) => {
    e.preventDefault();
    setPaso((prev) => Math.min(prev + 1, 3));
  };

  const anterior = (e: React.FormEvent) => {
    e.preventDefault();
    setPaso((prev) => Math.max(prev - 1, 1));
  };

  const circleClasses = (n: number) =>
    `flex items-center justify-center w-10 h-10 rounded-full border-2 
     ${paso >= n ? "bg-green-700 border-green-800 text-white" : "bg-gray-200/50 border-gray-300 text-gray-400"}
    `;

  const validarCPdestino = async () => {
    try {
      const url = `https://geocodes.envia.com/zipcode/MX/${encodeURIComponent(formData.cpDestino)}`;

      const response = await fetch(url, {
        method: "GET",

      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {

      } else {
        setErrorForm((prev) => ({ ...prev, cpDestino: "Por favor, proporciona un código postal valido del destino del paquete." }))
      }


    } catch (error) {
      console.error("Error validando el cp:", error);
      setErrorForm((prev) => ({ ...prev, cpDestino: "Por favor, proporciona un código postal valido del destino del paquete." }))
    }
  };

   const validarCPorigen = async () => {
    try {
      const url = `https://geocodes.envia.com/zipcode/MX/${encodeURIComponent(formData.cpOrigen)}`;

      const response = await fetch(url, {
        method: "GET",

      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {

      } else {
        setErrorForm((prev) => ({ ...prev, cpOrigen: "Por favor, proporciona un código postal valido del destino del paquete." }))
      }


    } catch (error) {
      console.error("Error validando el cp:", error);
      setErrorForm((prev) => ({ ...prev, cpOrigen: "Por favor, proporciona un código postal valido del destino del paquete." }))
    }
  };
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
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gray-300"></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-green-700 transition-all"
                  style={{ width: `${((paso - 1) / 2) * 100}%` }}
                ></div>
                <div className="relative z-10 flex w-full justify-between">
                  <div className={circleClasses(1)}>1</div>
                  <div className={circleClasses(2)}>2</div>
                  <div className={circleClasses(3)}>3</div>
                </div>
              </div>

              {paso === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Datos personales</h3>

                  <div>
                    <label >Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label >Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Teléfono"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Asunto</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>
                  <div className="flex justify-end  col-span-2">
                    <button
                      onClick={siguiente}
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white  font-bold py-3 px-6 rounded-xl w-[80%] mx-auto"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {paso === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Información del paquete</h3>

                  <div>
                    <label htmlFor="">Largo</label>
                    <input
                      type="number"
                      name="largo"
                      value={formData.largo}
                      onChange={handleChange}
                      placeholder="Largo"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Ancho</label>
                    <input
                      type="number"
                      name="ancho"
                      value={formData.ancho}
                      onChange={handleChange}
                      placeholder="Ancho"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Alto</label>
                    <input
                      type="number"
                      name="alto"
                      value={formData.alto}
                      onChange={handleChange}
                      placeholder="Alto"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="">Peso</label>
                    <input
                      type="number"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      placeholder="Peso"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>


                  <div className="flex justify-center col-span-2">
                    <button
                      onClick={anterior}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl w-[40%] mx-auto transform duration-200"
                    >
                      Anterior
                    </button>

                    <button
                      onClick={siguiente}
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl w-[40%] mx-auto transform duration-200"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Datos de envío</h3>
                  <div>
                    <label htmlFor="">CP origen</label>
                    <input
                      type="number"
                      name="cpOrigen"
                      value={formData.cpOrigen}
                      onChange={handleChange}
                      onBlur={validarCPorigen}
                      placeholder="Zip Origen"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="">CP Destino</label>
                    <input
                      type="number"
                      name="cpDestino"
                      value={formData.cpDestino}
                      onChange={handleChange}
                      onBlur={validarCPdestino}
                      placeholder="Zip Destino"
                      className="border rounded-lg p-3 w-full"
                    />
                  </div>


                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cotiza"
                    rows={2}
                    className="border rounded-lg p-3 w-full col-span-2 resize-none"
                  />

                  <div className="flex justify-between col-span-2">
                    <button
                      onClick={anterior}
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl w-[40%] mx-auto transform duration-200"
                    >
                      Anterior
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl w-[40%] mx-auto transform duration-200"
                    >
                      Cotización
                    </button>
                  </div>

                </div>
              )}

            </form>
          </div>
        </div>
      </div >
    </section >
  );
}
