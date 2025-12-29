// app/cotizador/page.tsx
"use client";

import { useState } from "react";
import Cotizador from "@/components/Cotizador1/Cotizador";
import Login from "@/components/Cotizador1/login";

export default function CotizadorPage() {
  const [autenticado, setAutenticado] = useState(false);

  return autenticado ? (
    <Cotizador />
  ) : (
    <Login onLoginSuccess={() => setAutenticado(true)} />
  );
}
