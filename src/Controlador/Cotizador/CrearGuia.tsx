import { DatosCotizacion } from "../types/DatosPaquete";
import { U_bodega } from "@/Controlador/types/U_Bodega";
import { generarDatosBase, buildAddress } from "./DatosBase";

export async function crearGuia(datos: DatosCotizacion, origen: U_bodega, destino: U_bodega, paqueteria: string, servicio: string, idPaquete: number) {

    const body = generarGuiaBase(origen, destino, datos, paqueteria, servicio)

    console.log(body);
    const response = await fetch("/api/guia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await response.json();
    console.log("respuesta de envia", data)
    if (data.success) {
        const respuesta = guiaParaDB(data.data, idPaquete)
        return respuesta;
    } else {
        // MANDAR ERROR AL CREAR GUIA
    }
    // return data;
}

// GENERAR GUIA BASE PARA ENVIA.COM
const generarGuiaBase = (origen: U_bodega, destino: U_bodega, paquete: DatosCotizacion, paqueteria: string, servicio: string) => {
    const origin = buildAddress(origen, "origin")
    const destination = buildAddress(destino, "destination");
    const pesoNum = Number(paquete.peso);
    const largoNum = Number(paquete.l);
    const anchoNum = Number(paquete.a);
    const altoNum = Number(paquete.h);
    const cantidadNum = Number(paquete.cantidad);
    const valorNum = Number(paquete.valor);

    const paqueteBase = {
        content: paquete.contenido,
        amount: cantidadNum,
        type: paquete.tipoPaquete,
        dimensions: {
            length: largoNum,
            width: anchoNum,
            height: altoNum,
        },
        weight: pesoNum,
        insurance: 0,
        declaredValue: valorNum,
        lengthUnit: paquete.unidadMedida, // "in"
        weightUnit: paquete.unidadPeso,   // "lb" o "kg"
    };

    const body = {
        origin: {
            name: origin.name,
            company: origin.company,
            email: origin.email,
            phone: origin.phone,
            street: origin.street,
            number: origin.number,
            district: origin.district,
            city: origin.city,
            state: origin.state,
            country: origin.country,
            postalCode: origin.postalCode,
            reference: origin.reference

        },
        destination: {
            name: destination.name,
            company: destination.company,
            email: destination.email,
            phone: destination.phone,
            street: destination.street,
            number: destination.number,
            district: destination.district,
            city: destination.city,
            state: destination.state,
            country: destination.country,
            postalCode: destination.postalCode,
            reference: destination.reference
        },

        packages: [paqueteBase],

        settings: {
            printFormat: "PDF",
            printSize: "STOCK_4X6",
            comments: ""
        },

        shipment: {
            carrier: paqueteria,
            service: servicio,
            type: 1,
        },
    };

    return body;
}

async function guiaParaDB(respuesta: any, idPaquete: number) {
    const body = {
        carrier: respuesta.carrier,
        service: respuesta.service,
        shipmentId: respuesta.shipmentId,
        trackingNumber: respuesta.trackingNumber,
        folio: respuesta.folio,
        trackUrl: respuesta.trackUrl,
        label: respuesta.label,
        totalPrice: respuesta.totalPrice,
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