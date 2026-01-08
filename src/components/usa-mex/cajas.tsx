"use client";
import { DownAnimation, LeftAnimation } from "@/app/animate/InText";


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
export default function Cajas() {

    return (
        <section id="costo-usa" className="w-full h-fit xl:h-screen font-[Poppins] relative bg-[#ebf2fa]">
            <div className="grid 2xl:grid-cols-4 h-full xl:h-[50%]">
                <div className="w-full h-full relative">
                </div>

                <div className=" h-full w-full col-span-2 pb-10">

                    {/* TITULO */}
                    <h2 className=" text-black font-bold  text-center px-1 pt-10 pb-5  mx-auto
                    text-[30px] w-[90%]
                    sm:text-[35px]
                    md:text-[40px]
                    xl:text-[40px] xl:w-full
                    2xl:text-[50px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}>Ground shipping from...</span>
                            ]}>

                        </LeftAnimation>

                    </h2>

                    {/* CARRUSEL */}
                    <div className="h-fit xl:h-full w-full lg:w-[80%] 2xl:w-full xl:grid-cols-2 grid gap-15 z-0 mx-auto">

                        {/* primer seccion */}
                        <div className="px-3 xl:px-0">
                            <div className="relative bg-gradient-to-r from-[#47b34e] to-[#137923]  h-fit lg:h-[20%] xl:h-fit w-[70%] mx-auto rounded-t-[30px] ">
                                <h2 className="text-center mt-2 font-semibold text-white  pt-3 mx-auto  
                                w-[90%] text-[25px] pb-3 px-3
                                sm:text-[30px]
                                lg:text-[40px] lg:px-5
                                2xl:w-full 2xl:text-[25px] 2xl:mt-2">
                                    USA to Mexico in 8 days!</h2>

                            </div>

                            <div className="bg-gradient-to-r from-[#5bca5e] to-[#046817]   rounded-[30px] content-center shadow-2xl mx-auto
                            h-[90%] xl:h-[80%] w-[90%] ">
                                <Carrusel images={cajasUSA}></Carrusel>
                                {/* INFORMACION */}
                                <div className="text-center mt-8  text-white mx-auto  
                                    w-[90%] text-[12px]
                                    sm:text-[15px]
                                    lg:text-[20px] lg:px-2 
                                    2xl:w-full 2xl:text-[15px] 2xl:mt-2">
                                    <DownAnimation
                                        delay={0.2}
                                        lineDelay={0.2}
                                        lines={[
                                            <p key={1}>Pricing includes shipping from anywhere in the US to anywhere in Mexico,
                                                customs clearance, and insurance of contents up to $500 USD per box.</p>
                                        ]}>

                                    </DownAnimation>

                                </div>
                            </div>
                        </div>

                        {/* segunda seccion */}
                        <div className="px-3 xl:px-0">
                            <div className="relative bg-gradient-to-r from-[#b61137] to-[#7c1d49]  h-fit lg:h-[20%] xl:h-fit w-[70%] mx-auto rounded-t-[30px] ">
                                <h2 className="text-center mt-2 font-semibold text-white pt-3 mx-auto  
                                w-[90%] text-[25px] pb-3 px-3
                                sm:text-[30px]
                                lg:text-[40px] lg:px-5
                                2xl:w-full 2xl:text-[25px] 2xl:mt-2">
                                    Canada to Mexico in 12 days!</h2>

                            </div>

                            <div className="bg-gradient-to-r from-[#c10f34] to-[#6d214d] rounded-[30px] content-center shadow-2xl mx-auto
                            h-[90%] xl:h-[80%] w-[90%]">
                                <Carrusel images={cajasCAN}></Carrusel>
                                {/* INFORMACION */}
                                <div className="text-center mt-8  text-white mx-auto  
                                w-[90%] text-[12px] 
                                sm:text-[15px]
                                lg:text-[20px] lg:px-2 
                                2xl:w-full 2xl:text-[15px] 2xl:mt-2">
                                    <DownAnimation
                                        delay={0.2}
                                        lineDelay={0.2}
                                        lines={[
                                            <p key={1}>Pricing includes shipping from anywhere in Canada to anywhere in Mexico, customs clearance, and insurance of contents up to $700 CAD per box.</p>
                                        ]}>

                                    </DownAnimation>

                                </div>
                            </div>
                        </div>
                    </div>

                   

                </div>
                <div className="w-full h-full relative">
                </div>
            </div>
        </section>
    )
}