"use client";
import { LeftAnimation, DownAnimation } from "@/app/animate/InText";
import Image from "next/image";
{/*bg-red-500  sm:bg-blue-600 md:bg-green-500 lg:bg-amber-600 xl:bg-fuchsia-500 2xl:bg-red-500 3xl:bg-indigo-950 */ }

export default function Hero() {
    return (
        <section id="heroUS" className="w-full h-[500px] md:h-[550px] overflow-hidden font-[Poppins] bg-[#ebf2fa] ">
            <Image
                src="/img/mex-usa/hero/Banner.png"
                alt="banner"
                className="z-0 absolute w-full h-[50%] xl:h-[60%]"
                width={1990}
                height={459} />

            <Image
                src="/img/mex-usa/hero/izquierdo.png"
                alt="esquina-izq"
                className="z-20 w-[80%] h-[60%] absolute top-0 left-0 hidden xl:block"
                width={1990}
                height={456} />


            <Image
                src="/img/mex-usa/hero/derecho.png"
                alt="esquina-der"
                className="z-20 w-[80%] h-[60%]  absolute top-0 right-0 hidden xl:block "
                width={1990}
                height={456} />

            <div className="h-full inline-grid xl:grid-cols-4 ">

                <div className="flex-row items-center w-[100%]  mx-auto z-50 col-span-2 px-10 col-start-2
                content-center 
                 ">

                    <h1 className="block  font-semibold text-[#4d4d4d] text-start leading-tight 
                    text-[30px]
                    sm:text-[40px]
                    xl:text-[60px]
                    3xl:text-[70px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}>Ship fast and easy from USA</span>,
                                <span key={2}>and Canada to Mexico</span>
                            ]}>

                        </LeftAnimation>

                    </h1>
                    <div className="block font-light text-[#4d4d4d] text-start leading-tight 
                    text-[15px] mt-6
                    sm:text-[25px]
                    xl:text-[30px] xl:mt-3
                    3xl:text-[40px] 3xl:mt-10  ">
                        <DownAnimation
                            delay={0.7}
                            lines={[
                                <span key={1}>Stop losing packages and stop dealing with the</span>,
                                <span key={2}>complicated customs process to ship into Mexico.</span>
                            ]}>

                        </DownAnimation>

                    </div>
                    <div className="block  font-bold text-[#4d4d4d] text-start leading-tight 
                    text-[15px] mt-8
                    sm:text-[20px]
                    xl:text-[30px] xl:mt-5
                    3xl:text-[35px] 3xl:mt-10">
                        <DownAnimation
                            delay={1.2}
                            lines={[
                                <span key={1}>Ship all of your package to Mexico with RapidMex!</span>
                            ]}>
                        </DownAnimation>
                    </div>
                </div>







            </div>

        </section>
    )
}