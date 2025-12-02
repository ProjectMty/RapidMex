"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setMenuOpen(false); // Cierra el menú al hacer clic
        }
    };
    const pathname = usePathname();


    return (
        <nav className="bg-white border-b border-gray-200 shadow w-full px-4 sm:px-8 py-4 fixed top-0 left-0 z-100">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex-shrink-0 mr-auto">
                    <Link href="/" className="">
                        <Image
                            src="/img/logo.svg"
                            alt="RapidMex Logo"
                            width={120}
                            height={40}
                            priority
                            className="hover:opacity-60 transition"
                        />
                    </Link>

                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex flex-grow justify-center gap-6 text-sm font-medium text-gray-600">

                </ul>
                <div className="flex-shrink-0 hidden md:block ml-auto">
                    <Link href="/rastrea"
                        className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/rastrea"
                            ? "bg-green-700 hover:bg-green-800 font-bold"
                            : " bg-red-600 hover:bg-red-700 "
                            }`}
                    >
                        Rastrear
                    </Link>
                </div>
                <div className="flex-shrink-0 hidden md:block ml-auto">
                    <Link href="/cotiza"
                        className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/cotiza"
                            ? "bg-green-700 hover:bg-green-800 font-bold"
                            : " bg-red-600 hover:bg-red-700 "
                            }`}
                    >
                        Cotizar
                    </Link>
                </div>

                <div className="flex-shrink-0 hidden md:block ml-auto">
                    <Link href="/guia"
                        className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/guia"
                            ? "bg-green-700 hover:bg-green-800 font-bold"
                            : " bg-red-600 hover:bg-red-700 "
                            }`}
                    >
                        Generar Guia
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-gray-600 hover:text-black focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <ul className="md:hidden mt-4 px-4 space-y-4 text-sm font-medium text-gray-600 bg-white shadow rounded-md">
                    <li>
                        <Link href="/rastrea"
                            className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/rastrea"
                                ? "bg-green-700 hover:bg-green-800 font-bold"
                                : " bg-red-600 hover:bg-red-700 "
                                }`}
                        >
                            Rastrear
                        </Link>
                    </li>
                    <li>
                        <Link href="/cotizador2"
                            className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/cotizador2"
                                ? "bg-green-700 hover:bg-green-800 font-bold"
                                : " bg-red-600 hover:bg-red-700 "
                                }`}
                        >
                            Cotizar
                        </Link>
                    </li>
                    <li>
                        <Link href="/guia"
                            className={` font-semibold  px-6 py-2 shadow rounded-full text-white ${pathname === "/guia"
                                ? "bg-green-700 hover:bg-green-800 font-bold"
                                : " bg-red-600 hover:bg-red-700 "
                                }`}
                        >
                            Generar Guia
                        </Link>
                    </li>

                </ul>
            )}
        </nav>
    );
}
