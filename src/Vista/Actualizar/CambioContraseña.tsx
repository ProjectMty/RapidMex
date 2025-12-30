"use client";
import "@/Vista/LogIn/Login.css"
import { CambioContraseña } from "@/Controlador/actualizacion/cambioContraseña";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CambioContrasena() {
    const router = useRouter();
    const [password, setPassword] = useState("")
    const [passwordComparar, setPasswordComparar] = useState("")
    const [userId, setUserId] = useState("")
    const [token, setToken] = useState("")

    // asignar id desde url
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const token = urlParams.get('token');
        if (!id || !token) {
            alert('USUARIO NO EXISTENTE')
            return;
        }
        setUserId(id);
        setToken(token);
    }, [])

    const handleChangePass = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await CambioContraseña(userId, password, token);

        if (res.ok) {
            alert("Contraseña actualizada");
            router.push("/login");
        } else {
            alert(res.data.error);
        }
    }

    return (
        <div>
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
                                <label htmlFor="LogUser" className="label-login">Nueva contraseña: </label>
                                <input type="password" className="input-login" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="contenedor-input-login">
                                <label htmlFor="LogUser" className="label-login">Repite tu nueva contraseña: </label>
                                <input type="password" className="input-login" value={passwordComparar}
                                    onChange={(e) => setPasswordComparar(e.target.value)}
                                />
                            </div>
                            <div className="contenedor-paso-login">
                                <button className="boton-forms-login" onClick={handleChangePass}>
                                    Cambiar contraseña
                                </button>
                            </div>

                        </div>

                    </div>


                </div>



            </section>
        </div>
    )
}