import type { U_bodega } from "@/types/U_Bodega";
  
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
  origen1: U_bodega | null;
  destino1: U_bodega | null;
  origen2: U_bodega| null;
  destino2: U_bodega | null;
  origen3: U_bodega | null;
  destino3: U_bodega | null;

}
