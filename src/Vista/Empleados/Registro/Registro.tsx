"use client";
import "@/components/Empleados/Registro/Registro.css"
import Image from "next/image";
import { useState } from "react";

export default function Registro() {
    const [paso, setPaso] = useState(1);

    const siguiente = (e: React.FormEvent) => {
        e.preventDefault();
        setPaso((prev) => Math.min(prev + 1, 3));
    };

    const anterior = (e: React.FormEvent) => {
        e.preventDefault();
        setPaso((prev) => Math.max(prev - 1, 1));
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
                                <input type="text" name="name" id="LogUser" className="input-singup"
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Apellido Paterno: </label>
                                <input type="text" name="name" id="LogUser" className="input-singup"
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Apellido Materno: </label>
                                <input type="text" name="name" id="LogUser" className="input-singup"
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Numero de teléfono: </label>
                                <input type="text" name="name" id="LogUser" className="input-singup"
                                />
                            </div>
                            <div className="contenedor-input-singup">
                                <label htmlFor="LogUser" className="label-singup">Correo electronico: </label>
                                <input type="text" name="name" id="LogUser" className="input-singup"
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
                                <input type="text" name="name" id="LogUser" className="input-singup"
                                />
                            </div>
                            <div className="contenedor-input-singup-2">
                                <label htmlFor="LogUser" className="label-singup">Contraseña: </label>
                                <input type="text" name="name" id="LogUser" className="input-singup"
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
                                    onClick={siguiente}
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