"use client";


import Hero from "@/components/usa-mex/hero";
import About from "@/components/usa-mex/costos";

import ContactUsa from "@/components/usa-mex/Contact-usa";
import FooterUsa from "@/components/usa-mex/Footer-usa";
import NavbarUsa from "@/components/usa-mex/Navbar-usa";
import PersonasUsa from "@/components/usa-mex/personas-usa";
import TiemposUsa from "@/components/usa-mex/Tiempos";
import ComoFuncionaUsa from "@/components/usa-mex/comofunciona-usa";
export default function CotizadorPage() {

  return (
    <main className="bg-[#ebf2fa]">
      {/* <Ubicacion /> */}
      <NavbarUsa />
      {/* <Ruleta /> */}
      <Hero />
      <About />
      <PersonasUsa />
      <TiemposUsa />
      <ComoFuncionaUsa />
      <ContactUsa />
      <FooterUsa />
    </main>

  )
}
