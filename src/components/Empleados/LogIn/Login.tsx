"use client";
import "@/components/Empleados/LogIn/Login.css"
import Image from "next/image";

export default function Login() {
    return (
        <section className="">

            <div className="contenedor-pantalla-login">

                <div className="contenedor-logo-login">
                    <Image
                        src="/singup/logoRM.svg"
                        alt="logo"
                        className="z-50"
                        width={500}
                        height={100} />

                </div>

                <div className="fondo-forms-login">

                    <div className="contenedor-forms-login">
                        <div className="contenedor-input-login">
                            <label htmlFor="LogUser" className="label-login">Usuario: </label>
                            <input type="text" name="name" id="LogUser" className="input-login"
                            />
                        </div>
                        <div className="contenedor-input-login">
                            <label htmlFor="LogUser" className="label-login">Contraseña: </label>
                            <input type="text" name="name" id="LogUser" className="input-login"
                            />
                        </div>
                        <div className="contenedor-paso-login">

                            <button className="boton-forms-login">
                                INICIAR SESION
                            </button>
                            <p className="informacion-login">¿OLVIDASTE LA CONTRASEÑA?</p>
                        </div>

                    </div>

                </div>
            </div>



        </section>
    )
}