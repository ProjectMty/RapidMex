import { getPool } from "@/Modelo/sql/mssql";
import { error } from "console";
import { NextResponse } from "next/server";
import sql from "mssql";

export async function POST(req: Request) {
    try {
        const pool = await getPool();
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");
        const body = await req.json();

        switch (action) {
            case "destinatario":
                return await guardarDestinatario(pool, body);

            case "paquete":
                return await guardarPaquete(pool, body);

            case "guia":
                return await guardarGuia(pool, body);
            default:
                return NextResponse.json(
                    { error: "Acción no valida" },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error("DB error", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}

async function guardarDestinatario(
    pool: sql.ConnectionPool,
    body: any
) {

    const { pais, estado, municipio, colonia, calle, numExt, CodigoPostal, referencia, nombre, apePat, apeMat, tel, idCliente, activo } = body;
    if (!pais || !estado || !municipio || !colonia || !calle || !numExt || !CodigoPostal || !referencia || !nombre || !apePat || !apeMat || !tel || !idCliente) {
        return NextResponse.json(
            { error: "Campos faltantes" },
            { status: 400 }
        );
    }
    const result = await pool.request()
        .input("var_PaisD", sql.VarChar(50), pais)
        .input("var_EstadoD", sql.VarChar(50), estado)
        .input("var_MunicipioD", sql.VarChar(50), municipio)
        .input("var_coloniaD", sql.VarChar(50), colonia)
        .input("var_CalleD", sql.VarChar(50), calle)
        .input("var_NumExteriorD", sql.VarChar(10), numExt)
        .input("var_CodigoPostalD", sql.VarChar(10), CodigoPostal)
        .input("var_ReferenciaD", sql.VarChar(60), referencia)
        .input("var_NombreD", sql.VarChar(20), nombre)
        .input("var_apePatD", sql.VarChar(20), apePat)
        .input("var_apeMatD", sql.VarChar(20), apeMat)
        .input("var_TelD", sql.VarChar(20), tel)
        .input("var_IdCliente", sql.Int, idCliente)
        .input("var_activo", sql.Bit, activo)
        .output("Id_Destinatario", sql.Int)
        .execute("SP_CrearDestinatario");

    const id = result.output.Id_Destinatario
    if (id > 0) {
        return NextResponse.json(
            {
                success: true,
                idDestinatario: id
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { error: "Destinatario ya existe" },
            { status: 400 }
        )
    }

}

async function guardarPaquete(
    pool: sql.ConnectionPool,
    body: any
) {
    const { largo, ancho, alto, tipo, peso, valor, pesoVol, contenido, cantidad, seguro, cliente, destinatario, unidadPeso, unidadMedida } = body
    if (!largo || !ancho || !alto || !tipo || !peso || !valor || !pesoVol || !contenido || !cantidad || !cliente || !destinatario || !unidadPeso || !unidadMedida) {
        return NextResponse.json(
            { error: "Campos faltantes" },
            { status: 400 }
        );
    }

    const result = await pool.request()
        .input("var_largo", sql.Decimal, largo)
        .input("var_ancho", sql.Decimal, ancho)
        .input("var_alto", sql.Decimal, alto)
        .input("var_type", sql.VarChar(20), tipo)
        .input("var_peso", sql.Decimal, peso)
        .input("var_valor", sql.Decimal, valor)
        .input("var_pesoVol", sql.Decimal, pesoVol)
        .input("var_contenido", sql.VarChar(20), contenido)
        .input("var_cantidad", sql.Int, cantidad)
        .input("var_seguro", sql.Int, seguro)
        .input("var_cliente", sql.Int, cliente)
        .input("var_dest", sql.Int, destinatario)
        .input("var_unidadP", sql.VarChar(2), unidadPeso)
        .input("var_unidadM", sql.VarChar(2), unidadMedida)
        .output("id_paq", sql.Int)
        .execute("SP_CrearPaquete")

    const id = result.output.id_paq
    if (id > 0) {
        return NextResponse.json(
            {
                success: true,
                idPaquete: id
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { error: "error al crear paquete" },
            { status: 400 }
        )
    }
}

async function guardarGuia(
    pool: sql.ConnectionPool,
    body: any
) {
    const { carrier, service, shipmentId, trackingNumber, folio, trackUrl, label, idPaquete, totalPrice } = body
    if (!carrier || !service || !shipmentId || !trackingNumber || !folio || !trackUrl || !label || !idPaquete || !totalPrice) {
        return NextResponse.json(
            { error: "Campos faltantes" },
            { status: 400 }
        );
    }

    const result = await pool.request()
        .input("var_carrier", sql.VarChar(20), carrier)
        .input("var_service", sql.VarChar(20), service)
        .input("var_shipment", sql.VarChar(20), shipmentId)
        .input("var_tracking", sql.VarChar(50), trackingNumber)
        .input("var_folio", sql.VarChar(50), folio)
        .input("var_trackUrl", sql.VarChar(255), trackUrl)
        .input("var_label", sql.VarChar(255), label)
        .input("var_idPaq", sql.Int, idPaquete)
        .input("var_totalPrice", sql.Decimal, totalPrice)
        .output("id_guia", sql.Int)
        .execute("SP_CrearGuia")

    const id = result.output.id_guia
    if (id > 0) {
        return NextResponse.json(
            {
                success: true,
                idGuia: id
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { error: "error al crear guia en db" },
            { status: 400 }
        )
    }
}

