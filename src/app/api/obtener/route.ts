import { NextResponse } from "next/server";
import sql from "mssql";
import { getPool } from "@/Modelo/sql/mssql";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWT_SECRET } from "@/Modelo/Cotizador/env";



export async function GET(req: Request) {
    try {
        const pool = await getPool();

        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");

        switch (action) {
            case "direccion":
                return await obtenerDireccion(pool, searchParams);

            case "usuario":
                return await obtenerUsuario();

            case "destinatarios":
                return await obtenerDestinatarios(pool, searchParams);

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
        .output("out_Referencia", sql.VarChar(200))
        .execute("SP_ObtenerUbicacionBodega");

    return NextResponse.json(
        {
            success: true,
            ubicacion: result.output
        },
        { status: 200 }
    );
}

async function obtenerUsuario() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ user: null }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ user: decoded });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}

async function obtenerDestinatarios(
    pool: sql.ConnectionPool,
    params: URLSearchParams
) {
    const usuario = params.get("id");

    if (!usuario) {
        return NextResponse.json(
            { error: "Id de usuario requerido" },
            { status: 400 }
        );
    }

    const result = await pool.request()
        .input("idCliente", sql.Int, usuario)
        .execute("SP_BuscarDestinatarios");

    const destinatarios = result.recordset.map(async (res) => {
            return res;
    })
    const resultados = await Promise.all(destinatarios);

    return NextResponse.json(
        {
            success: true,
            destinatarios: resultados
        },
        { status: 200 }
    );
}