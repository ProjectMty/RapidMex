"use client";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import Image from "next/image";
export default function ComoFuncionaUsa() {
    return (
        <section className="w-full   font-[Poppins] relative bg-[#ebf2fa] ">
            <div className="grid 2xl:grid-cols-4 h-full 2xl:h-[50%]">
                <div className="2xl:col-start-2 2xl:col-span-2 mt-10 md:mt-20">
                   <h2 className=" text-black text-center lg:text-start lg:pl-[15%]  mx-auto  mb-5 xl:mb-10 ">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1} className="font-bold text-[30px] sm:text-[35px] md:text-[40px] xl:text-[40px] 2xl:text-[50px]">How It Works?</span>
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
                                    className=" w-[70%] 3xl:w-[55%] h-[80%] mx-auto" />

                                <div className="2xl:pl-2 px-5  md:w-[80%] 3xl:w-[60%] grid justify-center content-evenly 
                                    text-[20px]
                                       
                                        md:text-[25px]
                                        2xl:text-[17px]
                                        3xl:text-[20px]">
                                    <DownAnimation
                                        delay={0.4}
                                        lines={[
                                            <div key={1} className="">
                                                <p className="">Hassle-free shipping from anywhere in the US & Canada to anywhere in Mexico</p>
                                            </div>
                                        ]}>
                                    </DownAnimation>
                                    <DownAnimation
                                        delay={0.8}
                                        lines={[
                                            <div key={1} className="">

                                                <p className="">Express and Ground shipping options</p>
                                            </div>
                                        ]}>
                                    </DownAnimation>
                                    <DownAnimation
                                        delay={1.2}
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
                            <Image
                                src="/img/mex-usa/comoFunciona/cajas.png"
                                alt="cuadro"
                                width={500}
                                height={500}
                                className="" />
                        </div>
                    </div>


                </div>
            </div>

        </section>
    )
}