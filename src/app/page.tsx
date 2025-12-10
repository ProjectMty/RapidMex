import Navbar from "@/Vista/paginaPrincipal/Navbar";
import Hero from "@/Vista/paginaPrincipal/Hero";
import MessageBanner from "@/Vista/paginaPrincipal/MessageBanner";
import Services from "@/Vista/paginaPrincipal/Services";
import ComoFunciona from "@/Vista/paginaPrincipal/ComoFunciona";
import Pricing from "@/Vista/paginaPrincipal/Pricing";
import Preguntas from "@/Vista/paginaPrincipal/Preguntas";
import Contact from "@/Vista/paginaPrincipal/Contact";
import About from "@/Vista/paginaPrincipal/AboutUs";
import Footer from "@/Vista/paginaPrincipal/Footer";

export default function HomePage() {
  return (
    <main>
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
