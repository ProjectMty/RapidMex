"use client";
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Producto } from "@/types/cajas";

interface PropsCarrusel {
    images: Producto[];
}
export default function Carrusel({ images }: PropsCarrusel) {
    const [active, setActive] = useState(0);
    const length = images.length;
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [length]);

    const prevSlide = () => {
        stopAutoPlay();
        setActive((prev) => (prev === 0 ? length - 1 : prev - 1));
    }

    const nextSlide = () => {
        stopAutoPlay();
        setActive((prev) => (prev + 1) % length);
        setTimeout(startAutoPlay, 2000);
    };

const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % length);
    }, 5000);
};

const stopAutoPlay = () => {
    if(intervalRef.current){
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
};

    return (
        <div className=" content-center">
            {/* Imagen grande */}
            <div className="w-[90%] mx-auto overflow-hidden h-[300px] md:h-[400px] xl:h-[500px] 2xl:h-[400px] flex items-center justify-center">


                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ scale: 1.05, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileHover={{y:-10}}
                    >
                        <div className="left-5 relative">
                            <Image
                                src={images[active].img}
                                alt="imagen principal"
                                width={600}
                                height={600}
                                className="mx-auto"
                            />
                        </div>

                    </motion.div>
                </AnimatePresence>

            </div>

            {/* botones */}
            <div className=" justify-center space-x-5  w-full 2xl:mb-5">

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