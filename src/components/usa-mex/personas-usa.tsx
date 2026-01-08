"use client";
import { DownAnimation, LeftAnimation } from "@/app/animate/InText";
import Image from "next/image";
export default function PersonasUsa() {

    return (
        <section id="service-us" className="w-full h-fit  font-[Poppins] relative bg-[#ebf2fa] py-10">
            <div className="grid 2xl:grid-cols-4 h-full xl:h-[50%]">

                <div className="col-start-2 col-span-2">
                    <h2 className=" text-black font-bold  text-center px-1 pt-10 pb-5  mx-auto 
                                    text-[30px] w-[90%]
                                    sm:text-[35px]
                                    md:text-[40px]
                                    xl:text-[40px] xl:w-full
                                    2xl:text-[50px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}>Who Is This Service For?</span>
                            ]}>

                        </LeftAnimation>

                    </h2>

                    <div className="inline-grid xl:grid-cols-3  content-center justify-center text-center text-white gap-10 mt-20 px-20 2xl:px-0">

                        {/* PRIMER COLUMNA*/}

                        <DownAnimation
                            delay={0.2}
                            lineDelay={0.2}
                            lines={[
                                <div key={1} className="bg-gradient-to-r from-[#016414] to-[#53c359] rounded-2xl space-y-10 2xl:space-y-5 3xl:space-y-10 p-5 h-70 justify-around">
                                    <h2 className="font-bold tracking-wider text-[12px] 
                                sm:text-[15px]
                                lg:text-[20px]
                                ">PERSONAL</h2>
                                    <Image
                                        src="/img/mex-usa/servicios/Personal.svg"
                                        alt="img"
                                        width={100}
                                        height={100}
                                        className="w-[100px]  xl:w-[80px] mx-auto" />
                                    <div className="text-center mt-8  text-white mx-auto  
                                w-[90%] text-[12px] 
                                sm:text-[15px]
                                 lg:px-2 
                                2xl:w-full 2xl:text-[12px] 2xl:mt-2">
                                        <p>Documents, Gifts and Boxes</p>
                                    </div>
                                </div>
                            ]}>
                        </DownAnimation>


                        {/* SEGUNDA COLUMNA*/}
                        <DownAnimation
                            delay={0.6}
                            lineDelay={0.2}
                            lines={[
                                <div key={1} className="bg-gradient-to-r from-[#af112a] to-[#cd2033] rounded-2xl space-y-10 2xl:space-y-5 3xl:space-y-12 py-5 px-3 h-70">
                                    <h2 className="font-bold tracking-wider text-[12px] 
                                sm:text-[15px]
                                lg:text-[20px]
                                ">B2C - DIRECT TO CLIENT</h2>
                                     <Image
                                        src="/img/mex-usa/servicios/b2c.svg"
                                        alt="img"
                                        width={100}
                                        height={100}
                                        className="w-[100px] xl:w-[80px] mx-auto" />
                                    <div className="text-center mt-8  text-white mx-auto  
                                w-[90%] text-[12px] 
                                sm:text-[15px]
                                 lg:px-2 
                                2xl:w-full xl:text-[12px] 2xl:mt-2">
                                        <p>E-commerce sales (Amazon, FBM, Shopify, private brand), Retail fullfillment, Samples, Personal Shoppers Boxes</p>
                                    </div>
                                </div>
                            ]}>

                        </DownAnimation>

                        {/* TERCERA COLUMNA*/}
                        <DownAnimation
                            delay={1}
                            lineDelay={0.2}
                            lines={[
                                <div key={1} className="bg-gradient-to-r from-[#53c359] to-[#016414] rounded-2xl space-y-5 3xl:space-y-10 py-5 px-3 h-70">
                                    <h2 className="font-bold tracking-wider text-[12px] 
                                sm:text-[15px]
                                lg:text-[20px]
                                ">COMMERCIAL & MARKETPLACE</h2>
                                   <Image
                                        src="/img/mex-usa/servicios/Comercial.svg"
                                        alt="img"
                                        width={100}
                                        height={100}
                                        className="w-[100px] xl:w-[80px] mx-auto " />
                                    <div className="text-center mt-8  text-white mx-auto  
                                w-[90%] text-[12px] 
                                sm:text-[15px]
                                 lg:px-2 
                                2xl:w-full xl:text-[12px] 2xl:mt-2">
                                        <p>Amazon, FBA, Mercado Libre Full, Walmart FS, B2B retail fullfillment Boxes, Pallets</p>
                                    </div>
                                </div>
                            ]}>

                        </DownAnimation>
                    </div>
                </div>

            </div>
        </section >
    )
}