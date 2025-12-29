"use client";
import React, { useState } from "react";
import Swal from 'sweetalert2'
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

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
    name: false,
    phone: false,
    email: false,
    subject: false,
    message: false,
    largo: false,
    ancho: false,
    alto: false,
    peso: false,
    cpOrigen: false,
    cpDestino: false
  });

  const [paso, setPaso] = useState(1);

  const countries = [
    { code: "US", name: "USA", image: "/bandera-usa.png" },
    { code: "MX", name: "México", image: "/bandera-mexico.png" },
  ];

  const [selectedOrigen, setSelectedOrigen] = useState(countries[0]);
  const [selectedDestino, setSelectedDestino] = useState(countries[0]);
  const [openO, setOpenO] = useState(false);
  const [openD, setOpenD] = useState(false);

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
     ${paso >= n ? "bg-green-700 border-green-800 text-white" : "bg-gray-200 border-gray-300 text-gray-400"}
    `;

  const validarCPdestino = async () => {
    try {
      const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(selectedDestino.code)}/${encodeURIComponent(formData.cpDestino)}`;
      console.log("destino" + url);
      const response = await fetch(url, {
        method: "GET",

      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setErrorForm((prev) => ({ ...prev, cpDestino: false }))
        console.log(data);
      } else {
        setErrorForm((prev) => ({ ...prev, cpDestino: true }))
      }


    } catch (error) {
      console.error("Error validando el cp de destino:", error);
      setErrorForm((prev) => ({ ...prev, cpDestino: true }))
    }
  };

  const validarCPorigen = async () => {
    try {

      const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(selectedOrigen.code)}/${encodeURIComponent(formData.cpOrigen)}`;
      console.log("origen" + url);
      const response = await fetch(url, {
        method: "GET",

      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setErrorForm((prev) => ({ ...prev, cpOrigen: false }))
        console.log(data);
      } else {
        setErrorForm((prev) => ({ ...prev, cpOrigen: true }))
      }


    } catch (error) {
      console.error("Error validando el cp de origen:", error);
      setErrorForm((prev) => ({ ...prev, cpOrigen: true }))
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

  const validateInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value === "") {
      setErrorForm((prev) => ({ ...prev, [name]: true }));
    } else {
      setErrorForm((prev) => ({ ...prev, [name]: false }));
    }

  };

    const handleChangeTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eliminar todo lo que no sea número
    let numeros = e.target.value.replace(/\D/g, "").slice(0, 10);


    if (numeros.length > 6) {
      numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3, 6)}-${numeros.slice(6)}`;
    } else if (numeros.length > 3) {
      numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3)}`;
    } else if (numeros.length > 0) {
      numeros = `(${numeros}`;
    }
    setFormData((prev) => ({ ...prev, phone: numeros }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!formData.name || !formData.email || !formData.message || !formData.phone || !formData.subject || !formData.message || !formData.largo || !formData.ancho || !formData.alto || !formData.peso || !formData.cpOrigen || !formData.cpDestino) {
       Swal.fire({
        title: "ERROR",
        text: "Porfavor llene todos los campos",
        icon: "error"
      });
      setPaso(1);
      return;
    }

    const body = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      largo: formData.largo,
      ancho: formData.ancho,
      alto: formData.alto,
      peso: formData.peso,
      cpOrigen: formData.cpOrigen,
      cpDestino: formData.cpDestino
    };


    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Correo enviado",
        text: data.message,
        icon: "success",
        timer: 3000
      });
    } else {
      Swal.fire({
        title: "ERROR",
        text: "Hubo un error al mandar datos de contacto",
        icon: "error"
      });
      return;
    }
    setFormData({
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
    })
    setPaso(1);

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
                <div className="lg:grid lg:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Datos personales</h3>

                  <div className="relative mb-3">
                    <label >Nombre</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.name === true ? "block" : "hidden"}`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="Nombre"
                      className={`border rounded-lg p-3 w-full ${errorForm.name === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label >Teléfono</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.phone === true ? "block" : "hidden"}`} />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChangeTelefono}
                      onBlur={validateInput}
                      placeholder="Teléfono"
                      className={`border rounded-lg p-3 w-full ${errorForm.phone === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">Email</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.email === true ? "block" : "hidden"}`} />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="Email"
                      className={`border rounded-lg p-3 w-full ${errorForm.email === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">Asunto</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.subject === true ? "block" : "hidden"}`} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="Asunto"
                      className={`border rounded-lg p-3 w-full ${errorForm.subject === true ? "border-red-600" : "border-green-800"}`}
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
                <div className="lg:grid  md:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Información del paquete</h3>

                  <div className="relative mb-3">
                    <label htmlFor="">Largo</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.largo === true ? "block" : "hidden"}`} />
                    <input
                      type="number"
                      name="largo"
                      value={formData.largo}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="In"
                      className={`border rounded-lg p-3 w-full ${errorForm.largo === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">Ancho</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.ancho === true ? "block" : "hidden"}`} />
                    <input
                      type="number"
                      name="ancho"
                      value={formData.ancho}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="In"
                      className={`border rounded-lg p-3 w-full ${errorForm.ancho === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">Alto</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.alto === true ? "block" : "hidden"}`} />
                    <input
                      type="number"
                      name="alto"
                      value={formData.alto}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="In"
                      className={`border rounded-lg p-3 w-full ${errorForm.alto === true ? "border-red-600" : "border-green-800"}`}
                    />
                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">Peso</label>
                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.peso === true ? "block" : "hidden"}`} />
                    <input
                      type="number"
                      name="peso"
                      value={formData.peso}
                      onChange={handleChange}
                      onBlur={validateInput}
                      placeholder="Lb"
                      className={`border rounded-lg p-3 w-full ${errorForm.peso === true ? "border-red-600" : "border-green-800"}`}
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
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold lg:py-3 lg:px-6 rounded-xl w-[40%] mx-auto transform duration-200"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}

              {paso === 3 && (
                <div className="lg:grid  lg:grid-cols-2 gap-4">
                  <h3 className="text-lg font-semibold col-span-2 text-center">Datos de envío</h3>
                  <div className="relative">
                    <label htmlFor="">CP origen</label>
                    <div className="relative flex  mb-3">
                      <div className="relative">
                        {/* SELECT visible */}
                        <button
                          type="button"
                          onClick={() => setOpenO(!openO)}
                          className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                        >
                          <img src={selectedOrigen.image} className="w-10 h-6 object-cover" />
                          <IoIosArrowDown className="w-[50px]" />
                        </button>

                        {/* OPCIONES */}
                        {openO && (
                          <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                            {countries.map((c) => (
                              <div
                                key={c.code}
                                onClick={() => {
                                  setSelectedOrigen(c);
                                  setOpenO(false);
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <img src={c.image} className="w-6 h-4 object-cover" />
                                <span>{c.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpDestino === true ? "block" : "hidden"}`} />
                      <input
                        type="number"
                        name="cpOrigen"
                        value={formData.cpOrigen}
                        onChange={handleChange}

                        onBlur={validarCPorigen}
                        placeholder="Zip Origen"
                        className={`border rounded-r-lg p-3 w-full ${errorForm.cpDestino === true ? "border-red-600" : "border-green-800"}`}
                      />
                    </div>

                  </div>

                  <div className="relative mb-3">
                    <label htmlFor="">CP Destino</label>
                    <div className="flex relative">
                      <div className="relative ">
                        {/* SELECT visible */}
                        <button
                          type="button"
                          onClick={() => setOpenD(!openD)}
                          className=" rounded-l-lg border border-r-0 py-3 pl-1 flex items-center bg-white"
                        >
                          <img src={selectedDestino.image} className="w-10 h-6 object-cover" />
                          <IoIosArrowDown className="w-[50px]" />
                        </button>

                        {/* OPCIONES */}
                        {openD && (
                          <div className="absolute left-0 mt-1 w-[170%] border bg-white shadow-lg z-50">
                            {countries.map((c) => (
                              <div
                                key={c.code}
                                onClick={() => {
                                  setSelectedDestino(c);
                                  setOpenD(false);
                                }}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <img src={c.image} className="w-6 h-4 object-cover" />
                                <span>{c.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.cpDestino === true ? "block" : "hidden"}`} />
                      <input
                        type="number"
                        name="cpDestino"
                        value={formData.cpDestino}
                        onChange={handleChange}
                        onBlur={validarCPdestino}
                        placeholder="Zip Destino"
                        className={`border rounded-r-lg p-3 w-full ${errorForm.cpDestino === true ? "border-red-600" : "border-green-800"}`}
                      />
                    </div>


                  </div>


                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cotiza"
                    rows={2}
                    className="border border-green-800 rounded-lg p-3 w-full col-span-2 resize-none  mb-3"
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
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold lg:py-3 lg:px-6 rounded-xl w-[40%] mx-auto transform duration-200"
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
