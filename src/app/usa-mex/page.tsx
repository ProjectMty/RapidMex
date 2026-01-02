"use client";


import Hero from "@/components/usa-mex/hero";
import Navbar from "@/components/Navbar";
import Costos from "@/components/usa-mex/costos";
import CostosHD from "@/components/usa-mex/costo-hd";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cajas from "@/components/usa-mex/cajas";
import Ruleta from "@/components/usa-mex/ruleta";
export default function CotizadorPage() {

  return (
    <main>
      <Navbar />
      <Ruleta />
      <Hero />
      <Costos />
      <Cajas />
      <CostosHD />
      {/* <Contact /> */}
      <Footer />
    </main>

  )
}
