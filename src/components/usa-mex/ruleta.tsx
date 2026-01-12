"use client";
import { useEffect, useState } from "react";
import Modal from "../utils/Modal"

const premios = [
    "10 USD descuento",
    "20 USD descuento",
    "30 USD descuento",
    "40 USD descuento",
    "50 USD descuento",
    "60 USD descuento",
]
export default function Ruleta() {
    const [open, setOpen] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState("");
    const [spinning, setSpinning] = useState(false);
    const [alreadyPlayed, setAlreadyPlayed] = useState(false);
    const anglePerItem = 360 / premios.length;

    const spin = () => {
        if (spinning) return;

        setSpinning(true);

        const randomIndex = Math.floor(Math.random() * premios.length);
        const targetAngle =
            360 * 5 - (randomIndex * anglePerItem + anglePerItem / 3);

        console.log(randomIndex, premios[randomIndex]);

        setRotation((prev) => prev + targetAngle);

        setTimeout(() => {
            setResult(premios[randomIndex]);
            setSpinning(false);
            localStorage.setItem("ruletaPrize", premios[randomIndex]);
            setAlreadyPlayed(true);

        }, 3000);
    }

    useEffect(() => {
        setOpen(true);
    }, []);
    useEffect(() => {
        const savedPrize = localStorage.getItem("ruletaPrize");

        if (savedPrize) {
            setResult(savedPrize);
            setAlreadyPlayed(true);
        }

        setOpen(true);
    }, []);
    // SOLO LO MUESTRA LA PRIMERA VEZ QUE INGRESA A LA PAGINA
    // useEffect(() => {
    //     const alreadyShown = localStorage.getItem("modalShown");

    //     if (!alreadyShown) {
    //         setOpen(true);
    //         localStorage.setItem("modalShown", "true");
    //     }
    // }, []);

    return (
        <div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="pt-6 mb-4 text-xl font-bold text-center">BIENVENIDO A RAPIDMEX</h2>
                <p className="mb-4 text-md text-center" >haz click para iniciar a participar</p>

                <div className="flex flex-col items-center gap-4">
                    {/* Flecha */}
                    <div className="absolute z-50 translate-y-[150%] text-8xl ">🡆</div>

                    {/* Ruleta */}
                    <div className="relative h-96 w-96 rounded-full border-4 border-gray-800 overflow-hidden">
                        <div
                            className="absolute inset-0 rounded-full transition-transform duration-[3000ms] ease-out"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        >
                            {premios.map((item, index) => {
                                const angle = anglePerItem * index;

                                return (
                                    <div
                                        key={item}
                                        className="absolute inset-0 flex items-center justify-center "
                                        style={{
                                            transform: `rotate(${angle}deg)`,
                                        }}
                                    >
                                        {/* Segmento */}
                                        <div
                                            className={`absolute top-0 left-1/2 h-1/2 w-1/2 origin-bottom-left ${index % 2 === 0 ? "bg-green-600" : "bg-red-500"
                                                }`}
                                            style={{
                                                transform: `rotate(${anglePerItem}deg) skewY(-30deg)`,
                                            }}
                                        />

                                        {/* Texto */}
                                        <div
                                            className="absolute  top-1/2 translate-x-[90%]  text-center text-black text-sm font-semibold "

                                        >
                                            {item}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        onClick={spin}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                        disabled={spinning || alreadyPlayed}
                    >
                        {alreadyPlayed ? "Ya participaste" : "Girar ruleta"}
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem("ruletaPrize");
                            window.location.reload();
                        }}
                        className="text-xs text-gray-500 underline"
                    >
                        Reset ruleta (dev)
                    </button>
                    {/* Resultado */}
                    {result && (
                        <p className="text-lg font-semibold pb-6">
                            🎉 Resultado: <span className="text-green-700">{result}</span>
                        </p>
                    )}
                </div>
            </Modal>
        </div>
    )
}