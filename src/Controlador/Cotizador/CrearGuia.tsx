import { DatosCotizacion } from "../types/DatosPaquete";
import { U_bodega } from "@/Controlador/types/U_Bodega";
import { generarDatosBase, buildAddress } from "./DatosBase";
import { Guia } from "../types/Guia";

export async function crearGuia(body: DatosCotizacion, guia: Guia, idPaquete: number ) {


    // const body = generarGuiaBase(guia, datos, paqueteria, servicio)

    console.log(guia);
    const response = await fetch("/api/guia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(guia),
    })
    const data = await response.json();
    console.log("respuesta de envia", data)
    if (data.success) {
        const respuesta = guiaParaDB(data.guia.data[0], idPaquete, guia)
        return respuesta;
    } else {
        console.log(data);
        return data;
    }
    // return data;
}

// GENERAR GUIA BASE PARA ENVIA.COM


async function guiaParaDB(respuesta: any, idPaquete: number, guia: Guia) {

    if (!respuesta || typeof respuesta !== "object") {
        throw new Error("Respuesta is undefined or not an object")
    }
    if (!respuesta.carrier || !respuesta.service || !respuesta.shipmentId) {
        throw new Error("Missing required properties in respuesta");
    }
    const conversion = await fetch("/api/moneda")


    const moneda = await conversion.json();
    const precioUsd = respuesta.totalPrice / moneda.rates.MXN
    const body = {
        carrier: respuesta.carrier,
        service: respuesta.service,
        shipmentId: respuesta.shipmentId,
        trackingNumber: respuesta.trackingNumber,
        folio: respuesta.folio,
        trackUrl: respuesta.trackUrl,
        label: respuesta.label,
        totalPrice: precioUsd,
        idPaquete: idPaquete,
    }

    const response = await fetch("/api/guardar?action=guia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    return data;

}