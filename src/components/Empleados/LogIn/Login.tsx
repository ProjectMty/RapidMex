"use client";
import "@/components/Empleados/LogIn/Login.css"

export default function Login() {
    return (
        <section className="fondo-gradiente-login">
           
                <div className="fondo-forms-login">
                    <h1 className="titulo-login">LOGIN</h1>
                    <div className="contenedor-forms-login">
                        <div className="contenedor-input-login">
                            <label htmlFor="LogUser" className="label-login">Username: </label>
                            <input type="text" name="name" id="LogUser" className="input-login"
                            />
                        </div>
                        <div className="contenedor-input-login">
                            <label htmlFor="LogUser" className="label-login">Password: </label>
                            <input type="text" name="name" id="LogUser" className="input-login"
                            />
                        </div>
                        <div className="contenedor-extra-login informacion-login">
                            <div className="contenedor-checkbox-login">
                                <input type="checkbox" name="name" id="LogUser" className="checkbox-login"
                                />
                                <label htmlFor="LogUser"> Remember me </label>

                            </div>

                            <a className="link-login" >Forgot password?</a>
                        </div>
                        <button className="boton-forms-login">LOGIN</button>
                        <p className="informacion-login">Dont have an account? 
                            <span className="link-login">
                                <a href="/register"> Register</a>
                                </span></p>
                    </div>
                </div>
           

        </section>
    )
}