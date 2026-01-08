"use client";
import { LeftAnimation } from "@/app/animate/InText";
import Image from "next/image";
export default function TiemposUsa() {
    return (
        <section className="w-full xl:h-screen font-[Poppins] relative bg-[#ebf2fa] py-10">
            <div className="grid 2xl:grid-cols-4 h-full xl:h-[50%]">
                <div className="lg:col-start-2 lg:col-span-2">
                    <h2 className=" text-black   text-center px-1  mx-auto ">
                        <LeftAnimation
                            delay={0.8}
                            lines={[
                                <span key={1} className="font-bold text-[30px] sm:text-[35px] md:text-[40px] xl:text-[40px] 2xl:text-[50px]">Timeline & Pricing</span>,
                                <span key={2} className=" text-[20px] sm:text-[25px] md:text-[30px] xl:text-[35px] 2xl:text-[30px]">Ground shipping from...</span>
                            ]}>

                        </LeftAnimation>

                    </h2>
                    <div className="xl:inline-grid xl:grid-cols-2 content-center justify-around text-center text-white mt-20 relative w-full space-y-35 xl:space-y-0 ">
                        <div className=" relative w-[90%] md:w-full mx-auto ">

                            <Image
                                src="/img/mex-usa/tiempos/Cuadro1.svg"
                                alt="cuadro"
                                width={400}
                                height={400}
                                className=" w-[80%] 3xl:w-[80%] mx-auto" />
                            {/* TEXTO */}

                            <div className="z-50 absolute top-15 md:left-15 xl:left-10 3xl:left-[12%] space-y-2 mx-auto px-5 xl:px-10">

                                <Image
                                    src="/img/mex-usa/tiempos/UsaMex.svg"
                                    alt="cuadro"
                                    width={100}
                                    height={100}
                                    className="w-[25%] z-50 mx-auto -mt-25" />


                                <div className="inline-flex text-start gap-5">
                                    <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                md:text-[20px]
                                lg:text-[30px]
                                ">US</h2>
                                    <Image
                                        src="/img/mex-usa/tiempos/flecha.svg"
                                        alt="cuadro"
                                        width={50}
                                        height={50}
                                        className=" left-0" />
                                    <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                md:text-[20px]
                                lg:text-[30px]
                                ">Mexico</h2>
                                </div>

                                <p className="text-center mx-auto 
                                text-[12px] 
                                sm:text-[15px]
                                md:text-[20px]
                                lg:text-[20px] lg:px-2 
                                2xl:w-full 2xl:text-[15px] ">(Ground, 8 days) <br />
                                    Includes shipping, customs clerance insurance up to
                                </p>

                                <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                md:text-[30px]
                                lg:text-[45px]
                                ">
                                    $500 USD
                                </h2>
                                <p className="text-center mx-auto 
                                text-[12px] 
                                sm:text-[15px]
                                md:text-[20px]
                                lg:text-[20px] lg:px-2 
                                2xl:w-full 2xl:text-[15px]">per box
                                </p>
                                <Image
                                    src="/img/mex-usa/tiempos/Cajas-small.png"
                                    alt="cuadro"
                                    width={400}
                                    height={400}
                                    className=" w-full mx-auto translate-x-10 -translate-y-10 md:-translate-y-15 xl:-translate-y-10" />
                            </div>

                        </div>
                        <div className=" relative w-[90%] md:w-full mx-auto">

                            <Image
                                src="/img/mex-usa/tiempos/Cuadro2.svg"
                                alt="cuadro"
                                width={400}
                                height={400}
                                className=" w-[80%] 3xl:w-[80%] mx-auto" />
                            {/* TEXTO */}

                            <div className="z-50 absolute top-15 md:left-15 xl:left-10 3xl:left-[12%] space-y-2 mx-auto px-5 xl:px-10">
                                <Image
                                    src="/img/mex-usa/tiempos/CanMex.svg"
                                    alt="cuadro"
                                    width={400}
                                    height={400}
                                    className=" w-[25%] z-50 mx-auto -mt-25" />
                                <div className="inline-flex text-start gap-5">
                                    <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                     md:text-[20px]
                                lg:text-[30px]
                                ">CA</h2>
                                    <Image
                                        src="/img/mex-usa/tiempos/flecha.svg"
                                        alt="cuadro"
                                        width={50}
                                        height={50}
                                        className=" left-0" />
                                    <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                     md:text-[20px]
                                lg:text-[30px]
                                ">Mexico</h2>
                                </div>

                                <p className="text-center mx-auto 
                                text-[12px] 
                                sm:text-[15px]
                                     md:text-[20px]
                                lg:text-[20px] lg:px-2 
                                2xl:w-full 2xl:text-[15px] ">(Ground, 12 days) <br />
                                    Includes shipping, customs clerance insurance up to
                                </p>

                                <h2 className="font-bold  text-[12px] 
                                sm:text-[15px]
                                     md:text-[30px]
                                lg:text-[45px]
                                ">
                                    $700 USD
                                </h2>
                                <p className="text-center mx-auto 
                                text-[12px] 
                                sm:text-[15px]
                                     md:text-[20px]
                                lg:text-[20px] lg:px-2 
                                2xl:w-full 2xl:text-[15px]">per box
                                </p>
                                <Image
                                    src="/img/mex-usa/tiempos/Cajas-small.png"
                                    alt="cuadro"
                                    width={400}
                                    height={400}
                                    className=" w-full mx-auto translate-x-10  -translate-y-10 md:-translate-y-15 xl:-translate-y-10" />
                            </div>

                        </div>
                    </div>
                    <h2 className="text-[#367250] font-bold tracking-wider text-[12px] text-center
                                sm:text-[15px]
                                md:text-[25px]
                                lg:text-[25px]
                              mt-30 md:mt-30  xl:mt-55">Ship all of your package to Mexico with Rapidmex!</h2>
                </div>
            </div>
        </section>
    )
}