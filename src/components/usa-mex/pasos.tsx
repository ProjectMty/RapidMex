
export default function Pasos() {

    return (
        <div className=" font-[Poppins]">
            {/* PASO 1 */}
            <div className="bg-gradient-to-b from-[#ffffff] to-[#d0d0d0] opacity-35 p-5 rounded-full">
                <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-1.5 ">
                    <div className="w-24 h-24 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center shadow-2xs overflow-hidden relative" >
                        <p className="text-6xl font-extrabold ">1
                            <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[3px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e] to-[#ffffff00]">1</p>
                        </p>
                    </div>
                </div>
            </div>

            {/* PASO 2 */}
            <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-1.5 ">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center shadow-2xs overflow-hidden relative" >
                    <p className="text-6xl font-extrabold ">2
                        <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[2px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e] to-[#ffffff00]" >2</p>
                    </p>
                </div>
            </div>
            {/* PASO 3 */}
            <div className="bg-gradient-to-tr from-[#ffffff] to-[#d0d0d0] rounded-full p-1.5 ">
                <div className="w-24 h-24 bg-gradient-to-tr from-[#ced1d0] to-[#fdfdfd] rounded-full grid content-center flex items-center justify-center shadow-2xs overflow-hidden relative" >
                    <p className="text-6xl font-extrabold ">3
                        <p className="absolute rotate-180 rotate-y-180 -translate-y-6  blur-[2px] opacity-50  text-transparent bg-clip-text bg-gradient-to-t from-[#6e6e6e79] to-[#ffffff00]">3</p>
                    </p>
                </div>
            </div>
        </div>
    )
}