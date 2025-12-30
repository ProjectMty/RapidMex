"use client";
import "@/Vista/LogIn/Login.css"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EnvioCorreo() {
    const [correo, setCorreo] = useState("");

     const handleSendEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
    
        }

    return (
        <div>
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
                            <label htmlFor="LogUser" className="label-login">Correo: </label>
                            <input type="text" className="input-login" value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
              
                        <div className="contenedor-paso-login">
                            <button className="boton-forms-login" onClick={handleSendEmail}>
                                Enviar correo
                            </button>
                        </div>

                    </div>

                </div>


            </div>
        </div>
    )
}