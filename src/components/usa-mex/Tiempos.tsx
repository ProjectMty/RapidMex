"use client";
import Image from "next/image";
import { LeftAnimation } from "@/app/animate/InText";
import Carrusel from "./carrusel-usa";
import { Producto } from "@/types/cajas";

type Productos = Producto[];

const cajasCAN: Productos = [
    { key: 1, img: "/img/mex-usa/cajas/CAN-small.png", price: "157", weight: "37", l: "26", a: "14", h: "14" },
    { key: 2, img: "/img/mex-usa/cajas/CAN-medium.png", price: "260", weight: "56", l: "18", a: "18", h: "24" },
    { key: 3, img: "/img/mex-usa/cajas/CAN-large.png", price: "285", weight: "67", l: "24", a: "24", h: "16" },
    { key: 4, img: "/img/mex-usa/cajas/CAN-Xlarge.png", price: "310", weight: "75", l: "20", a: "20", h: "26" },
];

const cajasUSA: Productos = [
    { key: 1, img: "/img/mex-usa/cajas/USA-small.png", price: "150", weight: "15", l: "17", a: "11", h: "11" },
    { key: 2, img: "/img/mex-usa/cajas/USA-medium.png", price: "295", weight: "38", l: "22", a: "15", h: "16" },
    { key: 3, img: "/img/mex-usa/cajas/USA-large.png", price: "335", weight: "47", l: "27", a: "15", h: "16" },
    { key: 4, img: "/img/mex-usa/cajas/USA-Xlarge.png", price: "566", weight: "73", l: "24", a: "20", h: "21" },

];

export default function TiemposUsa() {
    return (
        <section id="costo-usa" className=" bg-[#ebf2fa] py-10 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto space-y-10">
              
                    <h2 className=" text-black text-center mx-auto ">
                        <LeftAnimation
                            delay={0.2}
                            lines={[
                                <span key={1} className="font-bold text-[30px] sm:text-[35px] md:text-[40px] xl:text-[40px] 2xl:text-[50px]">
                                 <span className="text-red-700">Timeline</span> & <span className="text-green-700">Pricing</span>  </span>,
                                <span key={2} className=" text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] 2xl:text-[30px]">Ground shipping from...</span>
                            ]}>

                        </LeftAnimation>

                    </h2>
                    <div className="grid xl:grid-cols-2  justify-around text-center text-white relative  mt-7 2xl:mt-20  space-y-5 md:space-y-10">

                        <div className="px-3 xl:px-0">
                            <div className=" bg-[#008236] w-[70%] mx-auto rounded-t-[30px] shadow-2xl/60">
                                <Image
                                    src="/img/mex-usa/tiempos/UsaMex.svg"
                                    alt="cuadro"
                                    width={100}
                                    height={100}
                                    className="w-[25%] z-50 mx-auto translate-y-5 md:translate-y-8 2xl:translate-y-5" />
                            </div>

                            <div className="bg-[#008236]   rounded-[30px] content-center shadow-2xl/50 mx-auto h-[90%] w-[90%]
                            py-10 xl:py-5">
                                <div className="inline-flex text-start gap-5">
                                    <h2 className="font-bold  text-[18px] md:text-[25px] lg:text-[30px]">
                                        US
                                    </h2>
                                    <Image
                                        src="/img/mex-usa/tiempos/flecha.svg"
                                        alt="cuadro"
                                        width={50}
                                        height={50}
                                        className=" left-0" />
                                    <h2 className="font-bold  text-[18px] md:text-[25px] lg:text-[30px]">
                                        Mexico
                                    </h2>
                                </div>

                                <p className="text-center mx-auto px-2 mt-2 text-[15px] 
                                md:text-[20px] md:px-8
                                lg:text-[20px] lg:px-2
                                2xl:w-full 2xl:text-[15px] ">(Ground, 8 days) <br />
                                    Includes shipping, customs clerance insurance up to
                                </p>

                                <h2 className="font-bold  text-[30px] md:text-[40px] lg:text-[45px]">
                                    $500 USD
                                </h2>
                                <p className="text-center mx-auto 
                                text-[18px] md:text-[20px] lg:text-[20px] lg:px-2 2xl:w-full 2xl:text-[15px]">per box
                                </p>

                                <Carrusel images={cajasUSA}></Carrusel>

                            </div>
                        </div>
                        <div className="px-3 xl:px-0 ">
                            <div className=" bg-[#c10007]  w-[70%] mx-auto rounded-t-[30px] shadow-2xl/60">
                                <Image
                                    src="/img/mex-usa/tiempos/CanMex.svg"
                                    alt="cuadro"
                                    width={100}
                                    height={100}
                                    className="w-[25%] z-50 mx-auto translate-y-5 md:translate-y-8 2xl:translate-y-5 2xl:translate-y-5" />
                            </div>

                            <div className="bg-[#c10007]   rounded-[30px] content-center shadow-2xl/50 mx-auto h-[90%] w-[90%]
                            py-10 xl:py-5">
                                <div className="inline-flex text-start gap-5">
                                    <h2 className="font-bold  text-[18px] md:text-[25px] lg:text-[30px]">
                                        CA
                                    </h2>
                                    <Image
                                        src="/img/mex-usa/tiempos/flecha.svg"
                                        alt="cuadro"
                                        width={50}
                                        height={50}
                                        className=" left-0" />
                                    <h2 className="font-bold  text-[18px] md:text-[25px] lg:text-[30px]">
                                        Mexico
                                    </h2>
                                </div>

                                <p className="text-center mx-auto px-2 mt-2 text-[15px] 
                                md:text-[20px] md:px-8
                                lg:text-[20px] lg:px-2
                                2xl:w-full 2xl:text-[15px] ">(Ground, 12 days) <br />
                                    Includes shipping, customs clerance insurance up to
                                </p>

                                <h2 className="font-bold  text-[30px] md:text-[40px] lg:text-[45px]">
                                    $700 CAN
                                </h2>
                                <p className="text-center mx-auto 
                                text-[18px] md:text-[20px] lg:text-[20px] lg:px-2 2xl:w-full 2xl:text-[15px]">per box
                                </p>

                                <Carrusel images={cajasCAN}></Carrusel>

                            </div>
                        </div>
                        <div></div>
                    </div>
                    <h2 className="text-black font-bold tracking-wider  text-center md:px-15 
                    text-[20px]
                    sm:text-[15px]
                    md:text-[25px]
                    lg:text-[25px]">
                        Ship all of your package to Mexico with
                        <span className="text-green-700"> Rapid</span>
                        <span className="text-red-700">mex!</span> 
                    </h2>
              
            </div>
        </section>
    )
}