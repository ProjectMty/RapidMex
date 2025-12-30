"use client";
import "@/Vista/LogIn/Login.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import type { login } from "@/Controlador/types/registroUsuario";
import { loginUsu } from "@/Controlador/login/login";
import { useRouter } from "next/navigation";
import { EmailCambioContra } from "@/Controlador/actualizacion/cambioContraseña";
export default function Login() {
    const router = useRouter();

    const [datos, setDatos] = useState<login>({
        correo: "",
        contrasena: "",
    });

    const [mostrar, setMostrar] = useState(false);
    const [emailRecuperacion, setEmailRecuperacion] = useState("");
    const [animarModal, setAnimarModal] = useState(false);
    const abrirModal = () => {
        setMostrar(true);
        setTimeout(() => setAnimarModal(true), 10);
    };

    const cerrarModal = () => {
        setAnimarModal(false);
        setTimeout(() => setMostrar(false), 300);
    };

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
        console.log("data", datos);

        const res = await loginUsu(datos);

        if (res.ok) {
            alert("usuario encontrado");
            router.push("/guia");
        } else {
            alert(res.res.error)
            setDatos(prev => ({
                ...prev,
                contrasena: "",
            }));
        }
    }

   const handleChangePass = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await EmailCambioContra(emailRecuperacion);

        if(res.ok){
              alert("Correo enviado");

        } else{
              alert(res.data.error);
        }
        cerrarModal();
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
                            <button onClick={abrirModal} className="informacion-login">¿OLVIDASTE LA CONTRASEÑA?</button>
                        </div>

                    </div>

                </div>


            </div>

            {mostrar && (
                <div
                    className={`
      fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 transition-opacity duration-300 text-center
      ${animarModal ? "opacity-100" : "opacity-0"}
    `}
                    onClick={cerrarModal}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`
        w-[90%] max-w-md rounded-xl bg-white p-6 shadow-lg
        transform transition-all duration-300
        ${animarModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}
      `}
                    >
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">
                            Recuperar contraseña
                        </h2>

                        <div className="mb-4 text-left">
                            <label className="mb-1 block text-sm font-medium text-gray-700 text-center">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                value={emailRecuperacion}
                                onChange={(e) => setEmailRecuperacion(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2
                                  focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                            />
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={cerrarModal}
                                className="rounded-lg bg-gray-300 px-4 py-2 text-sm hover:bg-gray-400"
                            >
                                Cancelar
                            </button>

                            <button
                                className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-900"
                                onClick={handleChangePass}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}