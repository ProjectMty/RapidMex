import { Dest } from "../types/registroUsuario";

export async function guardarDestinatario(user: Dest) {
    
    const body = {
            pais: user.Pais,
            estado: user.Estado,
            municipio: user.Municipio,
            colonia: user.Colonia,
            calle: user.Calle,
            numExt: user.NumExterior,
            CodigoPostal: user.CodigoPostal,
            referencia: user.Referencia,
            nombre: user.Nombre,
            apePat: user.APaterno,
            apeMat: user.AMaterno,
            tel: user.Telefono,
            idCliente: user.idCliente,
            activo: user.activo
        }
        console.log("user en controlador", body)
    const response = await fetch("/api/guardar?action=destinatario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    return data;
}