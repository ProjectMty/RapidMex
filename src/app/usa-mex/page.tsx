"use client";


import Hero from "@/components/usa-mex/hero";
import About from "@/components/usa-mex/costos";
import CostosHD from "@/components/usa-mex/costo-hd";
import Cajas from "@/components/usa-mex/cajas";
import Ruleta from "@/components/usa-mex/ruleta";
import ContactUsa from "@/components/usa-mex/Contact-usa";
import FooterUsa from "@/components/usa-mex/Footer-usa";
import NavbarUsa from "@/components/usa-mex/Navbar-usa";
import Ubicacion from "@/components/usa-mex/ubicacion";
import PersonasUsa from "@/components/usa-mex/personas-usa";
import TiemposUsa from "@/components/usa-mex/Tiempos";
import ComoFuncionaUsa from "@/components/usa-mex/comofunciona-usa";
export default function CotizadorPage() {

  return (
    <main>
      {/* <Ubicacion /> */}
      <NavbarUsa />
      {/* <Ruleta /> */}
      <Hero />
      <About />
      <PersonasUsa />
      <TiemposUsa />
      <ComoFuncionaUsa />
      <Cajas />


      <ContactUsa />
      <FooterUsa />
    </main>

  )
}
