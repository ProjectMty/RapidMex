import { datosType } from "@/Controlador/types/asignarBodega";



export function 
asignarBodega(llevaPaquete: string, bodega: string) {
        const datosEnviar: datosType = {
                datos1: null,
                datos2: null,
                datos3: null,
                datos4: null,
                datos5: null,
                datos6: null,
        };
        switch (bodega) {
                case "st-catherins": {
                        if (llevaPaquete === "no") {

                                datosEnviar.datos1 = { index: 1, bodega: "", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "detroit", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "detroit", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos5 = { index: 3, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos6 = { index: 3, bodega: "", type: "Destino" }

                        } else if (llevaPaquete === "si") {

                                datosEnviar.datos1 = { index: 1, bodega: "st-catherins", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "detroit", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "detroit", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos5 = { index: 3, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos6 = { index: 3, bodega: "", type: "Destino" }
                        }
                        break;
                }
                case "detroit": {
                        if (llevaPaquete === "no") {
                                datosEnviar.datos1 = { index: 1, bodega: "", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        } else if (llevaPaquete === "si") {
                                datosEnviar.datos1 = { index: 1, bodega: "detroit", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        }
                        break;
                }
                case "houston": {
                        if (llevaPaquete === "no") {

                                datosEnviar.datos1 = { index: 1, bodega: "", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null

                        } else if (llevaPaquete === "si") {
                                datosEnviar.datos1 = { index: 1, bodega: "houston", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        }
                        break;
                }
                case "san-antonio": {
                        if (llevaPaquete === "no") {
                                datosEnviar.datos1 = { index: 1, bodega: "", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "san-antonio", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        } else if (llevaPaquete === "si") {
                                datosEnviar.datos1 = { index: 1, bodega: "monterrey", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "", type: "Destino" },
                                        datosEnviar.datos3 = null,
                                        datosEnviar.datos4 = null,
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        }
                        break;
                }
                case "monterrey": {
                        if (llevaPaquete === "no") {
                                datosEnviar.datos1 = { index: 1, bodega: "", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "monterrey", type: "Destino" },
                                        datosEnviar.datos3 = { index: 2, bodega: "san-antonio", type: "Origen" },
                                        datosEnviar.datos4 = { index: 2, bodega: "", type: "Destino" },
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null

                        } else if (llevaPaquete === "si") {

                                datosEnviar.datos1 = { index: 1, bodega: "san-antonio", type: "Origen" },
                                        datosEnviar.datos2 = { index: 1, bodega: "", type: "Destino" },
                                        datosEnviar.datos3 = null,
                                        datosEnviar.datos4 = null,
                                        datosEnviar.datos5 = null,
                                        datosEnviar.datos6 = null
                        }
                        break;
                }
        }
        return datosEnviar;
}

export async function getUbicacionBodega(bodega: string) {
        const res = await fetch(
            `/api/obtener?action=direccion&bodega=${encodeURIComponent(bodega)}`
        );

        const data = await res.json();
        return data;
}