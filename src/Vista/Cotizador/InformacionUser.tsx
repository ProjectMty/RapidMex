"use client"
import React, { act, useEffect, useState } from "react";
import "@/Vista/styles/cotizador.css"
import { buscarDestinatarios, buscarUsuario } from "@/Controlador/Cotizador/buscarUsuarios";
import { Dest } from "@/Controlador/types/registroUsuario";


interface PropsUsuario {
    onAuto: (data: boolean) => void;
    onSubmit: (data: Dest) => void;
}

export default function InformacionUser({ onSubmit, onAuto }: PropsUsuario) {
    const [usuario, setUsuario] = useState("")
    const [destinatarios, setDestinatarios] = useState<Dest[] | null>(null)
    const [seleccionado, setSeleccionado] = useState("")
    const [datos, setDatos] = useState<Dest>({
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
        activo: false,
    });
    const [auto, setAuto] = useState(false);

    // BUSCAR USUARIO EN COOKIES
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

    useEffect(() => {
        if (usuario == "") {
            return;
        }
        const destinatarios = async () => {
            try {
                const respuesta = await buscarDestinatarios(usuario);
                setDestinatarios(respuesta.destinatarios);
            } catch (error) {
                alert("error al recibir datos en front")
            }
        }
        destinatarios();
        setDatos(prev => ({
            ...prev,
            idCliente: Number(usuario)
        }))
    }, [usuario]);

    const actualizar = <K extends keyof Dest>(
        campo: K,
        valor: Dest[K]
    ) => {
        setDatos(prev => ({
            ...prev, [campo]: valor
        }));
    };
    const onChangeDest = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!destinatarios) {
            return;
        }
        setSeleccionado(e.target.value)
        const id = Number(e.target.value);

        const destinatarioSeleccionado = destinatarios.find(
            d => d.IdDestinatario === id
        );

        if (destinatarioSeleccionado) {
            console.log(destinatarioSeleccionado);
            setDatos(destinatarioSeleccionado);
            setAuto(true);

        } else {
            setAuto(false);
            setDatos({
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
                idCliente: Number(usuario),
                activo: false,
            })
        }
    };

    useEffect(() => {
        onSubmit(datos);
        onAuto(auto)
        console.log(datos);
        console.log(auto);
    }, [auto, datos]);

    const handleChangeTelefono = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eliminar todo lo que no sea número
        let numeros = e.target.value.replace(/\D/g, "").slice(0, 10);


        if (numeros.length > 6) {
            numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3, 6)}-${numeros.slice(6)}`;
        } else if (numeros.length > 3) {
            numeros = `(${numeros.slice(0, 3)}) ${numeros.slice(3)}`;
        } else if (numeros.length > 0) {
            numeros = `(${numeros}`;
        }
        setDatos((prev) => ({ ...prev, Telefono: numeros }));
    };
    return (

        <div className=" relative my-1">
      
            {destinatarios &&
                <select value={seleccionado} onChange={onChangeDest}
                    className="border rounded-lg p-3 w-full">

                    <option value="">Selecciona Destinatario</option>


                    {destinatarios.map((d) => (
                        <option key={d.IdDestinatario} value={d.IdDestinatario}>{d.Nombre + " " + d.APaterno}</option>
                    ))}
                </select>
            }

            <div className="grid gap-4 mb-4 mt-6">
                {/* *********** DATOS DESTINATARIO ******** */}
                <div className="relative flex  my-1">

                    <input type="text" placeholder="Nombre" value={datos?.Nombre}
                        onChange={(e) => actualizar("Nombre", e.target.value)}
                        className="border rounded-lg p-3 w-full"
                        disabled={auto} />
                </div>

                <div className="relative flex  my-1">

                    <input type="text" placeholder="Apellido Paterno" value={datos?.APaterno}
                        onChange={(e) => actualizar("APaterno", e.target.value)}
                        className="border rounded-lg p-3 w-full"
                        disabled={auto} />
                </div>

                <div className="relative flex  my-1">

                    <input type="text" placeholder="Apellido Materno" value={datos?.AMaterno}
                        onChange={(e) => actualizar("AMaterno", e.target.value)}
                        className="border rounded-lg p-3 w-full"
                        disabled={auto} />
                </div>
                <div className="relative flex  my-1">

                    <input type="text" placeholder="Telefono" value={datos?.Telefono}
                        onChange={handleChangeTelefono}
                        className="border rounded-lg p-3 w-full"
                        disabled={auto} />
                </div>

                <div className="relative flex justify-center items-center my-1 gap-2">
                    <input
                        type="checkbox"
                        checked={datos.activo}
                        onChange={(e) => actualizar("activo", e.target.checked)}
                        disabled={auto}
                        className="border rounded-lg  p-3 w-[10%]"
                    />
                    <label>Guardar destinatario</label>
                </div>
            </div>


            <button>

            </button>
        </div>

    )
}