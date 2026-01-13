import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/AboutUs";
import MessageBanner from "@/components/MessageBanner";
import ComoFunciona from "@/components/ComoFunciona";
import Pricing from "@/components/Pricing";
import Preguntas from "@/components/Preguntas";
import Ubicacion from "@/components/usa-mex/ubicacion";
import { Suspense } from "react";
import Ruleta from "@/components/usa-mex/ruleta";

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={null}>
        <Ubicacion />
      </Suspense>
      <Ruleta />
      <Navbar />
      <Hero />
      <MessageBanner />
      <Services />
      <ComoFunciona />
      <Pricing />
      <Preguntas />
      <Contact />
      <About />
      <Footer />
    </main>
  );
}
