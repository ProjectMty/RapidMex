"use client";


import Hero from "@/components/usa-mex/hero";
import Costos from "@/components/usa-mex/costos";
import CostosHD from "@/components/usa-mex/costo-hd";
import Cajas from "@/components/usa-mex/cajas";
import Ruleta from "@/components/usa-mex/ruleta";
import ContactUsa from "@/components/usa-mex/Contact-usa";
import FooterUsa from "@/components/usa-mex/Footer-usa";
import NavbarUsa from "@/components/usa-mex/Navbar-usa";
import Ubicacion from "@/components/usa-mex/ubicacion";
export default function CotizadorPage() {

  return (
    <main>
      <Ubicacion />
      <NavbarUsa />
      {/* <Ruleta /> */}
      <Hero />
      <Costos />
      <Cajas />
      <CostosHD />
      <ContactUsa />
      <FooterUsa />
    </main>

  )
}
