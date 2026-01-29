"use client"
import Image from "next/image"
import "@/Vista/Empleados/Rastrea/Rastrea.css"
export default function Rastrea() {
    return (
        <section>
            <div className="seccion-rastrea">

                <h1 className="titulo-rastrea">RASTREA TU PAQUETE</h1>

                <div className="contenedor-rastrea">
                    <h1 className="label-rastrea">RASTREA TUS PAQUETES</h1>
                    <div className="contenedor-input-rastrear">
                        <input type="text" placeholder="Número de guia" className="input-rastrea" />
                        <button className="button-rastrear">
                            <p className="texto-rastrea">Rastrear</p>
                            <Image
                             src="/img/flecha-rastrea.png"
                            alt="RapidMex Logo"
                            width={50}
                            height={50}
                            priority
                            className="">

                            </Image>
                        </button>
                    </div>
                    
                    <p className="subtitulo-rastrea">Escribe todos los números de rastreo que tengas, separándolos con una coma o un espacio</p>
                </div>
            </div>
        </section>
    )
}  