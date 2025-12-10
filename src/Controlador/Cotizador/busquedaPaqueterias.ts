import { asignarBodega } from "./asignarBodega";
import { DatosCotizacion } from "@/Controlador/types/DatosPaquete";
import { generarDatosBase } from "./DatosBase";
import { U_bodega } from "@/Controlador/types/U_Bodega";
import { UbicacionBodega } from "@/Modelo/data/Bodegas";
import { datosType } from "@/Controlador/types/asignarBodega";
import { DatosBodegas } from "@/Controlador/types/DatosEnviar";
import { paqueteria } from "@/Modelo/data/Paqueterias";
import { useState } from "react";
import { Rate } from "@/Controlador/types/RespuestaApi";
import { paqueteriatype } from "@/Controlador/types/Paqueterias";


function obtenerUbicacionesHastaNull(direcciones: datosType) {
    const resultados = [];

    for (let i = 1; i <= 6; i++) {
        const key = `datos${i}` as keyof datosType;
        const item = direcciones[key] as DatosBodegas;
        const name = item?.bodega;

        // Si name es null o undefined paramos el ciclo
        if (name == null) break;

        // Buscamos la ubicación por nombre; si no existe guardamos null
        const ubicacion = UbicacionBodega.find(b => b.name === name) ?? null;
        resultados.push(ubicacion);
    }
    return resultados;
}

function ordenarPorPrecio(precios: Rate[]): Rate[] {
    return [...precios].sort((a, b) => a.totalPrice - b.totalPrice);
}

const handleCotizacionEnvia = async (Form: any): Promise<Rate[] | undefined> => {
    try {
        const peticiones = paqueteria.map(async (paq) => {

            const body = {
                origin: {
                    number: Form?.origin.number,
                    postalCode: Form?.origin.postalCode,
                    type: Form?.origin.type,
                    street: Form?.origin.street,
                    district: Form?.origin.district,
                    city: Form?.origin.city,
                    state: Form?.origin.state,
                    references: Form?.origin.references,
                    name: Form?.origin.name,
                    company: Form?.origin.company,
                    email: Form?.origin.email,
                    phone: Form?.origin.phone,
                    country: Form?.origin.country,
                    phone_code: Form?.origin.phone_code,
                    address_id: Form?.origin.address_id,
                    category: Form?.origin.category
                },

                destination: {
                    number: Form?.destination.number,
                    postalCode: Form?.destination.postalCode,
                    type: Form?.destination.type,
                    street: Form?.destination.street,
                    district: Form?.destination.district,
                    city: Form?.destination.city,
                    state: Form?.destination.state,
                    reference: Form?.destination.reference,
                    name: Form?.destination.name,
                    company: Form?.destination.company,
                    email: Form?.destination.email,
                    phone: Form?.destination.phone,
                    country: Form?.destination.country,
                    phone_code: Form?.destination.phone_code,
                    address_id: Form?.destination.address_id,
                    identificationNumber: Form?.destination.identificationNumber,
                    category: Form?.destination.category
                },

                packages: Form?.packages.map((pkg: any) => ({
                    type: pkg.type,
                    content: pkg.content,
                    amount: pkg.amount,
                    name: pkg.name,
                    declaredValue: pkg.declaredValue,
                    lengthUnit: pkg.lengthUnit,
                    weightUnit: pkg.weightUnit,
                    weight: pkg.weight,
                    dimensions: {
                        length: pkg.dimensions.length,
                        width: pkg.dimensions.width,
                        height: pkg.dimensions.height,
                    }
                })),

                settings: {
                    currency: Form?.settings.currency,
                },

                shipment: {
                    type: Form?.shipment.type,
                    carrier: paq?.code === Form?.destination.country ? paq.name : ""
                },
            };

            const response = await fetch("/api/precios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;

        });

        // Esperar todas las cotizaciones
        const resultados = await Promise.all(peticiones);
        const resultadosValidos = resultados
            .filter(r => r.meta === "rate" && Array.isArray(r.data))
            .flatMap(r => r.data);

        console.log("COTIZACIONES FILTRADAS:", resultadosValidos);
        const ordenado = ordenarPorPrecio(resultadosValidos);
        return ordenado;
    } catch (error) {
        console.error("Error enviando cotizaciones:", error);
        return;
    }

};

export async function buscarPaqueterias(datos: DatosCotizacion, origen: U_bodega, destino: U_bodega) {
    const direcciones = asignarBodega(datos.llevaPaquete, datos.bodega);
    const transladoEntreBodegas = obtenerUbicacionesHastaNull(direcciones)
    const paqueterias: paqueteriatype = {
        paq1: null,
        paq2: null,
        paq3: null,
    };
    const lastIndex = transladoEntreBodegas.length - 1;

    if (datos.llevaPaquete == "no") {
        transladoEntreBodegas[0] = origen;
    }
    transladoEntreBodegas[lastIndex] = destino;
    console.log("translado entre bodegas salida:", transladoEntreBodegas)
    try {
        // PRIMER TRAMO (ORIGEN DESTINO)
        if (transladoEntreBodegas[0] && transladoEntreBodegas[1]) {

            const guia1 = generarDatosBase(transladoEntreBodegas[0], transladoEntreBodegas[1], datos);
            if (guia1.ok) {
                try {
                    const paq = await handleCotizacionEnvia(guia1.body);
                    paqueterias.paq1 = paq ?? null;
                } catch (err) {
                    console.error("Error en handleCotizacionEnvia (paq1):", err);
                    paqueterias.paq1 = null;
                }
            }
        }
        // SEGUNDO TRAMO (ORIGEN DESTINO)
        if (transladoEntreBodegas[2] && transladoEntreBodegas[3]) {
            const guia2 = generarDatosBase(transladoEntreBodegas[2], transladoEntreBodegas[3], datos);
            if (guia2.ok) {
                try {
                    const paq = await handleCotizacionEnvia(guia2.body);
                    paqueterias.paq2 = paq ?? null;
                } catch (err) {
                    console.error("Error en handleCotizacionEnvia (paq2):", err);
                    paqueterias.paq2 = null;
                }
            }
        }
        // SEGUNDO TRAMO (ORIGEN DESTINO)
        if (transladoEntreBodegas[4] && transladoEntreBodegas[5]) {
            const guia3 = generarDatosBase(transladoEntreBodegas[4], transladoEntreBodegas[5], datos);
            if (guia3.ok) {
                try {
                    const paq = await handleCotizacionEnvia(guia3.body);
                    paqueterias.paq3 = paq ?? null;
                } catch (err) {
                    console.error("Error en handleCotizacionEnvia (paq3):", err);
                    paqueterias.paq3 = null;
                }
            }
        }

    } catch (err) {
        // si ocurre algo inesperado fuera de las llamadas puntuales, lo logueamos
        console.error("Error en buscarPaqueterias:", err);
    }
    return paqueterias;

}