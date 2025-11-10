"use client";
import "@/components/Empleados/Registro/Registro.css"
import Image from "next/image";

export default function Registro() {
    return (
        <section className="fondo-gradiente-singup">
            <Image
                src="/singup/vector3.svg"
                alt="vector1"
                className="vector-fondo-singup"
                fill />
            <Image
                src="/singup/vector2.svg"
                alt="vector1"
                className="vector-fondo-singup"
                fill />

            <Image
                src="/singup/vector1.svg"
                alt="vector1"
                className="vector-fondo-singup"
                fill />

            <div className="contenedor-pantalla-singup">
                <div className="contenedor-izquierdo-singup" >
                    <div className="contenedor-logo-singup">
                        <Image
                            src="/singup/logoRM.svg"
                            alt="logo"
                            className="z-50"
                            width={500}
                            height={100} />
                    </div>

                    <div className="contenedor-texto-singup">
                        <p>Remember you have to be approved by an admin before you could enter to your new account</p>
                    </div>

                </div>

                <div className="fondo-forms-singup">
                    <h1 className="titulo-singup">SING UP</h1>

                    <div className="contenedor-forms-singup">
                        <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">First Name: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                        <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">Last Name: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                        <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">Phone: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                         <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">Email: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                        <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">Username: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                        <div className="contenedor-input-singup">
                            <label htmlFor="LogUser" className="label-singup">Password: </label>
                            <input type="text" name="name" id="LogUser" className="input-singup"
                            />
                        </div>
                       
                        <button className="boton-forms-singup">REGISTER</button>
                        <p className="informacion-singup">if you alredy have an account. 
                            <span className="link-singup"><a href="/login"> Login</a> </span> insted</p>
                    </div>
                </div>
            </div>



        </section>
    )
}