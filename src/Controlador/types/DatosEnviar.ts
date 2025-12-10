  import type { U_bodega } from "./U_Bodega";
  
  export interface DatosEnviar {
    index: number;
    bodega: string;
    autoFill: boolean;
    type: string;
    onSubmit: (data: U_bodega) => void;

  };

    export interface DatosBodegas {
    index: number;
    bodega: string;
    type: string;

  };