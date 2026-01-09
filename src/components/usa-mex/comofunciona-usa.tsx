"use client";
import {ZoomAnimate} from "@/app/animate/Zoom";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import Image from "next/image";
export default function ComoFuncionaUsa() {
    return (
        <section className="w-full   font-[Poppins] relative bg-[#ebf2fa] ">
            <div className="grid 2xl:grid-cols-4 h-full 2xl:h-[50%]">
                <div className="2xl:col-start-2 2xl:col-span-2 mt-10 md:mt-25">
                    <h2 className=" text-black text-center lg:text-start lg:pl-[10%]  mx-auto  mb-5 xl:mb-10 ">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1} className="font-bold text-[35px]  md:text-[55px] xl:text-[45px] 2xl:text-[55px]">
                                     <span className="text-red-700">How</span> It <span className="text-green-700"> Works?</span></span>

                            ]}>

                        </LeftAnimation>
                    </h2>
                    <div className="flex">

                        <div className="">

                            <div className="flex ">

                                <Image
                                    src="/img/mex-usa/comoFunciona/Numeros.png"
                                    alt="cuadro"
                                    width={192}
                                    height={362}
                                    className=" w-[40%] 3xl:w-[35%] h-[80%] mx-auto md:pl-10 xl:pl-0" />

                                <div className="pl-2 md:px-25 xl:px-12  md:w-[80%] 3xl:w-[60%] grid justify-center content-evenly 
                                    text-[15px]
                                        md:text-[17px]
                                        2xl:text-[17px]
                                        3xl:text-[22px]">
                                    <DownAnimation
                                        delay={0.3}
                                        lines={[
                                            <div key={1} className="">
                                                <p className="">Hassle-free shipping from anywhere in the US & Canada to anywhere in Mexico</p>
                                            </div>
                                        ]}>
                                    </DownAnimation>
                                    <DownAnimation
                                        delay={0.6}
                                        lines={[
                                            <div key={1} className="">

                                                <p className="">Express and Ground shipping options</p>
                                            </div>
                                        ]}>
                                    </DownAnimation>
                                    <DownAnimation
                                        delay={0.9}
                                        lines={[
                                            <div key={1} className="">

                                                <p className="">We handle customs clearance for you</p>
                                            </div>
                                        ]}>
                                    </DownAnimation>
                                </div>

                            </div>
                        </div>
                        <div className=" grid content-center w-[60%] flex justify-end  hidden lg:block">
                            <ZoomAnimate scale={1.09}>
                                <Image
                                    src="/img/mex-usa/comoFunciona/cajas.png"
                                    alt="cuadro"
                                    width={500}
                                    height={500}
                                    className="" />
                            </ZoomAnimate>
                        </div>
                    </div>


                </div>
            </div>

        </section>
    )
}