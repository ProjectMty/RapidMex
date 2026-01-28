"use client";
import { registrarUsuario } from "@/Controlador/registro/registro";
import { User } from "@/Controlador/types/registroUsuario";
import Image from "next/image";
import { useState } from "react";

export default function Registro() {

    const [datos, setDatos] = useState<User>({
        contrasena: "",
        correo: "",
        nombre: "",
        apaterno: "",
        amaterno: "",
        telefono: "",
        empresa: "rapidmex",
    });

    const actualizar = <K extends keyof User>(
        campo: K,
        valor: User[K]
    ) => {
        setDatos(prev => ({
            ...prev, [campo]: valor
        }));
    };

    const handleSubmitUsuario = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await registrarUsuario(datos);
        if (res.Result === "CLIENTE CREADO") {
            alert("usuario registrado correctamente");
            setDatos(prev => ({
                ...prev,
                contrasena: "",
                correo: "",
                nombre: "",
                apaterno: "",
                amaterno: "",
                telefono: "",
                empresa: "rapidmex",
            }));
            window.location.href = "/login";
        } else {
            alert("Este usuario ya existe")
            setDatos(prev => ({
                ...prev,
                contrasena: "",
                correo: "",
                nombre: "",
                apaterno: "",
                amaterno: "",
                telefono: "",
                empresa: "rapidmex",
            }));
        }
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
        setDatos(prev => ({
            ...prev,
            telefono: numeros
        }));

    };

    const actualizarNombre = <K extends keyof User>(
        campo: K,
        valor: User[K]
    ) => {

        valor = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

        valor = valor.replace(/\s{2,}/g, " ");

        valor = valor.slice(0, 15);
        valor = valor
            .toLowerCase()
            .replace(/\b\w/g, (letra) => letra.toUpperCase());

        setDatos(prev => ({
            ...prev, [campo]: valor
        }));
    };

    return (
        <section className="w-full h-screen  relative grid-cols-2 grid overflow-hidden">

            <div className="px-5 grid content-center -translate-y-10">
                <h1 className="text-[55px] font-black tracking-[4px] text-center">Registrate</h1>

                <div className=" w-[60%] h-[60%]  mx-auto p-10 z-20 mt-10">
                    <div className="h-[80%] w-[80%] mx-auto gap-10 grid grid-cols-2">
                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Nombre: </label>
                            <input type="text" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.nombre}
                                onChange={(e) => actualizarNombre("nombre", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Apellido Paterno: </label>
                            <input type="text" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.apaterno}
                                onChange={(e) => actualizarNombre("apaterno", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Apellido Materno: </label>
                            <input type="text" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.amaterno}
                                onChange={(e) => actualizarNombre("amaterno", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Numero de teléfono: </label>
                            <input type="text" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.telefono}
                                onChange={handleChangeTelefono}
                            />
                        </div>

                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Correo electronico: </label>
                            <input type="text" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.correo}
                                onChange={(e) => actualizar("correo", e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label htmlFor="LogUser" className="font-[14px] font-semibold tracking-[1px] text-start items-center content-center">Contraseña: </label>
                            <input type="password" className="h-[40px] bg-[#F6F6F6] px-5 border-2 border-[#a5a5a5] rounded-[7px]"
                                value={datos.contrasena}
                                onChange={(e) => actualizar("contrasena", e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSubmitUsuario}
                            className="relative bg-[#008236] rounded-[7px] w-full h-[45px] text-white text-[18px] font-bold  mt-10
                            hover:bg-green-800 hover:text-white transition duration-300 mx-auto col-span-2"
                        >
                            Registrate
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Image
                    width={1400}
                    height={1000}
                    alt="imagen"
                    src={"/registro/registro.jpg"}
                    className="absolute -translate-y-[20%] translate-x-20"
                />
            </div>
        </section>
    )
}