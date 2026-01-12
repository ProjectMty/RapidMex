"use client"
import React, { act, useEffect, useState } from "react";
import type { U_bodega } from "@/Controlador/types/U_Bodega";
import { DatosCotizacion } from "@/Controlador/types/DatosPaquete";
import { calcularCostos, getCostoEnvia, getResultadoConvertido } from "@/Controlador/Cotizador/calcular.control";
import "@/Vista/styles/cotizador.css"
import FormDireccion from "./FormDireccion";
import TablaPaqueterias from "./TablaPaqueterias";
import { costoEnvia } from "@/Controlador/types/CalcularCosto";
import { buscarDestinatarios, buscarUsuario } from "@/Controlador/Cotizador/buscarUsuarios";
import { Dest, User } from "@/Controlador/types/registroUsuario";
import InformacionUser from "./InformacionUser";
import { guardarDestinatario } from "@/Controlador/Cotizador/guardarUsuarios";
import { crearPaquete } from "@/Controlador/Cotizador/CrearPaquete";

export default function GenerarGuia() {

  // DECLARACIONES
  type tablaType = {
    datosT: DatosCotizacion | null;
    origenT: U_bodega | null;
    destinoT: U_bodega | null;
  }
  const [datos, setDatos] = useState<DatosCotizacion>({
    llevaPaquete: "",
    bodega: "",
    l: "",
    a: "",
    h: "",
    peso: "",
    unidadPeso: "lb",
    unidadMedida: "in",
    tipoPaquete: "",
    contenido: "",
    cantidad: 0,
    valor: 0,
    monedaValor: "USD",

    moneda: "USD",
    resultadoUSD: null,
    detalles: null,

    costoEnvia: [],
    COSTOE1: 0,
    COSTOE2: 0,
    COSTOE3: 0,
    monedaCostoe1: "USD",
    monedaCostoe2: "USD",
    monedaCostoe3: "USD",
  });
  const [datosTabla, setDatosTabla] = useState<tablaType>({
    datosT: null,
    origenT: null,
    destinoT: null
  });
  const [destinatario, setDestinatario] = useState<Dest>({
    AMaterno: "",
    APaterno: "",
    Calle: "",
    CodigoPostal: "",
    Colonia: "",
    Estado: "",
    IdDestinatario: 0,
    Municipio: "",
    Nombre: "",
    NumExterior: "",
    Pais: "",
    Referencia: "",
    Telefono: "",
    idCliente: 0,
    activo: false
  });
  const [origen, setOrigen] = useState<U_bodega | null>(null);
  const [destino, setDestino] = useState<U_bodega | null>(null);
  const [costoUSD, setCostoUSD] = useState<number>(0)
  const [costoFinal, setCostoFinal] = useState<number>(0)
  const [monedaFinal, setMonedaFinal] = useState("USD")
  const [autoDestinatario, setAutoDestinatario] = useState("");
  const [usuario, setUsuario] = useState("")
  const [habilitar, sethabilitar] = useState(false)

  const actualizar = <K extends keyof DatosCotizacion>(
    campo: K,
    valor: DatosCotizacion[K]
  ) => {
    setDatos(prev => ({
      ...prev, [campo]: valor
    }));
  };

  const calcularCostoPaquete = () => {
    let costo = calcularCostos(datos) ?? 0
    setCostoUSD(costo);
  }

  const formatCurrency = (value: number, moneda: string) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: moneda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  useEffect(() => {
    let precio = getResultadoConvertido(costoUSD, monedaFinal) ?? 0;
    setCostoFinal(precio);
  }, [costoUSD, monedaFinal])

  const handleFormSubmitOrigen = (data: U_bodega) => {
    setOrigen(data);
  };

  const handleFormSubmitDestino = (data: U_bodega) => {
    setDestino(data);
  };

  const handleFormSubmitDestinatario = (data: Dest) => {
    setDestinatario(data);
  };

  const handlesubmitCostoEnvia = (data: costoEnvia) => {
    setDatos(prev => ({
      ...prev,
      COSTOE1: getCostoEnvia(data.costoE1, datos.monedaCostoe1),
      COSTOE2: getCostoEnvia(data.costoE2, datos.monedaCostoe2),
      COSTOE3: getCostoEnvia(data.costoE3, datos.monedaCostoe3)
    }))
  };

  const handleCotizacionEnvia = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sethabilitar(true)
    setDatosTabla(prev => ({
      ...prev,
      datosT: datos,
      origenT: origen,
      destinoT: destino
    }))
  }

  const handleGuardarDest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!destino) {
      return;
    }
    const destinatarioActualizado = {
      ...destinatario,
      Calle: destino.calle,
      CodigoPostal: destino.codigoP,
      Colonia: destino.colonia,
      Estado: destino.estado1,
      Municipio: destino.municipio,
      NumExterior: destino.numCalle,
      Pais: destino.pais,
      Referencia: destino.referencia
    };
    const res = await guardarDestinatario(destinatarioActualizado);

    if (res.success) {
      alert("Desinatario guardado en db");

    } else {
      alert(res.error);
    }
  }

  useEffect(() => {
    const deshabilitar =
      !datos.COSTOE1 ||
      !datos.COSTOE2 ||
      !datos.COSTOE3;

    sethabilitar(!deshabilitar);
  }, [datos.COSTOE1, datos.COSTOE2, datos.COSTOE3]);

  useEffect(() => {
    if (!destino) {
      return;
    }
    setDestinatario(prev => ({
      ...prev,
      Calle: destino.calle,
      CodigoPostal: destino.codigoP,
      Colonia: destino.colonia,
      Estado: destino.estado1,
      Municipio: destino.municipio,
      NumExterior: destino.numCalle,
      Pais: destino.pais,
      Referencia: destino.referencia
    }))
  }, [destino])

  const handleSubmitAuto = (data: boolean) => {
    if (data) {
      setAutoDestinatario("si");
    } else {
      setAutoDestinatario("no")
    }

  }

  // const CrearGuia = () => {
  //   let guia = calcularCostos(datos) ?? 0

  // }
  useEffect(() => {
    const userId = async () => {
      try {
        const respuesta = await buscarUsuario();
        if (respuesta.user == null) {
          alert("no hay sesion iniciada")
        } else {
          alert("usuario encontrado")
          console.log("user id", respuesta.user.id)
          setUsuario(respuesta.user.id)

        }
      } catch (error) {
        alert("error al recibir datos en front")
      }
    }
    userId();
  }, []);

  const CrearPaquete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let paquete = await crearPaquete(datos, Number(usuario), destinatario.IdDestinatario);

    if (paquete.success) {
      alert("paquete creado");
    } else {
      alert(paquete.error)
    }
  }

  return (
    <div className="min-h-screen bg-green-700 flex flex-col items-center py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Generar Guia
        </h1>

        <div className="mb-4">
          {/* *********** LLEVA PAQUETE ******** */}
          <label className="font-semibold block mb-2">
            ¿El cliente lleva su paquete a la bodega?
          </label>
          <select
            value={datos.llevaPaquete}
            onChange={(e) => actualizar("llevaPaquete", e.target.value)}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Seleccionar</option>
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        {/* *********** SELECCION BODEGA ******** */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="font-semibold block mb-2">Seleccionar bodega</label>
            <select
              value={datos.bodega}
              onChange={(e) => actualizar("bodega", e.target.value)}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Seleccionar</option>
              <option value="monterrey">Monterrey</option>
              <option value="san-antonio">San Antonio</option>
              <option value="houston">Houston</option>
              <option value="detroit">Detroit</option>
              <option value="st-catherins">St. Catherins (Canadá)</option>
            </select>
          </div>

          <div className="mb-4">
            {/* *********** SELECCION CONTENEDOR ******** */}
            <label className="font-semibold block mb-2">Seleccionar Contenedor</label>
            <select
              value={datos.tipoPaquete}
              onChange={(e) => actualizar("tipoPaquete", e.target.value)}
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
          {/* *********** CONTENIDO DE PAQUETE ******** */}
          <div>
            <label className="font-medium block">Contenido</label>
            <input type="text" placeholder="Contenido" value={datos.contenido} onChange={(e) => actualizar("contenido", e.target.value)} className="border rounded-lg p-2 w-full" />
          </div>

          {/* *********** CANTIDAD DE PAQUETES ******** */}
          <div>
            <label className="font-medium block">Cantidad</label>
            <input type="number" placeholder="Cantidad" value={datos.cantidad} onChange={(e) => actualizar("cantidad", Number(e.target.value))} className="border rounded-lg p-2 w-full" />
          </div>

        </div>

        {/* *********** MEDIDAS DE PAQUETE ******** */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input type="number" placeholder="Largo" value={datos.l} onChange={(e) => actualizar("l", e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Ancho" value={datos.a} onChange={(e) => actualizar("a", e.target.value)} className="border rounded-lg p-2 w-full" />
          <input type="number" placeholder="Alto" value={datos.h} onChange={(e) => actualizar("h", e.target.value)} className="border rounded-lg p-2 w-full" />
        </div>

        {/* *********** UNIDAD DE PESO PAQUETE ******** */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <label className="font-medium block -mb-3 col-span-2">Peso</label>
          <input type="number" placeholder="Peso real" value={datos.peso} onChange={(e) => actualizar("peso", e.target.value)} className="border rounded-lg p-2 w-full" />
          <select value={datos.unidadPeso} onChange={(e) => actualizar("unidadPeso", e.target.value)} className="border rounded-lg p-2 w-full">
            <option value="lb">Libras (lb)</option>
            <option value="kg">Kilogramos (kg)</option>
          </select>
        </div>

        {/* *********** VALOR DE PAQUETE ******** */}
        <div className="mb-4">
          <div className="grid grid-cols-3 ">
            <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Valor</label>
            <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
          </div>



          {/* *********** COSTO FINAL  ******** */}
          <div className="flex gap-2 items-center">
            <input type="number" placeholder="Valor" value={datos.valor} onChange={(e) => actualizar("valor", Number(e.target.value))} className="border rounded-lg p-2 w-full" />
            <select value={datos.monedaValor} onChange={(e) => actualizar("monedaValor", e.target.value)} className="border rounded-lg p-2">
              <option value="USD">USD</option>
              <option value="MXN">MXN (1 USD = 18 MXN)</option>
              <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 col-span-2">
            <div className="grid grid-cols-3  ">
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
              <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Origen</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
          </div>


          <FormDireccion bodega={datos.bodega} lleva={datos.llevaPaquete} type={"Origen"} ubicacion={destinatario} onSubmit={handleFormSubmitOrigen} />

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 col-span-2">
            <div className="grid grid-cols-3  ">
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
              <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">Destino</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
          </div>
          <InformacionUser onSubmit={handleFormSubmitDestinatario} onAuto={handleSubmitAuto} />

          <FormDireccion bodega={"Destinatario"} lleva={autoDestinatario} type={"Destino"} ubicacion={destinatario} onSubmit={handleFormSubmitDestino} />
          <div className=" text-end col-span-2">
            <button type="submit"
              onClick={handleGuardarDest}
              className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition">
              Guardar Destinatario
            </button>
          </div>
        </div>

        {/* *********** BOTON BUSCAR PAQUETERIAS CON ENVIA ******** */}
        <div className="mt-6 text-center">
          <button type="submit"
            onClick={handleCotizacionEnvia}
            className="bg-green-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition">
            Buscar paqueterias
          </button>
        </div>

        {datosTabla && (
          <TablaPaqueterias auto={true} datos={datosTabla.datosT} origen={datosTabla.origenT} destino={datosTabla.destinoT} onSubmit={handlesubmitCostoEnvia} />

        )}

        {/* *********** COSTO EXTRA DE ENVIA ******** */}
        {(datos.COSTOE1 != 0) && (
          <div className="mb-4 grid grid-cols-2">
            <div className="grid grid-cols-2 ">

              <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">COSTOE1</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>

            <div className="flex gap-2 items-center">
              <label className="precio-cotiza" >{datos.COSTOE1}</label>
              <select value={datos.monedaCostoe1} onChange={(e) => actualizar("monedaCostoe1", e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>


          </div>
        )}

        {(datos.COSTOE2 != 0) && (
          <div className="mb-4 grid grid-cols-2">
            <div className="grid grid-cols-2 ">
              <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">COSTOE2</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
            <div className="flex gap-2 items-center">
              <label className=" precio-cotiza" >{datos.COSTOE2}</label>
              <select value={datos.monedaCostoe2} onChange={(e) => actualizar("monedaCostoe2", e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>

          </div>
        )}

        {(datos.COSTOE3 != 0) && (
          <div className="mb-4 grid grid-cols-2">
            <div className="grid grid-cols-2 ">
              <label className=" font-semibold mb-1 text-[30px] text-green-700 text-center">COSTOE3</label>
              <div className="w-full h-[2px] bg-green-700 relative top-1/2"></div>
            </div>
            <div className="flex gap-2 items-center">
              <label className="precio-cotiza" >{datos.COSTOE3}</label>
              <select value={datos.monedaCostoe3} onChange={(e) => actualizar("monedaCostoe3", e.target.value)} className="border rounded-lg p-2">
                <option value="USD">USD</option>
                <option value="MXN">MXN (1 USD = 18 MXN)</option>
                <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
              </select>
            </div>

          </div>
        )}

        {/* *********** BOTON DE CALCULAR COSTO ******** */}
        {datosTabla && (
          <div className="mt-6 text-center">
            <button
              disabled={habilitar}
              onClick={calcularCostoPaquete}
              className={` text-white py-2 px-6 rounded-lg transition ${habilitar ? "bg-gray-500 cursor-not-allowe" : "bg-green-600 hover:bg-green-700"}`}
            >
              Calcular Total
            </button>
          </div>
        )}

      </div>

      {/* *********** COSTO FINAL A CONVERTIR ******** */}
      {costoUSD !== 0 && (
        <div className="mt-6 text-center">
          <p className="text-xl font-bold ">
            Total estimado: {formatCurrency(costoFinal, monedaFinal)}
          </p>

          <div className="mt-4">
            <label className="label-cotiza">Convertir moneda</label>
            <select
              value={monedaFinal}
              onChange={(e) => setMonedaFinal(e.target.value)}
              className="select-cotiza"
            >
              <option value="USD">USD - Dólar estadounidense</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="CAD">CAD - Dólar canadiense</option>
            </select>
          </div>

          <button
            disabled={habilitar}
            onClick={CrearPaquete}
            className={` text-white py-2 px-6 rounded-lg transition ${habilitar ? "bg-gray-500 cursor-not-allowe" : "bg-green-600 hover:bg-green-700"}`}
          >
            Crear paquete
          </button>


        </div>
      )}

    </div>

  )
}