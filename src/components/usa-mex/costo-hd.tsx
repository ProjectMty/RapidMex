"use client";
import "@/components/styles/costos-hd.css"
import Image from "next/image";

export default function CostosHD() {

    return (
        <section className="section-hd">

            <div className="fondo-hd">

                <h2 className="titulo-hd">Ground shipping from Canada to Mexico in 12 days
                </h2>

                <Image
                    src="/img/mex-usa/cajas-hd.png"
                    alt="fondo"
                    width={600}
                    height={900}
                    className="img-cajas-hd" />
                <div className="contenedor-cajas-hd">
                    <Image
                        src="/img/mex-usa/cajas-hd.png"
                        alt="fondo"
                        width={600}
                        height={900}
                        className="img-cajas-2-hd" />
                            <Image
                        src="/img/mex-usa/cajas-hd.png"
                        alt="fondo"
                        width={600}
                        height={900}
                        className="img-cajas-2-hd" />
                            <Image
                        src="/img/mex-usa/cajas-hd.png"
                        alt="fondo"
                        width={600}
                        height={900}
                        className="img-cajas-2-hd" />
                </div>

            </div>
        </section>
    )
}