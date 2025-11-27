

import type { U_bodega } from "@/types/U_Bodega";
import type { Direccion } from "@/types/Direccion";

export function mapDireccionToBodega(d: Direccion): U_bodega {
    return {
        name: d.locality ?? "",
        pais: d.country?.name ?? "",
        estado1: d.state?.name ?? "",
        municipio: d.regions?.region_2 ?? "",
        colonia: "",
        calle: d.additional_info?.street ?? "",
        numCalle: "",  // La API no lo envía
        codigoP: d.zip_code ?? "",
        referencia: "",
    };
}
