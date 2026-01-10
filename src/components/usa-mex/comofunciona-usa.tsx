"use client";
import { ZoomAnimate } from "@/app/animate/Zoom";
import { LeftAnimation } from "@/app/animate/InText";
import Image from "next/image";
import Pasos from "./pasos";
export default function ComoFuncionaUsa() {
    return (
        <section className=" relative bg-[#ebf2fa] py-20 px-6 lg:px-24">
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
                        <div className="">
                            <div className="flex justify-center">
                              
                                <Pasos/>
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