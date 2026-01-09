"use client";
import { ZoomAnimate } from "@/app/animate/Zoom";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import Image from "next/image";
import Pasos from "./pasos";
export default function ComoFuncionaUsa() {
    return (
        <section className=" font-[Poppins] relative bg-[#ebf2fa] py-20 px-6 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-2">

                    {/* INFORMACION */}
                    <div className=" lg:px-10">
                        <h2 className=" text-black text-center  mx-auto  mb-5 xl:mb-10 ">
                            <LeftAnimation
                                delay={0}
                                lines={[
                                    <span key={1} className="font-bold text-[35px]  md:text-[55px] xl:text-[45px] 2xl:text-[55px]">
                                        <span className="text-red-700">How</span> It <span className="text-green-700"> Works?</span></span>

                                ]}>

                            </LeftAnimation>
                        </h2>
                        <div className="grid grid-cols-2 ">
                            <div className="flex justify-center">
                                {/* <Image
                                    src="/img/mex-usa/comoFunciona/Numeros.png"
                                    alt="cuadro"
                                    width={192}
                                    height={362}
                                /> */}
                                <Pasos/>
                            </div>

                            <div className=" grid justify-center content-evenly md:-translate-x-15 lg:translate-x-0
                                    text-[15px]
                                    md:text-[20px]
                                    2xl:text-[18px]
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

                    {/* IMAGEN */}
                    <div className="relative hidden lg:block ">
                        <ZoomAnimate scale={1.09}>
                            <Image
                                src="/img/mex-usa/comoFunciona/cajas.png"
                                alt="cuadro"
                                width={500}
                                height={500}
                                className="absolute right-5" />
                        </ZoomAnimate>
                    </div>
                </div>

            </div>

        </section>
    )
}