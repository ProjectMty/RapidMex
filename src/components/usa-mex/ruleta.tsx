"use client";
import { useEffect, useState } from "react";
import Modal from "../utils/Modal"
import { MdOutlineErrorOutline } from "react-icons/md";
import Swal from 'sweetalert2'
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const premios = [
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-25" },
    { premio: "10 USD", color: "bg-[#6cb532]", posicion: "z-26" },
    { premio: "15 USD", color: "bg-[#014f2a]", posicion: "z-27" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-12" },
    { premio: "25 USD", color: "bg-[#730004]", posicion: "z-13" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-14" },
    { premio: "10 USD", color: "bg-[#6cb532]", posicion: "z-15" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-17" },
    { premio: "10 USD", color: "bg-[#6cb532]", posicion: "z-18" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-19" },
    { premio: "15 USD", color: "bg-[#014f2a]", posicion: "z-20" },
    { premio: "20 USD", color: "bg-[#962024]", posicion: "z-16" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-21" },
    { premio: "10 USD", color: "bg-[#6cb532]", posicion: "z-22" },
    { premio: "05 USD", color: "bg-[#23b574]", posicion: "z-23" },
    { premio: "10 USD", color: "bg-[#6cb532]", posicion: "z-24" },
];

export default function Ruleta() {
    const [open, setOpen] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const anglePerItem = 360 / premios.length;
    const searchParams = useSearchParams();
    const vieneDeQr = searchParams.get("from") === "qr"
    const [send, setSend] = useState(false);

    // FORMULARIO
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        price: "",
    });
    const [errorForm, setErrorForm] = useState({
        name: false,
        phone: false,
        email: false,
        price: false,
    });

    const spin = () => {
        if (spinning) return;

        setSpinning(true);
        const offset = 60
        const randomIndex = Math.floor(Math.random() * premios.length);
        const targetAngle =
            360 * 5 - (randomIndex * anglePerItem + anglePerItem / 2) + offset;

        console.log(randomIndex, premios[randomIndex]);

        setRotation((prev) => prev + targetAngle);


        setTimeout(() => {
            Swal.fire({
                title: "GANASTE UN CUPON",
                text: premios[randomIndex].premio,
                icon: "success",
                timer: 4000,
            });
            setResult(premios[randomIndex].premio);
            setSpinning(false);
            localStorage.setItem("ruletaPrize", premios[randomIndex].premio);
            setAlreadyPlayed(true);

        }, 3000);
    }


    // useEffect(() => {
    //     const savedPrize = localStorage.getItem("ruletaPrize");

    //     if (savedPrize) {
    //         setResult(savedPrize);
    //         setAlreadyPlayed(true);
    //     }

    //     setOpen(true);
    // }, []);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, price: result }))
    }, [result])

    // SOLO LO MUESTRA LA PRIMERA VEZ QUE INGRESA A LA PAGINA
    useEffect(() => {
        if (!vieneDeQr) return;

        const alreadyShown = localStorage.getItem("modalShown");

        if (!alreadyShown) {
            setOpen(true);
            localStorage.setItem("modalShown", "true");
        }
    }, [vieneDeQr]);

    // FORMULARIO 
    const validarCorreo = (correo: string): boolean => {
        const regexCorreo =
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        return regexCorreo.test(correo);
    };
    const handleChangeNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value;

        valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

        valor = valor.replace(/\s{2,}/g, " ");

        valor = valor.slice(0, 20);
        valor = valor
            .toLowerCase()
            .replace(/\b\w/g, (letra) => letra.toUpperCase());

        setFormData((prev) => ({ ...prev, name: valor }));
    }
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
    const handleChangeCorreo = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value;

        valor = valor.replace(/\s+/g, "");

        valor = valor.toLowerCase();

        valor = valor.slice(0, 40);

        setFormData((prev) => ({ ...prev, email: valor }));
    };

    const validateInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (value === "") {
            setErrorForm((prev) => ({ ...prev, [name]: true }));
        } else {
            setErrorForm((prev) => ({ ...prev, [name]: false }));
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.price) {
            Swal.fire({
                title: "Campos Obligatorios",
                text: "Debes completar todos los campos para poder continuar",
                icon: "warning",
                timer: 3000,
            });

            return;
        }
        if (formData.name.length < 5) {
            Swal.fire({
                title: "Datos demasiado cortos",
                text: "El nombre y apellido deben tener al menos 5 caracteres",
                icon: "warning",
                timer: 3000,
            });
            return;
        }
        if (formData.phone.length < 14) {
            Swal.fire({
                title: "Número inválido",
                text: "El número telefónico ingresado no es válido",
                icon: "warning",
                timer: 3000,
            });
            return;
        }
        if (!validarCorreo(formData.email)) {
            Swal.fire({
                title: "Correo inválido",
                text: "El correo electrónico ingresado no tiene un formato válido",
                icon: "warning",
                timer: 3000,
            });
            return;
        }

        const body = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            price: formData.price,
        };

        setSend(true);
        const response = await fetch("/api/premios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: "Información enviada",
                text: data.message,
                icon: "success",
                timer: 3000
            });

        } else {
            Swal.fire({
                title: "ERROR",
                text: "Ocurrio un error al mandar datos de contacto, intente de nuevo mas tarde",
                icon: "error"
            });
            setSend(false);
            return;
        }
        setFormData({
            name: "",
            phone: "",
            email: "",
            price: "",
        })
        setOpen(false)

    };

    if (!vieneDeQr) return null;

    return (
        <div>
            <Modal isOpen={open} onClose={() => setOpen(false)} bg="bg-[#c10007]">
                <div className={`flex justify-end translate-y-16 lg:translate-y-0 ${alreadyPlayed === true ? "hidden lg:flex" : "block"}`}>
                    <Image
                        src={"/img/mex-usa/ruleta/logoBlanco.svg"}
                        width={300}
                        height={59}
                        alt="logo" />

                </div>
                <div className="2xl:grid 2xl:grid-cols-2 flex-col">
                    {/* RULETA */}
                    <div className={`flex flex-col items-center gap-4 
                    scale-50 md:scale-75 xl:scale-100 ${alreadyPlayed === true ? "hidden 2xl:flex" : "block"}`}>
                        {/* Flecha */}
                        <div className="absolute  z-100 -right-[25%] md:right-0 lg:right-[15%] xl:right-[20%] 2xl:-right-[5%] translate-y-[650%] grid-cols-2 grid scale-150 ">
                            <div className=" border-20 rounded-xl  border-t-transparent border-b-transparent border-l-transparent border-[#0c6d1b] " />
                            <div className="h-10 w-10 bg-[#0c6d1b] rounded-full -translate-x-3  "></div>
                            <div className="absolute bg-white h-5 w-5 rounded-full top-1/4 right-1/4 shadow-lg/50"></div>
                        </div>

                        <div className="absolute z-100 h-36 w-36 translate-y-[150%] bg-white rounded-full flex justify-center grid content-center shadow-xl/50">
                            <Image
                                src={"/img/mex-usa/ruleta/logoRM.jpeg"}
                                width={278}
                                height={150}
                                alt="logo"
                                className="px-5" />
                        </div>

                        {/* Ruleta*/}
                        <div className="relative h-140 w-140 rounded-full border-10 border-white bg-white overflow-hidden ">
                            <div
                                className="absolute inset-0 rounded-full transition-transform duration-[3000ms] ease-out origin-bottom-left translate-x-1/2 -translate-y-1/2"
                                style={{ transform: `rotate(${rotation}deg)` }}
                            >

                                {premios.map((item, index) => {
                                    const angle = anglePerItem * index;

                                    return (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 flex items-center justify-center ${item.posicion}`}
                                            style={{
                                                transform: `rotate(${angle}deg)`,
                                                transformOrigin: '0% 100%'
                                            }}
                                        >
                                            {/* Segmento */}
                                            <div
                                                className={` absolute top-10 left-[20%] h-[80%] w-[20%] flex justify-start inset-shadow-gray-900 inset-shadow-sm/100 ring-2 ring-gray-600/10
                                                    border-4 border-white ${item.color}`}
                                                style={{
                                                    transform: `rotate(${anglePerItem}deg) translateX(12%) skewY(-70deg)`
                                                }}
                                            >
                                                <div
                                                    className="absolute text-white text-[25px] font-black z-50 translate-y-68  -translate-x-2"
                                                    style={{ transform: ` skewY(70deg) rotate(-80deg)` }}
                                                >
                                                    {item.premio}
                                                </div>
                                            </div>


                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    {/* FORMULARIO */}
                    <div className={`text-white p-10 lg:px-15  ${alreadyPlayed === true ? "translate-y-0" : "-translate-y-40 md:-translate-y-20 lg:translate-y-0 lg:translate-x-10 xl:translate-x-0"}`}>
                        <h2 className="font-semibold text-[15px] lg:text-[20px] mt-1">Reclama tu recompensa</h2>
                        <h1 className="font-black text-[25px] lg:text-[40px] mt-1">¡Gira la ruleta!</h1>
                        <p className="mt-1 text-[12px] lg:text-[15px] ">
                            Tienes una oportunidad de ganar increíbles premios para tu próximo envío.
                        </p>
                        <p className="font-black text-[15px] lg:text-[20px] mt-1">¿Cómo funciona?</p>
                        <ul className="space-y-2 list-disc pl-6 text-[11px] lg:text-[13px] mt-1">
                            <li>
                                Solo tienes una oportunidad de girar
                            </li>
                            <li>
                                Tu cúpon llegará a tu correo en un máximo de 15 minutos
                            </li>
                            <li>
                                Debes ingresar los mismos datos que utilizarás para tu envío
                            </li>
                            <li>
                                El premio será valido para tu siguiente envío con RapidMex
                            </li>

                        </ul>
                        {/* Botón */}
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={spin}
                                className="rounded bg-[#6ab535] px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50 w-[80%]"
                                disabled={spinning || alreadyPlayed}
                            >
                                {alreadyPlayed ? "Ya participaste" : "Girar ruleta"}
                            </button>
                        </div>
                        {alreadyPlayed && (
                            <form
                                onSubmit={handleSubmit}
                                className=" rounded-3xl p-6 text-gray-900 space-y-6">

                                <div className="lg:grid lg:grid-cols-2 gap-4">

                                    <div className="relative mb-3">

                                        <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.name === true ? "block" : "hidden"}`} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChangeNombre}
                                            onBlur={validateInput}
                                            placeholder="Nombre Completo"
                                            className={`bg-white border rounded-lg p-3 w-full ${errorForm.name === true ? "border-red-600" : "border-green-800"}`}
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.phone === true ? "block" : "hidden"}`} />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChangeTelefono}
                                            onBlur={validateInput}
                                            placeholder="Número de teléfono"
                                            className={`bg-white border rounded-lg p-3 w-full ${errorForm.phone === true ? "border-red-600" : "border-green-800"}`}
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <MdOutlineErrorOutline className={`absolute top-1/3 right-[10px] text-red-600 size-5 ${errorForm.email === true ? "block" : "hidden"}`} />
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChangeCorreo}
                                            onBlur={validateInput}
                                            placeholder="Correo electrónico"
                                            className={`bg-white border rounded-lg p-3 w-full ${errorForm.email === true ? "border-red-600" : "border-green-800"}`}
                                        />
                                    </div>

                                    <div className="relative mb-3">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.price}
                                            onBlur={validateInput}
                                            disabled={true}
                                            placeholder="Asunto"
                                            className={`bg-white border rounded-lg p-3 w-full ${errorForm.price === true ? "border-red-600" : "border-green-800"}`}
                                        />
                                    </div>

                                    <div className="flex justify-end  col-span-2">
                                        <button
                                            type="submit"
                                            disabled={send}
                                            className={`px-4 py-2 bg-green-700 hover:bg-green-800 text-white  font-bold py-3 px-6 rounded-xl w-[80%] mx-auto disabled:opacity-50`}>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}


                    </div>

                </div>


            </Modal >
        </div >
    )
}