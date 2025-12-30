import { costoEnvia } from "@/Controlador/types/CalcularCosto";
import { DatosCotizacion } from "@/Controlador/types/DatosPaquete";
//**************** Tipos de cambio **************** //
const mxnToUsd = 18;
const cadToUsd = 0.74;


export const calcularCostos = (body: DatosCotizacion) => {
    console.log("calcular costo (backend)", body)
    const L = Number(body.l) || 0;
    const A = Number(body.a) || 0;
    const H = Number(body.h) || 0;
    const pesoNum = Number(body.peso) || 0;

    if (!L || !A || !H || !pesoNum) {
        alert("Por favor ingresa Largo, Ancho, Alto y Peso.");
        return;
    }

    // medidas en pulgadas
    const L_in = body.unidadMedida === "cm" ? L / 2.54 : L;
    const A_in = body.unidadMedida === "cm" ? A / 2.54 : A;
    const H_in = body.unidadMedida === "cm" ? H / 2.54 : H;

    // peso volumétrico
    const paso1 = Math.ceil((L_in * A_in * H_in) / 139);
    const pesoReal = body.unidadPeso === "kg" ? pesoNum * 2.20462 : pesoNum;
    const pesoComparado = Math.max(pesoReal, paso1);

    // fórmula principal
    const COSTOVLB = Math.ceil(((pesoComparado * 0.8) / (1 - 0.5)) + 5);

    // volumen en m³
    const L_cm = body.unidadMedida === "cm" ? L : L * 2.54;
    const A_cm = body.unidadMedida === "cm" ? A : A * 2.54;
    const H_cm = body.unidadMedida === "cm" ? H : H * 2.54;
    const volumenM3 = (L_cm * A_cm * H_cm) / 1_000_000;
    const COSTOM3 = volumenM3 * 15;
    const COSTOM31_CAD = (volumenM3 * 133) / (1 - 0.4);
    const COSTOM31 = COSTOM31_CAD * cadToUsd;


    let totalUSD = 0;

    // selección por bodega
    switch (body.bodega) {
        case "san-antonio":
            totalUSD =
                body.llevaPaquete === "si"
                    ? COSTOVLB + COSTOM3 + body.COSTOE1
                    : body.COSTOE1 + body.COSTOE2 + COSTOVLB + COSTOM3;
            break;

        case "monterrey":
            totalUSD =
                body.llevaPaquete === "si"
                    ? COSTOVLB + COSTOM3 + body.COSTOE1
                    : body.COSTOE1 + body.COSTOE2 + COSTOVLB + COSTOM3;
            break;
        case "houston":
            totalUSD = body.COSTOE1 + COSTOVLB + COSTOM3 + body.COSTOE2;
            break;

        case "detroit":
            totalUSD = body.COSTOE1 + COSTOVLB + COSTOM3 + body.COSTOE2;
            break;

        case "st-catherins":
            totalUSD =
                body.llevaPaquete === "si"
                    ? COSTOVLB + COSTOM3 + COSTOM31 + body.COSTOE1 + body.COSTOE2
                    : body.COSTOE1 + COSTOVLB + COSTOM3 + COSTOM31 + body.COSTOE2 + body.COSTOE3;
            break;

        default:
            alert("Selecciona una bodega.");
            return;
    }

    return (Math.ceil(totalUSD));
};



export const getResultadoConvertido = (costo: number, moneda: string) => {
    if (costo === null) return null;
    if (moneda === "USD") return costo;
    if (moneda === "MXN") return Math.ceil(costo * mxnToUsd);
    if (moneda === "CAD") return Math.ceil(costo / cadToUsd);
    return costo;
};


const convertirUSD = (valor: number, monedaOrigen: string): number => {
    if (!valor) return 0;
    switch (monedaOrigen) {
        case "USD":
            return valor;
        case "MXN":
            return valor / mxnToUsd;
        case "CAD":
            return valor * cadToUsd;
        default:
            return valor;
    }
};

export const getCostoEnvia = (precio: number, moneda: string) => {
    if (precio == 0 || moneda == "") {
        return 0;
    } else {
        const costoEnvia = convertirUSD(precio, moneda) / (1 - 0.1)
        return Math.ceil(costoEnvia);
    }


}

