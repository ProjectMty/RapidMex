// src/utils/precios.ts
import type { RespuestaAPI, Rate } from "@/types/RespuestaApi";


let precios: Rate[] = [];

export function guardarPreciosAPI(data: Rate[]) {
  precios = data;
}


export function obtenerPreciosAPI(): Rate[] {
  return precios;
}

export function obtenerMejorPrecio(): Rate | null {
  if (precios.length === 0) return null;

  return precios.reduce((a, b) =>
    a.totalPrice < b.totalPrice ? a : b
  );
}

export function ordenarPorPrecio(precios: Rate[]): Rate[] {
  return [...precios].sort((a, b) => a.totalPrice - b.totalPrice);
}

