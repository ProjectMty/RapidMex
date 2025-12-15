import { NextResponse } from "next/server";
import sql from "mssql";
import { getPool } from "@/Modelo/sql/mssql";

export async function GET(req: Request) {
    try {
        const pool = await getPool();

        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");

        switch (action) {
            case "direccion":
                return await obtenerDireccion(pool, searchParams);

            case "usuario":
            // return await obtenerUsuario(pool, searchParams);

            default:
                return NextResponse.json(
                    { error: "Acción no válida" },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error("DB error", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

async function obtenerDireccion(
    pool: sql.ConnectionPool,
    params: URLSearchParams
) {
    const bodega = params.get("bodega");

    if (!bodega) {
        return NextResponse.json(
            { error: "Bodega requerida" },
            { status: 400 }
        );
    }

    const result = await pool.request()
        .input("in_nombre", sql.VarChar(20), bodega)
        .output("out_Pais", sql.VarChar(50))
        .output("out_Estado", sql.VarChar(50))
        .output("out_Municipio", sql.VarChar(50))
        .output("out_Colonia", sql.VarChar(50))
        .output("out_Calle", sql.VarChar(50))
        .output("out_NumExterior", sql.VarChar(10))
        .output("out_CodigoPostal", sql.VarChar(10))
        .output("out_Referencia", sql.VarChar(60))
        .execute("SP_ObtenerUbicacionBodega");

    return NextResponse.json(
        {
            success: true,
            ubicacion: result.output
        },
        { status: 200 }
    );
}
