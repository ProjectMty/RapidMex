// app/cotizador/page.tsx
"use client";

import { useState } from "react";
import Cotizador from "@/components/Cotizador/Cotizador";
import Login from "@/components/Cotizador/login";

export default function CotizadorPage() {
  const [autenticado, setAutenticado] = useState(false);

  return autenticado ? (
    <Cotizador />
  ) : (
    <Login onLoginSuccess={() => setAutenticado(true)} />
  );
}
