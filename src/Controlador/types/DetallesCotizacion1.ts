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
}
