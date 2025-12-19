"use client";
import { registrarUsuario } from "@/Controlador/registro/registro";
import { User } from "@/Controlador/types/registroUsuario";
import "@/Vista/Registro/Registro.css"
import Image from "next/image";
import { useState } from "react";

export default function Registro() {
    const [paso, setPaso] = useState(1);
    const [datos, setDatos] = useState<User>({
        usuario: "",
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

    const siguiente = (e: React.FormEvent) => {
        e.preventDefault();
        setPaso((prev) => Math.min(prev + 1, 3));
    };

    const anterior = (e: React.FormEvent) => {
        e.preventDefault();
        setPaso((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmitUsuario = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(datos);
        const res = await registrarUsuario(datos);
        if (res.Result === "CLIENTE CREADO") {
            alert("usuario registrado correctamente");
            setPaso(1);
            setDatos(prev => ({
                ...prev,
                usuario: "",
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
            setPaso(1);
            setDatos(prev => ({
                ...prev,
                usuario: "",
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

    return (
        <section className="fondo-gradiente-singup">

            <div className="contenedor-pantalla-singup">

                <div className="contenedor-logo-singup">
                    <Image
                        src="/singup/logoRM.svg"
                        alt="logo"
                        className="z-50"
                        width={500}
                        height={100} />
                    <h1 className="titulo-singup">REGISTRATE</h1>

                </div>

                <div className="fondo-forms-singup">

                    {paso === 1 && (


                        <div className="contenedor-forms-singup">
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Nombre: </label>
                                <input type="text" className="input-singup" value={datos.nombre}
                                    onChange={(e) => actualizar("nombre", e.target.value)}
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Apellido Paterno: </label>
                                <input type="text" className="input-singup" value={datos.apaterno}
                                    onChange={(e) => actualizar("apaterno", e.target.value)}
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Apellido Materno: </label>
                                <input type="text" className="input-singup" value={datos.amaterno}
                                    onChange={(e) => actualizar("amaterno", e.target.value)}
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Numero de teléfono: </label>
                                <input type="text" className="input-singup" value={datos.telefono}
                                    onChange={handleChangeTelefono}
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Correo electronico: </label>
                                <input type="text" className="input-singup" value={datos.correo}
                                    onChange={(e) => actualizar("correo", e.target.value)}
                                />
                            </div>


                            <div className="contenedor-input-singup">
                                <button
                                    onClick={siguiente}
                                    className="boton-forms-singup"
                                >
                                    Siguiente
                                </button>
                            </div>

                        </div>
                    )}
                    {paso === 2 && (


                        <div className="contenedor-forms-singup-2">
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Usuario: </label>
                                <input type="text" className="input-singup" value={datos.usuario}
                                    onChange={(e) => actualizar("usuario", e.target.value)}
                                />
                            </div>
                            <div className="contenedor-input-singup-2">
                                <label htmlFor="LogUser" className="label-singup">Contraseña: </label>
                                <input type="password" className="input-singup" value={datos.contrasena}
                                    onChange={(e) => actualizar("contrasena", e.target.value)}
                                />
                            </div>
                            <div className="contenedor-paso-singup">
                                <button
                                    onClick={anterior}
                                    className="boton-forms-paso"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={handleSubmitUsuario}
                                    className="boton-forms-paso"
                                >
                                    Registrarse
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </section>
    )
}