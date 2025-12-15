import { User } from "../types/registroUsuario";

export const registrarUsuario = async (data: User) => {
  const response = await fetch("/api/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      usuario: data.usuario,
      contrasena: data.contrasena,
      correo: data.correo,
      nombre: data.nombre,
      apaterno: data.apaterno,
      amaterno: data.amaterno,
      telefono: data.telefono,
      empresa: data.empresa
    })
  });
  let res;
  try {
    res = await response.json();
    return res;
  } catch {
    console.error("El backend no devolvió JSON válido");
  }
};
