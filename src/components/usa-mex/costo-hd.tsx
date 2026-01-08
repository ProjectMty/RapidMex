"use client";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import {ZoomAnimate} from "@/app/animate/Zoom";
import Image from "next/image";

export default function CostosHD() {

    return (
        <section className="w-full h-fit font-[Poppins]">

            <div className=" grid xl:grid-cols-4 bg-gradient-to-b from-[#b5acc1] to-[#e03857]">
                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-izq.svg"
                        alt="esquina"
                        className="z-20 rotate-270 absolute bottom-0 left-0 hidden xl:block"
                        width={800}
                        height={500} />
                </div>
                <div className="col-span-2">
                    <h2 className=" text-white font-bold  text-center px-1 py-10 text-shadow-lg mx-auto
                    text-[25px] w-[90%]
                    md:text-[30px]
                    xl:text-[40px] xl:w-full
                    2xl:text-[50px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}>Ground shipping from Canada to</span>,
                                <span key={2}>Mexico in 12 days!</span>
                            ]}>

                        </LeftAnimation>

                    </h2>
                    <div className="flex w-[90%] mx-auto mb-2 justify-center">
                        <ZoomAnimate scale={1.2}>
                            <Image
                                src="/img/mex-usa/cajas-hd.png"
                                alt="fondo"
                                width={600}
                                height={900}
                            />
                        </ZoomAnimate>
                    </div>



                    <div className="inline-grid grid-cols-3 mx-auto ">
                        <div className="flex w-[90%] mx-auto mb-2 justify-center">
                            <ZoomAnimate scale={1.2}>
                                <Image
                                    src="/img/mex-usa/cajas-hd.png"
                                    alt="fondo"
                                    width={600}
                                    height={900}
                                />
                            </ZoomAnimate>
                        </div>
                         <div className="flex w-[90%] mx-auto mb-2 justify-center">
                            <ZoomAnimate scale={1.2}>
                                <Image
                                    src="/img/mex-usa/cajas-hd.png"
                                    alt="fondo"
                                    width={600}
                                    height={900}
                                />
                            </ZoomAnimate>
                        </div>
                         <div className="flex w-[90%] mx-auto mb-2 justify-center">
                            <ZoomAnimate scale={1.2}>
                                <Image
                                    src="/img/mex-usa/cajas-hd.png"
                                    alt="fondo"
                                    width={600}
                                    height={900}
                                />
                            </ZoomAnimate>
                        </div>
                        
                    </div>
                    <div className="text-center mt-5 font-semibold text-white
                        mx-auto  mb-10
                        w-[90%] text-[15px] 
                        sm:text-[15px]
                        lg:text-[20px]
                        2xl:w-full 2xl:text-[25px] 2xl:mt-2">
                        <DownAnimation
                            delay={0.2}
                            lineDelay={0.2}
                            lines={[
                                <p key={1}>Pricing includes shipping from anywhere in Canada to anywhere</p>,
                                <p key={2}>in Mexico, customs clearance, and insurance of contents up to $700 CAD per box.</p>
                            ]}>

                        </DownAnimation>

                    </div>
                </div>
                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-der.svg"
                        alt="esquina-derecha"
                        className="z-20 hidden xl:block"
                        width={1100}
                        height={500} />
                </div>
            </div>
        </section>
    )
}