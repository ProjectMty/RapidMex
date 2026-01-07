"use client";
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Producto } from "@/types/cajas";

interface PropsCarrusel {
    images: Producto[];
}
export default function Carrusel({ images }: PropsCarrusel) {
    const [active, setActive] = useState(0);
    const length = images.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % length);
        }, 5000)
        return () => clearInterval(interval);
    }, [length]);

    const prevSlide = () => {
        setActive((prev) => (prev === 0 ? length - 1 : prev - 1));
    }

    const nextSlide = () => {
        setActive((prev) => (prev + 1) % length);
    };


    return (
        <div className="w-full h-[80%] content-center">
            {/* Imagen grande */}
            <div className="w-[80%] mx-auto h-fit relative overflow-hidden">
                <div className="text-center  text-white mb-10
                                mx-auto  
                                w-[90%] text-[20px] 
                                sm:text-[15px]
                                lg:text-[20px]
                                2xl:w-full 2xl:text-[15px] ">
                    <h2>Price: {images[active].price} </h2>
                    <h2>Weight: {images[active].weight} </h2>
                    <h2>Dimensions: {images[active].l} x {images[active].a} x {images[active].h} </h2>

                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Image
                            src={images[active].img}
                            alt="imagen principal"
                            width={600}
                            height={900}
                            className="mx-auto"
                        />
                    </motion.div>
                </AnimatePresence>


            </div>

            {/* botones */}
            <div className="flex justify-center gap-4 mt-5   w-full sm:pb-10 xl:pb-0">

                {/* FLECHA IZQ */}
                <button className=" bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-50" onClick={prevSlide}>
                    <ChevronLeft size={28}></ChevronLeft>
                </button>


                {/* FLECHA DER */}
                <button className=" bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition z-50" onClick={nextSlide}>
                    <ChevronRight size={28} />
                </button>
            </div>
        </div>
    )



}