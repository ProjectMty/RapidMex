"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarUsa() {
  const [menuOpen, setMenuOpen] = useState(false);


  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Cierra el menú al hacer clic
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow w-full px-4 sm:px-8 py-4 fixed top-0 left-0 z-100 font-[Poppins]">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 mr-auto">
          <Link href={"/"}>

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
          <li>
            <Link href={"/"}
              className="hover:text-red-600 transition">

              Home
            </Link>
           
          </li>
          <li>
            <button
              onClick={() => scrollToSection("service-us")}
              className="hover:text-red-600 transition"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("costo-usa")}
              className="hover:text-red-600 transition"
            >
              Costs
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("us-usa")}
              className="hover:text-red-600 transition"
            >
              About us
            </button>
          </li>
          <li>
           <button
              onClick={() => scrollToSection("heroUS")}
              className="font-bold text-black hover:text-red-600 transition"
            >
              Can - Usa - Mex
            </button>
          </li>
        </ul>

        {/* Contact Button Desktop */}
        <div className="flex-shrink-0 hidden md:block ml-auto">
          <button
            onClick={() => scrollToSection("contacto-usa")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-2 shadow"
          >
            Contact Us
          </button>
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
            <button
              onClick={() => scrollToSection("heroUS")}
              className="w-full text-left block py-2"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("service-us")}
              className="w-full text-left block py-2"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("costo-usa")}
              className="w-full text-left block py-2"
            >
              Costs
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("us-usa")}
              className="w-full text-left block py-2"
            >
              About us
            </button>
          </li>
           <li>
            <button
              onClick={() => scrollToSection("heroUS")}
              className="w-full text-left block py-2"
            >
              Can - Usa - Mex
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
