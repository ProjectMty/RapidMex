"use client"
import Image from "next/image"
import "./Cotiza.css"
import { useState } from "react";
import Direccion from "@/components/Cotizador2/Dirreccion";
import { useEffect } from "react";
import Tabla from "./Tabla";
import GenerarGuia from "@/components/Cotizador2/GenerarGuia";
import PDFButton from "@/components/Cotizador2/PDFButton";
import type { U_bodega } from "@/types/U_Bodega";
import { DetallesCotizacion } from "@/types/DetallesCotizacion2";

export default function Cotiza() {
    // TIPOS DE DATOS
    type DatosEnviar = {
        index: number;
        bodega: string;
        autoFill: boolean;
        type: string;
        onSubmit: (data: U_bodega) => void;

    };

    // ESTADOS PRINCIPALES 
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

    // 📌 Resultado
    const [moneda, setMoneda] = useState("USD");
    const [resultadoUSD, setResultadoUSD] = useState<number | null>(null);
    const [detalles, setDetalles] = useState<DetallesCotizacion | null>(null);
    const [costoEnvia, setcostoEnvia] = useState<any[]>([])
    const [COSTOE1final, setCOSTOE1final] = useState(0);
    const [COSTOE2final, setCOSTOE2final] = useState(0);
    const [COSTOE3final, setCOSTOE3final] = useState(0);

    // 📌 Tipos de cambio
    const mxnToUsd = 18;
    const cadToUsd = 0.74;

    // MANEJO DE FORMULARIO
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

    // ARREGLO DE DATOS
    const paqueteria = [
        { code: "MX", name: "dhl" },
        { code: "MX", name: "estafeta" },
        { code: "MX", name: "fedex" },
        { code: "MX", name: "paquetexpress" },
        { code: "MX", name: "castores" },
        { code: "US", name: "ups" },
        { code: "US", name: "dhl" },
        { code: "US", name: "usps" },
        { code: "US", name: "fedex" },
        { code: "US", name: "ups2" },
        { code: "CA", name: "canadaPost" },
        { code: "CA", name: "canpar" },
        { code: "CA", name: "dhl" },
        { code: "CA", name: "purolator" },
    ]

    // CAMBIO DE MONEDA 
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
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: moneda,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    const getResultadoConvertido = () => {
        if (resultadoUSD === null) return null;
        if (moneda === "USD") return resultadoUSD;
        if (moneda === "MXN") return Math.ceil(resultadoUSD * mxnToUsd);
        if (moneda === "CAD") return Math.ceil(resultadoUSD / cadToUsd);
        return resultadoUSD;
    };
    
    const resultadoConvertido = getResultadoConvertido();


    // MANEJO DE DATOS RECIBIDOS EN "DIRECCION"
    const handleFormSubmit1 = (data: U_bodega) => {
        setDatosRecibidos1(data);
    };

    const handleFormSubmit2 = (data: U_bodega) => {
        setDatosRecibidos2(data);
    };

    const handleFormSubmit3 = (data: U_bodega) => {
        setDatosRecibidos3(data);
    };

    const handleFormSubmit4 = (data: U_bodega) => {
        setDatosRecibidos4(data);
    };

    const handleFormSubmit5 = (data: U_bodega) => {
        setDatosRecibidos5(data);
    };

    const handleFormSubmit6 = (data: U_bodega) => {
        setDatosRecibidos6(data);
    };


    // MANEJO DE ORIGEN Y DESTINO EN BASE A "BODEGA SELECCIONADA"
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

    // MANEJO BUSQUEDA DE PAQUETERIAS
    // limpieza de paqueterias
    useEffect(() => {
        localStorage.removeItem("body1");
        localStorage.removeItem("body2");
    }, []);
    //   creacion de datos repetitivos
    const buildAddress = (datos: any, type: "origin" | "destination") => {
        if (!datos) return null;

        const base: any = {
            postalCode: datos.codigoP,
            type,
            street: datos.calle,
            number: datos.numCalle,
            district: datos.colonia,
            city: datos.municipio,
            state: datos.estado1,
            name: "Cargo Monterrey",
            company: "RapidMex",
            email: "info@rapidmex.com",
            phone: "8129333220",
            country: datos.pais,
            phone_code: "52",
            category: 1,
        };

        // Solo agregamos campos si existen
        if (datos.numero) base.number = datos.numCalle;
        if (datos.referencia) base.reference = datos.referencia;
        if (datos.address_id) base.address_id = datos.address_id;
        if (datos.identificationNumber) base.identificationNumber = datos.identificationNumber;

        return base;
    };
    // busqueda de precios por paqueteria
    const handleCotizacionEnvia = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!datosRecibidos1 || !datosRecibidos2) {
            alert("Faltan los datos de origen y destino del primer tramo.");
            return;
        }

        // Tramo 2 solo si están las dos direcciones
        const hayTramo2 = !!(datosRecibidos3 && datosRecibidos4);

        // ✅ 2. Validar datos del paquete
        if (
            !tipoPaquete ||
            !contenido ||
            !cantidad ||
            !valor ||
            !peso ||
            !l ||
            !a ||
            !h
        ) {
            alert("Completa tipo de paquete, contenido, cantidad, valor, peso y medidas.");
            return;
        }

        const pesoNum = Number(peso);
        const largoNum = Number(l);
        const anchoNum = Number(a);
        const altoNum = Number(h);

        if (pesoNum <= 0 || largoNum <= 0 || anchoNum <= 0 || altoNum <= 0) {
            alert("Peso y medidas deben ser mayores a 0.");
            return;
        }
        // ✅ 3. Construir paquete SIN defaults basura
        const paqueteBase = {
            type: tipoPaquete,
            content: contenido,
            amount: cantidad,
            name: contenido,
            declaredValue: valor,
            lengthUnit: unidadMedida, // "in"
            weightUnit: unidadPeso,   // "lb" o "kg"
            weight: pesoNum,
            dimensions: {
                length: largoNum,
                width: anchoNum,
                height: altoNum,
            },
        };

        // ✅ 4. Construir body1 limpio
        const origin1 = buildAddress(datosRecibidos1, "origin");
        const destination1 = buildAddress(datosRecibidos2, "destination");

        if (!origin1 || !destination1) {
            alert("No se pudieron construir las direcciones del primer tramo.");
            return;
        }

        const body1 = {
            origin: origin1,
            destination: destination1,
            packages: [paqueteBase],
            settings: {
                currency: monedaValor,
            },
            shipment: {
                type: 1,
                reverse_pickup: 0,
                import: 0,
                carrier: "", // todas las paqueterías (por ahora)
            },
        };


        // ✅ 5. Construir body2 solo si hay tramo 2
        let body2: any = null;

        if (hayTramo2) {
            const origin2 = buildAddress(datosRecibidos3, "origin");
            const destination2 = buildAddress(datosRecibidos4, "destination");

            if (origin2 && destination2) {
                body2 = {
                    origin: origin2,
                    destination: destination2,
                    packages: [paqueteBase],
                    settings: {
                        currency: monedaValor,
                    },
                    shipment: {
                        type: 1,
                        reverse_pickup: 0,
                        import: 0,
                        carrier: "",
                    },
                };
            }
        }

        // ✅ 6. Guardar en state (esto lo sigue usando <Tabla>)
        try {

            localStorage.setItem('body1', JSON.stringify(body1))
            localStorage.setItem('body2', JSON.stringify(body2))
            window.dispatchEvent(new Event("localstorage-update"));
            window.dispatchEvent(new Event("update-guias"));
        } catch (error) {
            console.error("Error al asignar datos:", error);
        }

    };

    // CALCULO DE COSTO TOTAL
    const asignarCostoEnvia = () => {
        const arr = [];

        for (let i = 1; i < 4; i++) {
            const saved = localStorage.getItem(`select${i}`);
            const parsed = saved ? JSON.parse(saved) : null;
            if (parsed) arr.push(parsed);
        }
        setcostoEnvia(arr);
    };
    
    useEffect(() => {
        if (!costoEnvia.length) return;

        setCOSTOE1final(
            costoEnvia[0]
                ? convertirUSD(Number(costoEnvia[0].totalPrice ?? 0), costoEnvia[0].currency ?? "USD") / (1 - 0.1)
                : 0
        );

        setCOSTOE2final(
            costoEnvia[1]
                ? convertirUSD(Number(costoEnvia[1].totalPrice ?? 0), costoEnvia[1].currency ?? "USD") / (1 - 0.1)
                : 0
        );

        setCOSTOE3final(
            costoEnvia[2]
                ? convertirUSD(Number(costoEnvia[2].totalPrice ?? 0), costoEnvia[2].currency ?? "USD") / (1 - 0.1)
                : 0
        );
    }, [costoEnvia]);

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
        // costo de envia
        asignarCostoEnvia();

        // costos extra (+10%)
        // const COSTOE1final = costoEnvia[0] ? convertirUSD(Number(costoEnvia[0]?.totalPrice ?? 0), costoEnvia[0]?.currency ?? "USD") / (1 - 0.1) : 0;
        // const COSTOE2final = costoEnvia[1] ? convertirUSD(Number(costoEnvia[1]?.totalPrice ?? 0), costoEnvia[1]?.currency ?? "USD") / (1 - 0.1) : 0;
        // const COSTOE3final = costoEnvia[2] ? convertirUSD(Number(costoEnvia[2]?.totalPrice ?? 0), costoEnvia[2]?.currency ?? "USD") / (1 - 0.1) : 0;

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

    useEffect(() => {
        localStorage.setItem('DetallesPdf', JSON.stringify(detalles))
    }, [detalles])
    return (
        <section className="section-cotiza">
            <p className="titulo-cotiza">COTIZA TU PAQUETE</p>
            <div className="contenedor-cotiza">

                {/* Lleva paquete a bodega */}
                <div className="mb-4">
                    <label className="label-cotiza">
                        ¿El cliente lleva su paquete a la bodega?
                    </label>
                    <select
                        value={llevaPaquete}
                        onChange={(e) => setLlevaPaquete(e.target.value)}
                        className="select-cotiza"
                    >
                        <option value="">Seleccionar</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Seleccion de bodega */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="label-cotiza">Seleccionar bodega</label>
                        <select
                            value={bodega}
                            onChange={(e) => setBodega(e.target.value)}
                            className="select-cotiza"
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
                        <label className="label-cotiza">Seleccionar Contenedor</label>
                        <select
                            value={tipoPaquete}
                            onChange={(e) => setTipoPaquete(e.target.value)}
                            className="select-cotiza"
                        >
                            <option value="">Seleccionar</option>
                            <option value="box">Caja</option>
                            <option value="envelope">Sobre</option>
                            <option value="pallet">Pallet</option>

                        </select>
                    </div>
                </div>
                {/* Contenido y cantidad */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="label-cotiza">Contenido</label>
                        <input type="text" placeholder="Contenido" value={contenido} onChange={(e) => setcontenido(e.target.value)} className="input-cotiza" />

                    </div>
                    <div>
                        <label className="label-cotiza">Cantidad</label>
                        <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setcantidad(Number(e.target.value))} className="input-cotiza" />

                    </div>

                </div>

                {/* Medidas */}
                <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="number" placeholder="Largo" value={l} onChange={(e) => setL(e.target.value)} className="input-cotiza" />
                    <input type="number" placeholder="Ancho" value={a} onChange={(e) => setA(e.target.value)} className="input-cotiza" />
                    <input type="number" placeholder="Alto" value={h} onChange={(e) => setH(e.target.value)} className="input-cotiza" />
                </div>

                {/* Peso */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="number" placeholder="Peso real" value={peso} onChange={(e) => setPeso(e.target.value)} className="input-cotiza" />
                    <select value={unidadPeso} onChange={(e) => setUnidadPeso(e.target.value)} className="input-cotiza">
                        <option value="lb">Libras (lb)</option>
                        <option value="kg">Kilogramos (kg)</option>
                    </select>
                </div>

                <div className="mb-4">

                    <label className="label-cotiza">Valor</label>


                    <div className="flex gap-2 items-center">
                        <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(Number(e.target.value))} className="input-cotiza" />
                        <select value={monedaValor} onChange={(e) => setmonedaValor(e.target.value)} className="border rounded-lg p-2 bg-white">
                            <option value="USD">USD</option>
                            <option value="MXN">MXN (1 USD = 18 MXN)</option>
                            <option value="CAD">CAD (1 CAD = 0.74 USD)</option>
                        </select>
                    </div>


                </div>
                <div className="contenedor-grid-cotiza">
                    {datosEnviados1 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados1.index} bodega={datosEnviados1.bodega} autoFill={datosEnviados1.autoFill} type={datosEnviados1.type} onSubmit={datosEnviados1.onSubmit} />
                        </div>
                    )}
                    {datosEnviados2 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados2.index} bodega={datosEnviados2.bodega} autoFill={datosEnviados2.autoFill} type={datosEnviados2.type} onSubmit={datosEnviados2.onSubmit} />
                        </div>
                    )}


                </div>
                <div className="contenedor-tabla-cotiza">
                    <Tabla select="select1" body="body1" paqueteria="paqueterias1" listaPaqueterias={paqueteria} />
                </div>
                <div className="contenedor-grid-cotiza ">
                    {datosEnviados3 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados3.index} bodega={datosEnviados3.bodega} autoFill={datosEnviados3.autoFill} type={datosEnviados3.type} onSubmit={datosEnviados3.onSubmit} />
                        </div>
                    )}
                    {datosEnviados4 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados4.index} bodega={datosEnviados4.bodega} autoFill={datosEnviados4.autoFill} type={datosEnviados4.type} onSubmit={datosEnviados4.onSubmit} />
                        </div>
                    )}
                </div>
                <div className="contenedor-tabla-cotiza">
                    <Tabla select="select2" body="body2" paqueteria="paqueterias2" listaPaqueterias={paqueteria} />
                </div>
                <div className="contenedor-grid-cotiza">
                    {datosEnviados5 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados5.index} bodega={datosEnviados5.bodega} autoFill={datosEnviados5.autoFill} type={datosEnviados5.type} onSubmit={datosEnviados5.onSubmit} />
                        </div>
                    )}
                    {datosEnviados6 && (
                        <div className="contenedor-direcion-cotiza">
                            <Direccion index={datosEnviados6.index} bodega={datosEnviados6.bodega} autoFill={datosEnviados6.autoFill} type={datosEnviados6.type} onSubmit={datosEnviados6.onSubmit} />
                        </div>
                    )}
                </div>
                <div className="contenedor-tabla-cotiza">
                    <Tabla select="select3" body="body3" paqueteria="paqueterias3" listaPaqueterias={paqueteria} />
                </div>


                <div className="contenedor-grid-cotiza">

                </div>

                {/* BOTON buscar paqueterias */}
                <div className="mt-6 text-center">
                    <button type="submit"
                        onClick={handleCotizacionEnvia}
                        className="bg-green-600 text-white py-2 px-10 rounded-lg hover:bg-green-700 transition">
                        Buscar paqueterias
                    </button>
                </div>

                {/* Botón Calcular */}
                <div className="mt-6 text-center">
                    <button
                        onClick={calcularCostos}
                        className="bg-white text-green-700 py-2 px-6 rounded-lg hover:bg-green-600 hover:text-white transition"
                    >
                        Calcular Total
                    </button>

                </div>

                {/* Resultado */}
                {resultadoUSD !== null && (
                    <div className="mt-6 text-center">
                        <p className="text-xl font-bold text-white">
                            Total estimado: {formatCurrency(resultadoConvertido!)}
                        </p>

                        <div className="mt-4">
                            <label className="label-cotiza">Convertir moneda</label>
                            <select
                                value={moneda}
                                onChange={(e) => setMoneda(e.target.value)}
                                className="select-cotiza"
                            >
                                <option value="USD">USD - Dólar estadounidense</option>
                                <option value="MXN">MXN - Peso mexicano</option>
                                <option value="CAD">CAD - Dólar canadiense</option>
                            </select>
                        </div>

                        {detalles && (
                            <div className="mt-6 mb-5">
                                <PDFButton datos={detalles} fileName="cotizacion.pdf" />

                            </div>
                        )}
                        <GenerarGuia />


                    </div>
                )}
            </div>
        </section>
    )
}