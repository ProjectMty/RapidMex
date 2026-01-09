"use client";
import { DownAnimation, LeftAnimation } from "@/app/animate/InText";
import Image from "next/image";
import {ZoomAnimate} from "@/app/animate/Zoom";

export default function About() {

    return (
        <section id="us-usa" className="font-[Poppins] w-full h-full overflow-hidden bg-[#ebf2fa] ">

            <div className="lg:py-12 px-6 lg:px-24 pb-10 ">

                <div className="max-w-7xl mx-auto">
                    {/* TITULO */}
                    <h2 className=" text-black font-bold  text-center px-1 pt-10 pb-5  mx-auto
                                        text-[30px] w-[90%]
                                        sm:text-[35px]
                                        md:text-[40px]
                                        xl:text-[40px] xl:w-full
                                        2xl:text-[50px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}><span className="text-red-700 font-bold">Why</span> RapidMex?</span>
                            ]}>

                        </LeftAnimation>

                    </h2>
                    <div className="grid lg:grid-cols-2 gap-5 mt-5">
                        <div className="mx-auto h-fit 
                                       ">
                            <ZoomAnimate scale={1.09}>
                                <Image
                                    src="/img/mex-usa/about/personas.png"
                                    alt="img"
                                    width={1900}
                                    height={715}
                                    className="" />

                            </ZoomAnimate>
                        </div>
                        <div className="mx-auto  mt-2 flex items-center
                                        w-[90%] text-[10px] 
                                        sm:text-[15px]
                                        lg:text-[20px]
                                        2xl:w-[100%] 2xl:text-[20px]  text-start">
                            <DownAnimation
                                delay={0.2}
                                lineDelay={0.5}
                                lines={[
                                    <div key={1} className="mt-2 3xl:mt-0 flex items-center">
                                        <Image
                                            src="/img/mex-usa/about/check.svg"
                                            alt="img"
                                            width={40}
                                            height={40}
                                            className="" />
                                        <p className="pl-2">Hassle-free shipping from anywhere in the US & Canada to anywhere in Mexico</p>
                                    </div>,
                                    <div key={2} className="mt-2 3xl:mt-5 flex items-center">
                                        <Image
                                            src="/img/mex-usa/about/check.svg"
                                            alt="img"
                                            width={40}
                                            height={40}
                                            className="" />
                                        <p className="pl-2">Express and Ground shipping options</p>
                                    </div>,
                                    <div key={3} className="mt-2 3xl:mt-5 flex items-center">
                                        <Image
                                            src="/img/mex-usa/about/check.svg"
                                            alt="img"
                                            width={40}
                                            height={40}
                                            className="" />
                                        <p className="pl-2">We handle customs clearance for you</p>
                                    </div>,
                                    <div key={4} className="mt-2 3xl:mt-5 flex  items-center">
                                        <Image
                                            src="/img/mex-usa/about/check.svg"
                                            alt="img"
                                            width={40}
                                            height={40}
                                            className="" />
                                        <p className="pl-2">No paperwork stress, no surprises</p>
                                    </div>,
                                    <div key={5} className="mt-2 3xl:mt-5 flex  items-center">
                                        <Image
                                            src="/img/mex-usa/about/check.svg"
                                            alt="img"
                                            width={40}
                                            height={40}
                                            className="" />
                                        <p className="pl-2">Door-to-door service</p>
                                    </div>,
                                ]}>

                            </DownAnimation>

                        </div>

                    </div>


                </div>

            </div>
        </section>
    )
}