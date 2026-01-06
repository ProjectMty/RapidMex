"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { DownAnimation, LeftAnimation } from "@/app/animate/InText";
import Image from "next/image";

const slides = [
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
    "/img/mex-usa/cajas-hd.png",
];

/** Ajustes del carrusel */
const CARD = {
    w: 350,     // ancho lógico de la carta centrada (px)
    gap: 300,   // separación horizontal entre cartas (px)
    scaleCenter: 1.8,
    scaleNear: 0.85,
    scaleFar: 0.85,
    height: { base: 540, md: 520 }, // altura del carrusel
    shadow: "drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]",
};



/** Cantidad de cartas que dibujamos a cada lado (ventana visible) */
const RADIUS = 2; // muestra desde current-3 .. current+3

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

export default function Cajas() {
    // NOTA: 'current' ahora es un índice VIRTUAL que puede crecer indefinidamente.
    const [current, setCurrent] = useState(0);
    const total = slides.length;
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const touch = useRef<{ x: number; y: number } | null>(null);

    /** autoplay continuo (incrementa el índice virtual) */
    useEffect(() => {
        autoplayRef.current && clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            setCurrent((c) => c + 1);
        }, 5000);
        return () => {
            autoplayRef.current && clearInterval(autoplayRef.current);
        };
    }, []);

    /** navegación por teclado (continuo) */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setCurrent((c) => c - 1);
            if (e.key === "ArrowRight") setCurrent((c) => c + 1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    /** gestos táctiles */
    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touch.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touch.current.x;
        if (Math.abs(dx) > 40) {
            if (dx > 0) setCurrent((c) => c - 1);
            else setCurrent((c) => c + 1);
        }
        touch.current = null;
    };

    /** Generamos la “ventana” alrededor del índice virtual */
    const items = useMemo(() => {
        const list: Array<{
            src: string;
            key: string;
            offset: number;   // distancia relativa respecto al current (k)
            x: number;
            scale: number;
            z: number;
            opacity: number;
            filter: string;
        }> = [];

        for (let k = -RADIUS; k <= RADIUS; k++) {
            const virtualIndex = current + k;
            const realIndex = mod(virtualIndex, total);

            const abs = Math.abs(k);

            const x = k * CARD.gap;
            const scale =
                k === 0 ? CARD.scaleCenter : abs === 1 ? CARD.scaleNear : 0.6;

            const opacity = abs <= 1 ? 1 : 0


            list.push({
                src: slides[realIndex],
                key: `${realIndex}-${virtualIndex}`, // clave estable y única
                offset: k,
                x,
                scale,
                z: 100 - abs,
                opacity,
                filter: abs === 0 ? "none" : "saturate(0.9)"
            });
        }

        return list;
    }, [current, total]);

    return (
        <section className="w-full h-fit font-[Poppins] relative bg-gradient-to-b from-[#ebf2fa] to-[#b5acc1]">
            <div className="grid xl:grid-cols-4 ">
                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-izq.svg"
                        alt="esquina"
                        className="z-20 rotate-270 absolute bottom-0 left-0 hidden xl:block"
                        width={800}
                        height={500} />
                </div>

                <div className=" h-full w-full col-span-2 pb-10">

                    <h2 className=" text-white font-bold  text-center px-1 pt-10 text-shadow-lg mx-auto
                    text-[25px] w-[90%]
                    md:text-[30px]
                    xl:text-[40px] xl:w-full
                    2xl:text-[50px]">
                        <LeftAnimation
                            delay={0}
                            lines={[
                                <span key={1}>Ground shipping from the US</span>,
                                <span key={2}> to Mexico in 8 days!</span>
                            ]}>

                        </LeftAnimation>

                    </h2>

                    <div
                        className="relative mx-auto w-full overflow-hidden select-none 
                    scale-100
                
                     2xl:max-w-[980px] 2xl:my-10
                    "
                        style={{
                            height: `clamp(${CARD.height.base}px, 52vw, ${CARD.height.md}px)`,
                        }}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        {/* Pila centrada */}
                        <div className=" absolute inset-0 flex items-center justify-center  
                        scale-50
                        md:scale-75
                        2xl:scale-100">
                            {items.map(({ key, src, x, scale, z, opacity, filter }, idx) => (
                                <div
                                    key={key}
                                    className={`
                                    absolute ${CARD.shadow}
                                    transition-all duration-500 ease-[cubic-bezier(.2,.65,.2,1)]
                                    will-change-transform  pointer-events-none
                                    `}
                                    style={{
                                        width: CARD.w,
                                        transform: `translateX(${x}px) scale(${scale})`,
                                        zIndex: z,
                                        opacity,
                                        filter,
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Pricing card`}
                                        width={CARD.w}
                                        height={Math.round(CARD.w * 1.55)}
                                        className="w-full h-auto "
                                        draggable={false}
                                        // Priorizamos la central (idx === RADIUS)
                                        priority={idx === RADIUS}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Flechas */}
                        <button
                            aria-label="Previous"
                            onClick={() => setCurrent((c) => c - 1)}
                            className="
                            absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[200]
                            inline-flex items-center justify-center
                            h-10 w-10 rounded-full bg-white shadow-md ring-1 ring-black/10
                            hover:bg-white/90 transition
                        "
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-black/70">
                                <path
                                    fill="currentColor"
                                    d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                                />
                            </svg>
                        </button>

                        <button
                            aria-label="Next"
                            onClick={() => setCurrent((c) => c + 1)}
                            className="
                        absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[200]
                        inline-flex items-center justify-center
                        h-10 w-10 rounded-full bg-white shadow-md ring-1 ring-black/10
                        hover:bg-white/90 transition
                    "
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-black/70">
                                <path
                                    fill="currentColor"
                                    d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center mt-2 font-semibold text-white
                        mx-auto  
                        w-[90%] text-[15px] 
                        sm:text-[15px]
                        lg:text-[20px]
                        2xl:w-full 2xl:text-[25px] 2xl:mt-2">
                        <DownAnimation
                            delay={0.2}
                            lineDelay={0.2}
                            lines={[
                                <p key={1}>Pricing includes shipping from anywhere in the US to anywhere in Mexico,</p>,
                                <p key={2}> customs clearance, and insurance of contents up to $500 USD per box.</p>
                            ]}>

                        </DownAnimation>

                    </div>
                </div>
                <div className="w-full h-full relative">
                    <Image
                        src="/img/mex-usa/esquina-der.svg"
                        alt="esquina-derecha"
                        className="z-20 hidden xl:block"
                        width={1100}
                        height={500} />
                </div>
            </div>
        </section>
    )
}