"use client";
import "@/components/styles/hero.css"
import Image from "next/image";

export default function Hero() {
    return (
        <section className="section ">
            <Image
                src="/img/mex-usa/fondo-section-costos.png"
                alt="esquina-derecha"
                className="img-fondo"
                width={1900}
                height={715} />

            <div className="contenedor-section">

                <Image
                    src="/img/mex-usa/esquina-izq.svg"
                    alt="esquina"
                    className="img-izq"
                    width={800}
                    height={500} />
                <Image
                    src="/img/mex-usa/esquina-der.svg"
                    alt="esquina-derecha"
                    className="img-derecha"
                    width={1100}
                    height={500} />



                <div className="contenedor-central">

                    <h1 className="titulo-texto">
                        Ship fast and easy from USA and Canada to Mexico
                      </h1>
                    <p className="subtexto">Envía cajas de medidas estándar <br />
                        o envía cajas estilo HomeDepot. <br />
                        Nosotros coordinamos todos los trámites
                        aduanales.</p>
                </div>



            </div>

        </section>
    )
}