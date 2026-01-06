"use client";

import Image from "next/image";


export default function Costos() {

    return (
        <section className="font-[Poppins] w-full h-fit overflow-hidden bg-[#ebf2fa]">

            <div className="grid xl:grid-cols-4 pb-10">
                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-izq.svg"
                        alt="esquina"
                        className="z-20 rotate-270 absolute bottom-0 left-0 hidden xl:block"
                        width={800}
                        height={500} />
                </div>
                <div className="relative col-span-2 mt-10  content-center items-center justify-center">
                    <div className="grid xl:grid-cols-2 ">
                        <Image
                            src="/img/mex-usa/fondo-section-costos.png"
                            alt="img"
                            className=" h-auto mx-auto
                            w-[90%] 2xl:w-full"
                            width={1900}
                            height={715} />
                        <div  className="mx-auto  mt-2
                        w-[90%] text-[10px] 
                        sm:text-[15px]
                        lg:text-[20px]
                        2xl:w-[80%] 2xl:text-[20px]">

                            <p className="text-end mt-2 font-semibold">Hassle free shipping from anywhere in the US and Canada to anywhere in Mexico. Express and ground shipping options available. We handle customs clearance!</p>

                            <p className="text-end mt-2 font-semibold">All packages are covered with our 100% worry free shipping guarantee. Your contents are covered at 100% of their declared value!</p>

                            <p className="text-end mt-2 font-semibold">Ship personal or commercial packages from your home or office in the US or Canada to your family or clients in Mexico. </p>
                        </div>

                    </div>

                    <div className=" z-30  bg-[#f7f7f7] content-center  rounded-3xl mx-auto mt-10 shadow-xl overflow-hidden
                     inset-0 bg-[url('/img/mex-usa/fondo-tabla.svg')] bg-cover bg-center 
                    w-[90%]
                    xl:relative 2xl:w-[80%] xl:absolute
                    ">
                        <div className="relative bg-white/40 ">
                            <table className="w-full border-collapse text-start">
                                <thead className="bg-[#cc2035] rounded-4xl text-white font-bold text-[12px]">
                                    <tr >
                                        <th className=" p-5">PERSONAL</th>
                                        <th className=" p-2 ">B2C - DIRECT TO CLIENT</th>
                                        <th className=" p-2 ">COMMERCIAL & MARKETPLACE</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[10px] sm:text-[15px] xl:text-[19px]">
                                    <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2 border-b-2">Documents</th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 border-r-2 border-b-2 font-normal">E-commerce sales (Amazon FBM, Shopify, private brand)</th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 border-b-2 font-extrabold  ">Amazon FBA</th>
                                    </tr>
                                     <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2 border-b-2">Gifts</th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 border-r-2 border-b-2 font-normal">Retail fulfillment</th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 border-b-2 font-extrabold  ">Mercado Libre Full</th>
                                    </tr>
                                     <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2 ">Boxes</th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 border-r-2 border-b-2  font-normal">Samples</th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 border-b-2 font-extrabold  ">Walmart FS</th>
                                    </tr>
                                      <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2 "></th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 border-r-2 border-b-2  font-normal">Personal shoppers</th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 border-b-2 font-extrabold  ">B2B retial fulfillment</th>
                                    </tr>
                                     <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2 "></th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 border-r-2 border-b-2  font-normal">Boxes</th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 border-b-2 font-extrabold  ">Boxes</th>
                                    </tr>
                                       <tr className="text-start">
                                        <th className="p-1 xl:px-10 text-[#cc2035] border-black/40 border-r-2  "></th>
                                        <th className="p-1 xl:px-10 text-[#3f3f3f] border-black/40 font-normal border-r-2 "></th>
                                        <th className="p-1 xl:px-10 text-[#187a0b] border-black/40 font-extrabold">Pallets</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <Image
                    src="/img/mex-usa/esquina-der.svg"
                    alt="esquina-derecha"
                    className="z-20 hidden xl:block"
                    width={1100}
                    height={500} />
            </div>
        </section>
    )
}