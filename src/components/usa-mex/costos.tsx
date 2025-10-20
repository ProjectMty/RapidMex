"use client";
import "@/components/styles/costos.css"
import Image from "next/image";

export default function Costos() {

    return (
        <section className="section">
                <Image
                    src="/img/mex-usa/fondo2-costos.svg"
                    alt="fondo"
                    width={1000}
                    height={800}
                    className="img-fondo" />

            <div className="contenedor-imagen">
            
                <h2 className="contenedor-titulo">Costos de cajas más frecuentes</h2>

                <div className="contenedor-tabla">
                  
                    <div className="contenedor-fila">
                        <p className="text-start">Dimensiones</p>
                        <p>Peso Máximo</p>
                        <p className="text-end">Costo USD</p>
                    </div>

{/* primera fila */}
                    <p className="primera-col">26&quot; x 14&quot; x 14&quot;</p>
                    <p className="segunda-col">37 LBS</p>
                    <p className="tercera-col">$157.00 </p>


{/* segunda fila */}
                    <p className="primera-col">26&quot; x 14&quot; x 14&quot;</p>
                    <p className="segunda-col">56 LBS</p>
                    <p className="tercera-col">$260.00 </p>


{/* tercera fila */}
                    <p className="primera-col">24&quot; x 24&quot; x 16&quot;</p>
                    <p className="segunda-col">67 LBS</p>
                    <p className="tercera-col">$285.00 </p>


{/* cuarta fila */}
                    <p className="primera-col">20&quot; x 20&quot; x 26&quot;</p>
                    <p className="segunda-col">75 LBS</p>
                    <p className="tercera-col">$310.00 </p>


{/* quinta fila */}
                    <p className="primera-col">24&quot; x 24&quot; x 24&quot;</p>
                    <p className="segunda-col">100 LBS</p>
                    <p className="tercera-col">$388.00 </p>

                </div>
            </div>
        </section>
    )
}