import { DetallesCotizacion } from "./DetallesCotizacion2";
export interface DatosCotizacion {
  llevaPaquete: string;
  bodega: string;
  l: string;
  a: string;
  h: string;
  peso: string;
  unidadPeso: string;
  unidadMedida: string;
  tipoPaquete: string;
  contenido: string;
  cantidad: number;
  valor: number;
  monedaValor: string;

  // Resultado
  moneda: string;
  resultadoUSD: number | null;
  detalles: DetallesCotizacion | null;

  // Costos
  costoEnvia: any[];
  COSTOE1: number;
  COSTOE2: number;
  COSTOE3: number;
  monedaCostoe1: string;
  monedaCostoe2: string;
  monedaCostoe3: string;
}