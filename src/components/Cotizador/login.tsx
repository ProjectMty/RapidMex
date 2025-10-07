"use client";

import { useState } from "react";

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === "rapidmex2200" && password === "Supremo2200") {
      onLoginSuccess(); // <- aquí es donde entra al Cotizador
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Login Cotizador
        </h2>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
