import { DatosCotizacion } from "../types/DatosPaquete";

export async function crearPaquete(paquete: DatosCotizacion, idCliente: number, idDestinatario: number) {
    // peso volumétrico
    const L = Number(paquete.l) || 0;
    const A = Number(paquete.a) || 0;
    const H = Number(paquete.h) || 0;

    const L_in = paquete.unidadMedida === "cm" ? L / 2.54 : L;
    const A_in = paquete.unidadMedida === "cm" ? A / 2.54 : A;
    const H_in = paquete.unidadMedida === "cm" ? H / 2.54 : H;
    const pesoV = Math.ceil((L_in * A_in * H_in) / 139);

    const body = {
        largo: paquete.l,
        ancho: paquete.a,
        alto: paquete.h,
        tipo: paquete.tipoPaquete,
        peso: paquete.peso,
        valor: paquete.valor,
        pesoVol: pesoV,
        contenido: paquete.contenido,
        cantidad: paquete.cantidad,
        seguro: 0,
        cliente: idCliente,
        destinatario: idDestinatario
    }
    console.log(body);
    const response = await fetch("/api/guardar?action=paquete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    return data;
}