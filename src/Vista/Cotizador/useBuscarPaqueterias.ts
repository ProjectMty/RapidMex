import { useEffect, useState } from "react";
import type { paqueteriatype } from "@/types/Paqueterias";
import { buscarPaqueterias } from "@/Controlador/Cotizador/busquedaPaqueterias";
import { Rate } from "@/types/RespuestaApi";
import { DatosCotizacion } from "@/types/DatosPaquete";

export function useBuscarPaqueterias(datos: DatosCotizacion) {
  const [lista, setLista] = useState<paqueteriatype | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    buscarPaqueterias(datos)
      .then((res) => {
        if (mounted) setLista(res);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { lista, loading, error };
}