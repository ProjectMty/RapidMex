"use client";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import Image from "next/image";
export default function ComoFuncionaUsa() {
    return (
        <section className="w-full h-screen  font-[Poppins] relative bg-[#ebf2fa] ">
            <div className="grid 2xl:grid-cols-4 h-full xl:h-[50%]">
                <div className="col-start-2 col-span-2 md:mt-10">

                    <div className="grid xl:grid-cols-2">
                        <div className="">
                            <h2 className=" text-black   text-center px-1  mx-auto col-span-2 xl:mb-10">
                                <LeftAnimation
                                    delay={0.8}
                                    lines={[
                                        <span key={1} className="font-bold text-[30px] sm:text-[35px] md:text-[40px] xl:text-[40px] 2xl:text-[50px]">How It Works?</span>
                                    ]}>

                                </LeftAnimation>
                            </h2>
                            <div className="flex ">
                                <Image
                                    src="/img/mex-usa/comoFunciona/Numeros.png"
                                    alt="cuadro"
                                    width={192}
                                    height={362}
                                    className=" w-[70%] h-[80%] mx-auto" />
                                <div className="pl-2 font-semibold text-[15px] md:w-[80%] 3xl:w-[80%]
                                        sm:text-[20px]
                                        md:text-[25px]
                                        lg:text-[20px]
                                        2xl:text-[20px]">
                                    <DownAnimation
                                        delay={0.2}
                                        lineDelay={0.5}
                                        lines={[
                                            <div key={1} className="mt-5 md:mt-18 xl:mt-8 3xl:mt-15">
                                                <p className="">Hassle-free shipping from anywhere in the US & Canada to anywhere in Mexico</p>
                                            </div>,
                                            <div key={2} className="mt-15 md:mt-30 xl:mt-8 3xl:mt-10">

                                                <p className="">Express and Ground shipping options</p>
                                            </div>,
                                            <div key={3} className="mt-15 md:mt-35 xl:mt-12 3xl:mt-20">

                                                <p className="">We handle customs clearance for you</p>
                                            </div>
                                        ]}>

                                    </DownAnimation>
                                </div>



                            </div>
                        </div>
                        <div>
                            <Image
                                src="/img/mex-usa/comoFunciona/cajas.png"
                                alt="cuadro"
                                width={425}
                                height={464}
                                className=" w-full md:hidden xl:block" />
                        </div>
                    </div>


                </div>
            </div>

        </section>
    )
}