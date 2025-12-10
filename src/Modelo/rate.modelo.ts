import { Rate } from "@/types/RespuestaApi";

export function ordenarPorPrecio(precios: Rate[]): Rate[] {
    return [...precios].sort((a, b) => a.totalPrice - b.totalPrice);
}
