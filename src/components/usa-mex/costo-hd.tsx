"use client";
import "@/components/styles/costos-hd.css"
import Image from "next/image";

export default function CostosHD() {

    return (
        <section className="section-hd">
        
            <div className="fondo">

                <h2 className="titulo-hd">Costos de cajas Home Depot
                </h2>

                <div className="contenedor-tabla-hd">

                    <div className="fila">
                        <p className="text-start">Dimensiones</p>
                        <p>Peso Máximo</p>
                        <p className="text-center">Costo USD</p>
                    </div>

                    {/* primera fila */}
                    <p className="primera-columna"><span className="font-bold">Small</span> 17&quot; x 11&quot; x 11&quot;</p>
                    <p className="segunda-columna">15 LBS</p>
                    <p className="tercera-columna">$79.00 </p>


                    {/* segunda fila */}
                    <p className="primera-columna"><span className="font-bold">Medium</span> 22&quot; x 15&quot; x 16&quot;</p>
                    <p className="segunda-columna">38 LBS</p>
                    <p className="tercera-columna">$161.00 </p>


                    {/* tercera fila */}
                    <p className="primera-columna"><span className="font-bold">Large</span> 27&quot; x 15&quot; x 16&quot;</p>
                    <p className="segunda-columna">47 LBS</p>
                    <p className="tercera-columna">$184.00 </p>


                    {/* cuarta fila */}
                    <p className="primera-columna"><span className="font-bold">Extra Large</span> 24&quot; x 20&quot; x 21&quot;</p>
                    <p className="segunda-columna">73 LBS</p>
                    <p className="tercera-columna">$303.00 </p>


                </div>

                 <Image
                                    src="/img/mex-usa/cajas-hd.png"
                                    alt="fondo"
                                    width={600}
                                    height={900}
                                    className="img-cajas" />
            </div>
        </section>
    )
}