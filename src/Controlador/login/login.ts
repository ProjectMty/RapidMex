import { login } from "../types/registroUsuario";

export const loginUsu = async (data: login) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      contrasena: data.contrasena,
      correo: data.correo,
    }),
    credentials: "include"
  });

  const res = await response.json();
  return {
    ok: response.ok,
    res,
  };
};

