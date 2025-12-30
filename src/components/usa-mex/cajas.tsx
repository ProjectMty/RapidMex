"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/components/styles/costos-hd.css"
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
    gap: 350,   // separación horizontal entre cartas (px)
    scaleCenter: 1.5,
    scaleNear: 0.5,
    scaleFar: 0.21,
    height: { base: 540, md: 520 }, // altura del carrusel
    shadow: "drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]",
};

/** Opacidad por distancia (más foco en la carta central) */
const OPACITY = {
    center: 1,   // 0 de distancia (carta activa)
    near: 0.9,    // ±1
    far: 0.5,     // ±2
    hidden: 0.02,  // ±3 (apenas visible)
};

/** Cantidad de cartas que dibujamos a cada lado (ventana visible) */
const RADIUS = 3; // muestra desde current-3 .. current+3

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
            const src = slides[realIndex];

            const abs = Math.abs(k);
            const z = 100 - abs;
            const x = k * CARD.gap;
            const scale =
                k === 0 ? CARD.scaleCenter : abs === 1 ? CARD.scaleNear : CARD.scaleFar;

            const opacity =
                abs === 0
                    ? OPACITY.center
                    : abs === 1
                        ? OPACITY.near
                        : abs === 2
                            ? OPACITY.far
                            : OPACITY.hidden;

            const filter = abs === 0 ? "none" : "saturate(0.85) brightness(0.92)";

            list.push({
                src,
                key: `${realIndex}-${virtualIndex}`, // clave estable y única
                offset: k,
                x,
                scale,
                z,
                opacity,
                filter,
            });
        }

        return list;
    }, [current, total]);

    return (
        <section className="section-hd">

            <div className="fondo">

                <h2 className="titulo-hd">Ground shipping from the US to Mexico in 8 days!
                </h2>

                <div
                    className="relative mx-auto mt-10 w-full 
    max-w-[980px] overflow-hidden select-none translate-y-0 scale-100
    mb-10"
                    style={{
                        height: `clamp(${CARD.height.base}px, 52vw, ${CARD.height.md}px)`,
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Pila centrada */}
                    <div className="translate-y-[0%] absolute inset-0 flex items-center justify-center py-0 scale-100">
                        {items.map(({ key, src, x, scale, z, opacity, filter }, idx) => (
                            <div
                                key={key}
                                className={`
                absolute ${CARD.shadow}
                transition-all duration-500 ease-[cubic-bezier(.2,.65,.2,1)]
                will-change-transform rounded-[22px] pointer-events-none
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
                                    className="w-full h-auto rounded-[22px]"
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

        
            </div>
        </section>
    )
}