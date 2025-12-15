"use client";
import "@/Vista/LogIn/Login.css"
import Image from "next/image";
import { useState } from "react";
import type { login } from "@/Controlador/types/registroUsuario";
import { loginUsu } from "@/Controlador/login/login";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [datos, setDatos] = useState<login>({
        correo: "",
        contrasena: "",
    });

    const actualizar = <K extends keyof login>(
        campo: K,
        valor: login[K]
    ) => {
        setDatos(prev => ({
            ...prev, [campo]: valor
        }));
    };

    const handleSubmitLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        console.log(datos);
        const res = await loginUsu(datos);

        if (res.id > 0) {
            alert("usuario encontrado");
            document.cookie = "session=true; path=/guia";
            router.push("/guia");
        } else {
            alert("Este usuario no existe")
            setDatos(prev => ({
                ...prev,
                contrasena: "",
            }));
        }
    }
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
                            <label htmlFor="LogUser" className="label-login">Correo: </label>
                            <input type="text" className="input-login" value={datos.correo}
                                onChange={(e) => actualizar("correo", e.target.value)}
                            />
                        </div>
                        <div className="contenedor-input-login">
                            <label htmlFor="LogUser" className="label-login">Contraseña: </label>
                            <input type="password" className="input-login" value={datos.contrasena}
                                onChange={(e) => actualizar("contrasena", e.target.value)}
                            />
                        </div>
                        <div className="contenedor-paso-login">
                            <button className="boton-forms-login" onClick={handleSubmitLogin}>
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