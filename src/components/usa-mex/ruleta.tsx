"use client";
import { useEffect, useState } from "react";
import Modal from "../utils/Modal"
import { MdOutlineErrorOutline } from "react-icons/md";
import Swal from 'sweetalert2'

const premios = [
    "10 USD descuento",
    "20 USD descuento",
    "30 USD descuento",
    "40 USD descuento",
    "50 USD descuento",
    "60 USD descuento",
];

export default function Ruleta() {
    const [open, setOpen] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const anglePerItem = 360 / premios.length;

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

        const randomIndex = Math.floor(Math.random() * premios.length);
        const targetAngle =
            360 * 5 - (randomIndex * anglePerItem + anglePerItem / 3);

        console.log(randomIndex, premios[randomIndex]);

        setRotation((prev) => prev + targetAngle);

        setTimeout(() => {
            setResult(premios[randomIndex]);
            setSpinning(false);
            localStorage.setItem("ruletaPrize", premios[randomIndex]);
            setAlreadyPlayed(true);

        }, 3000);
    }

    useEffect(() => {
        setOpen(true);
    }, []);
    useEffect(() => {
        const savedPrize = localStorage.getItem("ruletaPrize");

        if (savedPrize) {
            setResult(savedPrize);
            setAlreadyPlayed(true);
        }

        setOpen(true);
    }, []);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, price: result }))
    }, [result])

    // SOLO LO MUESTRA LA PRIMERA VEZ QUE INGRESA A LA PAGINA
    // useEffect(() => {
    //     const alreadyShown = localStorage.getItem("modalShown");

    //     if (!alreadyShown) {
    //         setOpen(true);
    //         localStorage.setItem("modalShown", "true");
    //     }
    // }, []);

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

    const handleChangeAsunto = (e: React.ChangeEvent<HTMLInputElement>) => {
        let valor = e.target.value;

        valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

        valor = valor.replace(/\s{2,}/g, " ");

        valor = valor.slice(0, 20);

        setFormData((prev) => ({ ...prev, subject: valor }));
    }

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
            return;
        }
        setFormData({
            name: "",
            phone: "",
            email: "",
            price: "",
        })

    };

    return (
        <div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="pt-6 mb-4 text-xl font-bold text-center">BIENVENIDO A RAPIDMEX</h2>
                <p className="mb-4 text-md text-center" >haz click para iniciar a participar</p>
                <div className="grid grid-cols-2">
                    {/* RULETA */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Flecha */}
                        <div className="absolute z-50 translate-y-[150%] text-8xl ">🡆</div>

                        {/* Ruleta */}
                        <div className="relative h-96 w-96 rounded-full border-4 border-gray-800 overflow-hidden">
                            <div
                                className="absolute inset-0 rounded-full transition-transform duration-[3000ms] ease-out"
                                style={{ transform: `rotate(${rotation}deg)` }}
                            >
                                {premios.map((item, index) => {
                                    const angle = anglePerItem * index;

                                    return (
                                        <div
                                            key={item}
                                            className="absolute inset-0 flex items-center justify-center "
                                            style={{
                                                transform: `rotate(${angle}deg)`,
                                            }}
                                        >
                                            {/* Segmento */}
                                            <div
                                                className={`absolute top-0 left-1/2 h-1/2 w-1/2 origin-bottom-left ${index % 2 === 0 ? "bg-green-600" : "bg-red-500"
                                                    }`}
                                                style={{
                                                    transform: `rotate(${anglePerItem}deg) skewY(-30deg)`,
                                                }}
                                            />

                                            {/* Texto */}
                                            <div
                                                className="absolute  top-1/2 translate-x-[90%]  text-center text-black text-sm font-semibold "

                                            >
                                                {item}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Botón */}
                        <button
                            onClick={spin}
                            className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                            disabled={spinning || alreadyPlayed}
                        >
                            {alreadyPlayed ? "Ya participaste" : "Girar ruleta"}
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("ruletaPrize");
                                window.location.reload();
                            }}
                            className="text-xs text-gray-500 underline"
                        >
                            Reset ruleta (dev)
                        </button>
                        {/* Resultado */}
                        {result && (
                            <p className="text-lg font-semibold pb-6">
                                🎉 Resultado: <span className="text-green-700">{result}</span>
                            </p>
                        )}


                    </div>
                    {/* FORMULARIO */}
                    {alreadyPlayed && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-3xl p-6 text-gray-900 space-y-6">

                            <div className="lg:grid lg:grid-cols-2 gap-4">
                                <h3 className="text-lg font-semibold col-span-2 text-center">Personal Information</h3>

                                <div className="relative mb-3">
                                    <label >Name</label>
                                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.name === true ? "block" : "hidden"}`} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChangeNombre}
                                        onBlur={validateInput}
                                        placeholder="Nombre"
                                        className={`border rounded-lg p-3 w-full ${errorForm.name === true ? "border-red-600" : "border-green-800"}`}
                                    />
                                </div>

                                <div className="relative mb-3">
                                    <label >Phone</label>
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
                                        onChange={handleChangeCorreo}
                                        onBlur={validateInput}
                                        placeholder="Email"
                                        className={`border rounded-lg p-3 w-full ${errorForm.email === true ? "border-red-600" : "border-green-800"}`}
                                    />
                                </div>

                                <div className="relative mb-3">
                                    <label htmlFor="">Message</label>
                                    <MdOutlineErrorOutline className={`absolute top-1/2 right-[10px] text-red-600 size-5 ${errorForm.price === true ? "block" : "hidden"}`} />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.price}
                                        onChange={handleChangeAsunto}
                                        onBlur={validateInput}
                                        placeholder="Asunto"
                                        className={`border rounded-lg p-3 w-full ${errorForm.price === true ? "border-red-600" : "border-green-800"}`}
                                    />
                                </div>

                                <div className="flex justify-end  col-span-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white  font-bold py-3 px-6 rounded-xl w-[80%] mx-auto">
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

            </Modal>
        </div>
    )
}