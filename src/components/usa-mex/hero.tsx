"use client";
import "@/components/styles/hero.css"
import Image from "next/image";

export default function Hero() {
    return (
        <section className="w-full h-full">
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
                <Image
                    src="/img/mex-usa/persona.svg"
                    alt="esquina"
                    width={550}
                    height={400}
                    className="img-persona" />

                <div className="contenedor-central">
                    <Image
                        src="/img/mex-usa/bandera-mexusa.svg"
                        alt="bandera"
                        width={200}
                        height={200}
                        className="img-bandera" />
                    <h1 className="titulo-texto">De <span className="text-[#127704] font-bold">USA</span> a
                        <span className="text-[#c90f2e] font-bold"> México </span>
                        rápido, seguro <br /> y eficiente</h1>
                    <p className="subtexto">Envía cajas de medidas estándar <br />
                        o envía cajas estilo HomeDepot. <br />
                        Nosotros coordinamos todos los trámites
                        aduanales.</p>
                </div>



            </div>

        </section>
    )
}