"use client";

import React, { useEffect, useState } from "react";
import PDFButton from "./PDFButton";
import { DetallesCotizacion } from "@/types/DetallesCotizacion2";
import Direccion from "./Dirreccion";
import type { U_bodega } from "@/types/U_Bodega";
import type { typePaqueteria } from "@/types/Paqueterias";
import Paqueteria from "./Paqueterias";

import Tabla from "./Tabla";
import { Envio } from "@/types/Envio";
export default function Cotizador() {

  // 📌 Lugares de envio
  type DatosEnviar = {
    index: number;
    bodega: string;
    autoFill: boolean;
    type: string;
    onSubmit: (data: U_bodega) => void;

  };

  const [datosRecibidos1, setDatosRecibidos1] = useState<U_bodega | null>(null);
  const [datosRecibidos2, setDatosRecibidos2] = useState<U_bodega | null>(null);
  const [datosRecibidos3, setDatosRecibidos3] = useState<U_bodega | null>(null);
  const [datosRecibidos4, setDatosRecibidos4] = useState<U_bodega | null>(null);
  const [datosRecibidos5, setDatosRecibidos5] = useState<U_bodega | null>(null);
  const [datosRecibidos6, setDatosRecibidos6] = useState<U_bodega | null>(null);

  const [datosEnviados1, setDatosEnviados1] = useState<DatosEnviar | null>(null);
  const [datosEnviados2, setDatosEnviados2] = useState<DatosEnviar | null>(null);
  const [datosEnviados3, setDatosEnviados3] = useState<DatosEnviar | null>(null);
  const [datosEnviados4, setDatosEnviados4] = useState<DatosEnviar | null>(null);
  const [datosEnviados5, setDatosEnviados5] = useState<DatosEnviar | null>(null);
  const [datosEnviados6, setDatosEnviados6] = useState<DatosEnviar | null>(null);

  // 📌 Estados principales
  const [llevaPaquete, setLlevaPaquete] = useState("");
  const [bodega, setBodega] = useState("");
  const [l, setL] = useState("");
  const [a, setA] = useState("");
  const [h, setH] = useState("");
  const [peso, setPeso] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("lb");
  const [unidadMedida] = useState("in"); // fijo a pulgadas
  const [tipoPaquete, setTipoPaquete] = useState("");
  const [contenido, setcontenido] = useState("");
  const [cantidad, setcantidad] = useState<number>(0);
  const [valor, setValor] = useState<number>(0);
  const [monedaValor, setmonedaValor] = useState("USD");

  // 📌 Costos extra
  const [costoe1, setCostoe1] = useState("");
  const [monedaCostoe1, setMonedaCostoe1] = useState("USD");
  const [costoe2, setCostoe2] = useState("");
  const [monedaCostoe2, setMonedaCostoe2] = useState("USD");
  const [costoe3, setCostoe3] = useState("");
  const [monedaCostoe3, setMonedaCostoe3] = useState("USD");

  // 📌 Resultado
  const [moneda, setMoneda] = useState("USD");
  const [resultadoUSD, setResultadoUSD] = useState<number | null>(null);
  const [detalles, setDetalles] = useState<DetallesCotizacion | null>(null);


  const [listaPaqueterias, setListaPaqueterias] = useState<typePaqueteria[]>([])
  const paqueteria =  [
    {code:"MX",  name: "dhl"},
    {code:"MX",  name: "estafeta"},
    {code:"MX",  name: "fedex"},
    {code:"MX",  name:"paquetexpress"},
    {code:"MX", name: "castores"},
    {code:"US", name: "ups"},
    {code:"US", name: "dhl"},
    {code:"US", name: "usps"},
    {code:"US", name: "fedex"},
    {code:"US", name: "ups2"},
    {code:"CA", name: "canadaPost"},
    {code:"CA", name: "canpar"},
    {code:"CA", name: "dhl"},
    {code:"CA", name: "purolator"},
  ]
  // 📌 Tipos de cambio
  const mxnToUsd = 18;
  const cadToUsd = 0.74;

  // 📌 Cotizaciones
  // const [cotizaciones, setCotizaciones] = useState<any[]>([]);
  const [cotizacionPaqueteria, setCotizacionPaqueteria] = useState<Envio | null>(null)
  const [cotizacionPaqueteria2, setCotizacionPaqueteria2] = useState<Envio | null>(null)
  const [cotizacionPaqueteria3, setCotizacionPaqueteria3] = useState<Envio | null>(null)

  const convertirUSD = (valor: number, monedaOrigen: string): number => {
    if (!valor) return 0;
    switch (monedaOrigen) {
      case "USD":
        return valor;
      case "MXN":
        return valor / mxnToUsd;
      case "CAD":
        return valor * cadToUsd;
      default:
        return valor;
    }
  };

  // 📌 Cálculo principal
  const calcularCostos = () => {
    const L = Number(l) || 0;
    const A = Number(a) || 0;
    const H = Number(h) || 0;
    const pesoNum = Number(peso) || 0;

    if (!L || !A || !H || !pesoNum) {
      alert("Por favor ingresa Largo, Ancho, Alto y Peso.");
      return;
    }

    // medidas en pulgadas
    const L_in = unidadMedida === "cm" ? L / 2.54 : L;
    const A_in = unidadMedida === "cm" ? A / 2.54 : A;
    const H_in = unidadMedida === "cm" ? H / 2.54 : H;

    // peso volumétrico
    const paso1 = Math.ceil((L_in * A_in * H_in) / 139);
    const pesoReal = unidadPeso === "kg" ? pesoNum * 2.20462 : pesoNum;
    const pesoComparado = Math.max(pesoReal, paso1);

    // fórmula principal
    const COSTOVLB = Math.ceil(((pesoComparado * 0.8) / (1 - 0.5)) + 5);

    // volumen en m³
    const L_cm = unidadMedida === "cm" ? L : L * 2.54;
    const A_cm = unidadMedida === "cm" ? A : A * 2.54;
    const H_cm = unidadMedida === "cm" ? H : H * 2.54;
    const volumenM3 = (L_cm * A_cm * H_cm) / 1_000_000;
    const COSTOM3 = volumenM3 * 15;
    const COSTOM31_CAD = (volumenM3 * 133) / (1 - 0.4);
    const COSTOM31 = COSTOM31_CAD * cadToUsd;

    // costos extra (+10%)
    const COSTOE1final = convertirUSD(Number(costoe1) || 0, monedaCostoe1) / (1 - 0.1);
    const COSTOE2final = convertirUSD(Number(costoe2) || 0, monedaCostoe2) / (1 - 0.1);
    const COSTOE3final = convertirUSD(Number(costoe3) || 0, monedaCostoe3) / (1 - 0.1);

    let totalUSD = 0;

    // selección por bodega
    switch (bodega) {
      case "san-antonio":
        totalUSD =
          llevaPaquete === "si"
            ? COSTOVLB + COSTOM3 + COSTOE2final
            : COSTOE1final + COSTOE2final + COSTOVLB + COSTOM3;
        break;

      case "houston":
      case "buffalo":
        totalUSD = COSTOE1final + COSTOVLB + COSTOM3 + COSTOE2final;
        break;

      case "st-catherins":
        totalUSD =
          llevaPaquete === "si"
            ? COSTOVLB + COSTOM3 + COSTOM31 + COSTOE2final + COSTOE3final
            : COSTOE1final + COSTOVLB + COSTOM3 + COSTOM31 + COSTOE2final + COSTOE3final;
        break;

      default:
        alert("Selecciona una bodega.");
        return;
    }

    setResultadoUSD(Math.ceil(totalUSD));

    // ✅ Convertimos peso a número para cumplir con el tipo

    setDetalles({
      llevaPaquete,
      bodega,
      l,
      a,
      h,
      unidadMedida,
      peso: Number(peso),
      unidadPeso,
      costoe1Final: COSTOE1final,
      costoe2Final: COSTOE2final,
      costoe3Final: COSTOE3final,
      resultado: Math.ceil(totalUSD),
      moneda,
      origen1: datosRecibidos1,
      destino1: datosRecibidos2,
      origen2: datosRecibidos3,
      destino2: datosRecibidos4,
      origen3: datosRecibidos5,
      destino3: datosRecibidos6
    });
  };

  // 📌 Conversión de moneda y formato
  const getResultadoConvertido = () => {
    if (resultadoUSD === null) return null;
    if (moneda === "USD") return resultadoUSD;
    if (moneda === "MXN") return Math.ceil(resultadoUSD * mxnToUsd);
    if (moneda === "CAD") return Math.ceil(resultadoUSD / cadToUsd);
    return resultadoUSD;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: moneda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const resultadoConvertido = getResultadoConvertido();

  const handleFormSubmit1 = (data: U_bodega) => {
    setDatosRecibidos1(data);
  };

  const handleFormSubmit2 = (data: U_bodega) => {
    // console.log("Datos recibidos 2:", data);
    setDatosRecibidos2(data);
  };

  const handleFormSubmit3 = (data: U_bodega) => {
    // console.log("Datos recibidos 3:", data);
    setDatosRecibidos3(data);
  };

  const handleFormSubmit4 = (data: U_bodega) => {
    // console.log("Datos recibidos 4:", data);
    setDatosRecibidos4(data);
  };

  const handleFormSubmit5 = (data: U_bodega) => {
    // console.log("Datos recibidos 5:", data);
    setDatosRecibidos5(data);
  };

  const handleFormSubmit6 = (data: U_bodega) => {
    // console.log("Datos recibidos 6:", data);
    setDatosRecibidos6(data);
  };

  useEffect(() => {

    if (llevaPaquete === "no" && bodega === "st-catherins") {
      // CASA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "",
        autoFill: false,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });
      // BODEGA A LLEVAR
      setDatosEnviados2({
        index: 1,
        bodega: "buffalo",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A RECOGER
      setDatosEnviados3({
        index: 2,
        bodega: "buffalo",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit3
      });

      // BODEGA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "san-antonio",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit4
      });

      // BODEGA A RECOGER
      setDatosEnviados5({
        index: 3,
        bodega: "monterrey",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit5
      });

      // CASA A DEJAR
      setDatosEnviados6({
        index: 3,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit6
      });
    }

    if ((llevaPaquete === "no" && bodega === "buffalo") ||
      (llevaPaquete === "no" && bodega === "houston")) {
      // CASA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "",
        autoFill: false,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });
      // BODEGA A LLEVAR
      setDatosEnviados2({
        index: 1,
        bodega: "san-antonio",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A RECOGER
      setDatosEnviados3({
        index: 2,
        bodega: "monterrey",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit5
      });

      // CASA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit6
      });

      // SIN USO
      setDatosEnviados5(null);
      setDatosEnviados6(null);
    }
    if (llevaPaquete === "no" && bodega === "san-antonio") {
      // CASA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "",
        autoFill: false,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });

      // BODEGA A DEJAR
      setDatosEnviados2({
        index: 1,
        bodega: "san-antonio",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A RECOGER
      setDatosEnviados3({
        index: 2,
        bodega: "monterrey",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit3
      });

      // CASA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit4
      });

      // SIN USO
      setDatosEnviados5(null);
      setDatosEnviados6(null);
    }
    if (llevaPaquete === "no" && bodega === "monterrey") {
      // CASA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "",
        autoFill: false,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });

      // BODEGA A DEJAR
      setDatosEnviados2({
        index: 1,
        bodega: "monterrey",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A DEJAR
      setDatosEnviados3({
        index: 2,
        bodega: "san-antonio",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit3
      });

      // CASA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit4
      });
      // SIN USO
      setDatosEnviados5(null);
      setDatosEnviados6(null);
    }

    if (llevaPaquete === "si" && bodega === "st-catherins") {
      // BODEGA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "st-catherins",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });
      // BODEGA A LLEVAR
      setDatosEnviados2({
        index: 1,
        bodega: "buffalo",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A RECOGER
      setDatosEnviados3({
        index: 2,
        bodega: "buffalo",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit3
      });

      // BODEGA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "san-antonio",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit4
      });

      // BODEGA A RECOGER
      setDatosEnviados5({
        index: 3,
        bodega: "monterrey",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit5
      });

      // CASA A DEJAR
      setDatosEnviados6({
        index: 3,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit6
      });
    }

    if ((llevaPaquete === "si" && bodega === "buffalo") ||
      (llevaPaquete === "si" && bodega === "houston")) {
      // BODEGA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: bodega,
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });
      // BODEGA A LLEVAR
      setDatosEnviados2({
        index: 1,
        bodega: "san-antonio",
        autoFill: true,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // BODEGA A RECOGER
      setDatosEnviados3({
        index: 2,
        bodega: "monterrey",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit3
      });

      // CASA A DEJAR
      setDatosEnviados4({
        index: 2,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit4
      });
      // SIN USO
      setDatosEnviados5(null);
      setDatosEnviados6(null);
    }

    if (llevaPaquete === "si" && bodega === "san-antonio") {
      // CASA A RECOGER
      setDatosEnviados1({
        index: 2,
        bodega: "san-antonio",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });



      // CASA A DEJAR
      setDatosEnviados2({
        index: 2,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });

      // SIN USO
      setDatosEnviados3(null);
      setDatosEnviados4(null);
      setDatosEnviados5(null);
      setDatosEnviados6(null);
    }
    if (llevaPaquete === "si" && bodega === "monterrey") {

      // BODEGA A RECOGER
      setDatosEnviados1({
        index: 1,
        bodega: "san-antonio",
        autoFill: true,
        type: "Origen",
        onSubmit: handleFormSubmit1
      });

      // BODEGA A DEJAR
      setDatosEnviados2({
        index: 1,
        bodega: "",
        autoFill: false,
        type: "Destino",
        onSubmit: handleFormSubmit2
      });


      // SIN USO
      setDatosEnviados3(null);
      setDatosEnviados4(null);
      setDatosEnviados5(null);
      setDatosEnviados6(null);

    }


  }, [llevaPaquete, bodega])

  // 📌 Paqueterias
  const [paqueteriaSeleccionada, setPaqueteriaSeleccionada] = useState("")

  const handlePaqueteriaSeleccionada = (valor: string) => {
    setPaqueteriaSeleccionada(valor);
  }

  // const handleCotizacionEnvia = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const body = {
  //     origin: {
  //       number: "",
  //       postalCode: datosRecibidos1?.codigoP,
  //       type: "origin",
  //       street: datosRecibidos1?.calle,
  //       district: datosRecibidos1?.colonia,
  //       city: datosRecibidos1?.municipio,
  //       state: datosRecibidos1?.estado1,
  //       references: datosRecibidos1?.referencia,
  //       name: "CargoMty",
  //       company: "RapidMex",
  //       email: "info@rapidmex.com",
  //       phone: "8129333220",
  //       country: datosRecibidos1?.pais,
  //       phone_code: "52",
  //       address_id: 0,
  //       category: 1

  //     },

  //     destination: {
  //       number: "",
  //       postalCode: datosRecibidos2?.codigoP,
  //       type: "destination",
  //       street: datosRecibidos2?.calle,
  //       district: datosRecibidos2?.colonia,
  //       city: datosRecibidos2?.municipio,
  //       state: datosRecibidos2?.estado1,
  //       reference: datosRecibidos2?.referencia,
  //       name: "CargoMty",
  //       company: "RapidMex",
  //       email: "info@rapidmex.com",
  //       phone: "8129333220",
  //       country: datosRecibidos2?.pais,
  //       phone_code: "52",
  //       address_id: 0,
  //       identificationNumber: "",
  //       category: 1,
  //     },

  //     packages: [
  //       {
  //         type: tipoPaquete,
  //         content: contenido,
  //         amount: cantidad,
  //         name: contenido,
  //         declaredValue: valor,
  //         lengthUnit: unidadMedida,
  //         weightUnit: unidadPeso,
  //         weight: Number(peso),
  //         dimensions: {
  //           length: Number(l),
  //           width: Number(a),
  //           height: Number(h),
  //         },

  //       }
  //     ],
  //     settings: {
  //       currency: monedaValor
  //     },
  //     shipment: {
  //       type: 1,
  //       carrier: paqueteriaSeleccionada
  //     },
  //   };

  //   console.log(body)
  //   const response = await fetch("/api/precios", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   const data = await response.json()

  //   // const ordenado = ordenarPorPrecio(data.data);

  //   if (response.ok) {
  //     console.log("respuesta api", data)
  //     setCotizaciones(data.data ?? data);
  //     // setListaOrdenada(ordenado);
  //   } else {
  //     console.log("Respuesta NOT OK")
  //   }
  // }

  const handleCotizacionEnviaTodas = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body1 = {
      origin: {
        number: "",
        postalCode: datosRecibidos1?.codigoP ?? "",
        type: "origin",
        street: datosRecibidos1?.calle ?? "",
        district: datosRecibidos1?.colonia ?? "",
        city: datosRecibidos1?.municipio ?? "",
        state: datosRecibidos1?.estado1 ?? "",
        references: datosRecibidos1?.referencia ?? "",
        name: "CargoMty",
        company: "RapidMex",
        email: "info@rapidmex.com",
        phone: "8129333220",
        country: datosRecibidos1?.pais ?? "",
        phone_code: "52",
        address_id: 0,
        category: 1
      },

      destination: {
        number: "",
        postalCode: datosRecibidos2?.codigoP ?? "",
        type: "destination",
        street: datosRecibidos2?.calle ?? "",
        district: datosRecibidos2?.colonia ?? "",
        city: datosRecibidos2?.municipio ?? "",
        state: datosRecibidos2?.estado1 ?? "",
        reference: datosRecibidos2?.referencia ?? "",
        name: "CargoMty",
        company: "RapidMex",
        email: "info@rapidmex.com",
        phone: "8129333220",
        country: datosRecibidos2?.pais ?? "",
        phone_code: "52",
        address_id: 0,
        identificationNumber: "",
        category: 1,
      },

      packages: [
        {
          type: tipoPaquete ?? "",
          content: contenido ?? "",
          amount: cantidad || 0,
          name: contenido ?? "",
          declaredValue: valor || 0,
          lengthUnit: unidadMedida ?? "",
          weightUnit: unidadPeso ?? "",
          weight: Number(peso) || 0,
          dimensions: {
            length: Number(l) || 0,
            width: Number(a) || 0,
            height: Number(h) || 0,
          }
        }],

      settings: {
        currency: monedaValor
      },

      shipment: {
        type: 1,
        carrier: ""
      },
    };
    const body2 = {
      origin: {
        number: "",
        postalCode: datosRecibidos3?.codigoP ?? "",
        type: "origin",
        street: datosRecibidos3?.calle ?? "",
        district: datosRecibidos3?.colonia ?? "",
        city: datosRecibidos3?.municipio ?? "",
        state: datosRecibidos3?.estado1 ?? "",
        references: datosRecibidos3?.referencia ?? "",
        name: "CargoMty",
        company: "RapidMex",
        email: "info@rapidmex.com",
        phone: "8129333220",
        country: datosRecibidos3?.pais ?? "",
        phone_code: "52",
        address_id: 0,
        category: 1
      },

      destination: {
        number: "",
        postalCode: datosRecibidos4?.codigoP ?? "",
        type: "destination",
        street: datosRecibidos4?.calle ?? "",
        district: datosRecibidos4?.colonia ?? "",
        city: datosRecibidos4?.municipio ?? "",
        state: datosRecibidos4?.estado1 ?? "",
        reference: datosRecibidos4?.referencia ?? "",
        name: "CargoMty",
        company: "RapidMex",
        email: "info@rapidmex.com",
        phone: "8129333220",
        country: datosRecibidos4?.pais ?? "",
        phone_code: "52",
        address_id: 0,
        identificationNumber: "",
        category: 1,
      },

      packages: [
        {
          type: tipoPaquete ?? "",
          content: contenido ?? "",
          amount: cantidad || 0,
          name: contenido ?? "",
          declaredValue: valor || 0,
          lengthUnit: unidadMedida ?? "",
          weightUnit: unidadPeso ?? "",
          weight: Number(peso) || 0,
          dimensions: {
            length: Number(l) || 0,
            width: Number(a) || 0,
            height: Number(h) || 0,
          }
        }],

      settings: {
        currency: monedaValor
      },

      shipment: {
        type: 1,
        carrier: ""
      },
    };

    try {
      setCotizacionPaqueteria(body1);
      setCotizacionPaqueteria2(body2);
    } catch (error) {
      console.error("Error al asignar datos:", error);
    }

  };


  const AsignarPaqueteriasLista = (paqs: typePaqueteria[]) => {
    setListaPaqueterias(paqs);
  }

  // 📌 Renderizado
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Cotizador Interno RapidMex
        </h1>

        {/* Campos principales */}
        <div className="mb-4">
          <label className="font-semibold block mb-2">
            ¿El cliente lleva su paquete a la bodega?
          </label>
          <select
            value={llevaPaquete}
            onChange={(e) => setLlevaPaquete(e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Seleccionar</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="font-semibold block mb-2">Seleccionar bodega</label>
            <select
              value={bodega}
              onChange={(e) => setBodega(e.target.value)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Seleccionar</option>
              <option value="monterrey">Monterrey</option>
              <option value="san-antonio">San Antonio</option>
              <option value="houston">Houston</option>
              <option value="buffalo">Buffalo</option>
              <option value="st-catherins">St. Catherins (Canadá)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="font-semibold block mb-2">Seleccionar Contenedor</label>
            <select
              value={tipoPaquete}
              onChange={(e) => setTipoPaquete(e.target.value)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Seleccionar</option>
              <option value="box">Caja</option>
              <option value="envelope">Sobre</option>
              <option value="pallet">Pallet</option>

            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-medium block">Contenido</label>
            <input type="text" placeholder="Contenido" value={contenido} onChange={(e) => setcontenido(e.target.value)} className="border rounded-lg p-2 w-full" />

          </div>
          <div>
            <label className="font-medium block">Cantidad</label>
            <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setcantidad(Number(e.target.value))} className="border rounded-lg p-2 w-full" />

          </div>

        </div>
        {/* Medidas */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input type="number" placeholder="Largo" value={l} onChange={(e) => setL(e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Ancho" value={a} onChange={(e) => setA(e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Alto" value={h} onChange={(e) => setH(e.target.value)} className="border rounded-lg p-2 w-full" />
        </div>

        {/* Peso */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label className="font-medium block -mb-3 col-span-2">Peso</label>
          <input type="number" placeholder="Peso real" value={peso} onChange={(e) => setPeso(e.target.value)} className="border rounded-lg p-2 w-full" />
          <select value={unidadPeso} onChange={(e) => setUnidadPeso(e.target.value)} className="border rounded-lg p-2 w-full">
            <option value="lb">Libras (lb)</option>
            <option value="kg">Kilogramos (kg)</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-3 ">
            <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Valor</label>
            <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
          </div>

          <div className="flex gap-2 items-center">
            <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(Number(e.target.value))} className="border rounded-lg p-2 w-full" />
            <select value={monedaValor} onChange={(e) => setmonedaValor(e.target.value)} className="border rounded-lg p-2">
              <option value="USD">USD</option>
              <option value="MXN">MXN (1 USD = 18 MXN)</option>
              <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
            </select>
          </div>


        </div>
        {/* COSTOE1 / COSTOE2 / COSTOE3 */}
        {(bodega === "houston" ||
          bodega === "buffalo" ||
          (bodega === "monterrey" && llevaPaquete === "no") ||
          (bodega === "san-antonio" && llevaPaquete === "no") ||
          (bodega === "st-catherins" && llevaPaquete === "no")) && (
            <div className="mb-4">
              <div className="grid grid-cols-3 ">
                <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
                <label className=" font-semibold mb-1 text-[40px] text-green-700 text-center">COSTOE1</label>
                <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
              </div>

              <div className="flex gap-2 items-center">
                <input type="number" placeholder="COSTOE1" value={costoe1} onChange={(e) => setCostoe1(e.target.value)} className="border rounded-lg p-2 w-full" />
                <select value={monedaCostoe1} onChange={(e) => setMonedaCostoe1(e.target.value)} className="border rounded-lg p-2">
                  <option value="USD">USD</option>
                  <option value="MXN">MXN (1 USD = 18 MXN)</option>
                  <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
                </select>
              </div>


            </div>
          )}

        {(bodega === "san-antonio" || bodega === "houston" || bodega === "buffalo" || bodega === "st-catherins" || bodega === "monterrey") && (
          <div className="mb-4">
            <div className="grid grid-cols-3 ">
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
              <label className=" font-semibold mb-1 text-[40px] text-green-700 text-center">COSTOE2</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="COSTOE2" value={costoe2} onChange={(e) => setCostoe2(e.target.value)} className="border rounded-lg p-2 w-full" />
              <select value={monedaCostoe2} onChange={(e) => setMonedaCostoe2(e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>

          </div>
        )}

        {bodega === "st-catherins" && (
          <div className="mb-4">
            <div className="grid grid-cols-3 ">
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
              <label className=" font-semibold mb-1 text-[40px] text-green-700 text-center">COSTOE3</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
            <div className="flex gap-2 items-center">
              <input type="number" placeholder="COSTOE3" value={costoe3} onChange={(e) => setCostoe3(e.target.value)} className="border rounded-lg p-2 w-full" />
              <select value={monedaCostoe3} onChange={(e) => setMonedaCostoe3(e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>
            {/* <Direccion index={3} bodega={bodega} llevaPaquete={llevaPaquete}/> */}

          </div>
        )}


        <div className="grid grid-cols-2 gap-4">
          {datosEnviados1 && (
            <Direccion index={datosEnviados1.index} bodega={datosEnviados1.bodega} autoFill={datosEnviados1.autoFill} type={datosEnviados1.type} onSubmit={datosEnviados1.onSubmit} />
          )}
          {datosEnviados2 && (
            <Direccion index={datosEnviados2.index} bodega={datosEnviados2.bodega} autoFill={datosEnviados2.autoFill} type={datosEnviados2.type} onSubmit={datosEnviados2.onSubmit} />
          )}


        </div>

        {datosRecibidos1 && (
          <Paqueteria pais={datosRecibidos1?.pais} Seleccion={handlePaqueteriaSeleccionada} Arreglo={AsignarPaqueteriasLista} />
        )}
        {cotizacionPaqueteria?.origin && (
          <Tabla datosCotiza={cotizacionPaqueteria} listaPaqueterias={paqueteria} />
        )}


        <div className="grid grid-cols-2 gap-4">
          {datosEnviados3 && (
            <Direccion index={datosEnviados3.index} bodega={datosEnviados3.bodega} autoFill={datosEnviados3.autoFill} type={datosEnviados3.type} onSubmit={datosEnviados3.onSubmit} />
          )}
          {datosEnviados4 && (
            <Direccion index={datosEnviados4.index} bodega={datosEnviados4.bodega} autoFill={datosEnviados4.autoFill} type={datosEnviados4.type} onSubmit={datosEnviados4.onSubmit} />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {datosEnviados5 && (
            <Direccion index={datosEnviados5.index} bodega={datosEnviados5.bodega} autoFill={datosEnviados5.autoFill} type={datosEnviados5.type} onSubmit={datosEnviados5.onSubmit} />
          )}
          {datosEnviados6 && (
            <Direccion index={datosEnviados6.index} bodega={datosEnviados6.bodega} autoFill={datosEnviados6.autoFill} type={datosEnviados6.type} onSubmit={datosEnviados6.onSubmit} />
          )}
        </div>
        {cotizacionPaqueteria2?.origin && (
          <Tabla datosCotiza={cotizacionPaqueteria2} listaPaqueterias={paqueteria} />
        )}


        <div className="grid grid-cols-2">


          {/* Botón Calcular */}
          <div className="mt-6 text-center">
            <button
              onClick={calcularCostos}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Calcular Total
            </button>
          </div>
          {/* BOTON COTIZAR */}
          {/* <div className="mt-6 text-center">
            <button type="submit"
              onClick={handleCotizacionEnvia}
              className="bg-green-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition">
              Enviar
            </button>
          </div> */}
          <div className="mt-6 text-center">
            <button type="submit"
              onClick={handleCotizacionEnviaTodas}
              className="bg-green-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition">
              Enviar
            </button>
          </div>
        </div>
        {/* {listaOrdenada.length > 0 && (
          <div className="mt-4  p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Cotizaciones encontradas:</h2>

            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Paquetería</th>
                  <th className="border p-2">Servicio</th>

                  <th className="border p-2">Tiempo estimado</th>
                  <th className="border p-2">Precio base</th>
                  <th className="border p-2">Precio base con taxas</th>
                  <th className="border p-2">extended Fare</th>
                  <th className="border p-2">additional Charges</th>
                  <th className="border p-2"> t a x e s </th>
                  <th className="border p-2">totalPrice</th>
                </tr>
              </thead>

              <tbody>
                {listaOrdenada.map((coti, index) => (
                  <tr key={index}>
                    <td className="border p-2">{coti.carrier}</td>
                    <td className="border p-2">{coti.service}</td>

                    <td className="border p-2">{coti.deliveryEstimate}</td>
                    <td className="border p-2">{coti.basePrice} {coti.currency}</td>
                    <td className="border p-2">{coti.basePriceTaxes}</td>
                    <td className="border p-2">{coti.extendedFare}</td>
                    <td className="border p-2">{coti.additionalCharges}</td>
                    <td className="border p-2">{coti.taxes}</td>
                    <td className="border p-2">{coti.totalPrice}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}

        {/* Resultado */}
        {resultadoUSD !== null && (
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-green-700">
              Total estimado: {formatCurrency(resultadoConvertido!)}
            </p>

            <div className="mt-4">
              <label className="block font-semibold mb-1">Convertir moneda</label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="USD">USD - Dólar estadounidense</option>
                <option value="MXN">MXN - Peso mexicano</option>
                <option value="CAD">CAD - Dólar canadiense</option>
              </select>
            </div>

            {detalles && (
              <div className="mt-6">
                <PDFButton datos={detalles} fileName="cotizacion.pdf" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
