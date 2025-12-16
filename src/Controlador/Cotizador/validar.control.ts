import { countries } from "@/Modelo/data/Paises"; 

export type Dir_Respuesta = {
    pais: string;
    estado1: string;
    municipio: string;
    colonias: string[];
};


export const validarCP = async (origen: string, cp: string): Promise<Dir_Respuesta> => {
    const direccion: Dir_Respuesta = {
        pais: "",
        estado1: "",
        municipio: "",
        colonias: [],
    }
    if (!cp || !origen ) {
        console.warn("validarCP: 'origen' and 'cp' are required");
        return direccion;
    }
    try {
        const url = `https://geocodes.envia.com/zipcode/${encodeURIComponent(origen)}/${encodeURIComponent(cp)}`;
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const first = data[0];
            direccion.pais = origen;
            direccion.estado1 = first.state.code["2digit"]
            direccion.municipio = first.regions.region_2
            direccion.colonias = first.suburbs;

        } else {
            console.error("No se encontro codigo postal");
        }

    } catch (error) {
        console.error("Error validando el codigo postal:", error);

    }
    return direccion;
}; 

export function getCountryIndexByCode(code: string): number {
  return countries.findIndex(country => country.code === code);
}

