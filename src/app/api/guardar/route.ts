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
    if (!pais || !estado || !municipio || !colonia || !calle || !numExt || !CodigoPostal || !referencia || !nombre || !apePat || !apeMat || !tel || !idCliente ) {
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

