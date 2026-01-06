"use client";

import Image from "next/image";
{/*bg-red-500  sm:bg-blue-600 md:bg-green-500 lg:bg-amber-600 xl:bg-fuchsia-500 2xl:bg-red-500 3xl:bg-indigo-950 */ }

export default function Hero() {
    return (
        <section id="heroUS" className="w-full h-screen font-[Poppins] bg-[#ebf2fa] overflow-hidden">
            <Image
                src="/img/mex-usa/fondo-section-costos.png"
                alt="esquina-derecha"
                className="z-0 opacity-50 "
                fill />

            <div className="h-full inline-grid xl:grid-cols-4 ">

                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-izq.svg"
                        alt="esquina"
                        className="z-20 rotate-270 absolute bottom-0 left-0 hidden xl:block"
                        width={800}
                        height={500} />
                </div>

                <div className="flex-row items-center w-[100%]  mx-auto z-50 col-span-2 px-10
                xl:content-center 
                2xl:mt-20  ">

                    <h1 className="block  font-semibold text-[#4d4d4d] text-start leading-tight 
                    text-[30px]
                    sm:text-[40px]
                    xl:text-[60px]
                    3xl:text-[70px]">
                        Ship fast and easy from  USA and Canada to Mexico
                    </h1>
                    <p className="block font-light text-[#4d4d4d] text-start leading-tight 
                    text-[15px] mt-6
                    sm:text-[25px]
                    xl:text-[30px] xl:mt-3
                    3xl:text-[40px] 3xl:mt-10  ">
                        Stop losing packages and stop dealing with the <br /> complicated customs process to ship into Mexico.
                    </p>
                    <p className="block  font-bold text-[#4d4d4d] text-start leading-tight 
                    text-[15px] mt-8
                    sm:text-[20px]
                    xl:text-[25px] xl:mt-5
                    3xl:text-[35px] 3xl:mt-10">Ship all of your package to Mexico with RapidMex!</p>
                </div>
                <Image
                    src="/img/mex-usa/esquina-der.svg"
                    alt="esquina-derecha"
                    className="z-20 mt-10 hidden xl:block"
                    width={1100}
                    height={500} />







            </div>

        </section>
    )
}