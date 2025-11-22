  interface Direccion {
    additional_info?: {
      street?: string | null;
    };
    coordinates?: {
      latitude?: string;
      longitude?: string;
    };
    country?: {
      name?: string;
      code?: string;
    };
    info?: {
      stat?: string;
      stat_8digit?: string;
      time_zone?: string;
      utc?: string;
    };
    locality?: string;
    regions?: {
      region_1?: string;
      region_2?: string;
      region_3?: string;
      region_4?: string;
    };
    state?: {
      name?: string;
      iso_code?: string;
    };
    suburbs?: string[];
    zip_code?: string;
  }
  
export interface DetallesCotizacion {
  llevaPaquete: string;
  bodega: string;
  l: string;
  a: string;
  h: string;
  unidadMedida: string;
  peso: number; // ✅ debe ser número, no string
  unidadPeso: string;
  costoe1Final: number;
  costoe2Final: number;
  costoe3Final: number;
  resultado: number;
  moneda: string;
  origen1: Direccion | null;
  destino1: Direccion | null;
  origen2: Direccion| null;
  destino2: Direccion | null;
  origen3: Direccion | null;
  destino3: Direccion | null;

}
