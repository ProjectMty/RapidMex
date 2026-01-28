"use client";
import Image from "next/image";
import { useState } from "react";
import Swal from 'sweetalert2'
import { FaUser, FaPhoneAlt, FaRegPaperPlane } from "react-icons/fa";
export default function Opiniones() {
    const [form, setForm] = useState({
        nombre: "",
        telefono: "",
        experiencia: 0,
        atencion: 0,
        tiempo: 0,
        nuevamente: "",
        envio: "",
        comentarios: ""
    })
    const options1 = ["Si", "Tal vez", "No"];
    const options2 = ["Próximos 30 días", "Más adelante", "No por ahora"];

    const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value;
        valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        valor = valor.replace(/\s{2,}/g, " ");
        valor = valor.slice(0, 20);
        valor = valor
            .toLowerCase()
            .replace(/\b\w/g, (letra) => letra.toUpperCase());

        setForm((prev) => ({ ...prev, nombre: valor }));
    }

    const handleChangeTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numeros = e.target.value.replace(/\D/g, "").slice(0, 10);
        if (numeros.length > 6) {
            numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3, 6)}-${numeros.slice(6)}`;
        } else if (numeros.length > 3) {
            numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3)}`;
        } else if (numeros.length > 0) {
            numeros = `(${numeros}`;
        }
        setForm((prev) => ({ ...prev, telefono: numeros }));
    };

    const handleChangeComentarios = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let valor = e.target.value;
        valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        valor = valor.replace(/\s{2,}/g, " ");
        valor = valor.slice(0, 60);
        setForm((prev) => ({ ...prev, comentarios: valor }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.experiencia || !form.atencion || !form.tiempo || !form.nuevamente || !form.envio) {
            Swal.fire({
                title: "Faltan campos por completar",
                text: "Por favor, completa todos los campos obligatorios antes de continuar.",
                icon: "warning",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#20c15c"
            });

            return;
        }

        const body = {
            nombre: form.nombre,
            telefono: form.telefono,
            experiencia: form.experiencia,
            atencion: form.atencion,
            tiempo: form.tiempo,
            nuevamente: form.nuevamente,
            envio: form.envio,
            comentarios: form.comentarios
        }

        const response = await fetch("api/opinion", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: "Opinion enviada",
                text: data.message,
                icon: "success",
                timer: 3000
            })
            setForm({
                nombre: "",
                telefono: "",
                experiencia: 0,
                atencion: 0,
                tiempo: 0,
                nuevamente: "",
                envio: "",
                comentarios: ""
            })
        } else {
            Swal.fire({
                title: "Error al enviar opinion",
                text: "Intente de nuevo mas tarde",
                icon: "error",
            })
        }
    }
    return (
        <section className="bg-[#eaf1f9] h-fit w-full py-10 md:py-20 lg:py-22 px-6 lg:px-24 ">
            <div className="grid  justify-items-center mx-auto lg:w-[70%] 2xl:w-[40%] text-center">
                <Image
                    alt="logo"
                    height={400}
                    width={400}
                    src={"/singup/logoRM.svg"}
                    className="my-20" />
                <h1 className="text-[#4d4d4d] font-[1000] text-[35px] lg:text-[45px] ">
                    Tu opinión es <span className="text-[#c7202f] ">muy importante</span> para nosotros</h1>
                <p className="mt-5 text-[15px] lg:text-[20px] font-light ">En RapidMex trabajamos todos los días para ofrecerte envíos seguros y rápidos.</p>
                <p className=" text-[15px] lg:text-[20px] font-light ">  Tu experiencia nos ayuda a seguir mejorando.</p>

                <Image
                    alt="img"
                    height={400}
                    width={700}
                    src={"/img/Contacto.jpg"}
                    className="rounded-4xl my-20 lg:my-10" />

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="bg-white w-full rounded-2xl shadow-xl/10 overflow-hidden">
                    <div className="bg-[#20c15c] h-2 w-full " />
                    <div className=" px-5 md:px-15 py-10 space-y-8">
                        <h1 className=" font-black text-2xl text-start">¿Nos regalas 1 minuto para calificarnos?</h1>
                        <div className="grid grid-cols-2 gap-5 ">
                            <div className=" text-start">
                                <div className="flex justify-start">
                                    <FaUser className="w-5 h-5 text-[#d4d4d4] mx-1" />
                                    <p className="font-bold px-3">Nombre <span className="font-light text-[#e2e8f0] ">(Opcional)</span></p>
                                </div>
                                <input type="text"
                                    placeholder="Tu nombre"
                                    onChange={handleChangeNombre}
                                    value={form.nombre}
                                    className="bg-[#f9fafb] border-2 border-[#e2e8f0] rounded-[10px] w-full my-2 p-3" />
                            </div>
                            <div className=" text-start">
                                <div className="flex justify-start">
                                    <FaPhoneAlt className="w-5 h-5 text-[#d4d4d4] mx-1" />
                                    <p className="font-bold px-3">Teléfono <span className="font-light text-[#e2e8f0] ">(Opcional)</span></p>
                                </div>

                                <input type="text"
                                    placeholder="Tu teléfono"
                                    onChange={handleChangeTelefono}
                                    value={form.telefono}
                                    className="bg-[#f9fafb] border-2 border-[#e2e8f0] rounded-[10px] w-full my-2 p-3" />
                            </div>
                        </div>

                        {/* LINEA SEPARACIÓN */}
                        <div className="bg-[#e2e8f0]/40 h-1 w-full " />
                        <p className="text-start font-bold text-[15px] text-[#cfd0da] ">CALIFICACIONES</p>
                        <div className="space-y-2 mt-5">
                            <h1 className=" font-bold text-[18px] text-start">¿Cómo calificarías tu experiencia general con RapidMex?</h1>
                            <p className="text-start font-medium text-[12px] text-[#cfd0da] ">1 estrella = Muy malo / 5 estrellas = Excelente</p>
                            <div className="flex">
                                <div className="rating rating-xl flex">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <input
                                            key={value}
                                            type="radio"
                                            name="rating-7"
                                            className="mask mask-star-2 bg-green-500 mx-1 lg:mx-3 "
                                            aria-label={`${value} star`}
                                            value={value}
                                            checked={form.experiencia === value}
                                            onChange={() => setForm((prev) => ({
                                                ...prev,
                                                experiencia: value
                                            }))}
                                        />
                                    ))}

                                </div>
                                <p className="grid content-center mx-2 lg:mx-10 font-medium text-[15px] text-[#8b8b8b] ">{form.experiencia} / 5 </p>
                            </div>


                        </div>

                        <div className="space-y-2 mt-5">
                            <h1 className=" font-bold text-[18px] text-start">¿Cómo calificarías la atención, costos y proceso de envío?</h1>
                            <p className="text-start font-medium text-[12px] text-[#cfd0da] ">1 estrella = Muy malo / 5 estrellas = Excelente</p>
                            <div className="flex">
                                <div className="rating rating-xl flex">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <input
                                            key={value}
                                            type="radio"
                                            name="rating-8"
                                            className="mask mask-star-2 bg-green-500 mx-1 lg:mx-3"
                                            aria-label={`${value} star`}
                                            value={value}
                                            checked={form.atencion === value}
                                            onChange={() => setForm((prev) => ({
                                                ...prev,
                                                atencion: value
                                            }))}
                                        />
                                    ))}
                                </div>
                                <p className="grid content-center mx-2 lg:mx-10 font-medium text-[15px] text-[#8b8b8b] ">{form.atencion} / 5 </p>
                            </div>


                        </div>

                        <div className="space-y-2 mt-5">
                            <h1 className=" font-bold text-[18px] text-start">¿Cómo calificarías el tiempo de entrega de tu paquete?</h1>
                            <p className="text-start font-medium text-[12px] text-[#cfd0da] ">1 estrella = Muy malo / 5 estrellas = Excelente</p>
                            <div className="flex">
                                <div className="rating rating-xl flex">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <input
                                            key={value}
                                            type="radio"
                                            name="rating-9"
                                            className="mask mask-star-2 bg-green-500 mx-1 lg:mx-3"
                                            aria-label={`${value} star`}
                                            value={value}
                                            checked={form.tiempo === value}
                                            onChange={() => setForm((prev) => ({
                                                ...prev,
                                                tiempo: value
                                            }))}
                                        />
                                    ))}
                                </div>
                                <p className="grid content-center mx-2 lg:mx-10 font-medium text-[15px] text-[#8b8b8b] ">{form.tiempo} / 5 </p>
                            </div>

                        </div>

                        {/* LINEA SEPARACIÓN */}
                        <div className="bg-[#e2e8f0]/40 h-1 w-full my-5" />

                        <div className="space-y-2 mt-5">
                            <h1 className=" font-bold text-[18px] text-start">¿Usarías RapidMex nuevamente para futuros envíos?</h1>
                            <div className=" flex gap-5">
                                {options1.map((option) => (
                                    <button key={option}
                                        type="button"
                                        onClick={() => setForm((prev) => ({
                                            ...prev,
                                            nuevamente: option
                                        }))}
                                        className={`border-2 rounded-[10px] w-full my-2 p-2 transition duration-200
                                     ${form.nuevamente === option
                                                ? "bg-green-700 text-white border-green-700"
                                                : "bg-white border-[#e2e8f0] hover:bg-green-700 hover:text-white"
                                            }`}>{option}</button>

                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 mt-5">
                            <h1 className=" font-bold text-[18px] text-start">¿Tienes pensado hacer otro envío pronto?</h1>
                            <div className=" flex gap-5">
                                {options2.map((option) => (
                                    <button key={option}
                                        type="button"
                                        onClick={() => setForm((prev) => ({
                                            ...prev,
                                            envio: option
                                        }))}
                                        className={`border-2 rounded-[10px] w-full my-2 p-2 transition duration-200
                                     ${form.envio === option
                                                ? "bg-green-700 text-white border-green-700"
                                                : "bg-white border-[#e2e8f0] hover:bg-green-700 hover:text-white"
                                            }`}>{option}</button>

                                ))}
                            </div>
                        </div>

                        {/* LINEA SEPARACIÓN */}
                        <div className="bg-[#e2e8f0]/40 h-1 w-full my-5" />
                        <h1 className=" font-bold text-[18px] text-start">Comentarios adicionales</h1>
                        <textarea rows={4}
                            placeholder="Comparte tu experiencia con nosotros..."
                            onChange={handleChangeComentarios}
                            value={form.comentarios}
                            className="bg-[#f9fafb] border-2 border-[#e2e8f0] rounded-[10px] w-full p-3 resize-none " />

                        <button type="submit" className="bg-green-500 hover:bg-green-700 transition duration-300 w-full text-white rounded-[10px] w-full my-2 p-5 shadow-lg flex justify-center">Enviar opinión    
                            <FaRegPaperPlane className="w-5 h-5  translate-x-3" />
                            </button>
                        <p className="font-medium text-[12px] text-[#9b9b9b] mt-2 ">Tu opinión no solo nos ayuda a mejorar, también ayuda a otros clientes a confiar en nuestro servicio</p>
                    </div>
                </form>
            </div>

        </section>
    )
}