import { DownAnimation } from "@/app/animate/InText"
export default function Pasos() {

    return (
        <div className="">
            {/* PASO 1 */}
            <DownAnimation
                delay={0.3}
                lines={[
                    <div key={1} className="grid grid-cols-4">
                        <div className="border-20 border-t-transparent border-l-transparent rounded-full -rotate-45 border-[#d3d9e0] relative w-fit h-fit">
                            <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-2 rotate-45 shadow-md/30 w-fit h-fit">
                                <div className="z-50 w-28 h-28 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center shadow-2xs overflow-hidden relative" >
                                    <div className="text-6xl font-extrabold ">1
                                        <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[3px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e] to-[#ffffff00]">1</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="grid grid-cols-4 gap-4 content-center ">
                            <div className="h-3 w-3 bg-[#d3d9e0] rounded-full" />
                            <div className="h-3 w-3 bg-[#d3d9e0] rounded-full" />
                            <div className="h-3 w-3 bg-[#d3d9e0] rounded-full" />
                            <div className="h-3 w-3 bg-[#d3d9e0] rounded-full" />
                        </div>
                        <div className="flex col-span-2">
                            <div className="content-center grid text-[15px]  md:text-[25px] lg:text-[20px] xl:text-[20px] 2xl:text-[25px]">
                                <p>Hassle-free shipping from anywhere in the US & Canada to anywhere in Mexico</p>
                            </div>
                        </div>
                    </div>
                ]}>

            </DownAnimation>
            {/* PASO 2 */}
            <DownAnimation
                delay={0.6}
                lines={[
                    <div key={1} className="grid grid-cols-4 -translate-y-5">
                        <div className="border-20 border-r-transparent border-t-transparent rounded-full rotate-45  border-[#bcc1c8] relative w-fit h-fit">
                            <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-2 -rotate-45 shadow-md/30 w-fit h-fit">
                                <div className="w-28 h-28 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center  overflow-hidden relative" >
                                    <div className="text-6xl font-extrabold ">2
                                        <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[2px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e] to-[#ffffff00]" >2</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="grid grid-cols-4 gap-4 content-center ">
                            <div className="h-3 w-3 bg-[#bcc1c8] rounded-full" />
                            <div className="h-3 w-3 bg-[#bcc1c8] rounded-full" />
                            <div className="h-3 w-3 bg-[#bcc1c8] rounded-full" />
                            <div className="h-3 w-3 bg-[#bcc1c8] rounded-full" />
                        </div>
                        <div className="flex col-span-2">
                            <div className="content-center grid text-[15px] md:text-[25px] lg:text-[20px] xl:text-[25px]">
                                <p>Express and Ground shipping options</p>
                            </div>
                        </div>
                    </div>
                ]}>

            </DownAnimation>

            {/* PASO 3 */}
            <DownAnimation
                delay={0.9}
                lines={[
                    <div key={1} className="grid grid-cols-4 -translate-y-10">
                        <div className="border-20 border-t-transparent border-l-transparent rounded-full -rotate-45  border-[#959a9f] w-fit h-fit">
                            <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-2 rotate-45 shadow-md/30 w-fit h-fit">
                                <div className="w-28 h-28 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center shadow-2xs overflow-hidden relative" >
                                    <div className="text-6xl font-extrabold ">3
                                        <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[2px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e79] to-[#ffffff00]">3</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute w-full  flex gap-2 rotate-45 translate-x-15 justify-end pr-2">


                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 content-center ">
                            <div className="h-3 w-3 bg-[#959a9f] rounded-full" />
                            <div className="h-3 w-3 bg-[#959a9f] rounded-full" />
                            <div className="h-3 w-3 bg-[#959a9f] rounded-full" />
                            <div className="h-3 w-3 bg-[#959a9f] rounded-full" />
                        </div>
                        <div className="flex col-span-2">
                            <div className="content-center grid text-[15px] md:text-[25px] lg:text-[20px] xl:text-[25px]">
                                <p>We handle customs clearance for you</p>
                            </div>
                        </div>
                    </div>
                ]}>

            </DownAnimation>

        </div >
    )
}