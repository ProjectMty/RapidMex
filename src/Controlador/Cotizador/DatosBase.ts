import { U_bodega } from "@/Controlador/types/U_Bodega";
import { DatosCotizacion } from "@/Controlador/types/DatosPaquete";
import { Guia } from "@/Controlador/types/Guia";

export type BuscarResultSuccess = { ok: true; body: Guia };
export type BuscarResultError = { ok: false; error: string };
export type BuscarResult = BuscarResultSuccess | BuscarResultError;


//   creacion de datos repetitivos
const buildAddress = (datos: any, type: "origin" | "destination") => {
    if (!datos) return null;

    const base: any = {
        postalCode: datos.codigoP,
        type,
        street: datos.calle,
        number: datos.numCalle,
        district: datos.colonia,
        city: datos.municipio,
        state: datos.estado1,
        name: "Cargo Monterrey",
        company: "RapidMex",
        email: "info@rapidmex.com",
        phone: "8129333220",
        country: datos.pais,
        phone_code: "52",
        category: 1,
    };

    // Solo agregamos campos si existen
    if (datos.numero) base.number = datos.numCalle;
    if (datos.referencia) base.reference = datos.referencia;
    if (datos.address_id) base.address_id = datos.address_id;
    if (datos.identificationNumber) base.identificationNumber = datos.identificationNumber;

    return base;
};


export function generarDatosBase(origen: U_bodega, destino: U_bodega, paquete: DatosCotizacion) {

    if (!origen || !destino) {
        return { ok: false, error: "Faltan los datos de origen y/o destino" };
    }
    if (!paquete) {
        return { ok: false, error: "Faltan los datos del paquete." };
    }

    const requiredFields = ["tipoPaquete", "contenido", "cantidad", "valor", "peso", "l", "a", "h"] as const;
    for (const f of requiredFields) {
        if (paquete[f] === undefined || paquete[f] === null || paquete[f] === "") {
            return { ok: false, error: "Completa tipo de paquete, contenido, cantidad, valor, peso y medidas." };
        }
    }

    const pesoNum = Number(paquete.peso);
    const largoNum = Number(paquete.l);
    const anchoNum = Number(paquete.a);
    const altoNum = Number(paquete.h);
    const cantidadNum = Number(paquete.cantidad);
    const valorNum = Number(paquete.valor);

    const invalidNumber = (n: number) => Number.isNaN(n) || !Number.isFinite(n);
    if (invalidNumber(pesoNum) || invalidNumber(largoNum) || invalidNumber(anchoNum) || invalidNumber(altoNum)) {
        return { ok: false, error: "Peso y medidas deben ser números válidos." };
    }

    if (pesoNum <= 0 || largoNum <= 0 || anchoNum <= 0 || altoNum <= 0) {
        return { ok: false, error: "Peso y medidas deben ser mayores a 0." };
    }

    if (invalidNumber(cantidadNum) || cantidadNum <= 0 || !Number.isInteger(cantidadNum)) {
        return { ok: false, error: "Cantidad debe ser un entero mayor a 0." };
    }

    if (invalidNumber(valorNum) || valorNum < 0) {
        return { ok: false, error: "Valor declarado inválido." };
    }

    const paqueteBase = {
        type: paquete.tipoPaquete,
        content: paquete.contenido,
        amount: cantidadNum,
        name: paquete.contenido,
        declaredValue: paquete.valor,
        lengthUnit: paquete.unidadMedida, // "in"
        weightUnit: paquete.unidadPeso,   // "lb" o "kg"
        weight: pesoNum,
        dimensions: {
            length: largoNum,
            width: anchoNum,
            height: altoNum,
        },
    };

    const origin = buildAddress(origen, "origin");
    const destination = buildAddress(destino, "destination");

  if (!origin || !destination) {
    return { ok: false, error: "No se pudieron construir las direcciones del primer tramo." };
  }

    const body = {
        origin,
        destination,
        packages: [paqueteBase],
        settings: {
            currency: paquete.monedaValor,
        },
        shipment: {
            type: 1,
            reverse_pickup: 0,
            import: 0,
            carrier: "",
        },
    };


     return { ok: true, body };

}

